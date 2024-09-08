---
id: graphs
title: Graphs
---

## Graph Terminology

A **graph** is a general data structure for showing connections among a set of objects.
The objects are called **nodes** or **vertices**, and we will usually label them with a unique number or string.
The connections are called **edges**; an edge connects two nodes.
Depending on the application, there may be additional conditions or properties of edges:

* In an **undirected** graph, an edge linking $x$ to $y$ is also a link from $y$ to $x$.
* In a **directed** graph, we distinguish an edge from $x$ to $y$ (we refer to $x$ as the **source** and $y$ as the **target**) from an edge going the other way, from $y$ to $x$.
* In a **simple** graph, there must be at most one edge connecting any pair of nodes, and there are no **loops** (edges from a node to itself).
* To emphasize that multiple edges are allowed between nodes we may refer to a **multigraph**; to emphasize that loops are allowed we may refer to a **loop graph**. A multigraph with loops is sometimes called a **pseudograph**, although we will generally just refer to all of these variants as graphs and only make distinctions where needed.
* An edge may be **labeled** with a number or string; we do not generally require edge labels to be unique.
* If there is an edge from $x$ to $y$, then we say that $y$ is **adjacent** to $x$.

## Graph Representations

One representation of an unlabeled graph is simply as a set of ordered pairs of nodes.
This corresponds to the usual notion of a **relation** as a set of pairs (sometimes called, perhaps confusingly, the "graph" of the relation).

Another representation is as a function (often given in the form of a table) from nodes to a set of neighbors (_i.e._, the adjacent nodes).
The set of neighbors of each node is often presented as a list, which leads to the term **adjacency list** for this presentation.

A third representation is as an **adjacency matrix**.
If the nodes are numbered 1 through $N$, then the adjacency matrix is the two-dimensional array where the entry in row $i$, column $j$ will be 1 (or 'true') if there is an edge from $i$ to $j$ and 0 ('false') if not.
This representation is often extended to labeled graphs where the labels are **weights**: the entry for $(i,j)$ gives the weight (or distance, or cost, &hellip;) of the edge between $i$ and $j$.
Depending on the application, it may be preferable to use an infinite weight to represent absent edges, rather than 0 (since a weight of 0 might be interpreted as saying there is no cost to go from $i$ to $j$).

Here is some Scala code defining types for these representations, plus some conversion functions.
In each case, the type is parameterized by a node type `T`, and the representation type is a case class where the first component is the list of nodes (because there is no generic way to get this list for an arbitrary type `T`, and if `T` is `Int` or `String` we will only want to use a subset of the possible values anyway).
```scala mdoc
trait Graph[T]:
  def nodes: List[T]
  def pairs: List[(T, T)]
  def neighbors(node: T): List[T]
  def adjacent(node1: T, node2: T): Boolean
  def asPairs = Graph.Pairs(nodes, pairs)
  def asAdjList = Graph.AdjList(nodes, neighbors)
  def asAdjMatrix = Graph.AdjMatrix(nodes, adjacent)

object Graph:
  case class Pairs[T](nodes: List[T], pairs: List[(T, T)]) extends Graph[T]:
    def neighbors(node: T): List[T] = {
      for
        (node1, node2) <- pairs
        if node1 == node
      yield node2
    }

    def adjacent(node1: T, node2: T): Boolean = pairs.contains(node1 -> node2)

    override def toString: String = pairs.mkString("{", ",", "}")

  case class AdjList[T](nodes: List[T], adj: T => List[T]) extends Graph[T]:
    def pairs: List[(T, T)] = {
      for
        node1 <- nodes
        node2 <- adj(node1)
      yield (node1, node2)
    }
    
    def neighbors(node: T): List[T] = adj(node)
    
    def adjacent(node1: T, node2: T): Boolean = adj(node1).contains(node2)

    override def toString: String =
      nodes
        .map(node => s"$node:${adj(node).mkString("{", ",", "}")}")
        .mkString("[", "; ", "]")

  case class AdjMatrix[T](nodes: List[T], matrix: (T, T) => Boolean) extends Graph[T]:
    def pairs: List[(T, T)] = {
      for
        node1 <- nodes
        node2 <- nodes
        if matrix(node1, node2)
      yield (node1, node2)
    }
    
    def neighbors(node: T): List[T] = {
      for
        node2 <- nodes
        if matrix(node, node2)
      yield node2
    }
    
    def adjacent(node1: T, node2: T): Boolean = matrix(node1, node2)

    override def toString: String =
      nodes
        .map(n1 => s"$n1:${nodes.map(n2 => matrix(n1, n2).compare(false)).mkString}")
        .mkString("[", "; ", "]")

// Example 1
val demo1 = Graph.Pairs(
  List(1, 2, 3, 4),
  List(1->1, 1->2, 1->3, 1->4, 2->2, 2->4, 3->3, 4->4)
)

println(demo1)
println(demo1.asAdjList)
println(demo1.asAdjMatrix)

// Example 2
enum Demo2Nodes:
  case A, B, C, D
import Demo2Nodes.*

val demo2 = Graph.AdjList(
  List(A, B, C, D),
  {
    case A => List(B, D)
    case B => List(A, C)
    case C => List(B)
    case D => List(A)
  }
)

println(demo2.asPairs)
println(demo2)
println(demo2.asAdjMatrix)

// Example 3
val demo3 = Graph.AdjMatrix(
  List("red", "green", "yellow"),
  {
    case ("red", "green") => true
    case ("green", "yellow") => true
    case ("yellow", "red") => true
    case _ => false
  }
)

println(demo3.asPairs)
println(demo3.asAdjList)
println(demo3)
```

