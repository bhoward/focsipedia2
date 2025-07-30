---
id: parser-comb
title: Recursive Descent and Parser Combinators
---

It is particularly easy to turn an LL(1) grammar into an efficient parser
using the technique of **recursive descent parsing**. For each non-terminal in
the grammar, we write a function that recognizes strings produced from that
non-terminal. If there are multiple productions for the non-terminal, we use
the next available character to decide which one to use. To parse the right-hand
side of the chosen production rule, we have to recognize a sequence of terminals
and non-terminals in order. To recognize a terminal, we just check that the current
character from the input matches the expected symbol. To recognize a non-terminal,
we call the associated function for that non-terminal.

Therefore, our parser will be a set of mutually recursive functions, one for each
non-terminal. To parse a word in the language, we call the function corresponding
to the starting non-terminal; if that function returns without error, then we have
successfully matched a word. In addition to recognizing a string of characters, it
is common for each recursive descent parsing function to return a data structure
(the parse tree, or a close relative known as an **abstract syntax tree**) representing
the input that was parsed.

Here is code for a recursive descent parser in Java, corresponding to the following
grammar (expressed here in [Backus-Naur form](../lang/bnf.md); it is very similar
to the example $G_2$ discussed in the [parsing](../lang/parsing.md) section):
$$
\begin{aligned}
\langle\textit{Expr}\rangle\ &::=\ \langle\textit{Term}\rangle\ [\ (\ +\ |\ -\ )\ \langle\textit{Term}\rangle\ ]\ldots\\
\langle\textit{Term}\rangle\ &::=\ \langle\textit{Factor}\rangle\ [\ (\ *\ |\ /\ )\ \langle\textit{Factor}\rangle\ ]\ldots\\
\langle\textit{Factor}\rangle\ &::=\ \textrm{ident}\ |\ \textrm{num}\ |\ \textrm{``(''}\ \langle\textit{Expr}\rangle\ \textrm{``)''}
\end{aligned}
$$

```java
/**
 * Represents an expression node in an abstract syntax tree.
 */
public interface Expr {
	// instance methods appropriate to the application should be declared here

	/**
	 * Parse an expression (sum/difference of one or more terms).
	 * 
	 * @param input
	 * @return
	 */
	public static Expr parse(Input input) {
		Expr e = parseTerm(input);
		while (input.peek() == '+' || input.peek() == '-') {
			BinOp op = BinOp.parse(input);
			Expr e2 = Expr.parseTerm(input);
			e = new BinOpExpr(e, op, e2);
		}
		return e;
	}

	/**
	 * Parse a term (product/quotient of one or more factors).
	 * 
	 * @param input
	 * @return
	 */
	public static Expr parseTerm(Input input) {
		Expr e = parseFactor(input);
		while (input.peek() == '*' || input.peek() == '/') {
			BinOp op = BinOp.parse(input);
			Expr e2 = Expr.parseFactor(input);
			e = new BinOpExpr(e, op, e2);
		}
		return e;
	}

	/**
	 * Parse a factor (identifier, number, or parenthesized expression). Throws a
	 * RuntimeException if a factor is not available.
	 * 
	 * @param input
	 * @return
	 */
	public static Expr parseFactor(Input input) {
		if (Character.isLetter(input.peek())) {
			String id = input.readIdent();
			return new IdentExpr(id);
		} else if (Character.isDigit(input.peek())) {
			int n = input.readInt();
			return new NumExpr(n);
		} else if (input.peek() == '(') {
			input.skip();
			Expr e = parse(input);
			input.match(')');
			return e;
		} else {
			throw new RuntimeException("expected a factor");
		}
	}
}

public class BinOpExpr implements Expr {
	private Expr left, right;
	private BinOp op;

	public BinOpExpr(Expr left, BinOp op, Expr right) {
		this.left = left;
		this.op = op;
		this.right = right;
	}

	public String toString() {
		return "BinOp(" + left + ", " + op + ", " + right + ")";
	}
}

public class IdentExpr implements Expr {
	private String id;

	public IdentExpr(String id) {
		this.id = id;
	}

	public String toString() {
		return "Ident(" + id + ")";
	}
}

public class NumExpr implements Expr {
	private int n;

	public NumExpr(int n) {
		this.n = n;
	}

	public String toString() {
		return "Num(" + n + ")";
	}
}

/**
 * Represents the binary operators available in the abstract syntax for
 * expressions.
 */
public enum BinOp {
	PLUS, MINUS, TIMES, DIVIDE;

	/**
	 * Parse a binary operator from the given Input. Should only be called when the
	 * current character may start an operator.
	 * 
	 * @param input
	 * @return
	 */
	static BinOp parse(Input input) {
		switch (input.peek()) {
		case '+':
			input.skip();
			return PLUS;
		case '-':
			input.skip();
			return MINUS;
		case '*':
			input.skip();
			return TIMES;
		case '/':
			input.skip();
			return DIVIDE;
		default:
			return null; // shouldn't happen
		}
	}
}

/**
 * Wrapper around a Reader that provides useful abstractions for recursive
 * descent parsing.
 */
public class Input {
	private java.io.Reader source;
	private char next;
	private boolean atEnd;

	public Input(java.io.Reader source) {
		this.source = source;
		skip();
	}

	/**
	 * @return current available character
	 */
	public char peek() {
		return next;
	}

	/**
	 * @return true if no more characters available
	 */
	public boolean atEnd() {
		return atEnd;
	}

	/**
	 * Read the next available character, skipping over whitespace
	 */
	public void skip() {
		readNext();
		skipWhitespace();
	}

	/**
	 * If the current character is c, skip to the next. Throw a RuntimeException if
	 * the character does not match.
	 * 
	 * @param c
	 */
	public void match(char c) {
		if (next == c) {
			skip();
		} else {
			throw new RuntimeException("expected " + c + " but found " + next);
		}
	}

	/**
	 * Read an identifier (letter followed by zero or more letters or digits). This
	 * should only be called when the current character is a letter.
	 * 
	 * @return the identifier
	 */
	public String readIdent() {
		StringBuilder builder = new StringBuilder();
		builder.append(next);
		readNext();
		while (!atEnd && Character.isLetterOrDigit(next)) {
			builder.append(next);
			readNext();
		}
		skipWhitespace();
		return builder.toString();
	}

	/**
	 * Read an integer (digit followed by zero or more additional digits). This
	 * should only be called when the current character is a digit.
	 * 
	 * @return the number
	 */
	public int readInt() {
		int result = next - '0';
		readNext();
		while (!atEnd && Character.isDigit(next)) {
			result = result * 10 + next - '0';
			readNext();
		}
		skipWhitespace();
		return result;
	}

	private void readNext() {
		try {
			int c = source.read();
			if (c != -1) {
				next = (char) c;
				atEnd = false;
			} else {
				next = '\0';
				atEnd = true;
			}
		} catch (java.io.IOException e) {
			next = '\0';
			atEnd = true;
		}
	}

	private void skipWhitespace() {
		while (!atEnd && Character.isWhitespace(next)) {
			readNext();
		}
	}
}

public class Demo {
	public static void main(String[] args) {
		String sample = "  3*abc + (x1 - x0) * r2d2/42 \n";
		Input input = new Input(new StringReader(sample));
		Expr e = Expr.parse(input);
		if (input.atEnd()) {
			System.out.println("Found " + e);
		} else {
			System.out.println("unscanned input after parsing " + e);
		}
	}
}
```

