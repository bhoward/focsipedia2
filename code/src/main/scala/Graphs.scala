package graphs

trait GraphEdge[Node]:
  val from: Node
  val to: Node

case class SimpleGraphEdge[Node](from: Node, to: Node) extends GraphEdge[Node]

trait Graph:
  type Node
  type Edge <: GraphEdge[Node]

  val nodes: Seq[Node]
  val edges: Seq[Edge]
  def outgoing(node: Node): Seq[Edge] = edges.filter(e => e.from == node)

  def reverse: Graph = {
    val self = this

    new Graph:
      type Node = self.Node
      type Edge = SimpleGraphEdge[Node]

      val nodes = self.nodes
      val edges = self.edges.map(e => SimpleGraphEdge(e.to, e.from))
  }

  def undirected: Graph = {
    val self = this

    new Graph:
      type Node = self.Node
      type Edge = SimpleGraphEdge[Node]

      val nodes = self.nodes
      val edges = self.edges.map(e => SimpleGraphEdge(e.to, e.from)).toSet
        .union(self.edges.map(e => SimpleGraphEdge(e.from, e.to)).toSet).toSeq
  }

trait WeightedGraphEdge[Node] extends GraphEdge[Node]:
  val weight: Double

case class SimpleWeightedGraphEdge[Node](from: Node, to: Node, weight: Double)
  extends WeightedGraphEdge[Node]

trait WeightedGraph extends Graph:
  override type Edge <: WeightedGraphEdge[Node]

  override def reverse: WeightedGraph = {
    val self = this

    new WeightedGraph:
      type Node = self.Node
      type Edge = SimpleWeightedGraphEdge[Node]

      val nodes = self.nodes
      val edges = self.edges.map(e => SimpleWeightedGraphEdge(e.to, e.from, e.weight))
  }

  override def undirected: WeightedGraph = {
    val self = this

    new WeightedGraph:
      type Node = self.Node
      type Edge = SimpleWeightedGraphEdge[Node]

      val nodes = self.nodes
      val edges = self.edges.map(e => SimpleWeightedGraphEdge(e.to, e.from, e.weight)).toSet
        .union(self.edges.map(e => SimpleWeightedGraphEdge(e.from, e.to, e.weight)).toSet).toSeq
  }



object Graph:
  def fromEdges[N, E <: GraphEdge[N]](nodes: Seq[N], edges: Seq[E]): Graph = {
    val ns = nodes
    val es = edges

    new Graph:
      type Node = N
      type Edge = E

      val nodes = ns
      val edges = es
  }

  def fromPairs[N](nodes: Seq[N], pairs: Seq[(N, N)]): Graph = {
    val ns = nodes

    new Graph:
      type Node = N
      type Edge = SimpleGraphEdge[N]

      val nodes = ns
      val edges = pairs.map((from, to) => SimpleGraphEdge(from, to))
  }

  def fromWeightedEdges[N, E <: WeightedGraphEdge[N]](nodes: Seq[N], edges: Seq[E]): WeightedGraph = {
    val ns = nodes
    val es = edges

    new WeightedGraph:
      type Node = N
      type Edge = E
 
      val nodes = ns
      val edges = es
  }

  def fromTriples[N](nodes: Seq[N], triples: Seq[(N, Double, N)]): WeightedGraph = {
    val ns = nodes

    new WeightedGraph:
      type Node = N
      type Edge = SimpleWeightedGraphEdge[N]

      val nodes = ns
      val edges = triples.map((from, weight, to) => SimpleWeightedGraphEdge(from, to, weight))
  }

