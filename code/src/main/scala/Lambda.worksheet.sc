type T = Any
extension (x: T)
  def apply(a: T): T = x.asInstanceOf[T => T](a)
  def asNat: Int = x.asInstanceOf[(Int => Int) => Int => Int]((n: Int) => n + 1)(0)
  def asBool: Boolean = x.asInstanceOf[Boolean => Boolean => Boolean](true)(false)

val zero = (s: T) => (z: T) => z
val succ = (n: T) => (s: T) => (z: T) => s(n(s)(z))
val one = succ(zero)
val two = succ(one)
val three = succ(two)
val four = succ(three)
val five = succ(four)
val six = succ(five)
val seven = succ(six)
val eight = succ(seven)
val nine = succ(eight)
val ten = succ(nine)

val plus = (a: T) => (b: T) => a(succ)(b)
val times = (a: T) => (b: T) => a(plus(b))(zero)

val ff = (t: T) => (f: T) => f
val tt = (t: T) => (f: T) => t

val not = (a: T) => (t: T) => (f: T) => a(f)(t)
val and = (a: T) => (b: T) => (t: T) => (f: T) => a(b(t)(f))(f)
val or = (a: T) => (b: T) => (t: T) => (f: T) => a(t)(b(t)(f))
val cond = (a: T) => (b: T) => (c: T) => a(b)(c)

val pair = (a: T) => (b: T) => (c: T) => c(a)(b)
val first = (p: T) => p(tt)
val second = (p: T) => p(ff)

val pred = {
  val step = (p: T) => pair(second(p))(succ(second(p)))
  (n: T) => first(n(step)(pair(zero)(zero)))
}
val minus = (a: T) => (b: T) => b(pred)(a)

val isZero = (n: T) => n((x: T) => ff)(tt)
val leq = (a: T) => (b: T) => isZero(minus(a)(b))
val eq = (a: T) => (b: T) => and(leq(a)(b))(leq(b)(a))

val fix = (f: T) => ((x: T) => f((v: T) => x(x)(v)))((x: T) => f((v: T) => x(x)(v)))

val fact = {
  val body = (f: T) => (n: T) => cond(isZero(n))(one)((v: T) => times(n)(f(pred(n)))(v)) // need lazy cond
  fix(body)
}

zero.asNat
one.asNat
two.asNat
plus(two)(two).asNat
times(six)(seven).asNat

ff.asBool
tt.asBool
not(ff).asBool
not(tt).asBool
and(ff)(tt).asBool
or(ff)(tt).asBool
cond(ff)(one)(two).asNat
cond(tt)(one)(two).asNat

first(pair(one)(two)).asNat
second(pair(one)(two)).asNat

pred(ten).asNat
pred(zero).asNat
minus(ten)(six).asNat
minus(six)(ten).asNat

isZero(zero).asBool
isZero(one).asBool
leq(ten)(six).asBool
leq(six)(ten).asBool
eq(six)(ten).asBool
eq(ten)(ten).asBool

fact(four).asNat
fact(five).asNat
fact(six).asNat
fact(seven).asNat