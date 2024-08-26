enum Tree[+T]:
  case Empty
  case Node(left: Tree[T], value: T, right: Tree[T])

def leaf[T](value: T): Tree[T] = {
  Tree.Node(Tree.Empty, value, Tree.Empty)
}

val demo = Tree.Node(leaf(1), 2, Tree.Node(leaf(3), 4, leaf(5)))

def size[T](t: Tree[T]): Int = {
  t match
    case Tree.Empty => 0
    case Tree.Node(left, _, right) => size(left) + 1 + size(right)
}

def total(t: Tree[Int]): Int = {
  t match
    case Tree.Empty => 0
    case Tree.Node(left, value, right) => total(left) + value + total(right)
}

import doodle.core.*
import doodle.image.*
import doodle.image.syntax.all.*
import doodle.image.syntax.core.*
import doodle.java2d.*
import doodle.core.font.*
import edu.depauw.bhoward.RenderFile

val EMPTY_WIDTH = 5
val NODE_WIDTH = 20
val HSPACE = 30
val VSPACE = 30

def showTreeWidth[T](t: Tree[T]): Double = {
  t match
    case Tree.Empty => EMPTY_WIDTH
    case Tree.Node(left, _, right) =>
      showTreeWidth(left) + HSPACE + showTreeWidth(right)
}

def showTree[T](t: Tree[T]): Image = {
  t match
    case Tree.Empty => Image.circle(EMPTY_WIDTH).fillColor(Color.black)
    case Tree.Node(left, value, right) =>
      val showLeft = showTree(left)
      val showRight = showTree(right)
      val leftShift = (showTreeWidth(left) + HSPACE) / 2
      val rightShift = (showTreeWidth(right) + HSPACE) / 2
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

def preOrder[T](t: Tree[T], process: T => Unit): Unit = {
  t match
    case Tree.Empty => ()
    case Tree.Node(left, value, right) =>
      process(value)
      preOrder(left, process)
      preOrder(right, process)
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

def search(t: Tree[Int], x: Int): Boolean = {
  t match
    case Tree.Empty => false
    case Tree.Node(left, value, right) =>
      if x == value then true
      else if x < value then search(left, x)
      else search(right, x)
}

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

def inorderCollect(t: Tree[Int]): List[Int] = {
  t match
    case Tree.Empty => Nil
    case Tree.Node(left, value, right) =>
      inorderCollect(left) ++ List(value) ++ inorderCollect(right)
}

def treeSort(nums: List[Int]): List[Int] = inorderCollect(buildBST(nums))

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

def heapMerge(h1: Tree[Int], h2: Tree[Int]): Tree[Int] = {
  (h1, h2) match
    case (Tree.Empty, _) => h2
    case (_, Tree.Empty) => h1
    case (Tree.Node(l1, v1, r1), Tree.Node(l2, v2, r2)) =>
      if v1 <= v2
      then Tree.Node(heapMerge(h2, r1), v1, l1)
      else Tree.Node(heapMerge(h1, r2), v2, l2)
}

def heapInsert(h: Tree[Int], x: Int): Tree[Int] = heapMerge(h, leaf(x))

def removeMin(h: Tree[Int]): Option[(Int, Tree[Int])] = {
  h match
    case Tree.Empty => None
    case Tree.Node(left, value, right) =>
      Some((value, heapMerge(left, right)))
}

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

object RedBlackTree {
  enum Color:
    case Red
    case Black

  enum Tree:
    case Empty
    case Node(color: Color, left: Tree, value: Int, right: Tree)

  import Color.*
  import Tree.*

  def search(t: Tree, x: Int): Boolean = {
    t match
      case Empty => false
      case Node(_, left, value, right) =>
        if x == value then true
        else if x < value then search(left, x)
        else search(right, x)
  }

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