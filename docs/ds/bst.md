---
id: bst
title: Binary Search Trees and Heaps
---

Let us consider binary trees whose values can be ordered.
For concreteness, we will just take the value type to be `Int`, although
with a little more work (not relevant to what we need here) we could
parameterize the functions with any value type with an appropriate
comparison operation.

## Binary Search Trees

If we add the restriction to binary trees that all of the values in the
left subtree of any node have to be less than (or equal to) the value in the node,
and all of the values in the right subtree have to be greater than (or equal to)
that value, then we get a **binary search tree**.

Here is our type definition for binary trees again, plus a function that checks
whether the binary search tree (BST) condition holds for a given `Tree[Int]`.
It works by checking that the root value is between `Int.MinValue` and `Int.MaxValue`
(which should be trivially true), and then recursively checking that each subtree
contains values in an appropriate restriction of that range.
```scala mdoc
enum Tree[+T]:
  case Empty
  case Node(left: Tree[T], value: T, right: Tree[T])

def leaf[T](value: T): Tree[T] = {
  Tree.Node(Tree.Empty, value, Tree.Empty)
}

def checkBST(t: Tree[Int]): Boolean = {
  // Check that all values in t are between min and max, inclusive,
  // and that all subtrees satisfy the BST condition
  def aux(t: Tree[Int], min: Int, max: Int): Boolean = {
    t match
      case Tree.Empty => true
      case Tree.Node(left, value, right) =>
        min <= value && value <= max &&
        aux(left, min, value) &&
        aux(right, value, max)
  }

  aux(t, Int.MinValue, Int.MaxValue)
}

val demo = Tree.Node(leaf(17), 34, Tree.Node(leaf(38), 42, leaf(50)))
checkBST(demo)
```

Here is the `demo` tree rendered with the `showTree` function:

```scala mdoc:invisible
import doodle.core.*
import doodle.image.*
import doodle.image.syntax.all.*
import doodle.image.syntax.core.*
import doodle.java2d.*
import doodle.core.font.*
import edu.depauw.bhoward.RenderFile

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

val treeDemo = showTree(demo)
```
```scala mdoc:passthrough
RenderFile(treeDemo, "bstDemo.png")
```

The advantage of a binary search tree is that it provides a fast way to determine whether a given value is in the data structure.
If we just have a list of $N$ elements, then the best we can do is a linear traversal that will take $O(N)$ time.
By sorting the list, we can stop looking for an element as soon as we see something greater than or equal to it; on average this will require looking through only half of the list, but that is still $O(N)$.
If we had a way to access the $i^\textrm{th}$ element of the list in constant ($O(1)$) time, then we could do better on a sorted list by using binary search, but the linked list data structure does not permit quick access to an arbitrary element; you have to traverse the entire list to get to the $i^\textrm{th}$ node.

However, a binary search tree is arranged precisely to allow direct access to each of the elements needed when performing a binary search.
In a well-balanced tree, the root will be (close to) the middle element, where the search starts.
Each time we inspect a node, if we do not find the value we are looking for then we can narrow our search to one of the two subtrees.
The root of the selected subtree should be (close to) the middle element of half of the elements remaining to be searched.
Since we cut the set of values to be searched (the **search space**) roughly in half after each element we examine, we will only need to look at $O(\log N)$ elements to decide whether our given value is present.
Because the logarithm function grows so slowly, this means that even for billions of data items we will only have to look at a few dozen of them![^1]

[^1]: A nice rule of thumb is that every factor of 1000 adds ten to the number of comparisons in binary search, since $\log_2 1000\approx 10$.

Binary search is very easy to write by pattern matching on a tree:
```scala mdoc
def search(t: Tree[Int], x: Int): Boolean = {
  t match
    case Tree.Empty => false
    case Tree.Node(left, value, right) =>
      if x == value then true
      else if x < value then search(left, x)
      else search(right, x)
}

search(demo, 42)
search(demo, 43)
```

### Worst Case for Binary Search

Of course, the calculations above about running time only apply if the tree is well-balanced.
In the worst case, suppose that the root of the tree had the smallest (or largest) value; then all of the
other values would be concentrated in just one of the subtrees.
If _every_ node had that misfortune, then at each comparison we would only reduce the search space by 1.
That would mean that in the worst case we would have to examine every node in the tree: that would be $O(N)$, and we might as well be using a linked list!