Here is a collection of utilities to render a graph with Doodle:
```scala mdoc:invisible
import doodle.core.*
import doodle.image.*
import doodle.image.syntax.all.*
import doodle.image.syntax.core.*
import doodle.java2d.*
import doodle.core.font.*
import edu.depauw.bhoward.RenderFile
```
```scala mdoc
trait NodeLayout[T]:
  def location(node: T): Point

class CircleNodeLayout[T](nodes: List[T], radius: Double) extends NodeLayout[T]:
  def location(node: T): Point = {
    val i = nodes.indexOf(node)
    Point(radius, 90.degrees - 1.turns * i / nodes.length)
  }

class GridNodeLayout[T](nodes: List[T], columns: Int, spacing: Double) extends NodeLayout[T]:
  private val shift = (columns - 1) * spacing / 2

  def location(node: T): Point = {
    val i = nodes.indexOf(node)
    val row = i / columns
    val col = i % columns
    Point(col * spacing - shift, -row * spacing)
  }

trait NodeImage[T]:
  def apply(node: T, point: Point): Image
  def radius(node: T): Double

class DefaultNodeImage[T](diameter: Double) extends NodeImage[T]:
  def apply(node: T, point: Point): Image = {
    (Image.text(node.toString) `on` Image.circle(diameter)).at(point)
  }

  def radius(node: T): Double = diameter / 2

class ColoredNodeImage[T](diameter: Double, nodeColor: T => Color)
extends DefaultNodeImage[T](diameter):
  override def apply(node: T, point: Point): Image = {
    super.apply(node, point).fillColor(nodeColor(node))
  }

trait EdgeImage[T]:
  def apply(
    node1: T, point1: Point,
    node2: T, point2: Point,
    nodeImage: NodeImage[T]
  ): Image

class DefaultEdgeImage[T] extends EdgeImage[T]:
  val arrowLength = 7
  val arrowAngle = 30.degrees
  val loopOut = 120.degrees
  val loopIn = 60.degrees

  def apply(
    node1: T, point1: Point,
    node2: T, point2: Point,
    nodeImage: NodeImage[T]
  ): Image = {
    if node1 == node2 then
      val radius = nodeImage.radius(node1)
      val p1 = point1 + Vec(radius, loopOut)
      val p2 = point1 + Vec(radius, loopIn)
      val c1 = point1 + Vec(4 * radius, loopOut)
      val c2 = point1 + Vec(4 * radius, loopIn)
      val p3 = p2 + Vec(arrowLength, loopIn + arrowAngle)
      val p4 = p2 + Vec(arrowLength, loopIn - arrowAngle)
      Image.path(OpenPath.empty
        .moveTo(p1).curveTo(c1, c2, p2)
        .moveTo(p2).lineTo(p3)
        .moveTo(p2).lineTo(p4)
      )
    else
      val radius1 = nodeImage.radius(node1)
      val radius2 = nodeImage.radius(node2)
      val v = (point2 - point1).normalize
      val p1 = point1 + v * radius1
      val p2 = point2 + v * -radius2
      val p3 = p2 + v.rotate(arrowAngle) * -arrowLength
      val p4 = p2 + v.rotate(-arrowAngle) * -arrowLength
      Image.path(OpenPath.empty
        .moveTo(p1).lineTo(p2)
        .moveTo(p2).lineTo(p3)
        .moveTo(p2).lineTo(p4)
      )
  }

def showGraph[T](
  g: Graph[T],
  layout: NodeLayout[T],
  nodeImage: NodeImage[T],
  edgeImage: EdgeImage[T]
): Image = {
  val nodeImages = g.nodes.map { case node =>
    val point = layout.location(node)
    nodeImage(node, point)
  }

  val edgeImages = g.pairs.map { case (node1, node2) =>
    val point1 = layout.location(node1)
    val point2 = layout.location(node2)
    edgeImage(node1, point1, node2, point2, nodeImage)
  }

  nodeImages.foldLeft(Image.empty)(_ `on` _) `on`
    edgeImages.foldLeft(Image.empty)(_ `on` _)
}
```
Here are renderings of the example graphs:
```scala mdoc:silent
val image1 = showGraph(
  demo1, 
  new CircleNodeLayout(demo1.nodes, 50), 
  new DefaultNodeImage(20),
  new DefaultEdgeImage)
val image2 = showGraph(
  demo2,
  new GridNodeLayout(demo2.nodes, 3, 50),
  new DefaultNodeImage(20),
  new DefaultEdgeImage)

def nodeColor(node: String): Color = node match
  case "red" => Color.red
  case "yellow" => Color.yellow
  case "green" => Color.green
  case _ => Color.white
val image3 = showGraph(
  demo3,
  new CircleNodeLayout(demo3.nodes, 50),
  new ColoredNodeImage(40, nodeColor),
  new DefaultEdgeImage)
```
```scala mdoc:passthrough
RenderFile(image1, "GraphDemo1.png")
RenderFile(image2, "GraphDemo2.png")
RenderFile(image3, "GraphDemo3.png")
```

