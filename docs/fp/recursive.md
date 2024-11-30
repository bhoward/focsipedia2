---
id: recursive
title: General Recursive Functions
---

So far, when talking about [computability](../lang/computability.md), we have been concerned with the question of deciding membership of a string in a language.
We might wonder how that relates to performing computations on numbers, since most programming languages separate their numeric operations from the text-processing ones.

A partial answer comes from observing that all of the standard arithmetic algorithms can be expressed as operations on strings of digits; much of the process of learning math in elementary school is concerned with ways of laying out and manipulating digits, one or two at a time, to perform calculations on multi-digit numbers.
Therefore, we could express the computation of an arbitrary function as recognizing a string that describes the calculation process, where the language is the set of correctly laid out calculations of the desired form.

However, that might seem to be an unsatisfyingly indirect approach to such a fundamental task as computing a numeric function.
Therefore, in this section we will sketch out an alternative presentation of the notion of what is computable, using what are known as the **General Recursive Functions**.
In the interest of simplicity, we will restrict ourselves to functions over the natural numbers ($\{0, 1, 2, \ldots\}$); the ideas are easily extended to integers and rational numbers; computations over arbitrary real numbers present other challenges (how do you even specify an arbitrary real number without having to list an infinite string of digitis?), but since the "real number" types used in computers are all represented by rational numbers we may safely ignore this issue.

In the end, there will be an equivalence between computation viewed as a language recognition problem and viewed as a function computation problem.
Any question about sets of strings can be turned into a question about numbers by **encoding** the strings, for example by assigning a code to each letter of the underlying alphabet and then concatenating those codes into a multi-digit number whose radix is the size of the alphabet.
This should be no surprise to us, given our familiarity with modern computers representing all sorts of data as sequences of bits.
Nevertheless, it will provide additional support for the **Church-Turing Thesis** to explore the general recursive function approach to computability.

## Primitive Recursive Functions

We will start by showing how to build many familiar functions from just a few pieces.
Each function will have an **arity**, giving the number of arguments that it takes; we will adopt the convenient abbreviation $\bar{x}$ to stand for the sequence $x_1, x_2, \ldots, x_k$, so if function $f$ has arity $k$ we will write $f(\bar{x})$ for the application of $f$ to its arguments.

The simplest functions are the constant, projection, and successor functions:

* **Constant** functions: for natural numbers $n$ and $k$, $C_n^k(\bar{x}) = n$;

* **Projection** functions: for natural numbers $k$ and $i\leq k$, $P_i^k(\bar{x}) = x_i$;

* **Successor** function, of arity 1: $S(x) = x+1$.

Given a function $h$ of arity $m$, and $m$ functions $g_1, g_2, \ldots, g_m$ each of arity $k$, we may form the **composition** $h\circ(\bar{g})$ by taking it to be the function $f$ of arity $k$ such that $f(\bar{x}) = h(g_1(\bar{x}), g_2(\bar{x}), \ldots, g_m(\bar{x}))$.

Finally, we may define new functions using **primitive recursion**.
This proceeds through pattern-matching on the first argument.
Given a function $g$ of arity $k$, and another function $h$ of arity $k+2$, we may construct the primitive recursion $\rho(g, h)$ as the function $f$ of arity $k+1$ satisfying the following equations:
$$
    \begin{array}{l}
    f(0, \bar{x}) = g(\bar{x})\\
    f(y+1, \bar{x}) = h(y, f(y, \bar{x}), \bar{x})
    \end{array}
$$

For example, consider the function $\textit{plus} = \rho(P_1^1, S\circ(P_2^3))$.
This will satisfy the equations
$$
    \begin{array}{l}
    \textit{plus}(0, x) = P_1^1(x) = x\\
    \textit{plus}(y+1, x) = S\circ(P_2^3)(y, \textit{plus}(y, x), x) = S(\textit{plus}(y, x)) = \textit{plus}(y, x) + 1,
    \end{array}
$$
so the function $\textit{plus}(y, x)$ can be seen to compute the usual natural number addition operation.

It is not difficult to see that we can equivalently view the functions built so far as those which could be written in a functional language like Scala, using pattern-matching on natural number arguments, with the restriction that the right-hand sides may only use the successor function, previously-defined functions, or a recursive call to the current function on the immediate predecessor of the argument being matched on.
Thus, the following definition of a multiplication function is allowed:
```scala
def mult(y: Int, x: Int): Int = y match
  case 0 => 0
  case _ => plus(mult(y - 1, x), x)
```

However, the restriction to primitive recursion would rule out functions such as the more efficient `power` function from Exercise 4 of the section on [Recursion and Induction](../logic/recursion.md):
```scala
def power(x: Int, n: Int): Int = n match
  case 0 => 1
  case _ => if n % 2 == 0 then
              power(x * x, n / 2)
            else
              x * power(x, n - 1)
```