You might think that this case is very unlikely, but consider the following function to build a binary search tree from a given list:
```scala mdoc
def insert(t: Tree[Int], x: Int): Tree[Int] = {
  t match
    case Tree.Empty => leaf(x)
    case Tree.Node(left, value, right) =>
      if x < value
      then Tree.Node(insert(left, x), value, right)
      else Tree.Node(left, value, insert(right, x))
}

def insertAll(t: Tree[Int], nums: List[Int]): Tree[Int] = {
  nums match
    case Nil => t
    case head :: tail => insertAll(insert(t, head), tail)
}

def buildBST(nums: List[Int]): Tree[Int] = insertAll(Tree.Empty, nums)
```

Here is what happens if we build a BST from an already sorted list:
```scala mdoc
val badBST = buildBST(List(1, 2, 3, 4, 5, 6, 7, 8, 9))
// val badBST = buildBST(List(1, 9, 2, 8, 3, 7, 4, 6, 5))
```
```scala mdoc:passthrough
RenderFile(showTree(badBST), "badBST.png")
```

It is not at all unusual to build a binary search tree from a collection that is already sorted, or even close to sorted, so a serious implementation of this data structure will have to do extra work to ensure that it stays balanced; we will see the details in the [next section](balance.md).

### Tree Sort

By combining the `buildBST` function with an inorder traversal that collects all of the elements of the tree back into a list, we get another way to sort a list of numbers:
```scala mdoc
def inorderCollect(t: Tree[Int]): List[Int] = {
  t match
    case Tree.Empty => Nil
    case Tree.Node(left, value, right) =>
      inorderCollect(left) ++ List(value) ++ inorderCollect(right)
}

def treeSort(nums: List[Int]): List[Int] = inorderCollect(buildBST(nums))

treeSort(List(3, 1, 4, 1, 5, 9, 2, 6, 5))
```
This will have an average case running time of $O(N\log N)$, and if we put some effort into ensuring that the intermediate tree were well-balanced then that would also be the worst-case time.

## Heaps

Another interesting data structure related to the binary search tree is the (binary) heap.
Just as before, we will consider trees with `Int` values, but now the ordering condition will be that the root value is less than or equal to _all_ of the rest of the values in the tree; as with the BST condition, this **heap condition** needs to hold recursively for every subtree.

Here is a function to check the heap condition:
```scala mdoc
def checkHeap(t: Tree[Int]): Boolean = {
  def aux(t: Tree[Int], min: Int): Boolean = {
    t match
      case Tree.Empty => true
      case Tree.Node(left, value, right) =>
        min <= value &&
        aux(left, value) && aux(right, value)
  }

  aux(t, Int.MinValue)
}

val heapDemo = Tree.Node(leaf(42), 17, Tree.Node(leaf(50), 34, leaf(38)))
checkHeap(heapDemo)
```
```scala mdoc:passthrough
RenderFile(showTree(heapDemo), "heapDemo.png")
```

Note that the ordering condition for a heap is somewhat looser than for a BST: there is no restriction on the relative values between the left and right subtrees, only between the root and its descendents.

The heap condition guarantees that the smallest value will always be at the root.
This makes the heap a good implementation of the concept of a **priority queue**.
Like an ordinary queue, values can be added and removed from a priority queue; instead of removing the value that has been in the queue the longest, however, the value removed from a priority queue will be the _smallest_.
(This is technically known as a **minheap**.
Reversing the test in the heap condition will give a **maxheap**, where the largest value is at the root and the corresponding priority queue always returns the largest remaining element.)

The most important operation on heaps is the `heapMerge`: given two heaps, combine their elements into a single heap. As usual, this is straightforward by pattern matching. In fact, here is a version known as the **skew merge** that has a surprising additional property:
```scala mdoc
def heapMerge(h1: Tree[Int], h2: Tree[Int]): Tree[Int] = {
  (h1, h2) match
    case (Tree.Empty, _) => h2
    case (_, Tree.Empty) => h1
    case (Tree.Node(l1, v1, r1), Tree.Node(l2, v2, r2)) =>
      if v1 <= v2
      then Tree.Node(heapMerge(h2, r1), v1, l1)
      else Tree.Node(heapMerge(h1, r2), v2, l2)
}
```
The new smallest element must be either the root of `h1` (`v1`) or `h2` (`v2`). After deciding to put that value at the root of the resulting tree, we have its two children plus the other heap to deal with, but we only have space for two subheaps. By merging the other heap with the right child, but putting the result on the left, the skew merge can be shown to be **self-adjusting**; that is, it will stay balanced enough that, at least over the long run, all operations can be performed in logarithmic time.