## Graph Traversals

We will consider two main ways of traversing a graph here.
In addition to visiting all of the nodes in the graph, each approach will allow us to answer some extra questions about the structure of the graph.
The **depth-first traversal** is analogous to the pre-, in-, and postorder traversals of a tree, in the sense that we will (recursively) visit all of the nodes reachable from one neighbor before backing up and trying another neighbor.
The **breadth-first traversal** by contrast is analogous to the level order traversal of a tree, where we will visit all of the immediate neighbors before continuing on to visit _their_ neighbors, and so on.
Just as with level order traversal, the breadth-first traversal does not have as natural a recursive implementation as depth-first, although we will see that both can be expressed with very similar code by making use of an explicit data structure to control the traversal.
Graph traversals in general are more complicated than tree traversals, because we have to worry about **sharing** of descendants of a node (there may be multiple paths to reach the same node) as well as **cycles** in the graph (there may be paths that loop back on themselves).
Indeed, one definition of a tree is that it is a graph with a distinguished node, called the root, such that there is a **unique path** from the root to any other node; if it is unique, then no descendants are shared and there must not be any cycles.

### Depth-First Traversal

To perform a depth-first traversal, we will need to keep track of two additional pieces of information about the nodes.
The first is a set of **visited** nodes; whenever we first arrive at a node, we add it to this set.
The other is the **finishing list**; whenever we have finished examining all of a node's neighbors, we will add it to the head of the finishing list.
When working with a graphical representation, we will color in a node when it is first visited, and then write a number (the **finishing number**) next to the node when it is finished showing its position from the end of the finishing list.
This information corresponds to performing actions according to _preorder_ (visiting) and _postorder_ (finishing) traversal of a tree.[^1]

[^1]: There is no analogue to _inorder_, because we don't impose any order on the neighbors of a node, so there is no equivalent of having finished the left child and being about to start the right child.

Here is the basic algorithm for depth-first traversal starting from a node $n$:
* Mark $n$ as visited
* While there is an adjacent unvisited node, $p$
   * Perform a depth-first traversal starting from $p$
* When all nodes adjacent to $n$ are visited, add $n$ to the head of the finishing list.

To traverse all of the nodes in a graph, first choose an arbitrary node and perform a depth-first traversal starting from that node. When that node is finished, if there are any remaining unvisited nodes then choose one and repeat.

Clearly this procedure will eventually visit all of the nodes exactly once.
By keeping track of a little more information, it can also answer some interesting questions about a graph.
As we are traversing the graph, we will put each edge into one of three categories:
* **Tree Edge**: an edge that we follow to get to an adjacent unvisited node
* **Back Edge**: an edge that we do not follow because it leads to a visited, _but not yet finished_, node
* **Forward Edge**: an edge that we do not follow because it leads to an already finished node[^2]

[^2]: Some authors distinguish between proper forward edges, where there is a path of tree edges leading from the current node to the already finished node, and **cross edges**, where there is not such a path, but we will not need that distinction.

