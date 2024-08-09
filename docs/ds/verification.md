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
In the following, we will only be looking at examples of unit testing.
Frequently the running of the test suite will be automated, so that the programmer will get
feedback after every change to know whether any of the test cases fail.

As noted above, testing can only confirm correct behavior on the cases where someone thought to
write a test.
This can still be valuable, particularly in the form of **regression testing**, where tests
are added to the suite whenever a bug is discovered&mdash;by adding a test that would
have failed because of the bug, passing the enhanced suite in the future will not only check that the
bug has been fixed (at least for that particular case), but also provides confidence that
further changes to the code do not reintroduce old bugs.

Here is an example (adapted from
[this source](https://github.com/anshulxyz/algorithms-scala/blob/main/src/test/scala/example/InsertionSortSpec.scala))
of using the [ScalaTest](https://www.scalatest.org) framework to test some cases
of the `insertion_sort` function from [Sorting Lists](lists.md):
```scala
class InsertionSortSpec extends AnyFlatSpec with Matchers:
  "Insertion Sort" should "sort a list of integers in ascending order" in {
    val unsortedList = List(4, 6, 1, 3, 5)
    val sortedList   = List(1, 3, 4, 5, 6)
    insertion_sort(unsortedList) shouldEqual sortedList
  }

  it should "handle an empty list" in {
    insertion_sort(Nil) shouldEqual Nil
  }

  it should "handle a list with a single element" in {
    val singleElementList = List(42)
    insertion_sort(singleElementList) shouldEqual singleElementList
  }

  it should "handle a list with duplicate elements" in {
    val listWithDuplicates = List(3, 1, 4, 1, 5, 9, 2, 6, 5)
    val sortedlist         = List(1, 1, 2, 3, 4, 5, 5, 6, 9)
    insertion_sort(listWithDuplicates) shouldEqual sortedlist
  }
```

The output when this is run with ScalaTest will look something like this:
<pre>
[info] <span style={{color:'green'}}>InsertionSortSpec:</span>
[info] <span style={{color:'green'}}>Insertion Sort</span>
[info] <span style={{color:'green'}}>- should sort a list of integers in ascending order</span>
[info] <span style={{color:'green'}}>- should handle an empty list</span>
[info] <span style={{color:'green'}}>- should handle a list with a single element</span>
[info] <span style={{color:'green'}}>- should handle a list with duplicate elements</span>
[info] <span style={{color:'teal'}}>Run completed in 220 milliseconds.</span>
[info] <span style={{color:'teal'}}>Total number of tests run: 4</span>
[info] <span style={{color:'teal'}}>Suites: completed 1, aborted 0</span>
[info] <span style={{color:'teal'}}>Tests: succeeded 4, failed 0, canceled 0, ignored 0, pending 0</span>
[info] <span style={{color:'green'}}>All tests passed.</span>
</pre>

Suppose we used this modified definition of `insert`, which does not retain duplicate elements:
```scala
def insert(nums: List[Int], n: Int): List[Int] = {
  nums match
    case Nil => List(n)
    case head :: tail =>
      if n < head then
        n :: nums
      else if n == head then
        nums
      else
        head :: insert(tail, n)
}
```

Then the output for the same test suite would change to:
<pre>
[info] <span style={{color:'green'}}>InsertionSortSpec:</span>
[info] <span style={{color:'green'}}>Insertion Sort</span>
[info] <span style={{color:'green'}}>- should sort a list of integers in ascending order</span>
[info] <span style={{color:'green'}}>- should handle an empty list</span>
[info] <span style={{color:'green'}}>- should handle a list with a single element</span>
[info] <span style={{color:'red'}}>- should handle a list with duplicate elements &ast;&ast;&ast; FAILED &ast;&ast;&ast;</span>
[info] <span style={{color:'red'}}>  List(1, 2, 3, 4, 5, 6, 9) did not equal List(1, 1, 2, 3, 4, 5, 5, 6, 9) (InsertionSortSpec.scala:23)</span>
[info] <span style={{color:'red'}}>  Analysis:</span>
[info] <span style={{color:'red'}}>  List(1: 2 -&gt; 1, 2: 3 -&gt; 2, 3: 4 -&gt; 3, 4: 5 -&gt; 4, 5: 6 -&gt; 5, 6: 9 -&gt; 5, 7: -&gt; 6, 8: -&gt; 9)</span>
[info] <span style={{color:'teal'}}>Run completed in 246 milliseconds.</span>
[info] <span style={{color:'teal'}}>Total number of tests run: 4</span>
[info] <span style={{color:'teal'}}>Suites: completed 1, aborted 0</span>
[info] <span style={{color:'teal'}}>Tests: succeeded 3, failed 1, canceled 0, ignored 0, pending 0</span>
[info] <span style={{color:'red'}}>&ast;&ast;&ast; 1 TEST FAILED &ast;&ast;&ast;</span>
</pre>

## Assertions

As stated above, an assertion is a boolean expression that must be `true` each time it is encountered
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

By combining testing with properties, we can have the best features of both.
**Property-based testing** lets us specify general properties that need to hold,
but instead of checking them at runtime with assertions (which we do **not** want to
do in production) we test them in advance by running a tool that will generate a
large number of "random" cases and checking each of the properties.
In effect, this automates the process of generating unit tests.

The property testing tool knows the types of the data being tested, and can
generate a suitable range of "arbitrary" values.
A typical tool is [ScalaCheck](https://scalacheck.org/), which has built-in
generators for primitive types and standard collections; in addition to randomly
generated values, it will also try common edge cases (such as `Int.MaxValue` and
the empty list).
For custom data types, such as trees, it provides facilities to define new generators.

Here is an example of some properties written in ScalaCheck that will test the
behavior of our insertion sort function.
These properties are written in the form `forAll {(a: T) => P(a)}`, which is the
signal to ScalaCheck that it should generate arbitrary values `a` of type `T`
(by default, it generates 100 of them), and check whether the boolean expression
`P(a)` is `true`.[^1]
```scala
object InsertionSortPropSpec extends Properties("Insertion Sort") {
  import Prop.forAll

  property("same length") = forAll { (a: List[Int]) =>
    a.length == insertion_sort(a).length
  }

  property("sorted") = forAll { (a: List[Int]) =>
    isSorted(insertion_sort(a))
  }

  property("same elements") = forAll { (a: List[Int]) =>
    val aSorted = insertion_sort(a)
    a.forall(x => aSorted contains x) && aSorted.forall(x => a contains x)
  }
}
```

[^1]: Note that the ScalaCheck `forAll` function is different from the method
`forall` defined on lists in Scala (and used in the "same elements" property),
which maps a predicate over all of the elements of the given list and then
"ands" the results together.

When run with ScalaCheck, the output from this will be
```
+ Insertion Sort.same length: OK, passed 100 tests.
+ Insertion Sort.sorted: OK, passed 100 tests.
+ Insertion Sort.same elements: OK, passed 100 tests.
```

If we run it on the faulty version of insertion sort that discards duplicates, the output
might instead be
```
! Insertion Sort.same length: Falsified after 5 passed tests.
> ARG_0: List("0", "0")
> ARG_0_ORIGINAL: List("0", "2147483647", "-30181727", "0")
+ Insertion Sort.sorted: OK, passed 100 tests.
+ Insertion Sort.same elements: OK, passed 100 tests.
Found 1 failing properties.
```
Note that it first found a failing input: `List(0, 2147483647, -30181727, 0)`.
A common ability of property-based testers is that once a failing case is found,
it will then attempt to generate simpler related cases until it finds a
minimal counterexample.
In this run, ScalaCheck was able to shrink the failing case down to `List(0, 0)`.

## Correctness Proofs

**TODO** show some examples with Stainless

```scala
def insert(nums: List[Int], n: Int): List[Int] = {
  require(isSorted(nums))

  nums match 
    case Nil() => List(n)
    case Cons(head, tail) =>
      if n <= head then
        n :: nums
      else
        head :: insert(tail, n)
} ensuring (result =>
  isSorted(result) &&
  result.content == nums.content + n &&
  result.size == nums.size + 1
)

def insertion_sort(nums: List[Int]): List[Int] = {
  nums match 
    case Nil() => Nil()
    case Cons(head, tail) => insert(insertion_sort(tail), head)
} ensuring (result =>
  isSorted(result) &&
  result.content == nums.content &&
  result.size == nums.size
)
```

<pre>
[<span style={{color:'blue'}}>  Info  </span>]   ┌───────────────────┐
[<span style={{color:'blue'}}>  Info  </span>] ╔═╡ <span style={{color:'green'}}>stainless summary</span> ╞═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
[<span style={{color:'blue'}}>  Info  </span>] ║ └───────────────────┘                                                                                                                                 ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:10:7: </span>   <span style={{color:'green'}}>insert</span>          <span style={{color:'green'}}>non-negative measure</span>                                      <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.1</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:13:5: </span>   <span style={{color:'green'}}>insert</span>          <span style={{color:'green'}}>body assertion: match exhaustiveness</span>                      <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.0</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:13:5: </span>   <span style={{color:'green'}}>insert</span>          <span style={{color:'green'}}>postcondition</span>                                             <span style={{color:'green'}}>valid from cache</span>  <span style={{color:'green'}}></span>          <span style={{color:'green'}}>0.0</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:14:26: </span>  <span style={{color:'green'}}>insert</span>          <span style={{color:'green'}}>postcondition</span>                                             <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.1</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:17:11: </span>  <span style={{color:'green'}}>insert</span>          <span style={{color:'green'}}>postcondition</span>                                             <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.1</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:19:11: </span>  <span style={{color:'green'}}>insert</span>          <span style={{color:'green'}}>postcondition</span>                                             <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.2</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:19:19: </span>  <span style={{color:'green'}}>insert</span>          <span style={{color:'green'}}>measure decreases</span>                                         <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.1</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:19:19: </span>  <span style={{color:'green'}}>insert</span>          <span style={{color:'green'}}>precond. (call insert((scrut.t): @DropVCs , n))</span>           <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.0</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:26:7: </span>   <span style={{color:'green'}}>insertion_sort</span>  <span style={{color:'green'}}>non-negative measure</span>                                      <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.0</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:27:5: </span>   <span style={{color:'green'}}>insertion_sort</span>  <span style={{color:'green'}}>body assertion: match exhaustiveness</span>                      <span style={{color:'green'}}>trivial</span>           <span style={{color:'green'}}></span>          <span style={{color:'green'}}>0.0</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:27:5: </span>   <span style={{color:'green'}}>insertion_sort</span>  <span style={{color:'green'}}>postcondition</span>                                             <span style={{color:'green'}}>trivial</span>           <span style={{color:'green'}}></span>          <span style={{color:'green'}}>0.0</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:28:21: </span>  <span style={{color:'green'}}>insertion_sort</span>  <span style={{color:'green'}}>postcondition</span>                                             <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.1</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:29:32: </span>  <span style={{color:'green'}}>insertion_sort</span>  <span style={{color:'green'}}>postcondition</span>                                             <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.2</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:29:32: </span>  <span style={{color:'green'}}>insertion_sort</span>  <span style={{color:'green'}}>precond. (call insert(insertion_sort((scrut.t): @Dro...)</span>  <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.3</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:29:39: </span>  <span style={{color:'green'}}>insertion_sort</span>  <span style={{color:'green'}}>measure decreases</span>                                         <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.1</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:5:7: </span>    <span style={{color:'green'}}>isSorted</span>        <span style={{color:'green'}}>non-negative measure</span>                                      <span style={{color:'green'}}>valid from cache</span>  <span style={{color:'green'}}></span>          <span style={{color:'green'}}>0.0</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>src/main/scala/InsertionSort.scala:6:48: </span>   <span style={{color:'green'}}>isSorted</span>        <span style={{color:'green'}}>measure decreases</span>                                         <span style={{color:'green'}}>valid</span>             <span style={{color:'green'}}>U:smt-z3</span>  <span style={{color:'green'}}>0.0</span> ║
[<span style={{color:'blue'}}>  Info  </span>] ╟┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╢
[<span style={{color:'blue'}}>  Info  </span>] ║ <span style={{color:'green'}}>total: 17   valid: 17   (2 from cache, 2 trivial) invalid: 0    unknown: 0    time:    1.26</span>                                                           ║
[<span style={{color:'blue'}}>  Info  </span>] ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
</pre>

Discuss Hoare Logic?
