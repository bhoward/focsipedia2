---
id: trees
title: Trees
---

## Binary Trees

A **binary tree** is a data structure that is either empty or it consists of a root node with three pieces of data:
a value (often a number or a string), and two subtrees, one on the left and one on the right.
This can be expressed with the following recursive data type in Scala:[^1]
```scala mdoc
enum Tree[+T]:
  case Empty
  case Node(left: Tree[T], value: T, right: Tree[T])

def leaf[T](value: T): Tree[T] = {
  Tree.Node(Tree.Empty, value, Tree.Empty)
}

val demo = Tree.Node(leaf(1), 2, Tree.Node(leaf(3), 4, leaf(5)))
```
We use a type variable `T` as a parameter to specify the type of values in the tree.
The function `leaf` is a convenience, so that we can write `leaf(1)` for the tree with just the value 1 and two empty children instead of `Tree.Node(Tree.Empty, 1, Tree.Empty)`.
In this case, it will infer that the type parameter `T` should be `Int`, so we get a `Tree[Int]`.

Note the similarity to a list of type `List[T]`, which is either an empty list or a list node with a head value
(of type `T`) and a sublist of the rest of the elements (the tail).

[^1]: The `+` in `enum Tree[+T]` is there as a convenience, for reasons that we will mostly ignore.
If you want to know, it is marking `Tree` as a **covariant** type constructor, which means that if `S` is a
subtype of `T`, then `Tree[S]` will also be a subtype of `Tree[T]`.
The convenience comes in because the actual type of `Tree.Empty` is `Tree[Nothing]`, but since `Nothing` is a
subtype of every other type, this means that it also has type `Tree[T]` for any `T`, so we can use the same
empty tree value in any tree.
There are also **contravariant** type constructors, indicated with a `-`, where the subtyping goes the
other way around, but we will not need them here.

The natural way to write a function that takes a binary tree is to use (surprise) Pattern Matching,
which corresponds to doing structural induction over the construction of the tree.
For example, suppose we want to know how many nodes a tree has:
```scala mdoc
def size[T](t: Tree[T]): Int = {
  t match
    case Tree.Empty => 0
    case Tree.Node(left, _, right) => size(left) + 1 + size(right)
}

size(Tree.Empty)
size(leaf("hello"))
size(demo)
```

If we have a list with integer values, we might want to get the total of all the values in the tree:
```scala mdoc
def total(t: Tree[Int]): Int = {
  t match
    case Tree.Empty => 0
    case Tree.Node(left, value, right) => total(left) + value + total(right)
}

total(Tree.Empty)
total(demo)
```

A useful function on trees will be to have a visualization of the tree.
Here is a simple rendering of a tree with [Doodle](../fp/doodle.md):
```scala mdoc:invisible
import doodle.core.*
import doodle.image.*
import doodle.image.syntax.all.*
import doodle.image.syntax.core.*
import doodle.java2d.*
import doodle.core.font.*
import edu.depauw.bhoward.RenderFile
```
```scala mdoc:silent
val EMPTY_WIDTH = 5
val NODE_WIDTH = 20
val HSPACE = 10
val VSPACE = 30

// Compute the widths of the left and right subtrees of t
def showTreeWidths[T](t: Tree[T]): (Double, Double) = {
  t match
    case Tree.Empty => (EMPTY_WIDTH / 2, EMPTY_WIDTH / 2)
    case Tree.Node(left, _, right) =>
      val (ll, lr) = showTreeWidths(left)
      val (rl, rr) = showTreeWidths(right)
      (ll + lr + HSPACE, rl + rr + HSPACE)
}

def showTree[T](t: Tree[T]): Image = {
  t match
    case Tree.Empty => Image.circle(EMPTY_WIDTH).fillColor(Color.black)
    case Tree.Node(left, value, right) =>
      val showLeft = showTree(left)
      val showRight = showTree(right)
      val (_, lr) = showTreeWidths(left)
      val (rl, _) = showTreeWidths(right)
      val leftShift = lr + HSPACE
      val rightShift = rl + HSPACE
      val leftLine = Image.path(OpenPath.empty.lineTo(leftShift, VSPACE))
      val rightLine = Image.path(OpenPath.empty.lineTo(-rightShift, VSPACE))
      val leftImage = showLeft `on` leftLine
      val rightImage = showRight `on` rightLine
      Image.text(value.toString) `on`
        Image.square(NODE_WIDTH).fillColor(Color.white) `on`
        leftImage.originAt(Landmark.topRight) `on`
        rightImage.originAt(Landmark.topLeft)
}
val treeDemo = showTree(demo)
```
```scala mdoc:passthrough
RenderFile(treeDemo, "treeDemo.png")
```

### Traversals