Here then is the augmented algorithm for depth-first traversal from $n$:
* Mark $n$ as visited
* For each edge $e$ coming out of $n$ and going to a node $p$:
   * If $p$ is unvisited, perform a depth-first traversal from $p$ and mark $e$ as a tree edge
   * If $p$ is visited but not yet finished, mark $e$ as a back edge
   * If $p$ is finished, mark $e$ as a forward edge
* Add $n$ to the finishing list.

The tree edges form what is known as the **depth-first search tree**, with the root at the node where we started the traversal.
More generally, since we get a separate tree each time we restart the traversal, the result of visiting all of the nodes in a graph will in general be a **depth-first search forest** (since a **forest** is just a set of trees).

If we ever find a back edge in traversing a graph, then the graph has a cycle.
Suppose that there is a back edge from $n$ to $p$. Since $p$ is visited but not yet finished, there must be a sequence of tree edges leading from $p$ to $n$ (the current path we are exploring).
That path plus the back edge will form a cycle.
Conversely, if a graph has a cycle, then we will find at least one back edge, because there will be some point in the traversal where we close the loop back to a node on the current path (which will necessarily be visited but not yet finished).

On the other hand, if we find no back edges, then the graph is **acyclic**.
Directed acyclic graphs (often called **dags**) share many of the advantages of trees; indeed, we have already encountered them as combinational circuits, which we viewed as a generalization of boolean expression trees (with shared subterms).
They are also useful to model dependencies, for example showing which tasks must be completed before others (such as prerequisite courses in a college catalog).

Given an acyclic graph, we may "linearize" the nodes by choosing an order in which to list them that respects the dependencies among them (for example, an order in which to take a sequence of classes where all the prerequisites are taken before the courses that depend on them).
This is a generalization of sorting, where the edges in the graph reflect only a "partial" ordering among the items; it is known as **topological sorting**, and the result is a **topological ordering** of the nodes.
The perhaps surprising fact about the finishing list is that, if there were no cycles, then it gives a topological ordering!
The reason is that we can finish a node only after all of the nodes that can be reached from it are finished, so when we put it at the front of the finishing list it will be followed by all of the nodes that depend on it.

As an example of depth-first traversal, consider the following graph:
```scala mdoc:silent
val demo = Graph.Pairs(
  List("A", "B", "C", "D", "E", "F"),
  List("A"->"B", "A"->"C", "B"->"C", "B"->"D",
    "D"->"A", "E"->"C", "E"->"F", "F"->"D", "F"->"F")
)
```
```scala mdoc:passthrough
class DFSNodeImage[T](diameter: Double, visited: List[T], finished: List[T])
extends DefaultNodeImage[T](diameter):
  override def apply(node: T, point: Point): Image = {
    val image = super.apply(node, point)
    if visited.contains(node) then
      image.fillColor(Color.yellow)
    else if finished.contains(node) then
      val i = finished.indexOf(node) + 1
      image.fillColor(Color.cyan) `on` Image.text(i.toString).at(point + Vec(12, -12))
    else
      image
  }
class DFSEdgeImage[T](tree: List[(T, T)], back: List[(T, T)], forward: List[(T, T)])
extends DefaultEdgeImage[T]:
  override def apply(
    node1: T, point1: Point,
    node2: T, point2: Point,
    nodeImage: NodeImage[T]
  ): Image = {
    val image = super.apply(node1, point1, node2, point2, nodeImage)
    val edge = (node1, node2)
    if tree.contains(edge) then
      image.strokeWidth(3)
    else if back.contains(edge) then
      image.strokeWidth(2).strokeColor(Color.red)
    else if forward.contains(edge) then
      image.strokeWidth(2).strokeColor(Color.green)
    else
      image
  }
val dfs0 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List(), List()),
  new DFSEdgeImage(List(), List(), List()))
RenderFile(dfs0, "DFS0.png")
```

Start by marking $A$ visited:

```scala mdoc:passthrough
val dfs1 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List("A"), List()),
  new DFSEdgeImage(List(), List(), List()))
RenderFile(dfs1, "DFS1.png")
```

Follow the (tree) edge to $B$:

```scala mdoc:passthrough
val dfs2 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List("A", "B"), List()),
  new DFSEdgeImage(List("A"->"B"), List(), List()))
RenderFile(dfs2, "DFS2.png")
```

Follow the (tree) edge from $B$ to $C$:

```scala mdoc:passthrough
val dfs3 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List("A", "B", "C"), List()),
  new DFSEdgeImage(List("A"->"B", "B"->"C"), List(), List()))
RenderFile(dfs3, "DFS3.png")
```

