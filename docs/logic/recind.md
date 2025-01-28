---
id: recind
title: Recursion and Induction
---

(Some content adapted from Critchlow &amp; Eck)

A common programming technique that you should have encountered before is [**recursion**](recind.md).
One way to think of recursion is as an application of the basic approach of breaking a programming task into smaller tasks, often called **stepwise refinement** or **top-down design**.
If each smaller task is split off into its own function (called **functional decomposition** by the same people who use fancy terms like stepwise refinement), then recursion occurs naturally when one of the smaller tasks turns out to be a simpler version of the original task.

For example, consider the problem of finding the smallest element in a list of $N$ numbers.
If the list only has a single element, then the answer is obvious: that one element must be the smallest.
However, if the list is longer, then we can break the job into several steps.
One possible candidate for the smallest element is the first number in the list; call it $x$.
After separating $x$ from the rest of the list, we still have a list of $N-1$ numbers; another possible candidate is whatever the smallest element is among those remaining numbers.
By naming and defining a function for the job "find the smallest element in a list", we can make use of it to find the smallest of the $N-1$ numbers; call it $y$.
Finally, we may compare our two candidates, $x$ and $y$, and return the smaller as the smallest of the entire list.

Here is a pseudocode rendition of the above solution:
```
to findSmallest(myList):
  if size(myList) == 1 then:
    return first(myList)
  else:
    let x = first(myList)
    let restOfMyList = allButFirst(myList)
    let y = findSmallest(restOfMyList)
    if x <= y then:
      return x
    else:
      return y
```
This assumes that we already have functions `size`, `first`, and `allButFirst` to handle those simple tasks on lists, presumably as part of our list data structure.

The manner in which we decompose a problem into smaller problems may depend on the tools we have.
For example, if instead of the function `allButFirst` we had a function `split` that would divide a list into two smaller lists (perhaps, but not necessarily, of roughly equal size), then we might prefer the following solution (called `findSmallest2` to distinguish it from the original):
```
to findSmallest2(myList):
  if size(myList) == 1 then:
    return first(myList)
  else:
    let front, back = split(myList)
    let x = findSmallest2(front)
    let y = findSmallest2(back)
    if x <= y then:
      return x
    else:
      return y
```

