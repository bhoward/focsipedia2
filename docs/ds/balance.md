---
id: balance
title: Balanced Binary Search Trees
---

As we saw in the [previous section](bst.md), the height of a binary tree with $N$ nodes
can be $N$ in the worst case, when no node has more than one child.
This means that the worst-case search time in a binary search tree is $O(N)$, which is
no better than linear search through a linked-list or array.
The point of using a binary search tree is to take advantage of branching to improve on
the search time&mdash;every time we choose to go left or right, we would like our search
space to be cut (roughly) in half, which should give us a running time of $O(\log N)$.

Therefore, when we use a binary search tree we will need to do some work to ensure that it
maintains some sort of **balance**.
We will explore several choices for a precise definition of balance.

One definition that will *not* work is to require a **perfect** binary tree, where every node
has exactly two children except for the leaves, and all of the leaves are at the same level.
The problem with this balance condition is that it only works for certain numbers of nodes.
Here are perfect binary search trees with 1, 2, and 3 levels:

```scala mdoc:invisible
import doodle.core.*
import doodle.image.*
import doodle.image.syntax.all.*
import doodle.image.syntax.core.*
import doodle.java2d.*
import doodle.core.font.*
import edu.depauw.bhoward.RenderFile

enum Tree[+T]:
  case Empty
  case Node(left: Tree[T], value: T, right: Tree[T])
  case Subtree(height: Int, label: String)
import Tree.*

def leaf[T](value: T): Tree[T] = {
  Node(Empty, value, Empty)
}

val EMPTY_WIDTH = 5
val NODE_WIDTH = 20
val SUBTREE_WIDTH = 30
val HSPACE = 10
val VSPACE = 30

def showTreeWidths[T](t: Tree[T]): (Double, Double) = {
  t match
    case Empty => (EMPTY_WIDTH / 2, EMPTY_WIDTH / 2)
    case Node(left, _, right) =>
      val (ll, lr) = showTreeWidths(left)
      val (rl, rr) = showTreeWidths(right)
      (ll + lr + HSPACE, rl + rr + HSPACE)
    case Subtree(_, _) => (SUBTREE_WIDTH / 2, SUBTREE_WIDTH / 2)
}

def showTree[T](t: Tree[T]): Image = {
  t match
    case Empty => Image.circle(EMPTY_WIDTH).fillColor(Color.black)
    case Node(left, value, right) =>
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
    case Subtree(height, label) =>
      (Image.text(label) `on`
        Image.triangle(SUBTREE_WIDTH, height * VSPACE)).originAt(Landmark.topCenter)
}

val tree1 = leaf(1)
val tree2 = Node(tree1, 2, leaf(3))
val tree3 = Node(tree2, 4, Node(leaf(5), 6, leaf(7)))
val spacer = Image.rectangle(50, 50).noStroke
val perfectTrees = showTree(tree1) `beside` spacer `beside`
  showTree(tree2) `beside` spacer `beside` showTree(tree3)
```
```scala mdoc:passthrough
RenderFile(perfectTrees, "perfectTrees.png")
```

A perfect binary tree with 4 levels would need 8 more nodes, for a total of 15.
It is easy to see that the number of nodes in a perfect binary tree with $k$
levels is $\sum_{i=0}^{k-1} 2^i$, which is $2^k - 1$.

We could modify this definition to require only that our binary search tree be
**complete**, which is like a perfect tree except the bottom row might be only
partially filled in, with all of its nodes to the left.
Here is an example of a complete binary search tree with 8 nodes:

```scala mdoc:invisible
val tree8 = Node(Node(Node(leaf(1), 2, Empty), 3, leaf(4)), 5, Node(leaf(6), 7, leaf(8)))
```
```scala mdoc:passthrough
RenderFile(showTree(tree8), "completeTree8.png")
```

