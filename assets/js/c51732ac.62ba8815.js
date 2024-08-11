"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[3860],{739:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>r,default:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>o});var a=n(4848),t=n(8453);const i={id:"curry",title:"Currying"},r=void 0,c={id:"fp/curry",title:"Currying",description:"When we write a function that takes multiple arguments, we may list the parameters",source:"@site/focsipedia-docs/target/mdoc/fp/curry.md",sourceDirName:"fp",slug:"/fp/curry",permalink:"/focsipedia2/docs/fp/curry",draft:!1,unlisted:!1,editUrl:"https://github.com/bhoward/focsipedia2/tree/main/focsipedia-docs/target/mdoc/fp/curry.md",tags:[],version:"current",frontMatter:{id:"curry",title:"Currying"},sidebar:"mySidebar",previous:{title:"Methods in Scala",permalink:"/focsipedia2/docs/methods"},next:{title:"Functional Programming and Natural Deduction",permalink:"/focsipedia2/docs/fp/natded"}},l={},o=[{value:"Tuples and Parameters",id:"tuples-and-parameters",level:3}];function d(e){const s={a:"a",annotation:"annotation",code:"code",h2:"h2",h3:"h3",li:"li",math:"math",mi:"mi",mo:"mo",mrow:"mrow",msup:"msup",mtext:"mtext",ol:"ol",p:"p",pre:"pre",section:"section",semantics:"semantics",span:"span",strong:"strong",sup:"sup",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.p,{children:"When we write a function that takes multiple arguments, we may list the parameters\nin parentheses, separated by commas:"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-scala",children:"val average = (a: Int, b: Int) => (a + b) / 2.0\n// average: Function2[Int, Int, Double] = repl.MdocSession$MdocApp$$Lambda/0x0000000128541000@3ebb47be\naverage(7, 10)\n// res0: Double = 8.5\n"})}),"\n",(0,a.jsx)(s.p,{children:"This is actually a luxury!\nWe could make do entirely with functions taking only a single argument."}),"\n",(0,a.jsxs)(s.p,{children:["Of course, one way to do this is to make use of ",(0,a.jsx)(s.a,{href:"/focsipedia2/docs/fp/types#tuples",children:"tuples"}),", but a\nmore interesting solution is to take advantage of\n",(0,a.jsx)(s.a,{href:"/focsipedia2/docs/fp/intro#higher-order-functions",children:"higher-order functions"}),".\nBased on the example above, we could define ",(0,a.jsx)(s.code,{children:"average2"})," as a function that first takes a value\nfor the parameter ",(0,a.jsx)(s.code,{children:"a"})," and then returns another function that expects a value for ",(0,a.jsx)(s.code,{children:"b"}),":"]}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-scala",children:"val average2 = (a: Int) => (b: Int) => (a + b) / 2.0\n// average2: Function1[Int, Function1[Int, Double]] = repl.MdocSession$MdocApp1$$Lambda/0x00000001285419f8@f789aa6\naverage2(7)(10)\n// res2: Double = 8.5\n"})}),"\n",(0,a.jsxs)(s.p,{children:["Now when we apply ",(0,a.jsx)(s.code,{children:"average2"})," to 7, the result is a function value that is then applied to the 10."]}),"\n",(0,a.jsx)(s.p,{children:"Here is the same code, written out more explicitly:"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-scala",children:"val average2: Int => (Int => Double) = (a: Int) => {\n  (b: Int) => {\n    (a + b) / 2.0\n  }\n}\n// average2: Function1[Int, Function1[Int, Double]] = repl.MdocSession$MdocApp3$$Lambda/0x0000000128542858@1e9719fe\nval result1: Int => Double = average2(7)\n// result1: Function1[Int, Double] = repl.MdocSession$MdocApp3$$Lambda/0x0000000128542e38@2b70007f\nval result: Double = result1(10)\n// result: Double = 8.5\n"})}),"\n",(0,a.jsxs)(s.p,{children:["This replacement of multiple-parameter functions with a sequence of single-parameter\nfunctions is called ",(0,a.jsx)(s.strong,{children:"currying"}),", named after the logician Haskell B. Curry.",(0,a.jsx)(s.sup,{children:(0,a.jsx)(s.a,{href:"#user-content-fn-1",id:"user-content-fnref-1","data-footnote-ref":!0,"aria-describedby":"footnote-label",children:"1"})}),"\nOne advantage of this,\nother than the simplicity of only needing one kind of function, is that it is often\nuseful to create a ",(0,a.jsx)(s.strong,{children:"partially applied"})," function, where some of its arguments have\nbeen supplied to create a new function ready to be given the rest. For example, suppose\nwe have a function for formatting exam grades:"]}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-scala",children:'val format_grade = (exam: String, total: Int, name: String, points: Int) => {\n  name + ", " + exam + ": " + points + "/" + total\n}\n// format_grade: Function4[String, Int, String, Int, String] = repl.MdocSession$MdocApp3$$Lambda/0x0000000128543650@70990463\nformat_grade("Midterm", 100, "Brian", 93)\n// res4: String = "Brian, Midterm: 93/100"\n'})}),"\n",(0,a.jsxs)(s.p,{children:["Scala has a built=in operation on functions, ",(0,a.jsx)(s.code,{children:".curried"}),", that produces the curried\nversion of a function:"]}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-scala",children:"val curried_format_grade = format_grade.curried\n// curried_format_grade: Function1[String, Function1[Int, Function1[String, Function1[Int, String]]]] = scala.Function4$$Lambda/0x0000000128526930@31da03a5\n"})}),"\n",(0,a.jsx)(s.p,{children:"We could take advantage of currying to create a specialized function for formatting the\nmidterm grades:"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-scala",children:'val format_midterm = format_grade.curried("Midterm")(100)\n// format_midterm: Function1[String, Function1[Int, String]] = scala.Function4$$Lambda/0x00000001285270c0@493ca0dc\nformat_midterm("Brian")(93)\n// res5: String = "Brian, Midterm: 93/100"\nformat_midterm("Alice")(97)\n// res6: String = "Alice, Midterm: 97/100"\n'})}),"\n",(0,a.jsxs)(s.p,{children:["The first two arguments of ",(0,a.jsx)(s.code,{children:"format_grade"}),' have been provided with the exam name\n("Midterm") and the total number of points (100). Now we have a new function,\nbound to ',(0,a.jsx)(s.code,{children:"format_midterm"}),", that just needs to be applied to a student name and\ngrade, and then it can produce a string with all four components."]}),"\n",(0,a.jsx)(s.h3,{id:"tuples-and-parameters",children:"Tuples and Parameters"}),"\n",(0,a.jsx)(s.p,{children:"It might seem that tuples should be used to pass multiple parameters to\nfunctions, but for reasons of compatibility with Java, Scala gives special treatment\nto multiple-parameter functions. We can force it\nto pass tuples of arguments, and bind them to tuples of parameters, by\nincluding an extra pair of parentheses:"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-scala",children:'def f(p: (String, Int)): String = {\n  val (name, points) = p\n  name + ": " + points + "/100"\n}\nf(("Brian", 93))\n// res8: String = "Brian: 93/100"\n'})}),"\n",(0,a.jsxs)(s.p,{children:["Now, that's ugly, and unless you really need to do that, don't do it. However,\nthis brings up an interesting equivalence of types. Note that the type for ",(0,a.jsx)(s.code,{children:"f"}),"\nhere is ",(0,a.jsx)(s.code,{children:"((string, int)) => string"}),"; in terms of sets, this is the set of\nfunctions ",(0,a.jsxs)(s.span,{className:"katex",children:[(0,a.jsx)(s.span,{className:"katex-mathml",children:(0,a.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,a.jsxs)(s.semantics,{children:[(0,a.jsx)(s.mrow,{children:(0,a.jsxs)(s.msup,{children:[(0,a.jsx)(s.mtext,{children:"string"}),(0,a.jsxs)(s.mrow,{children:[(0,a.jsx)(s.mtext,{children:"string"}),(0,a.jsx)(s.mo,{children:"\xd7"}),(0,a.jsx)(s.mtext,{children:"int"})]})]})}),(0,a.jsx)(s.annotation,{encoding:"application/x-tex",children:"\\text{string}^{\\text{string}\\times\\text{int}}"})]})})}),(0,a.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,a.jsxs)(s.span,{className:"base",children:[(0,a.jsx)(s.span,{className:"strut",style:{height:"1.0827em",verticalAlign:"-0.1944em"}}),(0,a.jsxs)(s.span,{className:"mord",children:[(0,a.jsx)(s.span,{className:"mord text",children:(0,a.jsx)(s.span,{className:"mord",children:"string"})}),(0,a.jsx)(s.span,{className:"msupsub",children:(0,a.jsx)(s.span,{className:"vlist-t",children:(0,a.jsx)(s.span,{className:"vlist-r",children:(0,a.jsx)(s.span,{className:"vlist",style:{height:"0.8883em"},children:(0,a.jsxs)(s.span,{style:{top:"-3.1208em",marginRight:"0.05em"},children:[(0,a.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,a.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,a.jsxs)(s.span,{className:"mord mtight",children:[(0,a.jsx)(s.span,{className:"mord text mtight",children:(0,a.jsx)(s.span,{className:"mord mtight",children:"string"})}),(0,a.jsx)(s.span,{className:"mbin mtight",children:"\xd7"}),(0,a.jsx)(s.span,{className:"mord text mtight",children:(0,a.jsx)(s.span,{className:"mord mtight",children:"int"})})]})})]})})})})})]})]})})]}),". Compare this with the\nequivalent (",(0,a.jsx)(s.a,{href:"/focsipedia2/docs/fp/curry",children:'"curried"'}),") function ",(0,a.jsx)(s.code,{children:"g"}),":"]}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-scala",children:'val g: String => Int => String = (name) => (points) => {\n  name + ": " + points + "/100"\n}\n// g: Function1[String, Function1[Int, String]] = repl.MdocSession$MdocApp7$$Lambda/0x0000000128548a98@5ff23f7e\ng("Brian")(93)\n// res9: String = "Brian: 93/100"\n'})}),"\n",(0,a.jsxs)(s.p,{children:["The type of ",(0,a.jsx)(s.code,{children:"g"})," here is ",(0,a.jsx)(s.code,{children:"string => int => string"}),"; in terms of sets, this is the\nset ",(0,a.jsxs)(s.span,{className:"katex",children:[(0,a.jsx)(s.span,{className:"katex-mathml",children:(0,a.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,a.jsxs)(s.semantics,{children:[(0,a.jsxs)(s.mrow,{children:[(0,a.jsx)(s.mo,{stretchy:"false",children:"("}),(0,a.jsxs)(s.msup,{children:[(0,a.jsx)(s.mtext,{children:"string"}),(0,a.jsx)(s.mtext,{children:"int"})]}),(0,a.jsxs)(s.msup,{children:[(0,a.jsx)(s.mo,{stretchy:"false",children:")"}),(0,a.jsx)(s.mtext,{children:"string"})]})]}),(0,a.jsx)(s.annotation,{encoding:"application/x-tex",children:"(\\text{string}^{\\text{int}})^{\\text{string}}"})]})})}),(0,a.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,a.jsxs)(s.span,{className:"base",children:[(0,a.jsx)(s.span,{className:"strut",style:{height:"1.1383em",verticalAlign:"-0.25em"}}),(0,a.jsx)(s.span,{className:"mopen",children:"("}),(0,a.jsxs)(s.span,{className:"mord",children:[(0,a.jsx)(s.span,{className:"mord text",children:(0,a.jsx)(s.span,{className:"mord",children:"string"})}),(0,a.jsx)(s.span,{className:"msupsub",children:(0,a.jsx)(s.span,{className:"vlist-t",children:(0,a.jsx)(s.span,{className:"vlist-r",children:(0,a.jsx)(s.span,{className:"vlist",style:{height:"0.8883em"},children:(0,a.jsxs)(s.span,{style:{top:"-3.1208em",marginRight:"0.05em"},children:[(0,a.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,a.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,a.jsx)(s.span,{className:"mord mtight",children:(0,a.jsx)(s.span,{className:"mord text mtight",children:(0,a.jsx)(s.span,{className:"mord mtight",children:"int"})})})})]})})})})})]}),(0,a.jsxs)(s.span,{className:"mclose",children:[(0,a.jsx)(s.span,{className:"mclose",children:")"}),(0,a.jsx)(s.span,{className:"msupsub",children:(0,a.jsx)(s.span,{className:"vlist-t",children:(0,a.jsx)(s.span,{className:"vlist-r",children:(0,a.jsx)(s.span,{className:"vlist",style:{height:"0.8305em"},children:(0,a.jsxs)(s.span,{style:{top:"-3.063em",marginRight:"0.05em"},children:[(0,a.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,a.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,a.jsx)(s.span,{className:"mord mtight",children:(0,a.jsx)(s.span,{className:"mord text mtight",children:(0,a.jsx)(s.span,{className:"mord mtight",children:"string"})})})})]})})})})})]})]})})]}),". If these types are truly equivalent,\nin the sense that every function in one corresponds to a unique function in the other,\nthen that suggests that there might be a general equivalence of the form"]}),"\n",(0,a.jsx)(s.span,{className:"katex-display",children:(0,a.jsxs)(s.span,{className:"katex",children:[(0,a.jsx)(s.span,{className:"katex-mathml",children:(0,a.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block",children:(0,a.jsxs)(s.semantics,{children:[(0,a.jsxs)(s.mrow,{children:[(0,a.jsxs)(s.msup,{children:[(0,a.jsx)(s.mi,{children:"A"}),(0,a.jsxs)(s.mrow,{children:[(0,a.jsx)(s.mi,{children:"B"}),(0,a.jsx)(s.mo,{children:"\xd7"}),(0,a.jsx)(s.mi,{children:"C"})]})]}),(0,a.jsx)(s.mo,{children:"\u2261"}),(0,a.jsx)(s.mo,{stretchy:"false",children:"("}),(0,a.jsxs)(s.msup,{children:[(0,a.jsx)(s.mi,{children:"A"}),(0,a.jsx)(s.mi,{children:"C"})]}),(0,a.jsxs)(s.msup,{children:[(0,a.jsx)(s.mo,{stretchy:"false",children:")"}),(0,a.jsx)(s.mi,{children:"B"})]})]}),(0,a.jsx)(s.annotation,{encoding:"application/x-tex",children:"A^{B\\times C}\\equiv(A^C)^B"})]})})}),(0,a.jsxs)(s.span,{className:"katex-html","aria-hidden":"true",children:[(0,a.jsxs)(s.span,{className:"base",children:[(0,a.jsx)(s.span,{className:"strut",style:{height:"0.8913em"}}),(0,a.jsxs)(s.span,{className:"mord",children:[(0,a.jsx)(s.span,{className:"mord mathnormal",children:"A"}),(0,a.jsx)(s.span,{className:"msupsub",children:(0,a.jsx)(s.span,{className:"vlist-t",children:(0,a.jsx)(s.span,{className:"vlist-r",children:(0,a.jsx)(s.span,{className:"vlist",style:{height:"0.8913em"},children:(0,a.jsxs)(s.span,{style:{top:"-3.113em",marginRight:"0.05em"},children:[(0,a.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,a.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,a.jsxs)(s.span,{className:"mord mtight",children:[(0,a.jsx)(s.span,{className:"mord mathnormal mtight",style:{marginRight:"0.05017em"},children:"B"}),(0,a.jsx)(s.span,{className:"mbin mtight",children:"\xd7"}),(0,a.jsx)(s.span,{className:"mord mathnormal mtight",style:{marginRight:"0.07153em"},children:"C"})]})})]})})})})})]}),(0,a.jsx)(s.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,a.jsx)(s.span,{className:"mrel",children:"\u2261"}),(0,a.jsx)(s.span,{className:"mspace",style:{marginRight:"0.2778em"}})]}),(0,a.jsxs)(s.span,{className:"base",children:[(0,a.jsx)(s.span,{className:"strut",style:{height:"1.1413em",verticalAlign:"-0.25em"}}),(0,a.jsx)(s.span,{className:"mopen",children:"("}),(0,a.jsxs)(s.span,{className:"mord",children:[(0,a.jsx)(s.span,{className:"mord mathnormal",children:"A"}),(0,a.jsx)(s.span,{className:"msupsub",children:(0,a.jsx)(s.span,{className:"vlist-t",children:(0,a.jsx)(s.span,{className:"vlist-r",children:(0,a.jsx)(s.span,{className:"vlist",style:{height:"0.8913em"},children:(0,a.jsxs)(s.span,{style:{top:"-3.113em",marginRight:"0.05em"},children:[(0,a.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,a.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,a.jsx)(s.span,{className:"mord mathnormal mtight",style:{marginRight:"0.07153em"},children:"C"})})]})})})})})]}),(0,a.jsxs)(s.span,{className:"mclose",children:[(0,a.jsx)(s.span,{className:"mclose",children:")"}),(0,a.jsx)(s.span,{className:"msupsub",children:(0,a.jsx)(s.span,{className:"vlist-t",children:(0,a.jsx)(s.span,{className:"vlist-r",children:(0,a.jsx)(s.span,{className:"vlist",style:{height:"0.8913em"},children:(0,a.jsxs)(s.span,{style:{top:"-3.113em",marginRight:"0.05em"},children:[(0,a.jsx)(s.span,{className:"pstrut",style:{height:"2.7em"}}),(0,a.jsx)(s.span,{className:"sizing reset-size6 size3 mtight",children:(0,a.jsx)(s.span,{className:"mord mathnormal mtight",style:{marginRight:"0.05017em"},children:"B"})})]})})})})})]})]})]})]})}),"\n",(0,a.jsx)(s.p,{children:"This is indeed true (and it should remind you of a corresponding fact about exponents from\nordinary algebra), and we can write the functions in Scala that mediate this\nequivalence:"}),"\n",(0,a.jsx)(s.pre,{children:(0,a.jsx)(s.code,{className:"language-scala",children:"def curry[A, B, C](f: ((B, C)) => A): B => C => A = {\n  (b: B) => (c: C) => f((b, c))\n}\ndef uncurry[A, B, C](g: B => C => A): ((B, C)) => A = {\n  (p: (B, C)) => g(p._1)(p._2)\n}\n"})}),"\n",(0,a.jsxs)(s.p,{children:["That is, given any function from the pair type ",(0,a.jsx)(s.code,{children:"(B, C)"})," to ",(0,a.jsx)(s.code,{children:"A"})," (",(0,a.jsx)(s.code,{children:"A"}),",\n",(0,a.jsx)(s.code,{children:"B"}),", and ",(0,a.jsx)(s.code,{children:"C"})," are ",(0,a.jsx)(s.a,{href:"/focsipedia2/docs/fp/types#type-aliases-and-parameterized-types",children:"type parameters"}),"),\nwe can apply the ",(0,a.jsx)(s.code,{children:"curry"})," function to\nit to get the corresponding curried function of type ",(0,a.jsx)(s.code,{children:"B => C => A"}),". The ",(0,a.jsx)(s.code,{children:"uncurry"}),"\nfunction is the inverse of this. Since we have functions going each direction that\nare inverses to each other, this shows that the two types (or sets) are equivalent."]}),"\n","\n",(0,a.jsxs)(s.section,{"data-footnotes":!0,className:"footnotes",children:[(0,a.jsx)(s.h2,{className:"sr-only",id:"footnote-label",children:"Footnotes"}),"\n",(0,a.jsxs)(s.ol,{children:["\n",(0,a.jsxs)(s.li,{id:"user-content-fn-1",children:["\n",(0,a.jsxs)(s.p,{children:['As is often the case when things are named, Curry did not originate this idea. He got it\nfrom Moses Sch\xf6nfinkel, who may have picked it up from Gottlob Frege, but "currying"\nis easier to say than "sch\xf6nfinkeling" or "fregeing"\u2026. ',(0,a.jsx)(s.a,{href:"#user-content-fnref-1","data-footnote-backref":"","aria-label":"Back to reference 1",className:"data-footnote-backref",children:"\u21a9"})]}),"\n"]}),"\n"]}),"\n"]})]})}function m(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,a.jsx)(s,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>r,x:()=>c});var a=n(6540);const t={},i=a.createContext(t);function r(e){const s=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),a.createElement(i.Provider,{value:s},e.children)}}}]);