object Traversal:
  /**
    * Perform a depth-first search of a graph and return
    * the dfs tree (as a graph) showing the edges followed.
    * Uses the imperative stack-based approach.
    *
    * @param g the input graph
    * @return the dfs tree
    */
  def depthFirst(g: Graph): Graph = {
    import g.{Node, Edge}
    import scala.collection.mutable.Stack

    val stack: Stack[Edge] = Stack.empty

    var visited: List[Node] = Nil
    var tree: List[Edge] = Nil

    def visit(node: Node): Unit = {
      visited = node :: visited
      for edge <- g.outgoing(node) do
        stack.push(edge)
    }

    for start <- g.nodes do
      if !visited.contains(start) then
        visit(start)

        while stack.nonEmpty do
          val edge = stack.pop()
          if !visited.contains(edge.to) then
            tree = edge :: tree
            visit(edge.to)
        end while
    end for
    
    Graph.fromEdges(g.nodes, tree)
  }

  def breadthFirst(g: Graph): Graph = {
    import g.{Node, Edge}
    import scala.collection.mutable.Queue

    val queue: Queue[Edge] = Queue.empty

    var visited: List[Node] = Nil
    var tree: List[Edge] = Nil

    def visit(node: Node): Unit = {
      visited = node :: visited
      for edge <- g.outgoing(node) do
        queue.enqueue(edge)
    }

    for start <- g.nodes do
      if !visited.contains(start) then
        visit(start)

        while queue.nonEmpty do
          val edge = queue.dequeue()
          if !visited.contains(edge.to) then
            tree = edge :: tree
            visit(edge.to)
        end while
    end for
    
    Graph.fromEdges(g.nodes, tree)
  }

  def dijkstra(g: WeightedGraph, start: g.Node): WeightedGraph = {
    import g.{Node, Edge}
    import scala.collection.mutable.PriorityQueue

    type Item = (Double, Edge)
    given Ordering[Item] = Ordering.by((item: Item) => item._1).reverse

    val queue: PriorityQueue[Item] = PriorityQueue.empty

    var visited: List[Node] = Nil
    var tree: List[Edge] = Nil

    def visit(node: Node, distance: Double): Unit = {
      visited = node :: visited
      for edge <- g.outgoing(node) do
        queue.enqueue((distance + edge.weight, edge))
    }

    visit(start, 0)

    while queue.nonEmpty do
      val (distance, edge) = queue.dequeue()
      if !visited.contains(edge.to) then
        tree = edge :: tree
        visit(edge.to, distance)
    end while
    
    Graph.fromWeightedEdges(g.nodes, tree)
  }

  def prim(g: WeightedGraph): WeightedGraph = {
    import g.{Node, Edge}
    import scala.collection.mutable.PriorityQueue

    given Ordering[Edge] = Ordering.by((e: Edge) => e.weight).reverse
    val queue: PriorityQueue[Edge] = PriorityQueue.empty

    var visited: List[Node] = Nil
    var tree: List[Edge] = Nil

    def visit(node: Node): Unit = {
      visited = node :: visited
      for edge <- g.outgoing(node) do
        queue.enqueue(edge)
    }

    for start <- g.nodes do
      if !visited.contains(start) then
        visit(start)

        while queue.nonEmpty do
          val edge = queue.dequeue()
          if !visited.contains(edge.to) then
            tree = edge :: tree
            visit(edge.to)
        end while
    end for
    
    Graph.fromWeightedEdges(g.nodes, tree)
  }

  @main def traverse() = {
    import doodle.core.*
    import doodle.image.*
    import doodle.image.syntax.all.*
    import doodle.image.syntax.core.*
    import doodle.core.font.*
    import doodle.java2d.*
    import cats.effect.unsafe.implicits.global

    val demo = Graph.fromPairs(
      List("A", "B", "C", "D", "E", "F"),
      List("A"->"C", "A"->"B", "B"->"C", "C"->"D",
        "D"->"A", "E"->"C", "E"->"F", "F"->"D", "F"->"F")
    )

    val dfsForest = depthFirst(demo)
    println(dfsForest.edges)

    val bfsForest = breadthFirst(demo)
    println(bfsForest.edges)

    val demo2 = Graph.fromTriples(
      List('a', 'b', 'c', 'd', 'e'),
      List(
        ('a', 3, 'c'),
        ('a', 5, 'd'),
        ('b', 4, 'a'),
        ('b', 2, 'c'),
        ('c', 8, 'e'),
        ('d', 3, 'e')
      )
    )

    val shortestPathTree = dijkstra(demo2, demo2.nodes.head)
    println(shortestPathTree.edges)

    val minimumSpanningForest = prim(demo2.undirected)
    println(minimumSpanningForest.edges)

    // showGraph(demo, new CircleNodeLayout(demo.nodes, 50), new DefaultNodeImage(20)).draw()
    // showGraph(dfsTree, new CircleNodeLayout(dfsTree.nodes, 50), new DefaultNodeImage(20)).draw()
  }