Using the `heapMerge` function, we can implement `heapInsert` and `removeMin` easily:
```scala mdoc
def heapInsert(h: Tree[Int], x: Int): Tree[Int] = heapMerge(h, leaf(x))

def removeMin(h: Tree[Int]): Option[(Int, Tree[Int])] = {
  h match
    case Tree.Empty => None
    case Tree.Node(left, value, right) =>
      Some((value, heapMerge(left, right)))
}

val Some((min, rest)) = removeMin(heapDemo)
```
```scala mdoc:passthrough
RenderFile(showTree(rest), "removeMin.png")
```

### Heapsort

Finally, if we start with a list, insert each of the numbers in turn into an initially empty heap, and then repeatedly remove the smallest element from the heap until it is empty, we get another efficient sorting algorithm.
Known as **Heapsort**, it is guaranteed to be $O(N\log N)$, as long as we can ensure the heap is relatively balanced.
```scala mdoc
def heapInsertAll(h: Tree[Int], nums: List[Int]): Tree[Int] = {
  nums match
    case Nil => h
    case head :: tail => heapInsertAll(heapInsert(h, head), tail)
}

def buildHeap(nums: List[Int]): Tree[Int] = heapInsertAll(Tree.Empty, nums)

def removeAll(h: Tree[Int]): List[Int] = {
  removeMin(h) match
    case None => Nil
    case Some((min, rest)) => min :: removeAll(rest)
}

def heapSort(nums: List[Int]): List[Int] = removeAll(buildHeap(nums))

heapSort(List(3, 1, 4, 1, 5, 9, 2, 6, 5))
```

## Exercises

1. Consider the following tree:
```scala mdoc:invisible
val t = Tree.Node(Tree.Node(Tree.Node(leaf(5), 3, leaf(7)), 2, leaf(4)), 1, Tree.Node(leaf(9), 6, leaf(8)))
```
```scala mdoc:passthrough
RenderFile(showTree(t), "bstEx1.png")
```

List the values according to the preorder, inorder, postorder, and level order traversals.

<details>
  <summary>Answer</summary>

  Preorder: 1, 2, 3, 5, 7, 4, 6, 9, 8

  Inorder: 5, 3, 7, 2, 4, 1, 9, 6, 8

  Postorder: 5, 7, 3, 4, 2, 9, 8, 6, 1

  Level order: 1, 2, 6, 3, 4, 9, 8, 5, 7
</details>

2. Show the result of removing the minimum item from the tree in Exercise 1, treating it as a binary heap (you may use either the skew merge function described above or the complete binary tree implementation described in class).
```scala mdoc:invisible
removeMin(t) match
  case None => ()
  case Some((min, rest)) =>
    RenderFile(showTree(rest), "bstEx2a.png")
val t2 = Tree.Node(Tree.Node(Tree.Node(leaf(7), 5, Tree.Empty), 3, leaf(4)), 2, Tree.Node(leaf(9), 6, leaf(8)))
RenderFile(showTree(t2), "bstEx2b.png")
```

<details>
  <summary>Answer</summary>

  Using the skew merge, the minimum is 1 and the remaining tree is:
  ![tree with 2 at the root, 4 as its left child, and the 3,5,7 subtree as its right child; the 4 node has the 6,9,8 subtree as its left child and an empty right child](/img/doodle/bstEx2a.png)

  Using the complete tree implementation, the minimum is 1 and the remaining tree is:
  ![tree with 2 at the root, 3 as its left child, and the 6,9,8 subtree as its right child; the 3 node has 5 as its left child and 4 as its right child, while the 5 has 7 as its left child and an empty right child](/img/doodle/bstEx2b.png)
</details>

3. Suppose you tried to use the tree from Exercise 1 as a binary search tree. For which values would the `search` function return `true`?

<details>
  <summary>Answer</summary>

  Searching for 1, 6, and 8 would be successful.
  Searching for any of the other numbers would result in the search looking at the wrong subtree at some point.
</details>