In general, compound data structures will come with one or more ways to decompose them into smaller structures, and those can guide us when looking for ways to decompose problems that work with such data.
When the data is small enough to be handled directly without further composition, we will refer to it as a **base case**.
In the example above, the base case occurs when the list has only one element; for other problems, an appropriate base case might be an empty list, or a list with exactly two elements (for example, it doesn't make sense to call the `split` function with fewer than two elements, so that would be a reasonable choice when defining `split` itself).

The general strategy for recursion then is to first check whether the problem is simple enough to be solved directly, in a base case.
If not, then decompose the problem into smaller subproblems; some of them might be handled by existing functions, while others might require defining new functions.
If any subproblem looks like a smaller version of the original problem, then handle it by making a recursive call to the function itself.
As long as the subproblems are truly smaller, this process must eventually terminate with calls to solve one or more base cases.

## Recursion Examples

### Factorial

A standard example of a recursive subroutine is a function that
computes $n!$ for a non-negative integer $n$. $n!$, which is read "$n$ factorial,"
is defined as follows:

$$
\begin{array}{l}
0! = 1\\
n! = \prod_{i=1}^n\,i\text{\qquad for $n>0$}
\end{array}
$$

For example, $5!=1\cdot2\cdot3\cdot4\cdot5=120$. Note that for $n>1$,

$$
\begin{array}{l}
n! = \prod_{i=1}^n\,i = \left(\prod_{i=1}^{n-1}\,i\right)\cdot n = (n-1)!\cdot n
\end{array}
$$

It is also true that $n!=(n-1)!\cdot n$ when $n=1$. This observation
makes it possible to write a recursive function to compute $n!$.

Here is how we might write it in Java:
```java
/**
 * Compute n!.
 * Precondition: n >= 0
 */
int factorial(int n) {
   int answer;
   if (n == 0) {
      answer = 1;
   } else {
      answer = factorial(n - 1) * n;
   } 
   return answer;
}
```

Here is an equivalent program in Scala:
```scala mdoc
def factorial(n: Int): BigInt = {
  if n == 0 then 1
  else factorial(n - 1) * n
}

factorial(5)
```

In order to compute _factorial_($n$) for $n>0$, this function
first computes _factorial_($n-1$) by calling itself recursively.
The answer from that computation is then multiplied by $n$ to give the
value of $n!$. The recursion has a base case, namely the case when
$n=0$. For the base case, the answer is computed directly rather
than by using recursion. The base case prevents the recursion from
continuing forever, in an infinite chain of recursive calls.

Now, as it happens, recursion is not the best way to compute $n!$.
It can be computed more efficiently using a loop. Furthermore,
except for small values of $n$, the value of $n!$ is outside the
range of numbers that can be represented as 32-bit _ints_ (this is why
the Scala version above declares that it returns a `BigInt`).

### Towers of Hanoi

Another standard example of recursion is the Towers of Hanoi problem.
Let $n$ be a positive integer. Imagine a set of $n$ disks of decreasing
size, piled up in order of size, with the largest disk on the bottom
and the smallest disk on top. The problem is to move this tower of
disks to a second pile, following certain rules: Only one disk
can be moved at a time, and a disk can only be placed on top of
another disk if the disk on top is smaller. While the disks are
being moved from the first pile to the second pile, disks can be
kept in a third, spare pile.  All the disks must at all times be
in one of the three piles, except for a disk being moved. For example,
if there are two disks,
the problem can be solved by the following sequence of moves:

1. Move disk 1 from pile 1 to pile 3
2. Move disk 2 from pile 1 to pile 2
3. Move disk 1 from pile 3 to pile 2

A simple recursive subroutine can be used to write out the list
of moves to solve the problem for any value of $n$. The recursion is
based on the observation that for $n>1$, the problem can be
solved as follows: Move $n-1$ disks from pile number 1 to pile number 3
(using pile number 2 as a spare). Then move the largest disk, disk number $n$,
from pile number 1 to pile number 2. Finally, move the $n-1$ disks from
pile number 3 to pile number 2, putting them on top of the $n^{th}$ disk
(using pile number 1 as a spare). In both cases, the problem of
moving $n-1$ disks is a smaller version of the original problem and
so can be done by recursion. Here is the subroutine, written in Java:
```java
/**
 * List the moves for moving n disks from pile number A
 * to pile number B, using pile number C as a spare.
 * Precondition: n > 0
 */
void Hanoi(int n, int A, int B, int C) {
   if (n == 1) {
      System.out.println("Move disk 1 from pile " + A + " to pile " + B);
   } else {
      Hanoi(n - 1, A, C, B);
      System.out.println("Move disk " + n + " from pile " + A + " to pile " + B);
      Hanoi(n - 1, C, B, A);
   }
}
```

Again, here is equivalent code in Scala:
```scala mdoc
def hanoi(n: Int, a: Int, b: Int, c: Int): Unit = {
  if n == 1 then
    println(s"Move disk $n from pile $a to pile $b")
  else
    hanoi(n - 1, a, c, b)
    println(s"Move disk $n from pile $a to pile $b")
    hanoi(n - 1, c, b, a)
}

hanoi(2, 1, 2, 3)
```

### Binary Trees

Recursion is often used with linked data structures, which are
data structures that are constructed by linking several objects
of the same type together with pointers. For an example, we'll look at
the data structure known as a **binary tree**.
A binary tree consists of nodes linked together in a tree-like
structure. The nodes can contain any type of data, but we will
consider binary trees in which each node contains an integer.
A binary tree can be empty, or it can consist of a node (called
the **root** of the tree) and two smaller binary trees (called the
**left subtree** and the **right subtree** of the tree).
You can already see the recursive structure: A tree can contain
smaller trees. In Java, the nodes of a tree can be represented
by objects belonging to the class
```java
class BinaryTreeNode {
   int item;   // An integer value stored in the node.
   BinaryTreeNode left;   // Pointer to left subtree.
   BinaryTreeNode right;  // Pointer to right subtree.
}
```
An empty tree is represented by a pointer that has the special
value **null**. If _root_ is
a pointer to the root node of a tree, then _root.left_
is a pointer to the left subtree and _root.right_ is a
pointer to the right subtree. Of course, both _root.left_
and _root.right_ can be _null_ if the corresponding
subtree is empty. Similarly, _root.item_ is a name
for the integer in the root node.

Here is the corresponding definition of a binary tree in Scala:
```scala mdoc
enum Tree:
  case Empty
  case Node(left: Tree, item: Int, right: Tree)
import Tree.*
```
Instead of _null_, we use an explicit constructor value for empty
trees, `Empty`. To construct a tree node from subtrees `left` and
`right`, with integer value `item`, we use the constructor
`Node(left, item, right)`. We will see below how to extract these
fields from the node.

Let's say that we want a function that will find the
sum of all the integers in all the nodes of a binary tree.
We can do this with a simple recursive function. The base
case of the recursion is an empty tree. Since there are no
integers in an empty tree, the sum of the integers in an
empty tree is zero. For a non-empty tree, we can use recursion
to find the sums of the integers in the left and right subtrees,
and then add those sums to the integer in the root node of the
tree. In Java, this can be expressed as follows:
```java
/**
 * Find the sum of all the integers in the tree that has
 * the given root.
 */
int TreeSum(BinaryTreeNode root) {
   int answer;
   if (root == null) {  // The tree is empty.
      answer = 0;
   } else {
      answer = TreeSum(root.left);
      answer = answer + TreeSum(root.right);
      answer = answer + root.item;
   }
   return answer;
}
```

Here is the corresponding function in Scala. We are using the
**pattern matching** match expression to decide whether we have an
empty tree or not, and to extract the _left_, _item_, and _right_
fields if the tree is not empty:
```scala mdoc
def treeSum(root: Tree): Int = {
  root match
    case Empty => 0
    case Node(left, item, right) =>
      treeSum(left) + item + treeSum(right)
}

val example = Node(Node(Empty, 1, Empty), 2, Node(Empty, 3, Empty))
treeSum(example)
```

## Induction

Now that you are comfortable with recursion as a technique to write programs, you are ready for a very closely related technique for _reasoning_ about programs (or more generally about anything that has a recursive description&mdash;that is, where compound things can be decomposed into similar smaller things).
This is the technique of **proof by induction**.

For example, suppose that we want to argue that our `findSmallest` function truly does find the smallest value in any non-empty list.
There are too many possible lists to show this by exhaustively checking all possible inputs.[^1]
Instead, we can use something like stepwise refinement in making our argument:

> **Claim:** `findSmallest(myList)` returns the smallest element in `myList` for all possible non-empty lists.

[^1]: Here is where a pedant might say that there are only a finite number of possible lists, because any real-world computer only has a finite amount of memory. Since the number is finite, then technically we _could_ directly check them all. However, suppose our memory size limits us to lists of up to one million 32-bit integers; the total number of possible lists would be $(2^{32})^{1000000}$, which is a number with almost ten million decimal digits! That's _beyond_ astronomical, so we will treat it as if it were infinite and use induction instead of brute force.

> **Base Case:** If `myList` only has one element, then that must be the smallest. `findSmallest(myList)` will return that element, so it is correct in this case.
>
> **Inductive Case:** If `myList` has more than one element, then suppose that `findSmallest` works correctly on lists shorter than `myList`; we will refer to this as the **induction hypothesis**.
> Now, the definition of `findSmallest(myList)` proceeds by letting $x$ be the first element and $y$ be the result of `findSmallest(restOfMyList)`, where `restOfMyList` is the list with $x$ removed from the front.
> By the induction hypothesis, $y$ will be the smallest value in `restOfMyList`, because that list is smaller than `myList`.
> Since the smallest value in the entire list must either be the first element ($x$) or the smallest value in the rest of the list ($y$), the program is correct because we compare $x$ and $y$ and return the smaller of the two.

Since we have covered all of the cases (a non-empty list must either have one element or more than one element), we are done. The essential point here is that we are using the induction hypothesis as a shortcut for an unknown amount of additional work: just as a recursive call to solve a smaller problem will eventually reach a base case, the claim in our induction hypothesis can be traced back to facts about ever smaller cases until we reach something proved in a base case.

### Ordinary Mathematical Induction

In a math class you may have encountered the concept of (ordinary) **mathematical induction**.
This is the special case where we are proving that some claim is true of all natural numbers, or all positive integers.
In this situation, the base case will generally show that the claim is true for zero (or one, if that is our starting point). The induction hypothesis will make the specific assumption that the claim is true for some particular $n$, and then the induction case will use that assumption to show that it must also be true for $n+1$.

If we abbreviate our claim about a number $n$ by writing $P(n)$, then the structure of a proof by mathematical induction is to show $P(0)$, and, for arbitrary $n$, if $P(n)$ then also $P(n+1)$.
This gives us a chain of facts $P(0)$, $P(1)$ (because $P(0)\rightarrow P(1)$), $P(2)$ (because $P(1)\rightarrow P(2)$), $P(3)$, etc.
This chain will eventually pass through every natural number, so we could expand out the proof for any particular $n$ into an appropriate series of implications that trace back to the base case. We will see several examples of this below.

### Strong Mathematical Induction

If you have learned about ordinary mathematical induction on the natural numbers before, then you might also have learned about **strong mathematical induction**.
For this technique, we use a stronger form of induction hypothesis: instead of just assuming $P(n)$ to prove $P(n+1)$, we will assume that all of $P(0)$, $P(1)$, &hellip;, $P(n)$ are true, so that any of them may be used to establish $P(n+1)$.
It is more typical to express this slightly differently: in our inductive case, we will show that $P(n)$ is true given the assumption that $P(k)$ is true for all $k<n$.
By using this stronger set of assumptions, we can prove claims where the chain of facts needed doesn't go directly from $P(n)$ to $P(n+1)$; this is a better fit for the natural way to break up some problems into subproblems. Again, see the examples below.

### Structural Induction

In computer science, both of the above principles are special cases of the technique of **structural induction**.
This is just our original statement above, where we look at the structure of the problem to divide it up into base cases (solvable/provable directly) and inductive cases (which may be decomposed into smaller problems which we assume we already know how to solve/prove).

Structural induction is particularly useful when proving claims about data types other than the natural numbers!
As long as we have a way to decompose compound data into smaller but similar structures, which themselves may be decomposed further until we reach one or more base cases, we may prove claims about such data using essentially the same technique as we use to write our recursive programs.
In a very real sense, induction is just recursion applied to proofs instead of programs![^2]

[^2]: There is a more general view of programming behind this, which looks at writing a program as building what is sometimes called a **constructive** proof: a proof that not only establishes some claim but actually tells you how to compute the result asserted by the claim, but you probably don't want to get me started on this&hellip;.

## Induction Examples

### Ordinary Mathematical Induction

> **Theorem:**
The number $2^{2n}-1$ is divisible by 3 for all natural numbers $n$.

> **Proof:**
Here, $P(n)$ is the statement that $2^{2n}-1$ is divisible by 3.
>
> **Base case:** When $n=0$, $2^{2n}-1 = 2^0-1=1-1=0$ and $0$ is divisible by 3 
(since $0=3\cdot 0$.) Therefore the statement holds when $n=0$.
>
> **Inductive case:** We want to show that if the statement is true for $n=k$ 
(where $k$ is an arbitrary natural number),
then it is true for $n=k+1$ also. That is, we must prove the implication
$P(k) \rightarrow P(k+1)$. So we assume $P(k)$, that is, we assume that $2^{2k}-1$ is
divisible by 3. This means that $2^{2k} -1 = 3m$ for some integer $m$.
We want to prove $P(k+1)$, that is, that $2^{2(k+1)}-1$ is also divisible by 3:
>
> $$
> \begin{array}{rll}
>    2^{2(k+1)}-1 &= 2^{2k+2}-1 &\\
>                        &= 2^{2k}\cdot2^2 - 1 &\text{properties of exponents}\\
>                        &= 4\cdot 2^{2k} -1 \\
>                        &= 4\cdot 2^{2k} -4 + 4 -1 \\
>                        &= 4(2^{2k} -1) + 3 &\text{algebra} \\
>                        &= 4(3m) + 3 & \text{the inductive hypothesis}\\
>                        &= 3(4m+1) & \text{algebra}
> \end{array}
> $$
>
> and from the last line we see that $2^{2k+1}$ is in fact divisible by 3.
> (The third step&mdash;subtracting and adding 4&mdash;was done to enable us to use our inductive hypothesis.)
>
> Altogether, we have proved that $P(0)$ holds and that, for all $k$, $P(k) \rightarrow P(k+1)$ is true.
> Therefore, by the principle of induction, $P(n)$ is true for all $n$ in $\N$, i.e. $2^{2n}-1$ is divisible by 3 for all $n$ in $\N$.

#### Summations

The sum of an arbitrary number of terms is written using the
symbol $\sum$. (This symbol is the Greek letter sigma, which is 
equivalent to the Latin letter S and stands for "sum.") Thus, we
have

$$
\begin{array}{l}
   \displaystyle\sum_{i=1}^5 i^2 = 1^2+2^2+3^2+4^2+5^2\\
   \displaystyle\sum_{k=3}^7 a_k = a_3+a_4+a_5+a_6+a_7\\
   \displaystyle\sum_{n=0}^N \frac{1}{n+1} = \frac{1}{0+1}+\frac{1}{1+1}+\frac{1}{2+1}+\cdots+\frac{1}{N+1}\\
\end{array}
$$

This notation for a sum, using the $\sum$ operator, is called
**summation notation**. A similar notation for products uses the
symbol $\prod$. (This is the Greek letter pi, which is equivalent
to the Latin letter P and stands for "product.") For example,
$$
\begin{array}{l}
   \displaystyle\prod_{k=2}^5 (3k+2) = (3\cdot 2+2)(3\cdot 3+2)(3\cdot 4+2)(3\cdot 5+2)\\
   \displaystyle\prod_{i=1}^n \frac{1}{i} = \frac{1}{1}\cdot \frac{1}{2}\cdots \frac{1}{n}
\end{array}
$$

Induction can be used to prove many formulas that use these notations.
Here are two examples:

> **Theorem:**
$\displaystyle \sum_{i=1}^n\, i=\frac{n(n+1)}{2}$ for any integer $n$ greater than zero.

> **Proof:**
> Let $P(n)$ be the statement $\displaystyle \sum_{i=1}^n\,i=\frac{n(n+1)}{2}$.
We use induction to show that $P(n)$ is true for all $n\geq 1$.
>
> **Base case:** Consider the case $n=1$. $P(1)$ is the statement
> that $\displaystyle \sum_{i=1}^1\,i=\frac{1(1+1)}{2}$.
> Since $\displaystyle \sum_{i=1}^1\,i=1$ and $\displaystyle\frac{1(1+1)}{2}=1$,
> $P(1)$ is true.
>
> **Inductive case:** Let $k>1$ be arbitrary, and assume that $P(k)$ is true.
> We want to show that $P(k+1)$ is true. $P(k+1)$ is the statement
> $\displaystyle \sum_{i=1}^{k+1}\,i=\frac{(k+1)(k+2)}{2}$. But
>
> $$
> \begin{array}{rll}
>    \sum_{i=1}^{k+1}\,i &= \left(\sum_{i=1}^k\,i\right)+(k+1) &\\
>                        &= \frac{k(k+1)}{2}+(k+1) &\text{(inductive hypothesis)}\\
>                        &= \frac{k(k+1)}{2}+\frac{2(k+1)}{2}\\
>                        &= \frac{k(k+1)+2(k+1)}{2}\\
>                        &= \frac{(k+2)(k+1)}{2}\\
>                        &= \frac{(k+1)(k+2)}{2}
> \end{array}
> $$
>
> which is what we wanted to show. This computation completes the induction.

---

> **Theorem:**
$\displaystyle \sum_{i=1}^n\,i2^{i-1}=(n-1)\cdot2^n+1$ for any natural number $n>0$.

> **Proof:**
> Let $P(n)$ be the statement $\displaystyle \sum_{i=1}^n\,i2^{i-1}=(n-1)\cdot2^n+1$.
> We use induction to show that $P(n)$ is true for all $n>0$
>
> **Base case:** Consider the case $n=1$. $P(1)$ is the statement
> that $\displaystyle \sum_{i=1}^1\,i2^{i-1}=(1-1)\cdot2^1+1$.
> Since each side of this equation is equal to one, this is true.
>
> **Inductive case:** Let $k>1$ be arbitrary, and assume that $P(k)$ is
> true. We want to show that $P(k+1)$ is true. $P(k+1)$ is the
> statement $\displaystyle \sum_{i=1}^{k+1}\,i2^{i-1}=((k+1)-1)\cdot2^{k+1}+1$.
> But, we can compute that
>
> $$
> \begin{array}{rll}
>    \sum_{i=1}^{k+1}\,i2^{i-1} &= \left(\sum_{i=1}^k\,i2^{i-1}\right)+(k+1)2^{(k+1)-1}\\
>                               &= \left((k-1)\cdot2^k+1\right)+(k+1)2^k &\text{(inductive hypothesis)}\\
>                               &= \big((k-1)+(k+1)\big)2^k+1\\
>                               &= (k\cdot2)\cdot2^k+1\\
>                               &= k2^{k+1}+1
> \end{array}
> $$
>
> which is what we wanted to show. This completes the induction.

For example, these theorems show that $\displaystyle\sum_{i=1}^{100}i=1+2+3+4+\cdots+100=\frac{100(100+1)}{2}= 5050$
and that $1\cdot2^0+2\cdot2^1+3\cdot2^2+4\cdot2^3+5\cdot2^4=(5-1)2^5+1=129$,
as well as infinitely many other such sums.

#### Factorial

> **Theorem:**
The _factorial_ function defined above correctly computes $n!$ for any
natural number $n$. (If we are using the Java version, we need to add
the assumption that $n!$ fits within a 32-bit integer.)

> **Proof:** 
> Let $P(n)$ be the statement "_factorial_($n$) correctly computes $n!$."
> We use induction to prove that $P(n)$ is true for all natural numbers $n$.
>
> **Base case:** In the case $n=0$, the _if_ statement in the function
> assigns the value 1 to the answer. Since 1 is the correct value of
> $0!$, _factorial_(0) correctly computes $0!$.
>
> **Inductive case:** Let $k$ be an arbitrary natural number, and assume that
> $P(k)$ is true. From this assumption, we must show that $P(k+1)$ is true.
> The assumption is that _factorial_($k$) correctly computes $k!$,
> and we want to show that _factorial_($k+1$) correctly computes
> $(k+1)!$.
>
> When the function computes _factorial_($k+1$), the value of
> the parameter $n$ is $k+1$.
> Since $k+1>0$, the _if_ statement in the function computes the
> value of _factorial_($k+1$) by applying the computation
> _factorial_$(k)*(k+1).$ We know, by the induction hypothesis,
> that the value computed by _factorial_($k$) is $k!$.
> It follows that the value computed by _factorial_($k+1$)
> is $k!\cdot(k+1)$. As we observed above, for any $k+1>0$,
> $k!\cdot(k+1)=(k+1)!$. We see that _factorial_($k+1$)
> correctly computes $(k+1)!$. This completes the induction.

#### Towers of Hanoi

> **Theorem:** 
> The sequence of moves printed by the _Hanoi_ subroutine as given above
> correctly solves the Towers of Hanoi problem for any integer $n\ge1$.

> **Proof:** 
> We prove by induction that whenever $n$ is a positive integer and
> $A$, $B$, and $C$ are the numbers 1, 2, and 3 in some order, 
> the subroutine call _Hanoi_($n,A,B,C$)
> prints a sequence of moves that will move $n$ disks from pile $A$ to
> pile $B$, following all the rules of the Towers of Hanoi problem.
>
> **Base case:** In the base case, $n=1$,
> the subroutine call _Hanoi_($1,A,B,C$) prints out the single
> step "Move disk 1 from pile A to pile B," and this move does solve
> the problem for 1 disk.
>
> **Inductive case:** Let $k$ be an arbitrary positive integer, and suppose that
> _Hanoi_($k,A,B,C$) correctly solves the problem 
> of moving the $k$ disks from pile $A$ to pile $B$ using pile $C$ as the spare,
> whenever $A$, $B$, and $C$ are the numbers 1, 
> 2, and 3 in some order. We need to show that 
> _Hanoi_($k+1,A,B,C$) correctly solves the problem for
> $k+1$ disks. Since $k+1>1$, _Hanoi_($k+1,A,B,C$) begins by
> calling _Hanoi_($k,A,C,B$). By the induction hypothesis,
> this correctly moves $k$ disks from pile $A$ to pile $C$. Disk number
> $k+1$ is not moved during this process.
> At that point, pile $C$ contains the $k$ smallest disks and
> pile $A$ still contains the $(k+1)^{st}$ disk, which has not
> yet been moved. So the next move printed by the subroutine,
> "Move disk $(k+1)$ from pile A to pile B," is legal because pile $B$ is empty.
> Finally, the subroutine calls _Hanoi_($k,C,B,A$),
> which, by the induction hypothesis, correctly moves the $k$ smallest disks from 
> pile $C$ to pile $B$, putting
> them on top of the $(k+1)^{\text{st}}$ disk, which does not move during this process.
> At that point, all $(k+1)$
> disks are on pile $B$, so the problem for
> $k+1$ disks has been correctly solved.

### Strong Mathematical Induction

> **Theorem:**
> Every natural number greater than one can be written as a product of
> prime numbers.

> **Proof:**
> Let $P(n)$ be the statement "if $n>1$, then $n$ can be written as a 
> product of prime numbers." We will prove that $P(n)$ is true for all
> $n$ by applying the strong principle of induction.
>
> Note that $P(0)$ and $P(1)$ are both automatically true, since $n=0$ and $n=1$
> do not satisfy the condition that $n>1$, and $P(2)$ is true
> since 2 is the product of the single prime number 2. Suppose that $k$ is an arbitrary
> natural number with $k>1$, and suppose that $P(0)$, $P(1)$, &hellip;, $P(k)$
> are already known to be true; we want to show that $P(k+1)$ is true. 
> In the case where $k+1$ is a prime number,
> then $k+1$ is a product of one prime number, so $P(k+1)$ is true.
>
> Consider the case where $k+1$ is not prime. Then, according to the
> definition of prime number, it is possible to write $k+1=ab$ where
> $a$ and $b$ are numbers in the range from 2 to $k$ inclusive. Since
> $P(0)$ through $P(k)$ are known to be true, $a$ and $b$ can
> each be written as a product of prime numbers. Since $k+1=ab$,
> $k+1$ can also be written as a product of prime numbers. We have
> shown that $P(k+1)$ follows from $P(0)\land P(1)\land\cdots\land P(k)$,
> and this completes the induction.

#### Binary Trees

> **Theorem:** 
> The function _TreeSum_, defined above, correctly
> computes the sum of all the integers in a binary tree.

> **Proof:** 
> We use induction on the number of nodes in the tree.
> Let $P(n)$ be the statement "_TreeSum_
> correctly computes the sum of the nodes in any binary tree
> that contains exactly $n$ nodes." We show that $P(n)$ is true
> for every natural number $n$.
>
> **Base case:** Consider the case $n=0$. A tree with zero nodes is empty,
> and an empty tree is represented by a _null_ pointer.
> In this case, the _if_ statement in the definition of
> _TreeSum_ assigns the value 0 to the answer, and this is
> the correct sum for an empty tree. So, $P(0)$ is true.
>
> **Induction case:** Let $k$ be an arbitrary natural number, with $k>0$.
> Suppose we already
> know $P(x)$ for each natural number $x$ with $0\le x < k$. That is,
> _TreeSum_ correctly computes the sum of all the integers in
> any tree that has fewer than $k$ nodes. We must show that it follows
> that $P(k)$ is true, that is, that _TreeSum_ works for 
> a tree with $k$ nodes. Suppose that _root_ is a pointer
> to the root node of a tree that has a total of $k$ nodes.
> Since the root node counts as a node, that leaves a total of
> $k-1$ nodes for the left and right subtrees, so each subtree
> must contain fewer than $k$ nodes. By the induction hypothesis,
> we know that _TreeSum_(_root.left_) correctly
> computes the sum of all the integers in the left subtree, and
> _TreeSum_(_root.right_) correctly computes the
> sum of all the integers in the right subtree. The sum of all
> the integers in the tree is _root.item_ plus the
> sums of the integers in the subtrees, and this is the value
> computed by _TreeSum_. So, _TreeSum_ does
> work for a tree with $k$ nodes. This completes the induction.

Note how closely the structure of the inductive proof follows the 
structure of the recursive function. In particular, the
strong principle of mathematical induction is very natural here, since
the size of subtree could be anything up to one less than
the size of the complete tree. It would be very difficult
to use the ordinary principle of mathematical induction in a proof about
binary trees.

### Structural Induction

Instead of using strong mathematical induction, it is often more
straightforward to use structural induction.
Here is the proof about the _TreeSum_ function again, expressed as a
structural induction over trees:

> **Theorem:** 
> The function _TreeSum_, defined above, correctly
> computes the sum of all the integers in a binary tree.

> **Proof:** 
> We use structural induction on the construction of a tree.
> Let $P(t)$ be the statement "_TreeSum_
> correctly computes the sum of the nodes in the binary tree
> $t$." We show that $P(t)$ is true
> for every binary tree $t$.
>
> **Base case:** If $t$ is an empty tree, then the definition of
> _TreeSum_ returns the value 0, which is the correct sum for an
> empty tree. So, $P(t)$ is true.
>
> **Induction case:** Suppose we already know that $P(u)$ and $P(v)$ hold for some
> trees $u$ and $v$. That is, _TreeSum_ correctly computes the sum of all the
> integers in $u$ and $v$. We must show that it follows that $P(t)$ is true, where
> $t$ is the tree constructed from subtrees $u$ (left) and $v$ (right), plus an
> integer _item_. The value computed by _TreeSum_($t$) will be _TreeSum_($u$) +
> _item_ + _TreeSum_($v$). By the induction hypothesis, we know that
> _TreeSum_($u$) correctly computes the sum of all the integers in the left
> subtree, and _TreeSum_($v$) correctly computes the sum of all the integers in
> the right subtree. The sum of all the integers in the tree is _item_ plus the
> sums of the integers in the subtrees, so, _TreeSum_ also works for the tree $t$.

## Recursive Definitions

Recursion occurs in programming when a subroutine is defined&mdash;partially,
at least&mdash;in terms of itself. But recursion also occurs outside of
programming. A **recursive definition** is a definition that includes
a reference to the term that is being defined. A recursive definition
defines something at least partially in terms of itself. As in the
case of recursive subroutines, mathematical induction can often be used
to prove facts about things that are defined recursively.

As already noted, there is a recursive definition for $n!$, for $n$ in $\N$. We
can define $0!=1$ and $n!=n\cdot(n-1)!$ for $n>0$. Other sequences of
numbers can also be defined recursively. For example, the famous
**Fibonacci sequence** is the sequence of numbers $f_0$, $f_1$, $f_2$, &hellip;,
defined recursively by
$$
\begin{array}{l}
    f_0 = 0\\
    f_1 = 1\\
    f_n = f_{n-1}+f_{n-2} \qquad \text{for $n>1$}
\end{array}
$$

Using this definition, we compute that
$$
\begin{array}{l}
    f_2 = f_1 + f_0 = 0 + 1 = 1\\
    f_3 = f_2 + f_1 = 1 + 1 = 2\\
    f_4 = f_3 + f_2 = 2 + 1 = 3\\
    f_5 = f_4 + f_3 = 3 + 2 = 5\\
    f_6 = f_5 + f_4 = 5 + 3 = 8\\
    f_7 = f_6 + f_5 = 8 + 5 = 13
\end{array}
$$

and so on. Based on this definition, we can use induction to
prove facts about the Fibonacci sequence. We can prove,
for example, that $f_n$ grows exponentially with $n$, even without
finding an exact formula for $f_n$:

> **Theorem:** 
> The Fibonacci sequence, $f_0$, $f_1$, $f_2$, &hellip;,
> satisfies $f_n > \big(\frac{3}{2}\big)^{n-1}$, for $n\ge6$.

> **Proof:** 
> We prove this by induction on $n$. For $n=6$, we have that 
> $f_n=8$ while $1.5^{n-1}=1.5^5$, which is about $7.6$.
> So $f_n > 1.5^{n-1}$ for $n=6$.
> Similarly, for $n=7$, we have $f_n=13$ and
> $1.5^{n-1}=1.5^6$, which is about 11.4.
> So $f_n > 1.5^{n-1}$ for $n=7$.
>
> Now suppose that $k$ is an arbitrary integer with $k>7$.
> Suppose that we already know that $f_n>1.5^{n-1}$ for
> $n=k-1$ and for $n=k-2$. We want to show that the inequality
> then holds for $n=k$ as well. But
> $$
> \begin{array}{rll}
>    f_k &= f_{k-1}+f_{k-2}\\
>        &> 1.5^{(k-1)-1}+1.5^{(k-2)-1} & \text{(by the induction hypothesis)}\\
>        &= 1.5^{k-2}+1.5^{k-3}\\
>        &= (1.5)\cdot(1.5^{k-3}) + (1.5^{k-3})\\
>        &= (2.5)\cdot(1.5^{k-3})\\
>        &> (1.5^2)\cdot(1.5^{k-3}) & \text{(since $1.5^2=2.25$)}\\
>        &= 1.5^{k-1}
> \end{array}
> $$
> This string of equalities and inequalities shows that $f_k>1.5^{k-1}$.
> This completes the induction and proves the theorem.

## Exercises

1. Use induction to prove that $n^3 + 3n^2 + 2n$ is divisible by 3
for all natural numbers $n$.
<details>
  <summary>Answer</summary>

  The base case, when $n=0$, is the claim that $0^3 + 3\cdot0^2 + 2\cdot0$ is divisible by 3.
  Evaluating the expression gives 0, which is $3\cdot0$, so the claim is true.

  For the inductive case, suppose that $n^3 + 3n^2 + 2n$ is divisible by 3
  for some $n\ge 0$; that is, there is some $k$ such that $n^3 + 3n^2 + 2n = 3k$.
  Using that induction hypothesis, we need to show that
  $(n+1)^3 + 3(n+1)^2 + 2(n+1)$ is also divisible by 3. Expanding this
  expression gives $n^3 + 3n^2 + 3n + 1 + 3n^2 + 6n + 3 + 2n + 2$.
  With the induction hypothesis, this can be rewritten as
  $3k + 3n^2 + 3n + 1 + 6n + 3 + 2$, or $3k + 3n^2 + 9n + 6$. This may be factored as
  $3(k + n^2 + 3n +2)$, showing that it too is divisible by 3.

  Thus we have shown that it is true for $n=0$, and if it holds for any $n$ then it also
  holds for $n+1$; by mathematical induction, therefore, it holds for all natural numbers.
</details>

2. Use induction to prove that
$$
  \sum_{i=0}^{n}r^i=(1-r^{n+1})/(1-r)
$$
for any natural number $n$ and for any real number $r$ such that $r\not=1$.

3. Use induction to prove that for any natural number $n$,
$$
  \sum_{i=0}^{n}\frac{1}{2^i}=2-\frac{1}{2^{n}}
$$
In addition to proving this by induction, show that it follows
as a corollary of Exercise 2.

4. Use induction to prove that for any natural number $n$,
$$
  \sum_{i=0}^{n}2^i=2^{n+1}-1
$$
In addition to proving this by induction, show that it follows
as a corollary of Exercise 2.
<details>
  <summary>Answer</summary>

  Base case ($n=0$): $\sum_{i=0}^0 2^i=2^0=1=2^{0+1}-1$.

  Inductive case: suppose true for some $n\ge 0$. Then
  $\sum_{i=0}^{n+1}2^i=2^{n+1}+\sum_{i=0}^n 2^i=2^{n+1}+2^{n+1}-1$, by the
  induction hypothesis. Now, $2^{n+1}+2^{n+1}=2\cdot 2^{n+1}=2^{n+2}$, so
  our summation equals $2^{(n+1)+1}-1$, showing that the formula also holds for $n+1$.
  Therefore it holds for all natural numbers $n$.

  We may also use Exercise 2, taking $r=2$. The formula for the sum is then
  $$
    \sum_{i=0}^n 2^i=\frac{1-2^{n+1}}{1-2}=\frac{1-2^{n+1}}{-1}=2^{n+1}-1
  $$
</details>

5. Use induction to prove that for any positive integer $n$,
$$
  \sum_{i=1}^ni^2=\frac{n(n+1)(2n+1)}{6}
$$

6. Use induction to prove that for any positive integer $n$,
$$
  \sum_{i=1}^n(2i-1)=n^2
$$

7. Evaluate the following sums, using results proved in this
section and in the previous exercises:
   * $1+3+5+7+9+11+13+15+17+19$
   * $\displaystyle 1+\frac{1}{3}+\frac{1}{3^2}+\frac{1}{3^3}+\frac{1}{3^4}+\frac{1}{3^5}+\frac{1}{3^6}$
   * $50+51+52+53+\cdots+99+100$
   * $1+4+9+16+25+36+49+81+100$
   * $\displaystyle \frac{1}{2^2}+\frac{1}{2^3}+\cdots+\frac{1}{2^{99}}$

8. Write each of the sums in the preceding problem using
summation notation.

9. The _Hanoi_ subroutine given in this section does
not just find _some_ solution to the Towers of Hanoi problem. It solves the
problem using the minimum possible number of moves. Use induction
to prove this fact.
<details>
  <summary>Answer</summary>

  The base case is when $n=1$, where it moves a single disk in one move.

  In the inductive case, suppose that `Hanoi(n, A, B, C)` moves $n$ disks
  from A to B in the minimum possible number of moves for some $n>0$. Then
  to move $n+1$ disks from A to B, we must at least move the top $n$ disks
  to another pile before we can move the largest disk from A to B; the call
  `Hanoi(n, A, C, B)` will get this done in the minimum number of moves by
  the induction hypothesis. After moving the largest disk, we then need to
  move the other $n$ disks from C to B, which can be done in the minimum
  number of moves by the call `Hanoi(n, C, B, A)`. This description is
  precisely what happens when we call `Hanoi(n+1, A, B, C)`, so it
  moves $n+1$ disks in the shortest way possible.

  By induction, then, `Hanoi(n, A, B, C)` uses the minimum number of moves
  for every $n>0$.
</details>

10. Use induction to prove that the _Hanoi_ subroutine
uses $2^n-1$ moves to solve the Towers of Hanoi problem for $n$ disks.
(There is a story that goes along with the Towers of Hanoi problem.
It is said that on the day the world was created, a group of monks in Hanoi
were set the task of solving the problem for 64 disks. They can
move just one disk each day. On the day the problem is solved, 
the world will end. However, we shouldn't worry too much,
since $2^{64}-1$ days is a very long time&mdash;about 50 million billion years.)
<details>
  <summary>Answer</summary>
 
  For the base case, we need to check that `Hanoi(1, A, B, C)` takes $2^1-1=1$ move.

  For the inductive case, suppose that `Hanoi(n, A, B, C)` takes $2^n-1$ moves for
  some $n>0$. Then `Hanoi(n+1, A, B, C)` takes $(2^n-1)+1+(2^n-1)=2\cdot2^n-1=2^{n+1}-1$
  moves, which completes the induction.
</details>

11. Consider the following recursive function:
```java
/** Compute x raised to the power n.
 * Precondition: n >= 0.
 */
int power(int x, int n) {
   int answer;
   if (n == 0) {
      answer = 1;
   } else if (n % 2 == 0) {
      answer = power(x * x, n / 2);
   } else {
      answer = x * power(x, n - 1);
   }
   return answer;
}
```
Show that for any integer $x$ and any non-negative integer $n$,
the function _power_($x$,$n$) correctly computes the value
of $x^n$. (Assume that the _int_ data type can represent
arbitrarily large integers.) Note that the test
"`if (n % 2 == 0)`" tests whether $n$ is evenly divisible by 2.
That is, the test is true if $n$ is an even number. (This function is
actually a very efficient way to compute $x^n$.)
<details>
  <summary>Answer</summary>

  We will prove by strong induction on $n$ that `power(x, n)` correctly computes
  $x^n$, for every $n\ge 0$.

  **Base Case:** When $n=0$, we can check that `power(x, 0)` returns 1, which
  is $x^0$ for every $x$.[^3]

  **Inductive Case:** Suppose that the claim is true for every $k<n$, for some $n>0$.
  Then we need to show that it is also true for $n$. If $n$ is even, then `power(x, n)`
  is `power(x*x, n/2)`; since $\frac{n}{2}<n$, we know by the induction hypothesis that
  this computes $(x^2)^{\frac{n}{2}}=x^n$. If $n$ is odd, then `power(x, n)` is
  `x * power(x, n-1)`, which similarly we know to compute $x\cdot x^{n-1}=x^n$.
  Therefore, we have shown that `power(x, n)` correctly computes $x^n$ for all $n\ge 0$.
</details>

12. Write the _power_ function from the previous problem in Scala, and
check that it works on several examples. _Hint:_ The code will be almost
the same as the Java, except for the different function syntax and not
using the temporary variable _answer_ (see examples above).

```scala
def power(x: BigInt, n: Int): BigInt = {
  /* TODO */
}
```
<details>
  <summary>Answer</summary>
 
  ```scala
  def power(x: BigInt, n: Int): BigInt = {
    if n == 0 then
      1
    else if n % 2 == 0 then
      power(x * x, n / 2)
    else
      x * power(x, n - 1)
  }
  ```
</details>

13. A **leaf node** in a binary tree is a node in which 
both the left and the right subtrees are empty. Prove that
the following recursive function correctly counts the number
of leaves in a binary tree:
```java
/**
 * Counts the number of leaf nodes in the tree with the
 * specified root.
 */
int LeafCount( BinaryTreeNode root ) {
   int count;
   if (root == null) {
      count = 0;
   } else if (root.left == null && root.right == null) {
      count = 1;
   } else {
      count = LeafCount(root.left);
      count = count + LeafCount(root.right);
   }
   return count;
}
```
<details>
  <summary>Answer</summary>
 
  We will prove this by structural induction on the formation of a
  tree $t$. For the base cases, if $t$ is empty (`null`), then
  `LeafCount(t)` returns 0, while if $t$ is a single node (with both
  children empty), then `LeafCount(t)` returns 1; these are both correct.

  For the inductive case, we know that $t$ is a node with at least one
  non-empty child (or else we would be in one of the base cases). We will
  assume that `LeafCount(t.left)` and `LeafCount(t.right)` are both correct,
  and we just have to show that `LeafCount(t)` also correctly counts the
  number of leaves. But in this case the root node of $t$ cannot be a leaf,
  so the number of leaves equals the sum of the number of leaves in the
  children. This is exactly what `LeafCount(t)` computes, so we are done.
</details>

14. Complete this Scala version of the _LeafCount_ function
from the previous problem. Note that we may use patterns such
as `Node(Empty, _, Empty)` in the switch statement to match
nodes where the subtrees are both `Empty` (and the `_` indicates
that we don't care what the value of the _item_ field is).

```scala
def leafCount(t: Tree): Int = {
  t match
    case Empty => /* TODO */
    case Node(Empty, _, Empty) => /* TODO */
    case Node(left, _, right) => /* TODO */
  }
}
```
<details>
  <summary>Answer</summary>

  ```scala
  def leafCount(t: Tree): Int = {
    t match
      case Empty => 0
      case Node(Empty, _, Empty) => 1
      case Node(left, _, right) => leafCount(left) + leafCount(right)
    }
  }
  ```
</details>

15. A **binary search tree** satisfies the
following property: If _node_ is a pointer to any
node in the tree, then all the integers in the left subtree
of _node_ are less than _node.item_ and
all the integers in the right subtree of _node_ are
greater than or equal to _node.item_. Prove that the
following recursive subroutine prints all the integers in
a binary search tree in non-decreasing order:
```java
/**
 * Prints the integers in the tree with the given root node
 * in non-decreasing order.
 * Precondition: root is a pointer to the root node of a
 * binary search tree.
 */
void SortPrint(BinaryTreeNode root) {
   if (root == null) {
      // There is nothing to print.
   } else {
      SortPrint(root.left);
      System.out.println(root.item);
      SortPrint(root.right);
   }
}
```
<details>
  <summary>Answer</summary>
 
  Here is a sketch of a proof by structural induction. The base case,
  when the tree is empty, is easy. If we suppose that `SortPrint(root.left)`
  prints all of the integers in the left subtree (which are less than `root.item`)
  in order, and that `SortPrint(root.right)` prints all of the integers in the
  right subtree (which are greater than or equal to `root.item`) in order, then
  `SortPrint(root)` must print all of the numbers in order.
</details>

16. Complete this Scala version of the _SortPrint_ function from
the previous problem.
```scala
def sortPrint(root: Tree): Unit = {
  root match
    case Empty => () /* There is nothing to print */
    case Node(left, item, right) =>
      /* TODO */
  }
}
```
<details>
  <summary>Answer</summary>

  ```scala
  def sortPrint(root: Tree): Unit = {
    root match
      case Empty => () /* There is nothing to print */
      case Node(left, item, right) =>
        sortPrint(left)
        println(item)
        sortPrint(right)
  }
  ```
</details>

17. Prove that the Fibonacci sequence, $f_0$, $f_1$, $f_2$, &hellip;,
satisfies $f_n<2^n$ for all natural numbers $n$.
<details>
  <summary>Answer</summary>
 
  Because the recursive case of the Fibonacci depends on the two previous values,
  we will use two base cases: $f_0=0<2^0$ and $f_1=1<2^1$. For the inductive case,
  suppose that $f_{n-1}<2^{n-1}$ and $f_n<2^n$ for some $n\ge 1$; then
  $f_{n+1}=f_n+f_{n-1}$, which is less than $2^n+2^{n-1}$ by the induction hypothesis.
  That sum is in turn less than $2^{n+1}$, so we may conclude that the claim is true
  for all natural numbers $n$.
</details>

18. Suppose that $a_1$, $a_2$, $a_3$, &hellip;, is a sequence of
numbers which is defined recursively by $a_1=1$ and
$a_n=2a_{n-1}+2^{n-1}$ for $n>1$. Prove that
$a_n=n2^{n-1}$ for every positive integer $n$.
<details>
  <summary>Answer</summary>
 
  The base case is when $n=1$: $a_1=1=1\cdot 2^{1-1}$. For the induction case,
  suppose that $a_n=n2^{n-1}$ for some $n\ge 1$. Then $a_{n+1}=2a_n+2^n=2n2^{n-1}+2^n=n2^n+2^n=(n+1)2^{(n+1)-1}$,
  which shows that it also holds for $n+1$. Therefore it holds for all $n\ge 1$.
</details>

[^3]: Don't listen to the people who try to say that $0^0$
is undefined; they're thinking of a much broader statement about limiting forms
in real analysis, which doesn't concern us here.