Node $C$ has no neighbors at all, so mark it finished:

```scala mdoc:passthrough
val dfs4 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List("A", "B"), List("C")),
  new DFSEdgeImage(List("A"->"B", "B"->"C"), List(), List()))
RenderFile(dfs4, "DFS4.png")
```

Back at node $B$, follow the (tree) edge to $D$:

```scala mdoc:passthrough
val dfs5 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List("A", "B", "D"), List("C")),
  new DFSEdgeImage(List("A"->"B", "B"->"C", "B"->"D"), List(), List()))
RenderFile(dfs5, "DFS5.png")
```

The only edge out of $D$ goes to $A$, which is visited but not yet finished, so mark it as a back edge and mark $D$ finished:

```scala mdoc:passthrough
val dfs6 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List("A", "B"), List("C", "D")),
  new DFSEdgeImage(List("A"->"B", "B"->"C", "B"->"D"), List("D"->"A"), List()))
RenderFile(dfs6, "DFS6.png")
```

Now node $B$ is also finished, so back up to node $A$ and consider its remaining outward edge.
It goes to node $C$, which is already finished, so mark it as a forward edge and mark $A$ finished as well:

```scala mdoc:passthrough
val dfs7 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List(), List("C", "D", "B", "A")),
  new DFSEdgeImage(List("A"->"B", "B"->"C", "B"->"D"), List("D"->"A"), List("A"->"C")))
RenderFile(dfs7, "DFS7.png")
```

We still have nodes $E$ and $F$ unvisited. Arbitrarily restart the traversal at $E$, and first consider the edge to $C$. Since $C$ is already finished, this is another forward edge:

```scala mdoc:passthrough
val dfs8 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List("E"), List("C", "D", "B", "A")),
  new DFSEdgeImage(List("A"->"B", "B"->"C", "B"->"D"),
    List("D"->"A"), List("A"->"C", "E"->"C")))
RenderFile(dfs8, "DFS8.png")
```

Now follow the tree edge from $E$ to $F$, and find the edge from $F$ to $D$ is a forward edge:

```scala mdoc:passthrough
val dfs9 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List("E", "F"), List("C", "D", "B", "A")),
  new DFSEdgeImage(List("A"->"B", "B"->"C", "B"->"D", "E"->"F"),
    List("D"->"A"), List("A"->"C", "E"->"C", "F"->"D")))
RenderFile(dfs9, "DFS9.png")
```

Finally, the edge from $F$ to itself is a back edge, after which $F$ and then $E$ are finished:

```scala mdoc:passthrough
val dfs10 = showGraph(
  demo,
  new CircleNodeLayout(demo.nodes, 50),
  new DFSNodeImage(20, List(), List("C", "D", "B", "A", "F", "E")),
  new DFSEdgeImage(List("A"->"B", "B"->"C", "B"->"D", "E"->"F"),
    List("D"->"A", "F"->"F"), List("A"->"C", "E"->"C", "F"->"D")))
RenderFile(dfs10, "DFS10.png")
```

Since there were back edges, the graph has at least one cycle. In fact, there are two: $A\rightarrow B\rightarrow D\rightarrow A$, and $F\rightarrow F$. In general, there may not be an exact match between the number of back edges and the number of cycles, because several cycles may share a single back edge.

For another example, here is the same graph with the edges $D\rightarrow A$ and $F\rightarrow F$ removed:

```scala mdoc:passthrough
val demoB = Graph.Pairs(
  List("A", "B", "C", "D", "E", "F"),
  List("A"->"B", "A"->"C", "B"->"C", "B"->"D",
    "E"->"C", "E"->"F", "F"->"D")
)

val dfsB0 = showGraph(
  demoB,
  new CircleNodeLayout(demoB.nodes, 50),
  new DFSNodeImage(20, List(), List()),
  new DFSEdgeImage(List(), List(), List()))
RenderFile(dfsB0, "DFSB0.png")
```

We leave the details of tracing through the traversal as an exercise, but here is the final marked graph:

```scala mdoc:passthrough
val dfsB1 = showGraph(
  demoB,
  new CircleNodeLayout(demoB.nodes, 50),
  new DFSNodeImage(20, List(), List("C", "D", "B", "A", "F", "E")),
  new DFSEdgeImage(List("A"->"B", "B"->"C", "B"->"D", "E"->"F"),
    List(), List("A"->"C", "E"->"C", "F"->"D")))
RenderFile(dfsB1, "DFSB1.png")
```

The finishing list is $E$, $F$, $A$, $B$, $D$, $C$ in this case. Since there were no back edges, this is a topological ordering of the nodes in the graph. Here is the graph with the nodes reordered:

```scala mdoc:passthrough
val demoC = Graph.Pairs(
  List("E", "F", "A", "B", "D", "C"),
  List("A"->"B", "A"->"C", "B"->"C", "B"->"D",
    "E"->"C", "E"->"F", "F"->"D")
)

val dfsC0 = showGraph(
  demoC,
  new GridNodeLayout(demoC.nodes, 6, 50),
  new DFSNodeImage(20, List(), List()),
  new DFSEdgeImage(List(), List(), List()))
RenderFile(dfsC0, "DFSC0.png")
```

Observe that all of the arrows go from left to right. (**TODO** This diagram will look better when the rendering function can use curved arrows to avoid overlap&hellip;.)

Note that other markings are possible, depending on the choices made (which nodes to start at, and the order in which to visit the edges out of each node). As another exercise, perform another traversal of this graph that produces a different marked-up result. Can you find a different topological ordering?

### ReasonML Implementation of Depth-First Traversal

To write the depth-first traversal as a pure functional program, we do not want to store the extra information (visited and finished lists, and the categorization of the edges) in mutable data structures.
Instead, we will pass around a ReasonML **record** containing the state.
The syntax for records is very much like that in JavaScript: it consists of a comma-separated set of fields of the form `label: value` inside a pair of curly brackets.
To access the field `x` of record `r` we use `r.x`.
To create a new record as a copy of `r`, with field `x` updated to `v`, we write `{...r, x: v}`.

```reason edit
type state('n) = {
  visited: list('n),
  finished: list('n),
  tree: list(('n, 'n)),
  forward: list(('n, 'n)),
  back: list(('n, 'n))
};

type dfsResult('n) = Cycle(('n, 'n)) | TopoOrder(list('n));

let depthFirst = ((nodes, adjList)) => {
  let chooseUnvisited = visited => {
    let unvisited = List.filter(node => !(List.mem(node, visited)), nodes);
    switch (unvisited) {
    | [] => None
    | [head, ..._] => Some(head)
    }
  };

  let rec dfs = (node, state) => {
    let neighbors = adjList(node);
    let state' = List.fold_left((s, n) => {
        if (List.mem(n, s.finished)) {
          {...s, forward: [(node, n), ...s.forward]}
        } else if (List.mem(n, s.visited)) {
          {...s, back: [(node, n), ...s.back]}
        } else {
          let s' = dfs(n, s);
          {...s', tree: [(node, n), ...s'.tree]}
        }
      }, {...state, visited: [node, ...state.visited]}, neighbors);
    {...state', finished: [node, ...state'.finished]}
  };

  let rec run = state => {
    switch (chooseUnvisited(state.visited)) {
    | None => {
        let t = (nodes, state.tree);
        switch (state.back) {
        | [] => (TopoOrder(state.finished), t)
        | [e, ..._] => (Cycle(e), t)
        }
      }
    | Some(node) => run(dfs(node, state))
    }
  };

  let initialState = {
    visited: [],
    finished: [],
    tree: [],
    forward: [],
    back: []
  };

  run(initialState)
};

depthFirst(adjlist_of_pairs(demo));
depthFirst(adjlist_of_pairs(demo2));
```

The returned value from `depthFirst` is a pair of a `dfsResult` and a `graphPairs`.
The `dfsResult` is either `Cycle(e)`, where `e` is a back edge (pair of nodes) causing a cycle, or `TopoOrder(nodes)`, where `nodes` is a list of the graph nodes in topological order.
The `graphPairs` value is the subgraph consisting of just the tree nodes.

