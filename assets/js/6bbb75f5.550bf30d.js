"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[3228],{5929:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>r,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var t=a(4848),s=a(8453);const i={id:"overview",title:"Overview of Functional Programming"},o=void 0,l={id:"fp/overview",title:"Overview of Functional Programming",description:"There is a more extensive introduction to FP later, but this section provides an early introduction to some of the concepts and tools that we will be using throughout the course.",source:"@site/focsipedia-docs/target/mdoc/fp/overview.md",sourceDirName:"fp",slug:"/fp/overview",permalink:"/focsipedia2/docs/fp/overview",draft:!1,unlisted:!1,editUrl:"https://github.com/bhoward/focsipedia2/edit/main/docs/fp/overview.md",tags:[],version:"current",frontMatter:{id:"overview",title:"Overview of Functional Programming"},sidebar:"mySidebar",previous:{title:"Overview of Foundations",permalink:"/focsipedia2/docs/overview"},next:{title:"Methods in Scala",permalink:"/focsipedia2/docs/methods"}},r={},c=[{value:"Expressions and the Substitution Model",id:"expressions-and-the-substitution-model",level:2},{value:"Blocks and Local Values",id:"blocks-and-local-values",level:2},{value:"Pure Functions and Parameters",id:"pure-functions-and-parameters",level:2},{value:"Exercises",id:"exercises",level:2}];function h(e){const n={a:"a",code:"code",em:"em",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",section:"section",strong:"strong",sup:"sup",ul:"ul",...(0,s.R)(),...e.components},{Details:a}=n;return a||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["There is a more extensive ",(0,t.jsx)(n.a,{href:"/focsipedia2/docs/fp/intro",children:"introduction to FP"})," later, but this section provides an early introduction to some of the concepts and tools that we will be using throughout the course.\nThe language we will be using is called ",(0,t.jsx)(n.a,{href:"/focsipedia2/docs/scala",children:"Scala"}),".\nHere is an example of Scala code:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"val answer = 6 * 7\n// answer: Int = 42\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.a,{href:"https://scalameta.org/mdoc/",children:"mdoc"})," tool used in creating FoCSipedia automatically runs Scala code and inserts the results in comments."]}),"\n",(0,t.jsx)(n.h2,{id:"expressions-and-the-substitution-model",children:"Expressions and the Substitution Model"}),"\n",(0,t.jsxs)(n.p,{children:["One of the core principles of functional programming is that programs are made up of ",(0,t.jsx)(n.strong,{children:"expressions"})," that may be evaluated.\nThey are composed of constants, variables, operators, and function calls, as in most languages, plus compound forms such as ",(0,t.jsx)(n.a,{href:"#blocks-and-local-values",children:"blocks"})," and ",(0,t.jsx)(n.code,{children:"if"})," statements.\nUnlike most languages you are likely to have worked with, there are no assignment statements to change the values of variables\u2014the only way to store a value in a variable is to put it there when the variable is created.",(0,t.jsx)(n.sup,{children:(0,t.jsx)(n.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})}),"\nWhen you write ",(0,t.jsx)(n.code,{children:"val answer = 6 * 7"}),", the variable ",(0,t.jsx)(n.code,{children:"answer"})," is created and assigned the value of the expression ",(0,t.jsx)(n.code,{children:"6 * 7"}),", which is ",(0,t.jsx)(n.code,{children:"42"}),".\nFrom then on, whenever you refer to that variable you will get the same value."]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"Substitution Model"}),' arises from this fact about variables: since the value of an expression cannot change, you are free to "substitute equals for equals," just as in algebra.\nIf you see the expression ',(0,t.jsx)(n.code,{children:"answer + 1"}),", you know that this is the same as ",(0,t.jsx)(n.code,{children:"(6 * 7) + 1"}),".\nThis seemingly simple observation is the basis of many of the powerful techniques that are enabled by functional programming; you will learn more about this later, but just one application is in optimizing code to be run in parallel on a multi-processor machine\u2014if you know that the substitution model holds, then the compiler has great freedom to rearrange when and where values are computed to maximize the use of the available processors.\nIn a language without the substitution model, where the value of a variable depends on the last time it was changed in an assignment statement, it is much harder to do this kind of optimization."]}),"\n",(0,t.jsx)(n.p,{children:"See if you can predict the output of the following code:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"val a = 2\nval b = a + 1\nval c = if a < b then a * b else a * a + b\nval d = if a > b then a * b else a * a + b\nval e = c * d\nprintln(e)\n"})}),"\n",(0,t.jsxs)(a,{children:[(0,t.jsx)("summary",{children:"Answer"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"val a = 2\n// a: Int = 2\nval b = a + 1\n// b: Int = 3\nval c = if a < b then a * b else a * a + b\n// c: Int = 6\nval d = if a > b then a * b else a * a + b\n// d: Int = 7\nval e = c * d\n// e: Int = 42\nprintln(e)\n// 42\n"})})]}),"\n",(0,t.jsx)(n.h2,{id:"blocks-and-local-values",children:"Blocks and Local Values"}),"\n",(0,t.jsx)(n.p,{children:"When computing an expression, it is frequently useful to declare additional variables to hold temporary results.\nFor example,"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'val result =\n  val local1 = "Hello"\n  val local2 = "World"\n  local1 ++ " " ++ local2\n// result: String = "Hello World"\nprintln(result)\n// Hello World\n'})}),"\n",(0,t.jsxs)(n.p,{children:["The nested lines are called a ",(0,t.jsx)(n.strong,{children:"block"}),".\nWithin a block, we may have a series of ",(0,t.jsx)(n.strong,{children:"local value definitions"}),".\nThe value of the expression (which is then bound as the value of ",(0,t.jsx)(n.code,{children:"result"}),") is the value of the last expression in the block, ",(0,t.jsx)(n.code,{children:'local1 ++ " " ++ local2'})," (note that ",(0,t.jsx)(n.code,{children:"++"})," is the string concatenation operator in Scala).\nBefore it evaluates that expression, however, it first evaluates each of the ",(0,t.jsx)(n.code,{children:"val"})," statements (in order), temporarily binding those values to the given local variables.\nIn the example, ",(0,t.jsx)(n.code,{children:"local1"})," and ",(0,t.jsx)(n.code,{children:"local2"})," are each bound to their corresponding string values, and then the final expression is evaluated relative to those variable bindings."]}),"\n",(0,t.jsx)(n.p,{children:"The names of variables within a block are completely invisible outside their block.\nAfter the block is finished, it is as if those local bindings never took place.\nThis allows us to use local reasoning about the value of an expression, without having to know what might have happened in other blocks (which might have coincidentally used the same variable names)."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"println(local1)\n// error: \n// Not found: local1 - did you mean locally?\n"})}),"\n",(0,t.jsx)(n.p,{children:"The syntax of Scala is intentionally designed to be familiar to programmers who are used to languages like C, C++, Java, JavaScript, and Python.\nAlthough Scala 3 encourages grouping blocks of code by indentation level, it also allows the use of braces if you are more comfortable with them:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'val result = {\n  val local1 = "Hello"\n  val local2 = "World"\n  local1 ++ " " ++ local2\n}\n// result: String = "Hello World"\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Predict the result bound to the outer ",(0,t.jsx)(n.code,{children:"x"})," in this code (this is actually a case where we need the braces to embed the blocks within a larger expression):"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"val x = {\n  val x = 3\n  x + x\n} * {\n  val x = 4\n  x + x\n}\n"})}),"\n",(0,t.jsxs)(a,{children:[(0,t.jsx)("summary",{children:"Answer"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"val x = {\n  val x = 3\n  x + x\n} * {\n  val x = 4\n  x + x\n}\n// x: Int = 48\n"})})]}),"\n",(0,t.jsx)(n.h2,{id:"pure-functions-and-parameters",children:"Pure Functions and Parameters"}),"\n",(0,t.jsxs)(n.p,{children:["So far, we have only talked about expressions and variables.\nThe heart of functional programming, of course, is the ",(0,t.jsx)(n.strong,{children:"function"}),".\nIn Scala, functions are just another type of value, along with integers, strings, ",(0,t.jsx)(n.em,{children:"etc."}),"\nWe write the function value that takes ",(0,t.jsx)(n.strong,{children:"parameters"})," ",(0,t.jsx)(n.code,{children:"a"}),", ",(0,t.jsx)(n.code,{children:"b"}),", ",(0,t.jsx)(n.code,{children:"c"})," and returns the expression ",(0,t.jsx)(n.code,{children:"e"})," using the syntax ",(0,t.jsx)(n.code,{children:"(a, b, c) => e"}),".\nThis value is what is known as an ",(0,t.jsx)(n.strong,{children:"anonymous function"}),"; to give it a name, we may bind it to a variable, just like any other value:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"val area = (width: Int, height: Int) => width * height\n// area: Function2[Int, Int, Int] = repl.MdocSession$MdocApp3$$Lambda/0x00000008018ec218@5ffa4090\nprintln(area(6, 7))\n// 42\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Note that each parameter specifies both an ",(0,t.jsx)(n.strong,{children:"identifier"})," and a ",(0,t.jsx)(n.strong,{children:"type"}),".\nWe will have more to say about ",(0,t.jsx)(n.a,{href:"/focsipedia2/docs/fp/types",children:"types"})," later, but for now observe that common types such as ",(0,t.jsx)(n.code,{children:"Int"}),", ",(0,t.jsx)(n.code,{children:"Double"}),", and ",(0,t.jsx)(n.code,{children:"String"})," are available (just like in Java, except the first letter is capitalized)."]}),"\n",(0,t.jsxs)(n.p,{children:["In the second line of this example, after assigning the function value to ",(0,t.jsx)(n.code,{children:"area"}),", we are able to use ",(0,t.jsx)(n.code,{children:"area"})," as the name of a function just like the built-in functions (such as ",(0,t.jsx)(n.code,{children:"println"}),")."]}),"\n",(0,t.jsxs)(n.p,{children:["When Scala reports the bindings that result from this code, it says that ",(0,t.jsx)(n.code,{children:"area"})," has the type ",(0,t.jsx)(n.code,{children:"Function2[Int, Int, Int]"}),"\u2014this reflects the fact that a function value is actually an object of a class implementing a particular ",(0,t.jsx)(n.strong,{children:"trait"})," (which is analogous to a Java interface).\nThis function type may also be written ",(0,t.jsx)(n.code,{children:"(Int, Int) => Int"}),", which you can think of as giving a picture of a typical use of the function: when applied to two ",(0,t.jsx)(n.code,{children:"Int"})," arguments, it returns an ",(0,t.jsx)(n.code,{children:"Int"})," result."]}),"\n",(0,t.jsxs)(n.p,{children:["Because functions are just another kind of value, they may themselves be passed as arguments to functions, or returned as results; we will explore these ",(0,t.jsx)(n.strong,{children:"higher-order"})," functions later."]}),"\n",(0,t.jsxs)(n.p,{children:["Since expressions are evaluated according to the substitution model, where we do not have to worry about a variable changing its value between the time is was declared (",(0,t.jsx)(n.strong,{children:"bound"}),") and used, we know several very useful facts about functions:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Functions in Scala are ",(0,t.jsx)(n.strong,{children:"pure"}),": the output only depends on the inputs, so calling a function twice with the same arguments will always produce the same result.\nFurthermore, we know that calling a function will not have any ",(0,t.jsx)(n.strong,{children:"side-effects"}),"\u2014that is, it will not cause the bindings of any other variables to change.",(0,t.jsx)(n.sup,{children:(0,t.jsx)(n.a,{href:"#user-content-fn-2",id:"user-content-fnref-2","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"2"})}),"\nIf a program uses only pure functions, then the compiler is free to optimize code in various ways: it may rearrange when functions are called; it may combine multiple calls with the same arguments into one, or split a single call into several; and if it detects that the result of a function call is not needed, it may omit the call entirely.\nNone of these optimizations are guaranteed to preserve program behavior if a function is not known to be pure, which is the case in most non-functional languages."]}),"\n",(0,t.jsxs)(n.li,{children:["When an argument is passed to a function, the value (such as ",(0,t.jsx)(n.code,{children:"6"}),") is bound to the parameter name (such as ",(0,t.jsx)(n.code,{children:"width"}),") using the same mechanism as binding local variables in a block.\nTherefore, the function call in the example above could be rewritten as"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"println({\n  val width = 6\n  val height = 7\n  width * height\n})\n// 42\n"})}),"\n",(0,t.jsx)(n.h2,{id:"exercises",children:"Exercises"}),"\n",(0,t.jsx)(n.p,{children:"TBD"}),"\n","\n",(0,t.jsxs)(n.section,{"data-footnotes":!0,className:"footnotes",children:[(0,t.jsx)(n.h2,{className:"sr-only",id:"footnote-label",children:"Footnotes"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{id:"user-content-fn-1",children:["\n",(0,t.jsxs)(n.p,{children:["This is not quite true. In Scala, a variable declared with ",(0,t.jsx)(n.code,{children:"var"})," instead of ",(0,t.jsx)(n.code,{children:"val"})," may be modified by later assignments, just as in Java, but for the most part we will not use this feature. ",(0,t.jsx)(n.a,{href:"#user-content-fnref-1","data-footnote-backref":"","aria-label":"Back to reference 1",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{id:"user-content-fn-2",children:["\n",(0,t.jsxs)(n.p,{children:["Technically, some Scala functions ",(0,t.jsx)(n.em,{children:"may"})," have a side-effect, if they call input/output functions such as ",(0,t.jsx)(n.code,{children:"println"}),".\nThat is, you can tell the difference between calling such a function once, twice, or not at all, by looking at the output that is printed to the console.\nWe will consider this sort of side-effect to be benign, however, and we will generally use such functions only in very controlled places in a program, or only when tracing or debugging code.\nOf course, this also assumes that we are avoiding the use of reassignment to a variable declared with ",(0,t.jsx)(n.code,{children:"var"})," instead of ",(0,t.jsx)(n.code,{children:"val"}),". ",(0,t.jsx)(n.a,{href:"#user-content-fnref-2","data-footnote-backref":"","aria-label":"Back to reference 2",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n"]}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>o,x:()=>l});var t=a(6540);const s={},i=t.createContext(s);function o(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);