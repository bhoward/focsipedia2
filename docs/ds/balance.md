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
import Tree.*

def leaf[T](value: T): Tree[T] = {
  Tree.Node(Tree.Empty, value, Tree.Empty)
}

val EMPTY_WIDTH = 5
val NODE_WIDTH = 20
val HSPACE = 10
val VSPACE = 30

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

TODO describe rotations

Here is Scala code that implements AVL tree insertion:
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
        if left.height - right.height > 1 then
          val Node(ll, lv, lr) = left
          if ll.height > lr.height then // Left-Left
            Node(ll, lv, Node(lr, value, right))
          else // Left-Right
            val Node(rl, rv, rr) = lr
            Node(Node(Node(ll, lv, rl), rv, rr), value, right)
        else if right.height - left.height > 1 then
          val Node(rl, rv, rr) = right
          if rl.height < rr.height then // Right-Right
            Node(Node(left, value, rl), rv, rr)
          else // Right-Left
            val Node(ll, lv, lr) = rl
            Node(left, value, Node(ll, lv, Node(lr, rv, rr)))
        else
          Node(rotate(left), value, rotate(right))
  }
}
```

Here is the result of inserting the numbers 1 to 20, in order, into an initially empty AVL tree:
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