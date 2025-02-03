---
id: components
title: Connected Components
---

## Undirected Graphs

We say that an undirected graph is **connected** if there is a path connecting any pair of edges.
More generally, we can partition any undirected graph into a set of **connected components**, where each component is a connected subgraph and there are no edges between components.
The picture you should have is of dividing the graph into "islands": within each island all nodes are reachable from each other, but there are no bridges going between the islands.

```dot
graph {
    subgraph cluster_0 {
        A -- B -- C -- A
        C -- D
    }

    subgraph cluster_1 {
        E -- F
    }

    subgraph cluster_2 {
        G
    }

    F -- G [style=invis]
}
```
_Example of an undirected graph with three connected components_

Identifying the connected components of an undirected graph is easy: perform a traversal (either DFS or BFS) starting from any node, and you will visit exactly the nodes within the component containing the starting point.
If every node is reachable from the chosen start, then the graph is connected.
Otherwise, choose a new starting point from the unvisited nodes and repeat to find the other components.

## Directed Graphs

When dealing with directed graphs, several versions of connectedness have been studied.
We will look at the notion of being **strongly connected**, which means that for any pair of nodes $A$ and $B$, there are paths both from $A$ to $B$ and _also_ from $B$ to $A$.
Equivalently, we can say that every node in a strongly connected graph is **reachable** from every other node.
Again, even if a directed graph is not strongly connected, we can split it up into a collection of **strongly connected components**.
Unlike the case for connected components in an undirected graph, we may have some bridging edges between distinct strongly connected components; however, they must only connect in one direction, or else they could be used to connect nodes back and forth between the components, contradicting the claim that the components are distinct.

```dot
digraph {
    subgraph cluster_0 {
        A -> B -> C -> A
        C -> D -> C
    }

    subgraph cluster_1 {
        E -> F -> E
    }

    subgraph cluster_2 {
        G
    }

    A -> E [constraint=false]
    C -> F [constraint=false]
    F -> G [constraint=false]
    D -> G [constraint=false]
    F -> G [style=invis]
}
```
_Example of a directed graph with three strongly connected components_

### The Meta-Graph

Within a single strongly connected component, we may freely move between nodes.
If there is more than one node in a component, then they will all be part of a cycle.
However, there can be no cycles that involve more than a single component, because that would imply a path leading from one component to another and back again.
The **meta-graph** of a (directed) graph can be extracted by mapping all of the nodes of each component into a **supervertex**, with edges between supervertices exactly when there is an edge from some node in one component to some node in the other.
For example, in the graph shown above, the supervertices will be $ABCD$, $EF$, and $G$, and the edges will be $ABCD\longrightarrow EF$, $ABCD\longrightarrow G$, and $EF\longrightarrow G$.
Since there are no cycles between the strongly connected components, the meta-graph will always be a DAG, and its nodes can be put in a topological order.

```dot
digraph {
    ABCD -> G
    ABCD -> EF
    EF -> G
}
```
_The meta-graph of the above example_

This gives a useful "two level" view of a graph, with a local structure within each component (all nodes being mutually reachable) and a global structure between components.
For example, when the edges of a directed graph represent dependencies, the local structure reveals the interdependencies, while the global structure provides an ordering ("do all of the tasks in this component before the tasks in that component").

If you take the transitive closure of a graph (considered as a relation), then there will be an edge from $A$ to $B$ exactly when there is a path from $A$ to $B$ in the original graph.
Each strongly connected component in this closure graph will be a **clique**&mdash;a cluster of nodes with all possible interconnections.
The supervertices in its meta-graph will form a **strict partial order**&mdash;an irreflexive, asymmetric, transitive relation (this is essentially an ordinary partial order with all of the self-loops removed, just like the difference between "strictly less than" ($<$) and "less than or equal" ($\leq$)).

### Kosaraju's Algorithm

We may find the strongly connected components of a graph in linear time using two passes of depth-first search.
This is known as **Kosaraju's Algorithm**, or sometimes the **Kosaraju-Sharir Algorithm** (Kosaraju discovered it in 1978, but didn't publish it before Sharir independently discovered it in 1981).

**IN PROGRESS**
