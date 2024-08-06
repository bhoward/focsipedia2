"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[2438],{8240:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var s=t(4848),i=t(8453);const o={id:"verification",title:"Program Verification"},r=void 0,a={id:"ds/verification",title:"Program Verification",description:"How do you know that a program is correct?",source:"@site/focsipedia-docs/target/mdoc/ds/verification.md",sourceDirName:"ds",slug:"/ds/verification",permalink:"/focsipedia2/docs/ds/verification",draft:!1,unlisted:!1,editUrl:"https://github.com/bhoward/focsipedia2/tree/main/focsipedia-docs/target/mdoc/ds/verification.md",tags:[],version:"current",frontMatter:{id:"verification",title:"Program Verification"},sidebar:"mySidebar",previous:{title:"Running Time and Recurrences",permalink:"/focsipedia2/docs/ds/recurrence"},next:{title:"Trees",permalink:"/focsipedia2/docs/ds/trees"}},c={},l=[{value:"Testing",id:"testing",level:2},{value:"Assertions",id:"assertions",level:2},{value:"Property Testing",id:"property-testing",level:2},{value:"Correctness Proofs",id:"correctness-proofs",level:2}];function h(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:['How do you know that a program is correct?\nThe first issue is to decide what it even means for a program to be correct: if it isn\'t\nfully clear what the correct output should be for a given input, then we have no chance\nof saying anything more definite than "it looks OK".\nTherefore, we will assume that we start with some sort of ',(0,s.jsx)(n.strong,{children:"specification"}),", whether\nformal or informal, that will let us recognize correct output."]}),"\n",(0,s.jsx)(n.p,{children:"Given a specification, there is a wide spectrum of approaches to establishing the correctness\nof a program:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Do nothing and rely on the programmer to write code that works; this is clearly not reliable\nor maintainable."}),"\n",(0,s.jsxs)(n.li,{children:["Provide informal arguments, perhaps in the form of ",(0,s.jsx)(n.strong,{children:"comments"})," embedded in the source code,\nexplaining how parts of the program work and correspond to the desired behavior; this may be\nas far as some programmers go, and while it may be better in terms of maintainability, it\ndoes not provide much additional assurance of correctness."]}),"\n",(0,s.jsx)(n.li,{children:"Create a suite of test cases, with sample inputs and expected outputs;\nif a program passes its test suite, that gives some confidence that it might be correct, but\nit can only tell about the particular cases that were in the suite; it provides no guarantees\nabout the behavior on untested cases."}),"\n",(0,s.jsxs)(n.li,{children:["Some aspects of a specification may be expressed in code in the form of ",(0,s.jsx)(n.strong,{children:"assertions"}),".\nAn assertion is a boolean expression that can be evaluated at some point of program execution;\nif the result is ",(0,s.jsx)(n.code,{children:"false"}),", then the assertion has failed.\nYou will only know this when the program is run on a particular input that triggers the failure;\nthis is analogous to dynamically typed languages like Python, where you will only find out about\na type violation when it actually occurs during program execution (potentially when it is in\nproduction use by the client\u2026)."]}),"\n",(0,s.jsxs)(n.li,{children:["One way to combine the previous two approaches is known as ",(0,s.jsx)(n.strong,{children:"property-based testing"}),', where\na testing tool will automatically generate a large number of test cases based on assertions\n("properties") attached to the code. Again, passing a finite number of tests can never guarantee\nthe absence of bugs, because the tool might not happen to generate a particular failing case,\nbut good property-based testers can check a large range of common problem areas, such as\n',(0,s.jsx)(n.strong,{children:"edge cases"})," near extremely large or small inputs, or ",(0,s.jsx)(n.strong,{children:"corner cases"})," with unusual\ncombinations of inputs."]}),"\n",(0,s.jsxs)(n.li,{children:["To gain full confidence that a program satisfies its specification, one can develop a\nformal ",(0,s.jsx)(n.strong,{children:"correctness proof"}),". If successful, this provides a guarantee of correctness for all\npossible program executions; again, this is analogous to strong statically typed languages\nlike Scala, where once the compiler confirms the types of all entities in advance, there\nis no need to recheck them dynamically (during execution). Type checking can be thought of as\na simple form of correctness proof, where the assertions only make claims about\nbroad sets of possible values (the types)."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"More details and examples of testing, assertions, properties, and correctness proofs are below."}),"\n",(0,s.jsx)(n.h2,{id:"testing",children:"Testing"}),"\n",(0,s.jsxs)(n.p,{children:["The tests in a test suite can be on the level of individual functions to be tested in isolation\n(",(0,s.jsx)(n.strong,{children:"unit testing"}),"), or they can be\nat the level of a full program with inputs and outputs as seen by a user (",(0,s.jsx)(n.strong,{children:"integration testing"}),").\nFrequently the running of the test suite will be automated, so that the programmer will get\nfeedback after every change to know whether any of the test cases fail."]}),"\n",(0,s.jsxs)(n.p,{children:["As noted above, testing can only confirm correct behavior on the cases where someone thought to\nwrite a test.\nThis can still be valuable, particularly in the form of ",(0,s.jsx)(n.strong,{children:"regression testing"}),", where tests\nare added to the suite whenever a bug is discovered\u2014by adding a test that would\nhave failed because of the bug, passing the enhanced suite in the future will not only check that the\nbug has been fixed (at least for that particular case), but also provides confidence that\nfurther changes to the code do not reintroduce old bugs."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"TODO"})," include an example with ScalaTest or something similar?"]}),"\n",(0,s.jsx)(n.h2,{id:"assertions",children:"Assertions"}),"\n",(0,s.jsxs)(n.p,{children:["As stated, an assertion is a boolean expression that must be ",(0,s.jsx)(n.code,{children:"true"})," each time it is encountered\nduring program execution.\nFor example, in the ",(0,s.jsx)(n.a,{href:"/focsipedia2/docs/ds/lists",children:"Sorting Lists"})," section, the ",(0,s.jsx)(n.code,{children:"select"})," function used in selection\nsort requires that the input list be non-empty, and the ",(0,s.jsx)(n.code,{children:"insert"})," function used in insertion sort\nrequires that the input list be ordered.\nEach of these ",(0,s.jsx)(n.strong,{children:"preconditions"})," could be checked by an assertion (note that the original code\nonly had these preconditions in the form of comments; we are assuming here the existence of a\nfunction ",(0,s.jsx)(n.code,{children:"isSorted"})," that checks whether a list is in order):"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"/* Precondition: nums is non-empty */\ndef select(nums: List[Int]): (Int, List[Int]) = {\n  // highlight-next-line\n  assert(!nums.isEmpty)\n  ...\n}\n\n/* Precondition: nums is sorted in non-decreasing order */\ndef insert(nums: List[Int], n: Int): List[Int] = {\n  // highlight-next-line\n  assert(isSorted(nums))\n  ...\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Instead of a precondition, which asserts a property of the input to a function, assertions\nare often used for ",(0,s.jsx)(n.strong,{children:"postconditions"})," and ",(0,s.jsx)(n.strong,{children:"invariants"}),".\nA postcondition asserts a claim about the output of a function; the combination of\npre- and post-conditions are often referred to as the ",(0,s.jsx)(n.strong,{children:"contract"})," of a function (just\nlike the signature of a function establishes a contract at the level of types).\nIn the sorting functions, one reasonable postcondition is that the output is in order.\nThis can be expressed in Scala by adding an ",(0,s.jsx)(n.code,{children:"ensuring"})," clause after the function body:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-scala",children:"def insertion_sort(nums: List[Int]): List[Int] = {\n  nums match\n    case Nil => Nil\n    case head :: tail => insert(insertion_sort(tail), head)\n} ensuring (result =>\n    isSorted(result)\n)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Note that the argument to ",(0,s.jsx)(n.code,{children:"ensuring"})," is an anonymous function value that will be applied to the\nresult of the preceding expression; our convention will be to use the parameter name\n",(0,s.jsx)(n.code,{children:"result"})," in this anonymous function, because it gives us a way to refer to the output of\nthe function by name."]}),"\n",(0,s.jsx)(n.p,{children:"An invariant asserts that a property is true each time an arbitrary point of the program is\nreached.\nThis is most commonly used in conjunction with loops and mutable variables; since a pure\nfunctional approach to Scala discourages such constructs, here is an example in Java:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-java",children:"/** Compute a * b using only addition.\n * Precondition: b >= 0\n */\nstatic int times(int a, int b) {\n  assert b >= 0;\n  int result = 0;\n  for (int i = 0; i < b; i++) {\n    // highlight-next-line\n    assert result == a * i;\n    result += a;\n  }\n  assert result == a * b;\n  return result;\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Each time we enter the loop, the invariant assures us that the current value of ",(0,s.jsx)(n.code,{children:"result"})," is\nthe same as ",(0,s.jsx)(n.code,{children:"a"})," times the current value of ",(0,s.jsx)(n.code,{children:"i"}),".\nSince the loop exits when ",(0,s.jsx)(n.code,{children:"i == b"}),", we can use this invariant to establish the desired\npostcondition that ",(0,s.jsx)(n.code,{children:"result"})," is ",(0,s.jsx)(n.code,{children:"a * b"}),".\nWhen we run this Java program with the ",(0,s.jsx)(n.code,{children:"-ea"}),' ("enable assertions") flag, it will check that\neach ',(0,s.jsx)(n.code,{children:"assert"})," line evaluates to ",(0,s.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["In Scala, if an assertion fails it will throw an error and halt the program with a\nmessage describing the failure.\nBecause of this abrupt reaction, and because the evaluation of assertions might take a significant\namount of the program's running time (consider how long it would take to check that ",(0,s.jsx)(n.code,{children:"nums"}),"\nis sorted on each call to ",(0,s.jsx)(n.code,{children:"insert"}),' while sorting a long list), it is common practice to only\n"turn on" assertion checking as part of the debugging process.\nBy passing an appropriate option to the Scala compiler, a release version of the program\ncan be generated where the ',(0,s.jsx)(n.code,{children:"assert"})," statements have been removed."]}),"\n",(0,s.jsx)(n.h2,{id:"property-testing",children:"Property Testing"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"TODO"})," show some examples with ScalaCheck or something like it"]}),"\n",(0,s.jsx)(n.h2,{id:"correctness-proofs",children:"Correctness Proofs"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"TODO"})," show some examples with Stainless"]}),"\n",(0,s.jsx)(n.p,{children:"Discuss Hoare Logic?"})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var s=t(6540);const i={},o=s.createContext(i);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);