We can still write a `power` function using primitive recursion, but it needs to be in this less-efficient form (note that the difference is akin to the distinction between ordinary mathematical induction and strong induction):
```scala
def power(x: Int, n: Int): Int = n match
  case 0 => 1
  case _ => mult(x, power(x, n - 1))
```

The set of **Primitive Recursive Functions** that we can construct so far is still very large (even though we might not be able to write the most efficient implementations), but it turns out to have some limitations.
A famous example of a non-primitive recursive function is the Ackermann function, which satisfies the following equations:
$$
\begin{array}{l}
A(m, n, 0) = m + n\\
A(m, 0, 1) = 0\\
A(m, 0, 2) = 1\\
A(m, 0, p) = m,\ \textrm{if}\ p > 2\\
A(m, n, p) = A(m, A(m, n - 1, p), p - 1),\ \textrm{if}\ m, p > 0
\end{array}
$$
It is easy to check that $A(m, n, 1) = m\cdot n$ and $A(m, n, 2) = m^n$; as $p$ increases, the function of $m$ and $n$ grows rapidly (for example, $A(m, n, 3) = m^{m^{\cdots m}}$, a tower of $n$ exponentiations!).
The proof that this is not definable through primitive recursion amounts to showing that it eventually grows faster than any possible primitive recursive function.

## Minimization

Although it is possible to generalize primitive recursion to larger classes that include the Ackermann function,[^1] we will take a different approach to obtain the general recursive functions.

Given a function $g$ of arity $k+1$, we may define the **minimization** $\mu g$ to be the function $f$ of arity $k$ such that $f(\bar{x})$ is the smallest $y$ making $g(y, \bar{x}) = 0$.
If there is no such $y$, then $(\mu g)(\bar{x})$ is undefined for the arguments $\bar{x}$.
In programming terms, this is like adding a `while` loop to the language: the program will search through $y=0, 1, 2, \ldots$ as long as $g(y, \bar{x})$ is non-zero.

For example, suppose we have a remainder function $\textit{mod}(m, n)$ which gives the remainder on performing integer division of $m$ by $n$; this is fairly easy to construct using primitive recursion.
Then if $g(y, m) = \textit{mod}(m, y + 2)$, the expression $(\mu g)(m) - 2$ will compute the smallest factor of $m$ greater than 1; if the result is $m$ itself, then $m$ is prime.
Testing whether a number is prime can also be done with primitive recursion, but it might be more straightforward to think of it as a search.

The Ackermann function may be computed with minimization by defining a primitive recursive function $G(r, m, n, p)$ which is zero only when $A(m, n, p) = r$ (I will not show how to do this, but having the result $r$ available essentially allows us to compute an upper bound on the number of steps needed to compute $A$, and primitive recursion can be used to "step through" the definition up to a given number of steps).
Once we have $G$, the Ackermann function is simply $\mu G$.

Since the function $\mu g$ might be undefined for some arguments (when the search enters an "infinite loop"), we have to accept that the general recursive functions may only be **partial functions**.
Although the general recursive functions will include all of the **total recursive functions** that we would expect to be able to define on the natural numbers, in general we will have no way to decide whether an arbitrary general recursive function is total.
Any subset of functions for which we have proofs of totality must necessarily be a proper subset of the set of all total functions; this is a corollary to the undecidability of the [Halting Problem](../lang/halting.md).

[^1]: For example, G&ouml;del defined the **Primitive Recursive Functionals**, which are essentially the primitive recursive functions plus the ability to define higher-order functions: passing and returning function values rather than just natural numbers.
These cover a _much_ larger class of total recursive functions, but still not as many as are obtainable using minimization.

## Relation to Turing Machines

Evaluating a general recursive function can be expressed as a sequence of symbol manipulations that can written out on a tape and performed by a Turing machine; the demonstration is tedious but straghtforward.

The other direction is more interesting: given a Turing machine, we may encode the contents of the tape and the state of the machine as a (very large) number.
The transitions of the machine can be used to define a primitive recursive function $M(n, x)$ that will compute the encoded tape and state after $n$ steps, when started with the input $x$ on the tape.
Additional primitive recursive functions may be constructed from $M$: $T(n, x)$ is the encoding of the tape after $n$ steps, and $H(n, x)$ is 0 if the machine is in the halt state after $n$ steps.
Finally, $T\circ(\mu H, P_1^1)(x)$ will be the encoding of the resulting tape when (if) the machine halts.

The minimization here corresponds to running the machine for an unknown, possibly unbounded, number of steps.
For the function to be total, we would need to know that the machine will halt on all possible inputs.
This completes our promised sketch of the equivalence between Turing machine processing and general recursive functions.