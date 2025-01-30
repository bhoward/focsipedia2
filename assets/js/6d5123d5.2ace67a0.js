"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[6863],{267:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var a=t(4848),r=t(8453);const s={id:"reason",title:"ReasonML"},o="ReasonML",i={id:"reason",title:"ReasonML",description:"ReasonML (often just called Reason) is a functional",source:"@site/focsipedia-docs/target/mdoc/reason.mdx",sourceDirName:".",slug:"/reason",permalink:"/focsipedia2/docs/reason",draft:!1,unlisted:!1,editUrl:"https://github.com/bhoward/focsipedia2/edit/main/docs/reason.mdx",tags:[],version:"current",frontMatter:{id:"reason",title:"ReasonML"},sidebar:"mySidebar",previous:{title:"Style Guide",permalink:"/focsipedia2/docs/styleGuide"},next:{title:"OCaml",permalink:"/focsipedia2/docs/ocaml"}},l={},c=[];function h(e){const n={a:"a",code:"code",h1:"h1",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"reasonml",children:"ReasonML"})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://reasonml.github.io/",children:"ReasonML"})," (often just called Reason) is a functional\nprogramming language developed at Facebook by Jordan Walke, who also created the\n",(0,a.jsx)(n.a,{href:"https://reactjs.org/",children:"ReactJS"})," framework. It belongs to the\n",(0,a.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/ML_(programming_language)",children:"ML"})," family of statically-typed\nfunctional languages, which includes ",(0,a.jsx)(n.a,{href:"http://sml-family.org/",children:"Standard ML"}),",\n",(0,a.jsx)(n.a,{href:"https://ocaml.org/",children:"OCaml"}),", and Microsoft's ",(0,a.jsx)(n.a,{href:"https://fsharp.org/",children:"F#"}),". ML was originally\ndeveloped as the ",(0,a.jsx)(n.strong,{children:"M"}),"eta ",(0,a.jsx)(n.strong,{children:"L"}),"anguage for the LCF theorem prover at the University of\nEdinburgh, and has long been a valuable tool for programmers working with formal logic or\ndeveloping other programming languages. It was a major influence in the design of the\nfunctional languages ",(0,a.jsx)(n.a,{href:"https://www.haskell.org/",children:"Haskell"})," and\n",(0,a.jsx)(n.a,{href:"https://www.scala-lang.org/",children:"Scala"}),", and more recently it has seen adoption in financial\nservices (for example, ",(0,a.jsx)(n.a,{href:"https://bloomberg.com/",children:"Bloomberg"})," and\n",(0,a.jsx)(n.a,{href:"https://janestreet.com",children:"Jane Street"}),") and web development (particularly at\n",(0,a.jsx)(n.a,{href:"https://facebook.com",children:"Facebook"}),")."]}),"\n",(0,a.jsx)(n.p,{children:"Reason is a dialect of OCaml with a syntax that is more comfortable for programmers\nfamiliar with JavaScript or other languages in the C/C++/Java family. One advantage of\nbuilding on OCaml is that its compiler is remarkably fast and sophisticated, and it can\ngenerate JavaScript output for running programs in a web browser. In fact, since the\ncompiler itself is written in OCaml, it is possible to compile the entire system to\nJavaScript and run it in the browser."}),"\n",(0,a.jsx)(n.p,{children:"Here is an editor where you can type in ReasonML code and execute it (click the button\nor type Ctrl-Enter):"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-reason",metastring:"edit",children:"let x = 6;\nlet y = x * 7;\nlet rec fact = (x) =>\n  if (x <= 1) {\n    1\n  } else {\n    x * fact(x - 1)\n  };\nfact(5);\n"})}),"\n",(0,a.jsx)(n.p,{children:"If for some reason you want to reset the interpreter before executing the code (so that\nit will forget previous bindings), press the Shift key plus Ctrl-Enter."}),"\n",(0,a.jsx)(n.p,{children:"There are several other places online where you can run ReasonML code, although they\nwill not always match the setup here (particularly the available libraries):"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["The main Reason site, ",(0,a.jsx)(n.a,{href:"https://reasonml.github.io/en/",children:"https://reasonml.github.io/en/"}),", has an online environment where\nyou can ",(0,a.jsx)(n.a,{href:"https://reasonml.github.io/en/try",children:"Try"})," it and see the corresponding OCaml and\nJavaScript code."]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:["There is a notebook-like REPL at ",(0,a.jsx)(n.a,{href:"https://sketch.sh/",children:"https://sketch.sh/"}),"."]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://repl.it/",children:"repl.it"})," now supports ReasonML as one of its languages."]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["You can also ",(0,a.jsx)(n.a,{href:"https://reasonml.github.io/docs/en/installation",children:"install Reason"})," on your\nown computer and run it locally (or develop your own web site with React!). If you do this,\nI recommend using the free ",(0,a.jsx)(n.a,{href:"https://code.visualstudio.com/",children:"Visual Studio Code"})," editor\nalong with a plugin for Reason; this will give the complete IDE experience."]})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>i});var a=t(6540);const r={},s=a.createContext(r);function o(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);