Instead of using the recursive helper function `dfs`, which performs a single depth-first exploration starting from a given node, we may perform all of the exploration in the (tail-recursive) helper function `run` by using an explicit stack to keep track of the current path from the starting node. Each entry in the stack can be one of three values: `Visit(n)` says that the current task is to visit node `n`; `Finish(n)` says that the current task is to finish node `n` (note that this is pushed on the stack underneath all of the edges out of `n`, so it will only be done after all of the neighbors are processed); and `Edge(n1, n2)` says that the current task is to consider the edge from `n1` to `n2`. The `run` helper function can now be seen as a loop that continually removes a task from the stack and then updates the stack and the state to perform that task:
```reason edit
type dfsStackItem('n) = Visit('n) | Finish('n) | Edge('n, 'n);

let depthFirst2 = ((nodes, adjList)) => {
  let chooseUnvisited = visited => {
    let unvisited = List.filter(node => !(List.mem(node, visited)), nodes);
    switch (unvisited) {
    | [] => None
    | [head, ..._] => Some(head)
    }
  };

  let rec run = (stack, state) => {
    if (Stack.is_empty(stack)) {
      switch (chooseUnvisited(state.visited)) {
      | None => {
          let t = (nodes, state.tree);
          switch (state.back) {
          | [] => (TopoOrder(state.finished), t)
          | [e, ..._] => (Cycle(e), t)
          }
        }
      | Some(node) => {
          Stack.push(Visit(node), stack);
          run(stack, state)
        }
      }
    } else {
      switch (Stack.pop(stack)) {
      | Visit(n) => {
          Stack.push(Finish(n), stack);
          let neighbors = adjList(n);
          List.iter(n2 => Stack.push(Edge(n, n2), stack), neighbors);
          run(stack, {...state, visited: [n, ...state.visited]})
        }
      | Finish(n) => {
          run(stack, {...state, finished: [n, ...state.finished]})
        }
      | Edge(n1, n2) => {
          if (List.mem(n2, state.finished)) {
            run(stack, {...state, forward: [(n1, n2), ...state.forward]})
          } else if (List.mem(n2, state.visited)) {
            run(stack, {...state, back: [(n1, n2), ...state.back]})
          } else {
            Stack.push(Visit(n2), stack);
            run(stack, {...state, tree: [(n1, n2), ...state.tree]})
          }
        }
      }
    }
  };

  let initialState = {
    visited: [],
    finished: [],
    tree: [],
    forward: [],
    back: []
  };

  run(Stack.create(), initialState)
};

depthFirst2(adjlist_of_pairs(demo));
depthFirst2(adjlist_of_pairs(demo2));
```

### Breath-First Traversal

The big payoff of rewriting the depth-first traversal to use an explicit stack is that we can now explain breadth-first traversal (and level order traversal of a tree) quite simply: instead of a stack, use a queue!
The idea is that the queue is maintaining a list of edges yet to be processed. When the algorithm starts, we push all of the edges of the initial node onto the queue and process them in order.
As we handle each edge, if its target node has not yet been visited, then we push all of its outgoing edges onto the queue, _but they will have to wait until all of the current edges are processed_.
In this way, we visit all of the immediate neighbors first, and then we continue with their neighbors, followed by their neighbors' neighbors, _etc_., until the entire graph is traversed.

Breadth-first traversal is desirable when the graph might be large and we want to stop searching when we find the closest match, or if we only want to process items within a given distance (for example, it is used in game-playing strategies to look ahead up to a certain number of moves). Several famous algorithms can also be viewed as variants of breadth-first traversal.

#### Dijkstra's Algorithm

Consider a labeled graph where each edge has an associated (non-negative) distance or cost.
Instead of using a queue to store the edges under consideration, we will use a **priority queue** (perhaps implemented as a binary heap). By assigning a priority based on the total length of the path from the starting node (including the edge under consideration), Dijkstra's algorithm will greedily build a **shortest-path tree** with the starting node as the root. This is an effective way to answer questions like "what is the shortest travel time from $A$ to $B$?" or "what is the closest node to $A$ with a given property?"

#### Prim's Algorithm

If we have an _undirected_ graph and perform Dijkstra's algorithm with the priority of an edge being just the cost of that edge alone, then instead of a shortest-path tree we get a **minimum spanning tree**.
This is the smallest subset of edges that connects all of the nodes, with the least possible total cost of the edges.

(TODO examples will have to wait until the tree rendering can do labels&hellip;)

## Exercises

1. Give the list of pairs, adjacency list, and adjacency matrix representations for the following _undirected_ graph:
```reason hidden
let ex1 = (["A", "B", "C", "D"], [("A", "B"), ("B", "A"), ("A", "C"), ("C", "A"), ("B", "C"), ("C", "B"), ("A", "D"), ("D", "A")]);
draw(renderLayout(layoutGrid(ex1, 2, 40.), s => s, defaultStyleNode, defaultStyleEdge));
```

<details>
  <summary>Answer</summary>

  ```reason hidden
  print_string("Pairs\n");
  showPairs(ex1, s => s);
  print_string("Adjacency List:\n");
  showAdjList(adjlist_of_pairs(ex1), s => s);
  print_string("Adjacency Matrix:\n");
  showAdjMatrix(adjmatrix_of_pairs(ex1), s => s);
  ```
</details>

2. Consider the adjacency matrix representation of a graph. What can you say about the matrix if the graph is undirected? What if the graph has loops on all of the nodes?

