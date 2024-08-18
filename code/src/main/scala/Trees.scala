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