## Parser Combinators

Instead of giving a direct translation of the Java version into Scala, it is
common in functional languages to use what are known as **parser combinators**
to write recursive descent parsers. A parser is viewed as a function from input
to the pair of a result plus the remaining input (since in a functional language
we do not want to use side-effects to update the "current character" available from
an input source). A parser combinator is then a function that can combine one or
more of these parsing functions into a composite parser.

The example below uses the
[FastParse combinator parsing library](https://com-lihaoyi.github.io/fastparse/).
For example, given parsers `p1` and `p2`, the combinator `|` produces the parser
`p1 | p2` which attempts to parse according to `p1`; if it fails, then it attempts
to use `p2` instead. This corresponds to the $|$ (choice) operator in BNF (and also
in regular expressions). Some of the other combinators used below are `~`, which
corresponds to sequencing one parser after another, and `rep`, which repeats a
parser zero or more times (like the Kleene star).
The `map` operations take the result of parsing a particular rule and construct the
desired abstract syntax tree of type `Expr`.

Here is the parser for arithmetic expressions, corresponding to the Java example above.
Note how the definitions of `expr`, `term`, and `factor` are very close to the original BNF:
```scala
package test

enum Expr:
  case Ident(name: String)
  case Num(value: Int)
  case BinOp(left: Expr, op: String, right: Expr)
import Expr.*

import fastparse._, SingleLineWhitespace._

object ExprParse:
  def apply(input: String): Either[String, Expr] = {
    parse(input, { case given P[_] => top }) match
    case Parsed.Success(value, _) => Right(value)
    case result: Parsed.Failure => Left(result.msg)
  }
    
  def top[$: P]: P[Expr] = P ( Start ~ expr ~ End )

  def expr[$: P]: P[Expr] = P( term ~ (addOp ~ term).rep )
    .map {
        case (t, rest) => rest.foldLeft(t) { case (e1, (op, e2)) => BinOp(e1, op, e2) }
    }

  def term[$: P]: P[Expr] = P( factor ~ (mulOp ~ factor).rep )
    .map {
        case (f, rest) => rest.foldLeft(f) { case (e1, (op, e2)) => BinOp(e1, op, e2) }
    }

  def factor[$: P]: P[Expr] = P( id | num | "(" ~ expr ~ ")" )

  def id[$: P]: P[Expr] = P( ident.map(Ident(_)) )

  def num[$: P]: P[Expr] = P( number.map(n => Num(n.toInt)) )

  // Lexical Syntax
  def ident[$: P] = P( CharIn("A-Za-z").! ~~ CharsWhileIn("A-Za-z0-9").?.! )
    .map {
        case (init, rest) => init + rest
    }

  def number[$: P] = P( ("-".? ~~ CharsWhileIn("0-9")).! )

  def addOp[$: P] = P( ("+" | "-").! )

  def mulOp[$: P] = P( ("*" | "/").! )

  @main def demo(): Unit = {
    val input = "a*x*x + b*x + c"

    ExprParse(input) match
        case Right(expr) =>
          println(expr)
        case Left(message) =>
          println("Error: " + message)
  }
```