<details>
  <summary>Answer</summary>

  An undirected graph will have a _symmetric_ adjacency matrix: the entry in row $i$, column $j$ is the same as the entry in row $j$, column $i$ (symmetric about the diagonal).
  A graph with all of the self-loops will have 1's along the diagonal (and a simple graph, with no loops, will have 0's on the diagonal).
</details>

3. (Based on a problem from Aho &amp; Ullman) Consider the following directed graph:
```reason hidden
let ex3 = (["a", "b", "c", "d", "e", "f"], [("a", "b"), ("a", "d"), ("b", "c"), ("b", "f"), ("c", "d"), ("d", "e"), ("e", "b"), ("e", "f"), ("f", "a")]);
draw(renderLayout(layoutCircle(ex3, 40.), s => s, defaultStyleNode, defaultStyleEdge));
```

   * Give two different depth-first traversal trees starting at node $a$. For each, also label the graph to show the forward and back edges, and the finishing number.

<details>
  <summary>Answer</summary>

  Using depth-first traversal (others are possible):
  ```reason hidden
  let finishedNode = n => img => fill(Color("white"),
    img +++ translate(12., 6., withFont(0.4, Serif, Regular, Normal, fill(color("black"), text(string_of_int(n))))));
  let ns1 = node => switch (node) {
  | "a" => finishedNode(6)
  | "b" => finishedNode(5)
  | "c" => finishedNode(4)
  | "d" => finishedNode(3)
  | "e" => finishedNode(2)
  | "f" => finishedNode(1)
  | _ => defaultStyleNode(node)
  };
  let es1 = (n1, n2) => switch (n1, n2) {
  | ("a", "b") | ("b", "c") | ("c", "d") | ("d", "e") | ("e", "f") => treeEdge
  | ("f", "a") | ("e", "b") => backEdge
  | ("b", "f") | ("a", "d") => forwardEdge
  | _ => defaultStyleEdge(n1, n2)
  };
  draw(renderLayout(layoutCircle(ex3, 40.), s => s, ns1, es1));
  let ns2 = node => switch (node) {
  | "a" => finishedNode(6)
  | "b" => finishedNode(3)
  | "c" => finishedNode(1)
  | "d" => finishedNode(5)
  | "e" => finishedNode(4)
  | "f" => finishedNode(2)
  | _ => defaultStyleNode(node)
  };
  let es2 = (n1, n2) => switch (n1, n2) {
  | ("a", "d") | ("d", "e") | ("e", "b") | ("b", "c") | ("b", "f") => treeEdge
  | ("c", "d") | ("f", "a") => backEdge
  | ("e", "f") | ("a", "b") => forwardEdge
  | _ => defaultStyleEdge(n1, n2)
  };
  draw(renderLayout(layoutCircle(ex3, 40.), s => s, ns2, es2));
  ```
</details>

   * Find the distance (length of the shortest path) from $a$ to each of the other nodes.

<details>
  <summary>Answer</summary>

  Using breadth-first traversal:
  ```reason hidden
  let ns3 = node => switch (node) {
  | "a" => finishedNode(0)
  | "b" => finishedNode(1)
  | "c" => finishedNode(2)
  | "d" => finishedNode(1)
  | "e" => finishedNode(2)
  | "f" => finishedNode(2)
  | _ => defaultStyleNode(node)
  };
  let es3 = (n1, n2) => switch (n1, n2) {
  | ("a", "b") | ("a", "d") | ("b", "c") | ("b", "f") | ("d", "e") => treeEdge
  | _ => defaultStyleEdge(n1, n2)
  };
  draw(renderLayout(layoutCircle(ex3, 40.), s => s, ns3, es3));
  ```
</details>

4. What would go wrong in Dijkstra's algorithm if we allowed edges with a negative cost? Give an example where it fails to find the shortest path.

<details>
  <summary>Answer</summary>

  With negative cost edges the greedy approach to building the shortest-path tree is not guaranteed to find the shortest paths.
  Suppose there is an edge from $A$ to $B$ with cost 2, and an edge from $A$ to $C$ with cost 3: Dijkstra's algorithm will say that the shortest path from $A$ to $B$ has cost 2, without even looking at node $C$.
  However, if there is an edge from $C$ to $B$ with cost $-2$, then the better route would be to go $A\rightarrow C\rightarrow B$, with total cost 1.
 
  Even worse, if there were a cycle in the graph with a total negative cost (such as $A$ to $B$ with cost 1, but $B$ to $A$ with cost $-2$), then any path touching that cycle could be extended to follow the cycle any number of times, leading to an arbitrarily low (large negative) cost! For such a graph, the notion of "shortest path" is undefined.
</details>