The number of nodes in a complete binary tree of height $k$ will be between $2^{k-1}$ and
$2^k - 1$, which is enough to establish our desired bound of $O(\log N)$ on the running time
of search on a complete binary search tree.
However, although complete binary trees are useful for some applications, such as
[heaps](bst.md#heaps), they are not flexible enough to handle binary search tree insertion or
deletion efficiently.
To get some intuition why this is so, compare the trees above with 7 and 8 nodes, and observe
how many nodes would have had to change position just to insert the value "8".

## AVL Trees

The key to finding a definition of balance that both guarantees $O(\log N)$ search time and also
efficient insertion and deletion is to allow minor imbalances locally.
As long as we can guarantee that the local imbalance doesn't accumulate out of control, this will
give enough flexibility to enable insertions and deletions to only require local modifications to
the tree.
In particular, if the only changes needed to the tree's structure are along a single path from the
root, we know that they can only take $O(\log N)$ time (because the maximum path lengths are bounded
by the height, and the balance condition will ensure a logarithmic bound on the height).

The first such balance condition we will look at is for the **AVL Tree**, named after its inventors,
Georgy Adelson-Velsky and Evgenii Landis.
For each node in the tree, we will require that the heights of its children differ by at most one.
That is, if we define the **balance factor** `BF(Node(left, value, right))` to be
`height(right) - height(left)`, then the AVL condition says that `-1 <= BF(n) <= +1` for every node `n`.

This looser balance condition is enough to guarantee that the height is bounded by the logarithm of the
number of nodes,[^1] but it is also flexible enough that we can preserve the condition with only minor
adjustments as each value is inserted or deleted.

[^1]: Interestingly, we can show that the minimum number of nodes in an AVL tree of height `h` is
proportional to the Fibonacci number $F_h$. This should make sense, because the most unbalanced case
is when one child has height $h-1$ and the other has height $h-2$, so the recurrence for the total
number of nodes looks like $N(h) = N(h-1) + N(h-2) + 1$. Since the Fibonacci numbers grow exponentially,
with growth factor $\varphi=1.618\ldots$ (the Golden Ratio), we can see that the height of an AVL tree
with $N$ nodes is at most $\log_\varphi N$.

The key to this obervation is the concept of a **rotation** of a subtree.
Suppose the node `n` has a left child (`L`) whose height is one greater than its right child (`R`).
This means that `L` is non-empty, so we may decompose it into its root node (`l`) and children
(`ll` and `lr`).

```scala mdoc:invisible
val rotBefore1 = Node(Subtree(3, "L"), "n", Subtree(2, "R"))
val rotBefore2 = Node(Node(Subtree(2, "ll"), "l", Subtree(2, "lr")), "n", Subtree(2, "R"))
val eq = (Image.text("=") `on` spacer).originAt(Landmark.topCenter)
val rotBefore = showTree(rotBefore1) `beside` eq `beside` showTree(rotBefore2)
```
```scala mdoc:passthrough
RenderFile(rotBefore, "rotBefore.png")
```

Now we can perform a **right rotation** by moving node `l` up to the root and pushing `n` down into
its right child:

```scala mdoc:invisible
val rotAfter = Node(Subtree(2, "ll"), "l", Node(Subtree(2, "lr"), "n", Subtree(2, "R")))
```
```scala mdoc:passthrough
RenderFile(showTree(rotAfter), "rotAfter.png")
```

This rotation converts a tree with balance factor -1 into one with balance factor +1.
Importantly, note that we have also preserved the binary search tree property, because
all of the values in the subtree `ll` are $\leq$ the value in node `l`, the values in
subtree `lr` are between the values in `l` and `n`, and the values in subtree `R` are $\geq$
the value in `n`.
The rotated tree still has the correct relative positioning of all of these values, but we
have "shifted its weight" from the left to the right.
We can also perform a **left rotation** to reverse this operation.

Suppose we have just inserted a value in the left subtree of `n` that would violate the AVL
balance condition.
There are two cases to consider: either the subtree `ll` is too tall (the "Left-Left" case) or
the subtree `lr` is too tall (the "Left-Right" case), depending on which one contains the
new element.

In the Left-Left case, a right rotation as shown above will be enough to fix the AVL condition,
and the new root `l` will have balance factor 0:

```scala mdoc:invisible
val llBefore = Node(Node(Subtree(3, "ll"), "l", Subtree(2, "lr")), "n", Subtree(2, "R"))
val rr = (Image.text("-rotate right->") `on` Image.rectangle(100, 50).noStroke).originAt(Landmark.topCenter)
val llAfter = Node(Subtree(3, "ll"), "l", Node(Subtree(2, "lr"), "n", Subtree(2, "R")))
val leftLeft = showTree(llBefore) `beside` rr `beside` showTree(llAfter)
```
```scala mdoc:passthrough
RenderFile(leftLeft, "leftLeft.png")
```

The Left-Right case is slightly more involved, because a single rotation will leave it unbalanced.
However, if we first perform a left rotation on the subtree `L` we can produce an intermediate tree
that looks like the Left-Left case, so a second rotation (this time to the right) on the full subtree
will fix up the balance:

```scala mdoc:invisible
val lrBefore1 = Node(Node(Subtree(2, "ll"), "l", Subtree(3, "lr")), "n", Subtree(2, "R"))
val lrBefore2 = Node(Node(Subtree(2, "ll"), "l", Node(Subtree(2, "lrl"), "lr", Subtree(2, "lrr"))), "n", Subtree(2, "R"))
val rl = (Image.text("-rotate left->") `on` Image.rectangle(100, 50).noStroke).originAt(Landmark.topCenter)
val lrMiddle = Node(Node(Node(Subtree(2, "ll"), "l", Subtree(2, "lrl")), "lr", Subtree(2, "lrr")), "n", Subtree(2, "R"))
val lrAfter = Node(Node(Subtree(2, "ll"), "l", Subtree(2, "lrl")), "lr", Node(Subtree(2, "lrr"), "n", Subtree(2, "R")))
val leftRight = showTree(lrBefore1) `beside` eq `beside`
  showTree(lrBefore2) `beside` rl `beside`
  showTree(lrMiddle) `beside` rr `beside`
  showTree(lrAfter)
```
```scala mdoc:passthrough
RenderFile(leftRight, "leftRight.png")
```

We may check that the resulting height of the tree after these modifications is the same as it was
before the insertion, so the balance condition further up in the tree will not need further repair.
Of course, if the AVL balance condition were violated by insertion in a right child, we would fix it
by considering analogous Right-Right and Right-Left cases and performing rotations the other direction.

Here is Scala code that implements AVL tree insertion.
As an optimization, we have added a `height` field to each `Tree` object, which is computed
and saved when the leaf or node is constructed; this avoids multiple traversals of the tree
to recompute the heights when checking the balance condition.
```scala mdoc
object AVLTree {
  enum Tree(val height: Int):
    case Empty extends Tree(0)
    case Node(left: Tree, value: Int, right: Tree) extends Tree(1 + (left.height max right.height))
  import Tree.*

  def insert(t: Tree, x: Int): Tree = {
    t match
      case Empty => Node(Empty, x, Empty)
      case Node(left, value, right) =>
        if x < value then
          rotate(Node(insert(left, x), value, right))
        else
          rotate(Node(left, value, insert(right, x)))
  }

  def rotate(t: Tree): Tree = {
    t match
      case Empty => t
      case Node(left, value, right) =>
        val BF = right.height - left.height
        if BF < -1 then
          val Node(ll, lv, lr) = left
          if ll.height > lr.height then // Left-Left
            Node(ll, lv, Node(lr, value, right))
          else // Left-Right
            val Node(rl, rv, rr) = lr
            Node(Node(Node(ll, lv, rl), rv, rr), value, right)
        else if BF > 1 then
          val Node(rl, rv, rr) = right
          if rl.height < rr.height then // Right-Right
            Node(Node(left, value, rl), rv, rr)
          else // Right-Left
            val Node(ll, lv, lr) = rl
            Node(left, value, Node(ll, lv, Node(lr, rv, rr)))
        else // BF is in valid range
          Node(rotate(left), value, rotate(right))
  }
}
```

Finally, here is the result of inserting the numbers 1 to 20, in order, into an initially empty AVL tree:
```scala mdoc:invisible
def toTree(t: AVLTree.Tree): Tree[Int] = {
  t match
    case AVLTree.Tree.Empty => Empty
    case AVLTree.Tree.Node(left, value, right) => Node(toTree(left), value, toTree(right))
}
val t = toTree((1 to 20).foldLeft(AVLTree.Tree.Empty)(AVLTree.insert))
```
```scala mdoc:passthrough
RenderFile(showTree(t), "AVL20.png")
```

## Red-Black Trees

TODO

Here is Scala code that implements Red-Black tree insertion:
```scala mdoc
object RedBlackTree {
  enum Color:
    case Red
    case Black

  enum Tree:
    case Empty
    case Node(color: Color, left: Tree, value: Int, right: Tree)

  import Color.*
  import Tree.*

  def insert(t: Tree, x: Int): Tree = {
    def aux(t: Tree, x: Int): Tree = {
      t match
      case Empty =>
        Node(Red, Empty, x, Empty)
      case Node(color, left, value, right) =>
        if x < value
        then balance(color, aux(left, x), value, right)
        else balance(color, left, value, aux(right, x))
    }

    def balance(color: Color, left: Tree, value: Int, right: Tree): Tree = {
      (color, left, value, right) match
        case (Black, Node(Red, Node(Red, a, llv, b), lv, lr), value, right) => 
          Node(Red, Node(Black, a, llv, b), lv, Node(Black, lr, value, right))
        case (Black, Node(Red, ll, lv, Node(Red, a, lrv, b)), value, right) => 
          Node(Red, Node(Black, ll, lv, a), lrv, Node(Black, b, value, right))
        case (Black, left, value, Node(Red, Node(Red, a, rlv, b), rv, rr)) => 
          Node(Red, Node(Black, left, value, a), rlv, Node(Black, b, rv, rr))
        case (Black, left, value, Node(Red, rl, rv, Node(Red, a, rrv, b))) => 
          Node(Red, Node(Black, left, value, rl), rv, Node(Black, a, rrv, b))
        case _ => Node(color, left, value, right)
    }

    def makeBlack(t: Tree): Tree = {
      t match
        case Node(Red, left, value, right) =>
          Node(Black, left, value, right)
        case _ => t
    }

    makeBlack(aux(t, x))
  }
}
```

Here is the result of inserting the numbers 1 to 20, in order, into an initially empty Red-Black tree:
```scala mdoc:invisible
def toTree2(t: RedBlackTree.Tree): Tree[Int] = {
  t match
    case RedBlackTree.Tree.Empty => Empty
    case RedBlackTree.Tree.Node(_, left, value, right) => Node(toTree2(left), value, toTree2(right))
}
val t2 = toTree2((1 to 20).foldLeft(RedBlackTree.Tree.Empty)(RedBlackTree.insert))
```
```scala mdoc:passthrough
RenderFile(showTree(t2), "RedBlack20.png")
```

TODO show the colors...