Processing a binary tree is often expressed as a **traversal**.
There are several common tree traversals:

* **Preorder**: To process a non-empty tree, first process the value in its root node, then process the left child followed by the right child.
* **Inorder**: To process a non-empty tree, first process the left child, then the value in the root node, and finally the right child.
* **Postorder**: To process a non-empty tree, first process the left child, then the right child, and finish with the value in the root node.
* **Level order**: Process the value in the root node, then process the values in its children from left to right, then process its children's children from left to right, and so on, until there are no more nodes.

The first three traversals have very easy recursive implementations. For example, here is the preorder traversal,
which takes a `Tree[T]` and a function `process: T => Unit` (the return type of `Unit` is a sign that we are
expecting `process` to have a side-effect, such as printing, instead of returning a value):
```scala mdoc
def preOrder[T](t: Tree[T], process: T => Unit): Unit = {
  t match
    case Tree.Empty => ()
    case Tree.Node(left, value, right) =>
      process(value)
      preOrder(left, process)
      preOrder(right, process)
}

preOrder(demo, print)
```
We will have to wait a bit to learn how to do the level order traversal.

To see an interesting connection between traversals and programming languages, we will consider a variation on binary trees called **expression trees**.

### Expression Trees

An expression tree represents the structure of an expression.
This could be an arithmetic expression, such as $(1+2)\cdot 3$, or a boolean expression such as $(p\lor q)\land r$;
it also generalizes to expressions in a programming language, such as `if a < b then c else d` in Scala.
For now we will limit our consideration to expressions with boolean operators and integer operands,
which can be described by the following recursive type:
```scala mdoc
enum Expr:
  case Const(c: Int)
  case BinOp(left: Expr, op: String, right: Expr)

import Expr.*
val sample = BinOp(BinOp(Const(1), "+", Const(2)), "*", Const(3))
```

Now we may define functions that perform preorder, inorder, and postorder traversals of expression trees
to produce string representations of an expression:
```scala mdoc
def prefix(e: Expr): String = {
  e match
    case Const(n) => n.toString
    case BinOp(left, op, right) =>
      String.format("%s(%s, %s)", op, prefix(left), prefix(right))
}

def infix(e: Expr): String = {
  e match
    case Const(n) => n.toString
    case BinOp(left, op, right) =>
      String.format("(%s %s %s)", infix(left), op, infix(right))
}

def postfix(e: Expr): String = {
  e match
    case Const(n) => n.toString
    case BinOp(left, op, right) =>
      String.format("%s %s %s", postfix(left), postfix(right), op)
}

prefix(sample)
infix(sample)
postfix(sample)
```

The preorder traversal of an expression tree gives the **prefix** form of the expression, where the operator comes in front of both of its operands.
With the extra parentheses and commas added above, you can see that this is our familiar function call notation: `+(1, 2)` is just the application of the addition function to the arguments `1` and `2`.

The inorder traversal of an expression tree gives the **infix** form of the expression, where the operator takes its usual position between its operands.
The extra parentheses are essential here, to avoid the ambiguity of whether `1 + 2 * 3` is an addition of `1` and `2 * 3`, or whether it is a multiplication of `1 + 2` by `3`.
In practical use we get around this by adopting conventions of **precedence**, saying for example that multiplication takes precedence over addition, so that `1 + 2 * 3` has an addition operator at the root.
In the sample expression tree, however, the multiplication is at the root, so we have to insert at least one pair of parentheses to get the correct expression: `(1 + 2) * 3`.

The postorder traversal of an expression tree gives the **postfix** form of the expression, which may not be as familiar.
Back in the Dark Ages[^2] of computing, Hewlett-Packard made a series of powerful calculators that became very popular, particularly with engineers.
At the time, calculators were not able to handle arbitrarily complex infix expressions (many of them didn't even have parentheses&hellip;), and HP's solution was elegant: use postfix instead of infix!
They referred to this as Reverse Polish Notation (RPN) in honor of the logician Jan Łukasiewicz (1878&ndash;1956), who invented postfix in the 1920's as a way to write logical expressions without parentheses.

[^2]: The 1970's. See https://www.hpmuseum.org/rpn.htm for more details on RPN.

The key to interpreting a postfix expression is to imagine maintaining a **stack** of values as you read from left to right. 
When you see a number, _push_ that value onto the stack.
When you see an operator, since it must be following its two operands, _pop_ two values from the stack, perform the operation, and _push_ the result back on the stack.
For the sample above, `1 2 + 3 *`, you can check that the resulting value on the stack at the end of the expression is the expected `9`.

More recent uses of postfix expressions and stack-based evaluation are the PostScript page description language used by many printers (which also forms the basis of the PDF document format), and the Java Virtual Machine code produced by the Java compiler.

## Exercises

TBD