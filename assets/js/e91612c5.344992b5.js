"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[1685],{4498:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>r,toc:()=>l});var s=t(4848),a=t(8453);const o={id:"intro",title:"Logic"},i=void 0,r={id:"logic/intro",title:"Logic",description:"(Adapted from Critchlow & Eck)",source:"@site/focsipedia-docs/target/mdoc/logic/intro.md",sourceDirName:"logic",slug:"/logic/intro",permalink:"/focsipedia2/docs/logic/intro",draft:!1,unlisted:!1,editUrl:"https://github.com/bhoward/focsipedia2/edit/main/docs/logic/intro.md",tags:[],version:"current",frontMatter:{id:"intro",title:"Logic"},sidebar:"mySidebar",previous:{title:"Overview of Algorithmic Foundations",permalink:"/focsipedia2/docs/algoverview"},next:{title:"Propositional Logic",permalink:"/focsipedia2/docs/logic/props"}},c={},l=[];function h(e){const n={annotation:"annotation",em:"em",math:"math",mn:"mn",mo:"mo",mrow:"mrow",p:"p",semantics:"semantics",span:"span",strong:"strong",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"(Adapted from Critchlow & Eck)"}),"\n",(0,s.jsxs)(n.p,{children:["In a sense, we know a lot more than we realize,\nbecause everything that we know has consequences\u2014",(0,s.jsx)(n.em,{children:"logical"}),"\nconsequences\u2014that follow automatically.  If you know that all\nhumans are mortal, and you know that you are human, then in a\nsense you know that you are mortal, whether or not you have ever\nconsidered or wanted to consider that fact.  This is an example\nof logical ",(0,s.jsx)(n.strong,{children:"deduction"}),": From the ",(0,s.jsx)(n.strong,{children:"premises"}),' that "All\nhumans are mortal: and "I am human," the ',(0,s.jsx)(n.strong,{children:"conclusion"}),'\nthat "I am mortal" can be deduced by logic.']}),"\n",(0,s.jsxs)(n.p,{children:['Logical deduction is a kind of computation.  By applying rules\nof logic to a given set of premises, conclusions that follow\nfrom those premises can be generated automatically, by a\ncomputational process which could be carried out by a computer.\nOnce you know the premises, or are willing to accept them for\nthe sake of argument, you are forced\u2014by logic\u2014to accept\nthe conclusions.  Still, to say that you "know" those conclusions\nwould be misleading.  The problem is that there are too many of\nthem (infinitely many), and, in general, most of them are not\nparticularly interesting.  Until you have actually made the\ndeduction, you don\'t ',(0,s.jsx)(n.em,{children:"really"})," know the conclusion, and\nknowing which of the possible chains of deduction to follow\nis not easy.  The ",(0,s.jsx)(n.em,{children:"art"})," of logic is to find\nan interesting conclusion and a chain of logical deductions that\nleads from the premises to that conclusion.  Checking that the\ndeductions are valid is the mechanical, computational side of\nlogic."]}),"\n",(0,s.jsx)(n.p,{children:"This chapter is mostly about the mechanics of logic.  We will\ninvestigate logic as a branch of mathematics, with its own\nsymbols, formulas, and rules of computation.  Your object is\nto learn the rules of logic, to understand why they are valid,\nand to develop skill in applying them.  As with any branch of\nmathematics, there is a certain beauty to the symbols and formulas\nthemselves.  But it is the applications that bring the subject to\nlife for most people.  We will, of course, cover some applications\nas we go along.   In a sense, though, the real applications of\nlogic include much of computer science and of mathematics itself."}),"\n",(0,s.jsxs)(n.p,{children:["Among the fundamental elements of thought, and therefore of logic, are\npropositions.  A ",(0,s.jsx)(n.strong,{children:"proposition"}),' is a statement that has a truth\nvalue:  It is either true or false.\n"Grass is green" and "',(0,s.jsxs)(n.span,{className:"katex",children:[(0,s.jsx)(n.span,{className:"katex-mathml",children:(0,s.jsx)(n.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,s.jsxs)(n.semantics,{children:[(0,s.jsxs)(n.mrow,{children:[(0,s.jsx)(n.mn,{children:"2"}),(0,s.jsx)(n.mo,{children:"+"}),(0,s.jsx)(n.mn,{children:"2"}),(0,s.jsx)(n.mo,{children:"="}),(0,s.jsx)(n.mn,{children:"5"})]}),(0,s.jsx)(n.annotation,{encoding:"application/x-tex",children:"2 + 2 = 5"})]})})}),(0,s.jsxs)(n.span,{className:"katex-html","aria-hidden":"true",children:[(0,s.jsxs)(n.span,{className:"base",children:[(0,s.jsx)(n.span,{className:"strut",style:{height:"0.7278em",verticalAlign:"-0.0833em"}}),(0,s.jsx)(n.span,{className:"mord",children:"2"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,s.jsx)(n.span,{className:"mbin",children:"+"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.2222em"}})]}),(0,s.jsxs)(n.span,{className:"base",children:[(0,s.jsx)(n.span,{className:"strut",style:{height:"0.6444em"}}),(0,s.jsx)(n.span,{className:"mord",children:"2"}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.jsx)(n.span,{className:"mrel",children:"="}),(0,s.jsx)(n.span,{className:"mspace",style:{marginRight:"0.2778em"}})]}),(0,s.jsxs)(n.span,{className:"base",children:[(0,s.jsx)(n.span,{className:"strut",style:{height:"0.6444em"}}),(0,s.jsx)(n.span,{className:"mord",children:"5"})]})]})]}),'"\nare propositions.  In the first part of this chapter, we will\nstudy ',(0,s.jsx)(n.strong,{children:"propositional logic"}),", which takes propositions as basic\nand considers how they can be combined and manipulated.  This\nbranch of logic has surprising application to the design of\nthe electronic circuits that make up computers."]}),"\n",(0,s.jsxs)(n.p,{children:['Logic gets more interesting when we consider the internal\nstructure of propositions.  In English, a proposition is expressed as\na sentence, and, as you know from studying grammar, sentences have\nparts.  A simple sentence like "Grass is green" has a\n',(0,s.jsx)(n.strong,{children:"subject"})," and a ",(0,s.jsx)(n.strong,{children:"predicate"}),'.  The sentence says something\nabout its subject.  The subject of "Grass is green" is grass.\nThe sentence says something about grass.  The ',(0,s.jsx)(n.em,{children:"something"}),'\nthat the sentence says about its subject is the predicate.\nIn the example, the predicate is the phrase "is green."\nOnce we start working with predicates, we can create propositions\nusing ',(0,s.jsx)(n.strong,{children:"quantifiers"}),' like "all," "some," and "no."\nFor example, working with the predicate "is above average,"\nwe can move from simple propositions like "Johnny is above\naverage" to "All children are above average" or to\n"No child is above average" or to the rather more realistic\n"Some children are above average."  Logical deduction usually\ndeals with quantified statements, as shown by the basic example of\nhuman mortality with which we began this chapter.  Logical deduction\nwill be a major topic of this chapter;  under the name of\n',(0,s.jsx)(n.strong,{children:"proof"}),", it will be the last major topic of this chapter,\nand a major tool for the\nrest of this book."]})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>r});var s=t(6540);const a={},o=s.createContext(a);function i(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);