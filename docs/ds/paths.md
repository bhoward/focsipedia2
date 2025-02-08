---
id: paths
title: Shortest Paths and Minimum Spanning Trees
---

## Dijkstra's Algorithm

Consider a labeled graph where each edge has an associated (non-negative) distance or cost.
Instead of using a queue to store the edges under consideration, we will use a **priority queue** (perhaps implemented as a binary heap). By assigning a priority based on the total length of the path from the starting node (including the edge under consideration), Dijkstra's algorithm will greedily build a **shortest-path tree** with the starting node as the root. This is an effective way to answer questions like "what is the shortest travel time from $A$ to $B$?" or "what is the closest node to $A$ with a given property?"

## Prim's Algorithm

If we have an _undirected_ graph and perform Dijkstra's algorithm with the priority of an edge being just the cost of that edge alone, then instead of a shortest-path tree we get a **minimum spanning tree**.
This is the smallest subset of edges that connects all of the nodes, with the least possible total cost of the edges.

(TODO examples will have to wait until the tree rendering can do labels&hellip;)

## Exercises

1. What would go wrong in Dijkstra's algorithm if we allowed edges with a negative cost? Give an example where it fails to find the shortest path.

<details>
  <summary>Answer</summary>

  With negative cost edges the greedy approach to building the shortest-path tree is not guaranteed to find the shortest paths.
  Suppose there is an edge from $A$ to $B$ with cost 2, and an edge from $A$ to $C$ with cost 3: Dijkstra's algorithm will say that the shortest path from $A$ to $B$ has cost 2, without even looking at node $C$.
  However, if there is an edge from $C$ to $B$ with cost $-2$, then the better route would be to go $A\rightarrow C\rightarrow B$, with total cost 1.
 
  Even worse, if there were a cycle in the graph with a total negative cost (such as $A$ to $B$ with cost 1, but $B$ to $A$ with cost $-2$), then any path touching that cycle could be extended to follow the cycle any number of times, leading to an arbitrarily low (large negative) cost! For such a graph, the notion of "shortest path" is undefined.
</details>