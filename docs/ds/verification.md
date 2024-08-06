---
id: verification
title: Program Verification
---

How do you know that a program is correct?
The first issue is to decide what it even means for a program to be correct: if it isn't
fully clear what the correct output should be for a given input, then we have no chance
of saying anything more definite than "it looks OK".
Therefore, we will assume that we start with some sort of **specification**, whether
formal or informal, that will let us recognize correct output.

Given a specification, there is a wide spectrum of approaches to establishing the correctness
of a program:
* Do nothing and rely on the programmer to write code that works; this is clearly not reliable
or maintainable.
* Provide informal arguments, perhaps in the form of **comments** embedded in the source code,
explaining how parts of the program work and correspond to the desired behavior; this may be
as far as some programmers go, and while it may be better in terms of maintainability, it
does not provide much additional assurance of correctness.
* Create a suite of test cases, with sample inputs and expected outputs; 
if a program passes its test suite, that gives some confidence that it might be correct, but
it can only tell about the particular cases that were in the suite; it provides no guarantees
about the behavior on untested cases.
* Some aspects of a specification may be expressed in code in the form of **assertions**.
An assertion is a boolean expression that can be evaluated at some point of program execution;
if the result is `false`, then the assertion has failed.
You will only know this when the program is run on a particular input that triggers the failure;
this is analogous to dynamically typed languages like Python, where you will only find out about
a type violation when it actually occurs during program execution (potentially when it is in
production use by the client&hellip;).
* One way to combine the previous two approaches is known as **property-based testing**, where
a testing tool will automatically generate a large number of test cases based on assertions
("properties") attached to the code. Again, passing a finite number of tests can never guarantee
the absence of bugs, because the tool might not happen to generate a particular failing case,
but good property-based testers can check a large range of common problem areas, such as
**edge cases** near extremely large or small inputs, or **corner cases** with unusual
combinations of inputs.
* To gain full confidence that a program satisfies its specification, one can develop a
formal **correctness proof**. If successful, this provides a guarantee of correctness for all
possible program executions; again, this is analogous to strong statically typed languages
like Scala, where once the compiler confirms the types of all entities in advance, there
is no need to recheck them dynamically (during execution). Type checking can be thought of as
a simple form of correctness proof, where the assertions only make claims about
broad sets of possible values (the types).

More details and examples of testing, assertions, properties, and correctness proofs are below.

## Testing

The tests in a test suite can be on the level of individual functions to be tested in isolation
(**unit testing**), or they can be
at the level of a full program with inputs and outputs as seen by a user (**integration testing**).
Frequently the running of the test suite will be automated, so that the programmer will get
feedback after every change to know whether any of the test cases fail.

As noted above, testing can only confirm correct behavior on the cases where someone thought to
write a test.
This can still be valuable, particularly in the form of **regression testing**, where tests
are added to the suite whenever a bug is discovered&mdash;by adding a test that would
have failed because of the bug, passing the enhanced suite in the future will not only check that the
bug has been fixed (at least for that particular case), but also provides confidence that
further changes to the code do not reintroduce old bugs.

**TODO** include an example with ScalaTest or something similar?

## Assertions

As stated, an assertion is a boolean expression that must be `true` each time it is encountered
during program execution.
For example, in the [Sorting Lists](lists.md) section, the `select` function used in selection
sort requires that the input list be non-empty, and the `insert` function used in insertion sort
requires that the input list be ordered.
Each of these **preconditions** could be checked by an assertion (note that the original code
only had these preconditions in the form of comments; we are assuming here the existence of a
function `isSorted` that checks whether a list is in order):
```scala
/* Precondition: nums is non-empty */
def select(nums: List[Int]): (Int, List[Int]) = {
  // highlight-next-line
  assert(!nums.isEmpty)
  ...
}

/* Precondition: nums is sorted in non-decreasing order */
def insert(nums: List[Int], n: Int): List[Int] = {
  // highlight-next-line
  assert(isSorted(nums))
  ...
}
```

Instead of a precondition, which asserts a property of the input to a function, assertions
are often used for **postconditions** and **invariants**.
A postcondition asserts a claim about the output of a function; the combination of
pre- and post-conditions are often referred to as the **contract** of a function (just
like the signature of a function establishes a contract at the level of types).
In the sorting functions, one reasonable postcondition is that the output is in order.
This can be expressed in Scala by adding an `ensuring` clause after the function body:
```scala
def insertion_sort(nums: List[Int]): List[Int] = {
  nums match
    case Nil => Nil
    case head :: tail => insert(insertion_sort(tail), head)
} ensuring (result =>
    isSorted(result)
)
```
Note that the argument to `ensuring` is an anonymous function value that will be applied to the
result of the preceding expression; our convention will be to use the parameter name
`result` in this anonymous function, because it gives us a way to refer to the output of
the function by name.

An invariant asserts that a property is true each time an arbitrary point of the program is
reached.
This is most commonly used in conjunction with loops and mutable variables; since a pure
functional approach to Scala discourages such constructs, here is an example in Java:
```java
/** Compute a * b using only addition.
 * Precondition: b >= 0
 */
static int times(int a, int b) {
  assert b >= 0;
  int result = 0;
  for (int i = 0; i < b; i++) {
    // highlight-next-line
    assert result == a * i;
    result += a;
  }
  assert result == a * b;
  return result;
}
```
Each time we enter the loop, the invariant assures us that the current value of `result` is
the same as `a` times the current value of `i`.
Since the loop exits when `i == b`, we can use this invariant to establish the desired
postcondition that `result` is `a * b`.
When we run this Java program with the `-ea` ("enable assertions") flag, it will check that
each `assert` line evaluates to `true`.

In Scala, if an assertion fails it will throw an error and halt the program with a
message describing the failure.
Because of this abrupt reaction, and because the evaluation of assertions might take a significant
amount of the program's running time (consider how long it would take to check that `nums`
is sorted on each call to `insert` while sorting a long list), it is common practice to only
"turn on" assertion checking as part of the debugging process.
By passing an appropriate option to the Scala compiler, a release version of the program
can be generated where the `assert` statements have been removed.

## Property Testing

**TODO** show some examples with ScalaCheck or something like it

## Correctness Proofs

**TODO** show some examples with Stainless

Discuss Hoare Logic?
