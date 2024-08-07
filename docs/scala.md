---
id: scala
title: Scala
---

# Scala

[Scala](https://www.scala-lang.org/) is a multi-paradigm programming language that
supports Java-style object-oriented programming plus a strongly-typed functional style
influenced by Haskell and Standard ML.
It was developed by Martin Odersky at the École Polytechnique Fédérale de Lausanne (EPFL),
in Switzerland, starting in 2001.
Odersky worked on the design and compiler for Generic Java in the late 1990's, which became
the official javac compiler when generic types were made available in Java 5 (finally
released in 2004).
The design of Scala arose from Odersky's frustration with the slow pace of Java language
evolution, and the difficulty of merging advanced language features while maintaining strict
backward compatibility.

Scala compiles to the same JVM bytecode as Java, and objects created in one language are
easily used in the other; this means that Java's extensive library ecosystem is available to
Scala, and applications may be written with a combination of the two languages.
While Java programs are not syntactically legal Scala code, it is generally simple to
convert Java to Scala, and experience programming in one can often be transferred to the
other.

Scala's combination of Java compatibility with the functional paradigm's support
for building high-level abstractions has led to substantial adoption in industry.
One of the early [success stories](https://www.artima.com/articles/twitter-on-scala)
is when Twitter's user base exploded in 2008.
Parts of their backend written in Ruby couldn't handle the load, so they rewrote it
quickly in Scala and found that it could easily keep up.
The strongly-typed functional style enabled them to find a sweet spot between the
JVM's efficient compiled code and the flexibility associated with dynamic languages
such as Ruby or Python.

In recent years, partly due to the influence of Scala, functional features such as
anonymous functions ("lambdas") and immutable records with pattern-matching have
been added to Java.
Nevertheless, Scala provides a cleaner setting in which to learn about functional
programming, and has continued to serve as a testbed for advanced ideas in language design.
In addition to the Java Virtual Machine target, there are now also compilers from Scala to
JavaScript, for running in a browser, and to native machine code for increased efficiency.

Here is an example of Scala code, which defines a few constants and the factorial function:

```scala
val x = 6
val y = x * 7
def fact(n: Int): BigInt = {
  if n <= 1
  then 1
  else n * fact(n - 1)
}
fact(6)
```

Sometimes we will interleave the code with comments showing the output:

```scala mdoc
val x = 6
val y = x * 7
def fact(n: Int): BigInt = {
  if n <= 1
  then 1
  else n * fact(n - 1)
}
fact(6)
```

Observe how each constant ("val") declaration is followed by a comment line reporting the
type and value assigned to the constant.
At the bottom, the expression `fact(6)` is evaluated and the result is similarly
reported in a comment.
These comment lines are automatically generated by a tool called [mdoc](https://scalameta.org/mdoc/),
which will allow us to see the results from Scala code without having to switch over to a terminal.

There are several places online where you can run Scala code, although they
will not always match the setup used here (particularly the available libraries):

* The main Scala site, https://scala-lang.org/, has an online [Playground](https://scastie.scala-lang.org).

* There is a Scala kernel for Jupyter notebooks, which you can try online: https://almond.sh/.

* [Replit](https://replit.com/) supports Scala as one of its languages.

You can also [install Scala](https://scala-lang.org/download) on your own computer and run it locally.
If you do this, I recommend using the free [Visual Studio Code](https://code.visualstudio.com/) editor along with the [Metals](https://scalameta.org/metals/docs/editors/vscode/) plugin.
Alternately, you can use [IntelliJ IDEA](https://www.jetbrains.com/idea/) with their [Scala plugin](https://www.jetbrains.com/help/idea/get-started-with-scala.html).

We are using version 3 of Scala here.
You will still find a considerable amount of information about Scala 2 online.
One of the major changes in Scala 3 is the option to determine blocks by indentation
instead of braces.
We will generally include braces around blocks for additional clarity and
consistency, but if you prefer a more Python-like style you may write the code
example from above as follows:
```scala mdoc:reset
val x = 6
val y = x * 7
def fact(n: Int): BigInt =
  if n <= 1 then
    1
  else
    n * fact(n - 1)
fact(6)
```