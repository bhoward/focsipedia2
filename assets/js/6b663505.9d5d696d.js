"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[4102],{4839:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var s=t(4848),a=t(8453);const r={id:"parser-comb",title:"Recursive Descent and Parser Combinators"},i=void 0,l={id:"fp/parser-comb",title:"Recursive Descent and Parser Combinators",description:"It is particularly easy to turn an LL(1) grammar into an efficient parser",source:"@site/focsipedia-docs/target/mdoc/fp/parser-comb.md",sourceDirName:"fp",slug:"/fp/parser-comb",permalink:"/focsipedia2/docs/fp/parser-comb",draft:!1,unlisted:!1,editUrl:"https://github.com/bhoward/focsipedia2/tree/main/focsipedia-docs/target/mdoc/fp/parser-comb.md",tags:[],version:"current",frontMatter:{id:"parser-comb",title:"Recursive Descent and Parser Combinators"},sidebar:"mySidebar",previous:{title:"State Machines in Java and ReasonML",permalink:"/focsipedia2/docs/fp/state"},next:{title:"Lambda Calculus",permalink:"/focsipedia2/docs/fp/lambda"}},c={},p=[{value:"Parser Combinators",id:"parser-combinators",level:2}];function m(e){const n={a:"a",annotation:"annotation",code:"code",h2:"h2",math:"math",mi:"mi",mn:"mn",mo:"mo",mrow:"mrow",mstyle:"mstyle",msub:"msub",mtable:"mtable",mtd:"mtd",mtext:"mtext",mtr:"mtr",p:"p",pre:"pre",semantics:"semantics",span:"span",strong:"strong",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["It is particularly easy to turn an LL(1) grammar into an efficient parser\nusing the technique of ",(0,s.jsx)(n.strong,{children:"recursive descent parsing"}),". For each non-terminal in\nthe grammar, we write a function that recognizes strings produced from that\nnon-terminal. If there are multiple productions for the non-terminal, we use\nthe next available character to decide which one to use. To parse the right-hand\nside of the chosen production rule, we have to recognize a sequence of terminals\nand non-terminals in order. To recognize a terminal, we just check that the current\ncharacter from the input matches the expected symbol. To recognize a non-terminal,\nwe call the associated function for that non-terminal."]}),"\n",(0,s.jsxs)(n.p,{children:["Therefore, our parser will be a set of mutually recursive functions, one for each\nnon-terminal. To parse a word in the language, we call the function corresponding\nto the starting non-terminal; if that function returns without error, then we have\nsuccessfully matched a word. In addition to recognizing a string of characters, it\nis common for each recursive descent parsing function to return a data structure\n(the parse tree, or a close relative known as an ",(0,s.jsx)(n.strong,{children:"abstract syntax tree"}),") representing\nthe input that was parsed."]}),"\n",(0,s.jsxs)(n.p,{children:["Here is code for a recursive descent parser in Java, corresponding to the following\ngrammar (expressed here in ",(0,s.jsx)(n.a,{href:"/focsipedia2/docs/lang/bnf",children:"Backus-Naur form"}),"; it is very similar\nto the example ",(0,s.jsxs)(n.span,{className:"katex",children:[(0,s.jsx)(n.span,{className:"katex-mathml",children:(0,s.jsx)(n.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,s.jsxs)(n.semantics,{children:[(0,s.jsx)(n.mrow,{children:(0,s.jsxs)(n.msub,{children:[(0,s.jsx)(n.mi,{children:"G"}),(0,s.jsx)(n.mn,{children:"2"})]})}),(0,s.jsx)(n.annotation,{encoding:"application/x-tex",children:"G_2"})]})})}),(0,s.jsx)(n.span,{className:"katex-html","aria-hidden":"true",children:(0,s.jsxs)(n.span,{className:"base",children:[(0,s.jsx)(n.span,{className:"strut",style:{height:"0.8333em",verticalAlign:"-0.15em"}}),(0,s.jsxs)(n.span,{className:"mord",children:[(0,s.jsx)(n.span,{className:"mord mathnormal",children:"G"}),(0,s.jsx)(n.span,{className:"msupsub",children:(0,s.jsxs)(n.span,{className:"vlist-t vlist-t2",children:[(0,s.jsxs)(n.span,{className:"vlist-r",children:[(0,s.jsx)(n.span,{className:"vlist",style:{height:"0.3011em"},children:(0,s.jsxs)(n.span,{style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"},children:[(0,s.jsx)(n.span,{className:"pstrut",style:{height:"2.7em"}}),(0,s.jsx)(n.span,{className:"sizing reset-size6 size3 mtight",children:(0,s.jsx)(n.span,{className:"mord mtight",children:"2"})})]})}),(0,s.jsx)(n.span,{className:"vlist-s",children:"\u200b"})]}),(0,s.jsx)(n.span,{className:"vlist-r",children:(0,s.jsx)(n.span,{className:"vlist",style:{height:"0.15em"},children:(0,s.jsx)(n.span,{})})})]})})]})]})})]})," discussed in the ",(0,s.jsx)(n.a,{href:"/focsipedia2/docs/lang/parsing",children:"parsing"})," section):"]}),"\n",(0,s.jsx)(n.span,{className:"katex-display",children:(0,s.jsxs)(n.span,{className:"katex",children:[(0,s.jsx)(n.span,{className:"katex-mathml",children:(0,s.jsx)(n.math,{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block",children:(0,s.jsxs)(n.semantics,{children:[(0,s.jsxs)(n.mtable,{rowspacing:"0.25em",columnalign:"right left",columnspacing:"0em",children:[(0,s.jsxs)(n.mtr,{children:[(0,s.jsx)(n.mtd,{children:(0,s.jsx)(n.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,s.jsxs)(n.mrow,{children:[(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e8"}),(0,s.jsx)(n.mtext,{mathvariant:"italic",children:"Expr"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e9"}),(0,s.jsx)(n.mtext,{children:"\xa0"})]})})}),(0,s.jsx)(n.mtd,{children:(0,s.jsx)(n.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,s.jsxs)(n.mrow,{children:[(0,s.jsx)(n.mrow,{}),(0,s.jsx)(n.mo,{children:":"}),(0,s.jsx)(n.mo,{children:":"}),(0,s.jsx)(n.mo,{children:"="}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e8"}),(0,s.jsx)(n.mtext,{mathvariant:"italic",children:"Term"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e9"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"["}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"("}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{children:"+"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mi,{mathvariant:"normal",children:"\u2223"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{children:"\u2212"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:")"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e8"}),(0,s.jsx)(n.mtext,{mathvariant:"italic",children:"Term"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e9"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"]"}),(0,s.jsx)(n.mo,{children:"\u2026"})]})})})]}),(0,s.jsxs)(n.mtr,{children:[(0,s.jsx)(n.mtd,{children:(0,s.jsx)(n.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,s.jsxs)(n.mrow,{children:[(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e8"}),(0,s.jsx)(n.mtext,{mathvariant:"italic",children:"Term"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e9"}),(0,s.jsx)(n.mtext,{children:"\xa0"})]})})}),(0,s.jsx)(n.mtd,{children:(0,s.jsx)(n.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,s.jsxs)(n.mrow,{children:[(0,s.jsx)(n.mrow,{}),(0,s.jsx)(n.mo,{children:":"}),(0,s.jsx)(n.mo,{children:":"}),(0,s.jsx)(n.mo,{children:"="}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e8"}),(0,s.jsx)(n.mtext,{mathvariant:"italic",children:"Factor"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e9"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"["}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"("}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{children:"\u2217"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mi,{mathvariant:"normal",children:"\u2223"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mi,{mathvariant:"normal",children:"/"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:")"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e8"}),(0,s.jsx)(n.mtext,{mathvariant:"italic",children:"Factor"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e9"}),(0,s.jsx)(n.mtext,{children:"\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"]"}),(0,s.jsx)(n.mo,{children:"\u2026"})]})})})]}),(0,s.jsxs)(n.mtr,{children:[(0,s.jsx)(n.mtd,{children:(0,s.jsx)(n.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,s.jsxs)(n.mrow,{children:[(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e8"}),(0,s.jsx)(n.mtext,{mathvariant:"italic",children:"Factor"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e9"}),(0,s.jsx)(n.mtext,{children:"\xa0"})]})})}),(0,s.jsx)(n.mtd,{children:(0,s.jsx)(n.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,s.jsxs)(n.mrow,{children:[(0,s.jsx)(n.mrow,{}),(0,s.jsx)(n.mo,{children:":"}),(0,s.jsx)(n.mo,{children:":"}),(0,s.jsx)(n.mo,{children:"="}),(0,s.jsx)(n.mtext,{children:"\xa0ident\xa0"}),(0,s.jsx)(n.mi,{mathvariant:"normal",children:"\u2223"}),(0,s.jsx)(n.mtext,{children:"\xa0num\xa0"}),(0,s.jsx)(n.mi,{mathvariant:"normal",children:"\u2223"}),(0,s.jsx)(n.mtext,{children:"\xa0\u201c(\u201d\xa0"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e8"}),(0,s.jsx)(n.mtext,{mathvariant:"italic",children:"Expr"}),(0,s.jsx)(n.mo,{stretchy:"false",children:"\u27e9"}),(0,s.jsx)(n.mtext,{children:"\xa0\u201c)\u201d"})]})})})]})]}),(0,s.jsx)(n.annotation,{encoding:"application/x-tex",children:"\\begin{aligned}\n\\langle\\textit{Expr}\\rangle\\ &::=\\ \\langle\\textit{Term}\\rangle\\ [\\ (\\ +\\ |\\ -\\ )\\ \\langle\\textit{Term}\\rangle\\ ]\\ldots\\\\\n\\langle\\textit{Term}\\rangle\\ &::=\\ \\langle\\textit{Factor}\\rangle\\ [\\ (\\ *\\ |\\ /\\ )\\ \\langle\\textit{Factor}\\rangle\\ ]\\ldots\\\\\n\\langle\\textit{Factor}\\rangle\\ &::=\\ \\textrm{ident}\\ |\\ \\textrm{num}\\ |\\ \\textrm{``(''}\\ \\langle\\textit{Expr}\\rangle\\ \\textrm{``)''}\n\\end{aligned}"})]})})}),(0,s.jsx)(n.span,{className:"katex-html","aria-hidden":"true",children:(0,s.jsxs)(n.span,{className:"base",children:[(0,s.jsx)(n.span,{className:"strut",style:{height:"4.5em",verticalAlign:"-2em"}}),(0,s.jsx)(n.span,{className:"mord",children:(0,s.jsxs)(n.span,{className:"mtable",children:[(0,s.jsx)(n.span,{className:"col-align-r",children:(0,s.jsxs)(n.span,{className:"vlist-t vlist-t2",children:[(0,s.jsxs)(n.span,{className:"vlist-r",children:[(0,s.jsxs)(n.span,{className:"vlist",style:{height:"2.5em"},children:[(0,s.jsxs)(n.span,{style:{top:"-4.66em"},children:[(0,s.jsx)(n.span,{className:"pstrut",style:{height:"3em"}}),(0,s.jsxs)(n.span,{className:"mord",children:[(0,s.jsx)(n.span,{className:"mopen",children:"\u27e8"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textit",children:"Expr"})}),(0,s.jsx)(n.span,{className:"mclose",children:"\u27e9"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"})]})]}),(0,s.jsxs)(n.span,{style:{top:"-3.16em"},children:[(0,s.jsx)(n.span,{className:"pstrut",style:{height:"3em"}}),(0,s.jsxs)(n.span,{className:"mord",children:[(0,s.jsx)(n.span,{className:"mopen",children:"\u27e8"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textit",children:"Term"})}),(0,s.jsx)(n.span,{className:"mclose",children:"\u27e9"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"})]})]}),(0,s.jsxs)(n.span,{style:{top:"-1.66em"},children:[(0,s.jsx)(n.span,{className:"pstrut",style:{height:"3em"}}),(0,s.jsxs)(n.span,{className:"mord",children:[(0,s.jsx)(n.span,{className:"mopen",children:"\u27e8"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textit",children:"Factor"})}),(0,s.jsx)(n.span,{className:"mclose",children:"\u27e9"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"})]})]})]}),(0,s.jsx)(n.span,{className:"vlist-s",children:"\u200b"})]}),(0,s.jsx)(n.span,{className:"vlist-r",children:(0,s.jsx)(n.span,{className:"vlist",style:{height:"2em"},children:(0,s.jsx)(n.span,{})})})]})}),(0,s.jsx)(n.span,{className:"col-align-l",children:(0,s.jsxs)(n.span,{className:"vlist-t vlist-t2",children:[(0,s.jsxs)(n.span,{className:"vlist-r",children:[(0,s.jsxs)(n.span,{className:"vlist",style:{height:"2.5em"},children:[(0,s.jsxs)(n.span,{style:{top:"-4.66em"},children:[(0,s.jsx)(n.span,{className:"pstrut",style:{height:"3em"}}),(0,s.jsxs)(n.span,{className:"mord",children:[(0,s.jsx)(n.span,{className:"mord"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.jsx)(n.span,{className:"mrel",children:"::="}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.jsx)(n.span,{className:"mopen",children:"\u27e8"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textit",children:"Term"})}),(0,s.jsx)(n.span,{className:"mclose",children:"\u27e9"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mopen",children:"["}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mopen",children:"("}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord",children:"+"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord",children:"\u2223"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord",children:"\u2212"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mclose",children:")"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mopen",children:"\u27e8"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textit",children:"Term"})}),(0,s.jsx)(n.span,{className:"mclose",children:"\u27e9"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mclose",children:"]"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.jsx)(n.span,{className:"minner",children:"\u2026"})]})]}),(0,s.jsxs)(n.span,{style:{top:"-3.16em"},children:[(0,s.jsx)(n.span,{className:"pstrut",style:{height:"3em"}}),(0,s.jsxs)(n.span,{className:"mord",children:[(0,s.jsx)(n.span,{className:"mord"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.jsx)(n.span,{className:"mrel",children:"::="}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.jsx)(n.span,{className:"mopen",children:"\u27e8"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textit",children:"Factor"})}),(0,s.jsx)(n.span,{className:"mclose",children:"\u27e9"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mopen",children:"["}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mopen",children:"("}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord",children:"\u2217"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord",children:"\u2223"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord",children:"/"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mclose",children:")"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mopen",children:"\u27e8"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textit",children:"Factor"})}),(0,s.jsx)(n.span,{className:"mclose",children:"\u27e9"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mclose",children:"]"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.jsx)(n.span,{className:"minner",children:"\u2026"})]})]}),(0,s.jsxs)(n.span,{style:{top:"-1.66em"},children:[(0,s.jsx)(n.span,{className:"pstrut",style:{height:"3em"}}),(0,s.jsxs)(n.span,{className:"mord",children:[(0,s.jsx)(n.span,{className:"mord"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.jsx)(n.span,{className:"mrel",children:"::="}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textrm",children:"ident"})}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord",children:"\u2223"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textrm",children:"num"})}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord",children:"\u2223"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textrm",children:"\u201c(\u201d"})}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mopen",children:"\u27e8"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textit",children:"Expr"})}),(0,s.jsx)(n.span,{className:"mclose",children:"\u27e9"}),(0,s.jsx)(n.span,{className:"mspace",children:"\xa0"}),(0,s.jsx)(n.span,{className:"mord text",children:(0,s.jsx)(n.span,{className:"mord textrm",children:"\u201c)\u201d"})})]})]})]}),(0,s.jsx)(n.span,{className:"vlist-s",children:"\u200b"})]}),(0,s.jsx)(n.span,{className:"vlist-r",children:(0,s.jsx)(n.span,{className:"vlist",style:{height:"2em"},children:(0,s.jsx)(n.span,{})})})]})})]})})]})})]})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-java",children:"/**\n * Represents an expression node in an abstract syntax tree.\n */\npublic interface Expr {\n\t// instance methods appropriate to the application should be declared here\n\n\t/**\n\t * Parse an expression (sum/difference of one or more terms).\n\t * \n\t * @param input\n\t * @return\n\t */\n\tpublic static Expr parse(Input input) {\n\t\tExpr e = parseTerm(input);\n\t\twhile (input.peek() == '+' || input.peek() == '-') {\n\t\t\tBinOp op = BinOp.parse(input);\n\t\t\tExpr e2 = Expr.parseTerm(input);\n\t\t\te = new BinOpExpr(e, op, e2);\n\t\t}\n\t\treturn e;\n\t}\n\n\t/**\n\t * Parse a term (product/quotient of one or more factors).\n\t * \n\t * @param input\n\t * @return\n\t */\n\tpublic static Expr parseTerm(Input input) {\n\t\tExpr e = parseFactor(input);\n\t\twhile (input.peek() == '*' || input.peek() == '/') {\n\t\t\tBinOp op = BinOp.parse(input);\n\t\t\tExpr e2 = Expr.parseFactor(input);\n\t\t\te = new BinOpExpr(e, op, e2);\n\t\t}\n\t\treturn e;\n\t}\n\n\t/**\n\t * Parse a factor (identifier, number, or parenthesized expression). Throws a\n\t * RuntimeException if a factor is not available.\n\t * \n\t * @param input\n\t * @return\n\t */\n\tpublic static Expr parseFactor(Input input) {\n\t\tif (Character.isLetter(input.peek())) {\n\t\t\tString id = input.readIdent();\n\t\t\treturn new IdentExpr(id);\n\t\t} else if (Character.isDigit(input.peek())) {\n\t\t\tint n = input.readInt();\n\t\t\treturn new NumExpr(n);\n\t\t} else if (input.peek() == '(') {\n\t\t\tinput.skip();\n\t\t\tExpr e = parse(input);\n\t\t\tinput.match(')');\n\t\t\treturn e;\n\t\t} else {\n\t\t\tthrow new RuntimeException(\"expected a factor\");\n\t\t}\n\t}\n}\n\npublic class BinOpExpr implements Expr {\n\tprivate Expr left, right;\n\tprivate BinOp op;\n\n\tpublic BinOpExpr(Expr left, BinOp op, Expr right) {\n\t\tthis.left = left;\n\t\tthis.op = op;\n\t\tthis.right = right;\n\t}\n\n\tpublic String toString() {\n\t\treturn \"BinOp(\" + left + \", \" + op + \", \" + right + \")\";\n\t}\n}\n\npublic class IdentExpr implements Expr {\n\tprivate String id;\n\n\tpublic IdentExpr(String id) {\n\t\tthis.id = id;\n\t}\n\n\tpublic String toString() {\n\t\treturn \"Ident(\" + id + \")\";\n\t}\n}\n\npublic class NumExpr implements Expr {\n\tprivate int n;\n\n\tpublic NumExpr(int n) {\n\t\tthis.n = n;\n\t}\n\n\tpublic String toString() {\n\t\treturn \"Num(\" + n + \")\";\n\t}\n}\n\n/**\n * Represents the binary operators available in the abstract syntax for\n * expressions.\n */\npublic enum BinOp {\n\tPLUS, MINUS, TIMES, DIVIDE;\n\n\t/**\n\t * Parse a binary operator from the given Input. Should only be called when the\n\t * current character may start an operator.\n\t * \n\t * @param input\n\t * @return\n\t */\n\tstatic BinOp parse(Input input) {\n\t\tswitch (input.peek()) {\n\t\tcase '+':\n\t\t\tinput.skip();\n\t\t\treturn PLUS;\n\t\tcase '-':\n\t\t\tinput.skip();\n\t\t\treturn MINUS;\n\t\tcase '*':\n\t\t\tinput.skip();\n\t\t\treturn TIMES;\n\t\tcase '/':\n\t\t\tinput.skip();\n\t\t\treturn DIVIDE;\n\t\tdefault:\n\t\t\treturn null; // shouldn't happen\n\t\t}\n\t}\n}\n\n/**\n * Wrapper around a Reader that provides useful abstractions for recursive\n * descent parsing.\n */\npublic class Input {\n\tprivate java.io.Reader source;\n\tprivate char next;\n\tprivate boolean atEnd;\n\n\tpublic Input(java.io.Reader source) {\n\t\tthis.source = source;\n\t\tskip();\n\t}\n\n\t/**\n\t * @return current available character\n\t */\n\tpublic char peek() {\n\t\treturn next;\n\t}\n\n\t/**\n\t * @return true if no more characters available\n\t */\n\tpublic boolean atEnd() {\n\t\treturn atEnd;\n\t}\n\n\t/**\n\t * Read the next available character, skipping over whitespace\n\t */\n\tpublic void skip() {\n\t\treadNext();\n\t\tskipWhitespace();\n\t}\n\n\t/**\n\t * If the current character is c, skip to the next. Throw a RuntimeException if\n\t * the character does not match.\n\t * \n\t * @param c\n\t */\n\tpublic void match(char c) {\n\t\tif (next == c) {\n\t\t\tskip();\n\t\t} else {\n\t\t\tthrow new RuntimeException(\"expected \" + c + \" but found \" + next);\n\t\t}\n\t}\n\n\t/**\n\t * Read an identifier (letter followed by zero or more letters or digits). This\n\t * should only be called when the current character is a letter.\n\t * \n\t * @return the identifier\n\t */\n\tpublic String readIdent() {\n\t\tStringBuilder builder = new StringBuilder();\n\t\tbuilder.append(next);\n\t\treadNext();\n\t\twhile (!atEnd && Character.isLetterOrDigit(next)) {\n\t\t\tbuilder.append(next);\n\t\t\treadNext();\n\t\t}\n\t\tskipWhitespace();\n\t\treturn builder.toString();\n\t}\n\n\t/**\n\t * Read an integer (digit followed by zero or more additional digits). This\n\t * should only be called when the current character is a digit.\n\t * \n\t * @return the number\n\t */\n\tpublic int readInt() {\n\t\tint result = next - '0';\n\t\treadNext();\n\t\twhile (!atEnd && Character.isDigit(next)) {\n\t\t\tresult = result * 10 + next - '0';\n\t\t\treadNext();\n\t\t}\n\t\tskipWhitespace();\n\t\treturn result;\n\t}\n\n\tprivate void readNext() {\n\t\ttry {\n\t\t\tint c = source.read();\n\t\t\tif (c != -1) {\n\t\t\t\tnext = (char) c;\n\t\t\t\tatEnd = false;\n\t\t\t} else {\n\t\t\t\tnext = '\\0';\n\t\t\t\tatEnd = true;\n\t\t\t}\n\t\t} catch (java.io.IOException e) {\n\t\t\tnext = '\\0';\n\t\t\tatEnd = true;\n\t\t}\n\t}\n\n\tprivate void skipWhitespace() {\n\t\twhile (!atEnd && Character.isWhitespace(next)) {\n\t\t\treadNext();\n\t\t}\n\t}\n}\n\npublic class Demo {\n\tpublic static void main(String[] args) {\n\t\tString sample = \"  3*abc + (x1 - x0) * r2d2/42 \\n\";\n\t\tInput input = new Input(new StringReader(sample));\n\t\tExpr e = Expr.parse(input);\n\t\tif (input.atEnd()) {\n\t\t\tSystem.out.println(\"Found \" + e);\n\t\t} else {\n\t\t\tSystem.out.println(\"unscanned input after parsing \" + e);\n\t\t}\n\t}\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"parser-combinators",children:"Parser Combinators"}),"\n",(0,s.jsxs)(n.p,{children:["Instead of giving a direct translation of the Java version into ReasonML, it is\ncommon in functional languages to use what are known as ",(0,s.jsx)(n.strong,{children:"parser combinators"}),'\nto write recursive descent parsers. A parser is viewed as a function from input\nto the pair of a result plus the remaining input (since in a functional language\nwe do not want to use side-effects to update the "current character" available from\nan input source). A parser combinator is then a function that can combine one or\nmore of these parsing functions into a composite parser.']}),"\n",(0,s.jsxs)(n.p,{children:["For example, given parsers ",(0,s.jsx)(n.code,{children:"p1"})," and ",(0,s.jsx)(n.code,{children:"p2"}),", the combinator ",(0,s.jsx)(n.code,{children:"<|>"})," produces the parser\n",(0,s.jsx)(n.code,{children:"p1 <|> p2"})," which attempts to parse according to ",(0,s.jsx)(n.code,{children:"p1"}),"; if it fails, then it attempts\nto use ",(0,s.jsx)(n.code,{children:"p2"})," instead. This corresponds to the ",(0,s.jsxs)(n.span,{className:"katex",children:[(0,s.jsx)(n.span,{className:"katex-mathml",children:(0,s.jsx)(n.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,s.jsxs)(n.semantics,{children:[(0,s.jsx)(n.mrow,{children:(0,s.jsx)(n.mi,{mathvariant:"normal",children:"\u2223"})}),(0,s.jsx)(n.annotation,{encoding:"application/x-tex",children:"|"})]})})}),(0,s.jsx)(n.span,{className:"katex-html","aria-hidden":"true",children:(0,s.jsxs)(n.span,{className:"base",children:[(0,s.jsx)(n.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.jsx)(n.span,{className:"mord",children:"\u2223"})]})})]})," (choice) operator in BNF (and also\nin regular expressions). Some of the other combinators used below are ",(0,s.jsx)(n.code,{children:"<*>"}),", which\ncorresponds to sequencing one parser after another, and ",(0,s.jsx)(n.code,{children:"rep"}),", which repeats a\nparser zero or more times (like the Kleene star)."]}),"\n",(0,s.jsxs)(n.p,{children:["Here is code for parser combinators in ReasonML, based on\n",(0,s.jsx)(n.a,{href:"https://github.com/henoc/bs-little-parser",children:"bs-little-parser"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-reason",metastring:"edit",children:"module Input = {\n  type t = {text: string, index: int, whitespace: string};\n\n  let fromString = s => {text: s, index: 0, whitespace: \" \\t\\n\"};\n\n  let skipWhitespace = input => {\n    let whitespace = input.whitespace;\n    let spaceChars = List.init(String.length(whitespace), String.get(whitespace));\n    \n    let rec aux = input => {\n      if (String.length(input.text) <= input.index) {\n        input \n      } else if (List.mem(input.text.[input.index], spaceChars)) {\n        aux({...input, index: input.index+1})\n      } else {\n        input\n      }\n    };\n    aux(input)\n  };\n\n  let atEnd = input => {\n    input.index == String.length(input.text)\n  };\n};\n\nmodule Result = {\n  type t('a, 'b) = Ok('a) | Error('b);\n\n  let map = (f, result) => {\n    switch (result) {\n    | Ok(r) => Ok(f(r))\n    | Error(s) => Error(s)\n    }\n  };\n\n  let get = result => {\n    switch (result) {\n    | Ok(r) => Some(r)\n    | _ => None\n    }\n  };\n};\n\nmodule Parser = {\n  type parseResult('a) = Result.t(('a, Input.t), (string, Input.t))\n  type t('a) = Input.t => parseResult('a);\n\n  let success = (result, input): parseResult('a) =>\n    Result.Ok((result, input));\n  \n  let failure = (message, input): parseResult('a) =>\n    Result.Error((message, input));\n\n  let ( <*> ) = (p: t('a), q: t('b), input) => {\n    switch (p(input)) {\n    | Result.Ok((result1, input2)) =>\n        switch (q(input2)) {\n        | Result.Ok((result2, input3)) =>\n            success((result1, result2), input3)\n        | Result.Error((message, input)) =>\n            failure(message, input)\n        }\n    | Result.Error((message, input)) =>\n        failure(message, input)\n    }\n  };\n\n  let ( <* ) = (p: t('a), q: t('b), input) => {\n    switch(p(input)) {\n    | Result.Ok((result1, input2)) =>\n        switch (q(input2)) {\n        | Result.Ok((_, input3)) =>\n            success(result1, input3)\n        | Result.Error((message, input)) =>\n            failure(message, input)\n        }\n    | Result.Error((message, input)) =>\n        failure(message, input)\n    }\n  };\n\n  let ( *> ) = (p: t('a), q: t('b), input) => {\n    switch(p(input)) {\n    | Result.Ok((_, input2)) =>\n        switch (q(input2)) {\n        | Result.Ok((result2, input3)) =>\n            success(result2, input3)\n        | Result.Error((message, input)) =>\n            failure(message, input)\n        }\n    | Result.Error((message, input)) =>\n        failure(message, input)\n    }\n  };\n\n  let ( <|> ) = (p: t('a), q: t('a), input) => {\n    switch (p(input)) {\n    | Result.Ok((s, t)) => success(s, t)\n    | _ => q(input)\n    }\n  };\n\n  let rep = (p: t('a), input) => {\n    let rec aux = (accum, input) => {\n      switch (p(input)) {\n      | Result.Ok((r, i)) => aux([r, ...accum], i)\n      | _ => success(List.rev(accum), input)\n      }\n    };\n\n    aux([], input);\n  };\n\n  let rep1 = (p: t('a)) => p <*> rep(p);\n\n  let opt = (p: t('a), input) => {\n    switch (p(input)) {\n    | Result.Ok((r, i)) => success(Some(r), i)\n    | _ => success(None, input)\n    }\n  };\n\n  let andPred = (p: t('a), input) => {\n    switch (p(input)) {\n    | Result.Ok((r, _)) => success(r, input)\n    | Result.Error((message, input)) => failure(message, input)\n    }\n  };\n\n  let notPred = (p: t('a), input) => {\n    switch (p(input)) {\n    | Result.Ok((_, i)) => failure(\"notPred failure\", i)\n    | _ => success((), input)\n    }\n  };\n\n  let ( >> ) = (p: t('a), f, input) => {\n    switch (p(input)) {\n    | Result.Ok((r, i)) => f(r, i)\n    | Result.Error((message, input)) => failure(message, input)\n    }\n  };\n\n  let ( ^^ ) = (p: t('a), f, input): parseResult('b) =>\n    Result.map(((r, i)) => (f(r), i), p(input));\n\n  let chr = (c, rawInput) => {\n    let input = Input.skipWhitespace(rawInput);\n    if (Input.atEnd(input)) {\n      failure(\"not enough input\", input)\n    } else {\n      let firstChar = input.text.[input.index];\n      if (firstChar == c) {\n        success(c, {...input, index: input.index+1})\n      } else {\n        failure(Printf.sprintf(\"mismatch: %C found, expected %C\", firstChar, c), input)\n      }\n    }\n  };\n\n  let str = (s, rawInput) => {\n    let input = Input.skipWhitespace(rawInput);\n    let slen = String.length(s);\n    if (String.length(input.text) - slen < input.index) {\n      failure(\"not enough input\", input)\n    } else {\n      let substr = String.sub(input.text, input.index, slen);\n      if (substr == s) {\n        success(s, {...input, index: input.index+slen})\n      } else {\n        failure(Printf.sprintf(\"mismatch: %S found, expected %S\", substr, s), input)\n      }\n    }\n  };\n\n  let dfa = (init, step, finish, rawInput) => {\n    let input = Input.skipWhitespace(rawInput);\n    let rec aux = (state, i) => {\n      if (Input.atEnd(i)) {\n        (state, i)\n      } else {\n        let nextChar = i.text.[i.index];\n        switch (step(state, nextChar)) {\n        | Some(nextState) => aux(nextState, {...i, index: i.index+1})\n        | None => (state, i)\n        }\n      }\n    };\n    let (finalState, input2) = aux(init, input);\n    switch (finish(finalState)) {\n    | Ok(result) => success(result, input2)\n    | Error(message) => failure(message, input2)\n    }\n  };\n\n  let eoi = (rawInput) => {\n    let input = Input.skipWhitespace(rawInput);\n    let remain = String.length(input.text) - input.index;\n    if (remain == 0) {\n      success((), input)\n    } else {\n      failure(Printf.sprintf(\"unscanned input at end of parse: %S\", String.sub(input.text, input.index, remain)), input)\n    }\n  };\n\n  let parse = (input, parser: t('a)) => {\n    parser(input)\n  };\n\n  let parseAll = (input, parser: t('a)) => {\n    (parser <* eoi)(input)\n  };\n\n  let test = (parser: t('a), s) => {\n    switch (parseAll(Input.fromString(s), parser)) {\n    | Result.Ok((r, _)) => r\n    | Result.Error((m, _)) => failwith(m)\n    }\n  }\n};\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Here is the parser for arithmetic expressions, corresponding to the Java example above.\nNote how the definitions of ",(0,s.jsx)(n.code,{children:"expr"}),", ",(0,s.jsx)(n.code,{children:"term"}),", and ",(0,s.jsx)(n.code,{children:"factor"})," are very close to the original BNF:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-reason",metastring:"edit",children:"open Parser;\n\ntype exp =\n  | Ident(string)\n  | Num(int)\n  | BinOp(exp, char, exp);\n\nlet isLetter = c => ('A' <= c && c <= 'Z') || ('a' <= c && c <= 'z');\nlet isDigit = c => ('0' <= c && c <= '9');\nlet isLetterOrDigit = c => isLetter(c) || isDigit(c);\n\nlet ident = dfa(\n  \"\",\n  (s, c) => if ((s == \"\" && isLetter(c)) || (s != \"\" && isLetterOrDigit(c))) {\n      Some(s ++ String.make(1, c))\n    } else {\n      None\n    },\n  s => if (s == \"\") {\n      Error(\"expected identifier\")\n    } else {\n      Ok(Ident(s))\n    }\n);\n\nlet number = dfa(\n  \"\",\n  (s, c) => if (isDigit(c)) {\n    Some(s ++ String.make(1, c))\n  } else {\n    None\n  },\n  s => if (s == \"\") {\n    Error(\"expected number\")\n  } else {\n    Ok(Num(int_of_string(s)))\n  }\n);\n\nlet addop = chr('+') <|> chr('-');\nlet mulop = chr('*') <|> chr('/');\n\nlet rec expr = input => (\n  (term <*> rep(addop <*> term))\n  ^^ ((t, ts)) => List.fold_left((l, (op, r)) => BinOp(l, op, r), t, ts)\n)(input)\nand term = input => (\n  (factor <*> rep(mulop <*> factor))\n  ^^ ((f, fs)) => List.fold_left((l, (op, r)) => BinOp(l, op, r), f, fs)\n)(input)\nand factor = input => (\n  ident\n  <|> number\n  <|> (chr('(') *> expr <* chr(')'))\n)(input);\n\nlet sample = \"  3*abc + (x1 - x0) * r2d2/42 \\n\";\nResult.get(parseAll(Input.fromString(sample), expr));\ntest(expr, sample);\n"})})]})}function d(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(m,{...e})}):m(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>l});var s=t(6540);const a={},r=s.createContext(a);function i(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);