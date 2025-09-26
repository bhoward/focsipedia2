---
id: decrease
title: Decrease-and-Conquer Strategy
---

We have already seen several examples of the decrease-and-conquer strategy of algorithm design.
The general characteristic of such algorithms is that each non-trivial problem instance is broken down into a smaller, similar problem.
This is the structure of many of our simple examples of recursion, such as the factorial function (compute $n!$ in terms of $(n-1)!$), as well as basic list traversals (think of `map` and `reduce`, or selection and insertion sort).

The decrease-and-conquer strategy can be divided into several categories, depending on whether the problem size decreases by a small constant, by a factor, or by a mixture of the two. The rest of this section will look at some examples of each.

## Decrease by a Constant

As mentioned above, we have already seen many examples of functions that decrease the problem size by one each time.
Defining a function on an integer $n$ in terms of the function value on $n-1$, or a function on lists in terms of the function applied to the tail of the list, are common approaches to recursion.
This corresponds to the structure of ordinary mathematical induction, where the property holding for $n$ depends on the property holding for $n-1$.

In all of these examples, as long as we have covered one or more base cases (say when $n=0$ or 1, or a list is empty or a singleton), we know that if the problem size keeps decreasing we will eventually find a case small enough to be solved directly.

The running time for these algorithms will satisfy a recurrence of the form $T(N) = T(N-1) + f(N)$, for some function $f$.
It is often the case that the work per step, $f(N)$, is just some constant: $f(N) = O(1)$; in this case, the solution to the recurrence will just be $T(N) = O(N)$.
That is, these algorithms will often take time linear in the size of the problem.

However, if the work at each step depends on $N$, the running time can be significantly more than linear.
For example, consider the problem of enumerating subsets of a set of size $N$.
Intuitively, since there are $2^N$ subsets, this must take an exponential amount of time (at least)!
Here is a Scala function that solves this problem, where a set is represented by a list:
```scala mdoc
def subsets[T](set: List[T]): List[List[T]] = {
  set match
    case Nil => List(Nil)
    case head :: tail => {
      val rest = subsets(tail)
      rest ::: rest.map(s => head :: s)
    }
}

subsets(List(1, 2, 3))
```
The recursive case computes all of the subsets of the tail of the list, and then combines those with all of the ways to make a subset that also includes the head element.

Since the `map` and `:::` (list append) operations are each linear in the size of the lists involved, the work we are doing at each step here will be proportional to the size of the resulting list.
However, that size is doubling with each additional element, so our function $f(N)$ in the recurrence is going to be on the order of $2^N$.
Solving the recurrence $T(N) = T(N-1) + 2^N$ gives $T(N) = 2^N + 2^{N-1} + \ldots + 2^2 + 2^1 + T(0)$, which in big-O terms will be $T(N) = O(2^N)$, as expected.

As another example of decreasing by a constant, we could implement division by repeated subtraction as follows:
```scala mdoc
// Precondition: b > 0, a >= 0
def divide(a: Int, b: Int): Int = {
  if a < b
  then 0
  else 1 + divide(a - b, b)
}

divide(5, 3)
divide(6, 3)
```
For this function, our base case is whenever `a` is less than `b`, in which case integer division rounds to zero.
In the recursive case, we decrease the first argument by `b`, find out how many times `b` goes into `a - b`, and then add one.
The recurrence here will be of the form $T(N) = T(N - b) + 1$; even though we are reducing by `b` instead of one on each call, the running time will still be linear in the first argument.

## Decrease by a Constant Factor

Again, we have seen many examples where the problem size is divided by two each time, such as binary search, which has the characteristic recurrence $T(N) = T(N/2) + 1$, with solution $T(N)=O(\log N)$.
We distinguish this from algorithms such as heapsort, which divides the problem into _two_ smaller problems, each of half the size; this strategy will be covered in the section on [Divide-and-Conquer](./divide.md).

For an example that divides the problem size by three, consider the "False Coin Problem".
You are given $N$ coins, and you know that one of them is "false"--it is lighter (has less metal) than the others.
Using only a balance scale, can you find the false coin?

One solution is to divide the coins into three equal groups (the third group might have one more or fewer coins than the others, but that won't matter).
Put the first two groups on each side of the balance scale.
If either of these groups is lighter, then the false coin is in that group.
Otherwise, the false coin must be in the third group.
In any case, you have reduced the problem to finding a false coin in a group of size $N/3$ (or at most $N/3 + 1$).
What are the appropriate base cases, and how do we find the false coin in them?

## The Mixed Case

A classic example of decreasing sometimes by a factor and sometimes by just a small constant is the QuickSelect algorithm.
The problem is to find the $k^{th}$ largest element out of a set of $N$ items, where $k$ is some number between $1$ and $N$.
When $k=1$, this is just finding the largest element, which we know can be done with a linear traversal of the items (just remember the largest seen so far and return that after looking at all of the items).
When $k=N$, this is just finding the smallest element, which is also easy.
However, when $k$ is in the middle, say $k=N/2$ (finding the median), it is not so obvious how to proceed other than by sorting the entire list; we know that this will take $O(N\log N)$ time in general.
Can we do better?

One good answer is QuickSelect, a close relative of the QuickSort algorithm.
The idea is that we can choose an arbitrary item to serve as the **pivot**, and then partition the remaining items based on whether they are smaller or larger than the pivot (equal items can go on either side); this can be done in $O(N)$ time, just as in QuickSort.
Suppose that after partitioning we find that $m$ items are in the right partition (greater than the pivot).
If $k\leq m$, then we know that our desired item will be the $k^{th}$ largest in the right partition.
If $k=m+1$, then the pivot item is our answer; otherwise, we will want the $k - (m + 1)^{th}$ largest element in the _left_ partition.
In the first and third cases, we recurse on a smaller problem.
However, while the average case will be that each partition is of size roughly $N/2$, we also have to deal with the worst case that we chose the pivot poorly, and almost all of the items landed in the same partition: our recursive call might be on a problem of size $N-1$!

In the average case, our running time recurrence will be $T(N) = T(N/2) + O(N)$, which leads to the solution $T(N) = O(N)$.
However, taking the worst case into account (if each of our pivot choices is poor), the recurrence will be $T(N) = T(N - 1) + O(N)$, whose solution is $T(N) = O(N^2)$.
Getting good behavior from QuickSelect requires care when choosing the pivot, just as with QuickSort!