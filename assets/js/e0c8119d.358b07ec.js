"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([["317"],{23570:function(e,t,s){s.r(t),s.d(t,{default:()=>c,frontMatter:()=>i,metadata:()=>n,assets:()=>h,toc:()=>d,contentTitle:()=>r});var n=JSON.parse('{"id":"sets/database","title":"Relational Databases","description":"(Content adapted from Critchlow &amp; Eck)","source":"@site/focsipedia-docs/target/mdoc/sets/database.md","sourceDirName":"sets","slug":"/sets/database","permalink":"/focsipedia2/docs/sets/database","draft":false,"unlisted":false,"editUrl":"https://github.com/bhoward/focsipedia2/edit/main/docs/sets/database.md","tags":[],"version":"current","frontMatter":{"id":"database","title":"Relational Databases"},"sidebar":"mySidebar","previous":{"title":"Relations","permalink":"/focsipedia2/docs/sets/relations"},"next":{"title":"Introduction to Functional Programming","permalink":"/focsipedia2/docs/fp/intro"}}'),l=s("85893"),a=s("50065");let i={id:"database",title:"Relational Databases"},r=void 0,h={},d=[{value:"Relations",id:"relations",level:2},{value:"Operations on Tables",id:"operations-on-tables",level:2},{value:"Exercises",id:"exercises",level:2}];function o(e){let t={annotation:"annotation",code:"code",em:"em",h2:"h2",hr:"hr",li:"li",math:"math",mo:"mo",mrow:"mrow",mtext:"mtext",ol:"ol",p:"p",pre:"pre",semantics:"semantics",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,a.a)(),...e.components},{Details:s}=t;return s||function(e,t){throw Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.p,{children:"(Content adapted from Critchlow & Eck)"}),"\n",(0,l.jsxs)(t.p,{children:["One of the major uses of computer systems is to store and manipulate\ncollections of data. A ",(0,l.jsx)(t.strong,{children:"database"})," is a collection of data\nthat has been organized so that it is possible to add and delete\ninformation, to update the data that it contains, and to\nretrieve specified parts of the data. A ",(0,l.jsx)(t.strong,{children:"Database Management\nSystem"}),", or DBMS, is a computer program that makes it possible\nto create and manipulate databases. A DBMS must be able to\naccept and process commands that manipulate the data in the databases\nthat it manages. These commands are called ",(0,l.jsx)(t.strong,{children:"queries"}),",\nand the languages in which they are written are called\n",(0,l.jsx)(t.strong,{children:"query languages"}),". A query language is\na kind of specialized programming language."]}),"\n",(0,l.jsxs)(t.p,{children:["There are many different ways that the data in a database could\nbe represented. Different DBMS's use various data representations\nand various query languages. However, data is most commonly stored\nin relations. A relation in a database is a relation\nin the mathematical sense.\nThat is, it is a subset of a cross product of sets. A database\nthat stores its data in relations is called a ",(0,l.jsx)(t.strong,{children:"relational\ndatabase"}),". The query language for most relational database management\nsystems is some form of the language known as ",(0,l.jsx)(t.strong,{children:"Structured Query\nLanguage"}),", or SQL. In this section, we'll take a very brief look\nat SQL, relational databases, and how they use relations."]}),"\n",(0,l.jsx)(t.h2,{id:"relations",children:"Relations"}),"\n",(0,l.jsxs)(t.p,{children:["A relation is just a subset of a cross product of sets. Since we\nare discussing computer representation of data, the sets are\ndata types. We will use data\ntype names such as ",(0,l.jsxs)(t.span,{className:"katex",children:[(0,l.jsx)(t.span,{className:"katex-mathml",children:(0,l.jsx)(t.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(t.semantics,{children:[(0,l.jsx)(t.mrow,{children:(0,l.jsx)(t.mtext,{mathvariant:"italic",children:"int"})}),(0,l.jsx)(t.annotation,{encoding:"application/x-tex",children:"\\textit{int}"})]})})}),(0,l.jsx)(t.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(t.span,{className:"base",children:[(0,l.jsx)(t.span,{className:"strut",style:{height:"0.6679em"}}),(0,l.jsx)(t.span,{className:"mord text",children:(0,l.jsx)(t.span,{className:"mord textit",children:"int"})})]})})]})," and ",(0,l.jsxs)(t.span,{className:"katex",children:[(0,l.jsx)(t.span,{className:"katex-mathml",children:(0,l.jsx)(t.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(t.semantics,{children:[(0,l.jsx)(t.mrow,{children:(0,l.jsx)(t.mtext,{mathvariant:"italic",children:"string"})}),(0,l.jsx)(t.annotation,{encoding:"application/x-tex",children:"\\textit{string}"})]})})}),(0,l.jsx)(t.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(t.span,{className:"base",children:[(0,l.jsx)(t.span,{className:"strut",style:{height:"0.8623em",verticalAlign:"-0.1944em"}}),(0,l.jsx)(t.span,{className:"mord text",children:(0,l.jsx)(t.span,{className:"mord textit",children:"string"})})]})})]})," to refer to\nthese sets. A relation that is a subset of the\ncross product ",(0,l.jsxs)(t.span,{className:"katex",children:[(0,l.jsx)(t.span,{className:"katex-mathml",children:(0,l.jsx)(t.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(t.semantics,{children:[(0,l.jsxs)(t.mrow,{children:[(0,l.jsx)(t.mtext,{mathvariant:"italic",children:"int"}),(0,l.jsx)(t.mo,{children:"\xd7"}),(0,l.jsx)(t.mtext,{mathvariant:"italic",children:"int"}),(0,l.jsx)(t.mo,{children:"\xd7"}),(0,l.jsx)(t.mtext,{mathvariant:"italic",children:"string"})]}),(0,l.jsx)(t.annotation,{encoding:"application/x-tex",children:"\\textit{int}\\times\\textit{int}\\times\\textit{string}"})]})})}),(0,l.jsxs)(t.span,{className:"katex-html","aria-hidden":"true",children:[(0,l.jsxs)(t.span,{className:"base",children:[(0,l.jsx)(t.span,{className:"strut",style:{height:"0.7512em",verticalAlign:"-0.0833em"}}),(0,l.jsx)(t.span,{className:"mord text",children:(0,l.jsx)(t.span,{className:"mord textit",children:"int"})}),(0,l.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,l.jsx)(t.span,{className:"mbin",children:"\xd7"}),(0,l.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2222em"}})]}),(0,l.jsxs)(t.span,{className:"base",children:[(0,l.jsx)(t.span,{className:"strut",style:{height:"0.7512em",verticalAlign:"-0.0833em"}}),(0,l.jsx)(t.span,{className:"mord text",children:(0,l.jsx)(t.span,{className:"mord textit",children:"int"})}),(0,l.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,l.jsx)(t.span,{className:"mbin",children:"\xd7"}),(0,l.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2222em"}})]}),(0,l.jsxs)(t.span,{className:"base",children:[(0,l.jsx)(t.span,{className:"strut",style:{height:"0.8623em",verticalAlign:"-0.1944em"}}),(0,l.jsx)(t.span,{className:"mord text",children:(0,l.jsx)(t.span,{className:"mord textit",children:"string"})})]})]})]}),'\nwould consist of ordered 3-tuples such as\n(17, 42, "hike"). In a relational database, the data is stored in\nthe form of one or more such relations. The relations are called\ntables, and the tuples that they contain are called rows or records.']}),"\n",(0,l.jsxs)(t.p,{children:["As an example, consider a lending library that wants to\nstore data about its members, the books that it owns, and\nwhich books the members have out on loan.\nThis data could be represented in three tables, as illustrated below.\nThe relations are shown as tables rather than\nas sets of ordered tuples, but each table is, in fact, a relation.\nThe rows of the table are the tuples. The Members table,\nfor example, is a subset of ",(0,l.jsxs)(t.span,{className:"katex",children:[(0,l.jsx)(t.span,{className:"katex-mathml",children:(0,l.jsx)(t.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(t.semantics,{children:[(0,l.jsxs)(t.mrow,{children:[(0,l.jsx)(t.mtext,{mathvariant:"italic",children:"int"}),(0,l.jsx)(t.mo,{children:"\xd7"}),(0,l.jsx)(t.mtext,{mathvariant:"italic",children:"string"}),(0,l.jsx)(t.mo,{children:"\xd7"}),(0,l.jsx)(t.mtext,{mathvariant:"italic",children:"string"}),(0,l.jsx)(t.mo,{children:"\xd7"}),(0,l.jsx)(t.mtext,{mathvariant:"italic",children:"string"})]}),(0,l.jsx)(t.annotation,{encoding:"application/x-tex",children:"\\textit{int}\\times\\textit{string}\\times\\textit{string}\\times\\textit{string}"})]})})}),(0,l.jsxs)(t.span,{className:"katex-html","aria-hidden":"true",children:[(0,l.jsxs)(t.span,{className:"base",children:[(0,l.jsx)(t.span,{className:"strut",style:{height:"0.7512em",verticalAlign:"-0.0833em"}}),(0,l.jsx)(t.span,{className:"mord text",children:(0,l.jsx)(t.span,{className:"mord textit",children:"int"})}),(0,l.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,l.jsx)(t.span,{className:"mbin",children:"\xd7"}),(0,l.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2222em"}})]}),(0,l.jsxs)(t.span,{className:"base",children:[(0,l.jsx)(t.span,{className:"strut",style:{height:"0.8623em",verticalAlign:"-0.1944em"}}),(0,l.jsx)(t.span,{className:"mord text",children:(0,l.jsx)(t.span,{className:"mord textit",children:"string"})}),(0,l.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,l.jsx)(t.span,{className:"mbin",children:"\xd7"}),(0,l.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2222em"}})]}),(0,l.jsxs)(t.span,{className:"base",children:[(0,l.jsx)(t.span,{className:"strut",style:{height:"0.8623em",verticalAlign:"-0.1944em"}}),(0,l.jsx)(t.span,{className:"mord text",children:(0,l.jsx)(t.span,{className:"mord textit",children:"string"})}),(0,l.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,l.jsx)(t.span,{className:"mbin",children:"\xd7"}),(0,l.jsx)(t.span,{className:"mspace",style:{marginRight:"0.2222em"}})]}),(0,l.jsxs)(t.span,{className:"base",children:[(0,l.jsx)(t.span,{className:"strut",style:{height:"0.8623em",verticalAlign:"-0.1944em"}}),(0,l.jsx)(t.span,{className:"mord text",children:(0,l.jsx)(t.span,{className:"mord textit",children:"string"})})]})]})]}),',\nand one of the tuples is (1782, "Smith, John", "107 Main St", "New York, NY").\nA table does have one thing that ordinary relations in mathematics\ndo not have. Each column in the table has a name. These names\nare used in the query language to manipulate the data in the tables.']}),"\n",(0,l.jsx)(t.hr,{}),"\n",(0,l.jsx)(t.p,{children:"Tables that could be part of a relational database.\nEach table has a name, shown above the table.\nEach column in the table also has a name, shown in the top row\nof the table. The remaining rows hold the data."}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:"Members"})}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"MemberID"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Name"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Address"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"City"})})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"1782"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Smith, John"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"107 Main St"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"New York, NY"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"2889"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Jones, Mary"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"1515 Center Ave"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"New York, NY"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"378"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Lee, Joseph"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"90 Park Ave"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"New York, NY"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"4277"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Smith, John"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"2390 River St"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Newark, NJ"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"5704"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"O'Neil, Sally"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"89 Main St"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"New York, NY"})]})]})]}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:"Books"})}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"BookID"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Title"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Author"})})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"182"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"I, Robot"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Isaac Asimov"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"221"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The Sound and the Fury"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"William Faulkner"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"38"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Summer Lightning"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"P.G. Wodehouse"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"437"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Pride and Prejudice"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Jane Austen"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"598"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Left Hand of Darkness"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Ursula LeGuin"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"629"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Foundation Trilogy"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Isaac Asimov"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"720"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Mirror Dance"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Lois McMaster Bujold"})]})]})]}),"\n",(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:"Loans"})}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"MemberID"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"BookID"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"DueDate"})})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"378"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"221"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"October 8, 2010"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"2889"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"182"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"November 1, 2010"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"4277"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"221"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"November 1, 2010"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"1782"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"38"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"October 30, 2010"})]})]})]}),"\n",(0,l.jsx)(t.hr,{}),"\n",(0,l.jsxs)(t.p,{children:["The data in the Members table is the basic information that\nthe library needs in order to keep track of its members, namely the name and\naddress of each member. A member also has a MemberID number,\nwhich is presumably assigned by the library. Two different members\ncan't have the same MemberID, even though they might\nhave the same name or the same address. The MemberID\nacts as a ",(0,l.jsx)(t.strong,{children:"primary key"})," for the Members table.\nA given value of the primary key uniquely identifies one of\nthe rows of the table. Similarly, the BookID in\nthe Books table is a primary key for that table.\nIn the Loans table, which holds information about which\nbooks are out on loan to which members, a MemberID\nunambiguously identifies the member who has a given book on loan,\nand the BookID says unambiguously which book that is.\nEvery table has a primary key, but the key can consist of more\nthan one column. The DBMS enforces the uniqueness\nof primary keys. That is, it won't let users make a modification\nto the table if it would result in two rows having the same\nprimary key."]}),"\n",(0,l.jsx)(t.p,{children:"The fact that a relation is a set\u2014a set of tuples\u2014means that\nit can't contain the same tuple more than once. In terms of tables,\nthis means that a table shouldn't contain two identical rows. But\nsince no two rows can contain the same primary key, it's\nimpossible for two rows to be identical. So tables are in fact\nrelations in the mathematical sense."}),"\n",(0,l.jsx)(t.h2,{id:"operations-on-tables",children:"Operations on Tables"}),"\n",(0,l.jsx)(t.p,{children:"The library must have a way to add and delete members and books\nand to make a record when a book is borrowed or returned.\nIt should also have a way to change the address of a member\nor the due date of a borrowed book. Operations such as\nthese are performed using the DBMS's query language.\nSQL has commands named INSERT, DELETE,\nand UPDATE for performing these operations.\nThe command for adding Barack Obama as a member of the\nlibrary with MemberID 999 would be (back in 2010\u2026)"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'    INSERT INTO Members\n    VALUES (999, "Barack Obama",\n         "1600 Pennsylvania Ave", "Washington, DC")\n'})}),"\n",(0,l.jsx)(t.p,{children:"When it comes to deleting and modifying rows, things become\nmore interesting because it's necessary to specify which\nrow or rows will be affected. This is done by specifying\na condition that the rows must fulfill. For example,\nthis command will delete the member with ID 4277:"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:"    DELETE FROM Members\n    WHERE MemberID = 4277\n"})}),"\n",(0,l.jsx)(t.p,{children:"It's possible for a command to affect multiple rows. For\nexample,"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'    DELETE FROM Members\n    WHERE Name = "Smith, John"\n'})}),"\n",(0,l.jsx)(t.p,{children:'would delete every row in which the name is "Smith, John."\nThe update command also specifies what changes are to be\nmade to the row:'}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'    UPDATE Members\n    SET Address="19 South St", City="Hartford, CT"\n    WHERE MemberID = 4277\n'})}),"\n",(0,l.jsx)(t.p,{children:"Of course, the library also needs a way of retrieving\ninformation from the database. SQL provides the\nSELECT command for this purpose. For example,\nthe query"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'    SELECT Name, Address\n    FROM Members\n    WHERE City = "New York, NY"\n'})}),"\n",(0,l.jsx)(t.p,{children:'asks for the name and address of every member who lives in\nNew York City. The last line of the query is a condition\nthat picks out certain rows of the Members relation,\nnamely all the rows in which the City is\n"New York, NY". The first line specifies which data\nfrom those rows should be retrieved. The data is actually\nreturned in the form of a table. For example, given the\ndata above, the query would return this\ntable:'}),"\n",(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Name"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Address"})})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Smith, John"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"107 Main St"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Jones, Mary"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"1515 Center Ave"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Lee, Joseph"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"90 Park Ave"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"O'Neil, Sally"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"89 Main St"})]})]})]}),"\n",(0,l.jsx)(t.p,{children:"The table returned by a SELECT query can even be used\nto construct more complex queries. For example, if the table returned\nby SELECT has only one column, then it can be\nused with the IN operator to specify any value\nlisted in that column. The following query will find the\nBookID of every book that is out on loan to a\nmember who lives in New York City:"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'    SELECT BookID\n    FROM Loans\n    WHERE MemberID IN (SELECT MemberID\n             FROM Members\n             WHERE City = "New York, NY")\n'})}),"\n",(0,l.jsx)(t.p,{children:"More than one table can be listed in the FROM\npart of a query. The tables that are listed are joined\ninto one large table, which is then used for the query.\nThe large table is essentially the cross product of\nthe joined tables, when the tables are understood as\nsets of tuples. For example, suppose that we want the\ntitles of all the books that are out on loan to members who\nlive in New York City. The titles are in the Books\ntable, while information about loans is in the Loans\ntable. To get the desired data, we can join the tables\nand extract the answer from the joined table:"}),"\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'    SELECT Title\n    FROM Books, Loans\n    WHERE Books.BookID = Loans.BookID\n      AND MemberID IN (SELECT MemberID\n             FROM Members\n             WHERE City = "New York, NY")\n'})}),"\n",(0,l.jsx)(t.p,{children:"Note that if two\ntables have columns that have the same name, the columns must\nbe named unambiguously by combining the table name with the\ncolumn name. Since in the outer query the Books table\nand Loans table are both under discussion, then\nthe BookID columns in the two tables can be referred\nto as Books.BookID and Loans.BookID."}),"\n",(0,l.jsxs)(t.p,{children:["This is just a sample of what can be done with SQL and\nrelational databases. The conditions in WHERE\nclauses can get very complicated, and there are other\noperations besides the cross product for combining tables.\nThe database operations that are needed to complete a\ngiven query can be complex and time-consuming. Before\ncarrying out a query, the DBMS tries to optimize it.\nThat is, it manipulates the query into a form that\ncan be carried out most efficiently. The rules for\nmanipulating and simplifying queries form an ",(0,l.jsx)(t.em,{children:"algebra"}),"\nof relations, and the theoretical study of relational\ndatabases is in large part the study of the algebra\nof relations."]}),"\n",(0,l.jsx)(t.h2,{id:"exercises",children:"Exercises"}),"\n",(0,l.jsxs)(t.ol,{children:["\n",(0,l.jsxs)(t.li,{children:["\n",(0,l.jsx)(t.p,{children:"Using the library database given above,\nwhat is the result of each of the following SQL commands?"}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:["\xa0","\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'SELECT Name, Address\nFROM Members\nWHERE Name = "Smith, John"\n'})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"Answer"}),(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Name"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Address"})})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Smith, John"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"107 Main St"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Smith, John"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"2390 River St"})]})]})]})]}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:["\xa0","\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'DELETE FROM Books\nWHERE Author = "Isaac Asimov"\n'})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"Answer"}),(0,l.jsx)(t.p,{children:"The Books table becomes:"}),(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"BookID"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Title"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Author"})})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"221"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The Sound and the Fury"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"William Faulkner"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"38"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Summer Lightning"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"P.G. Wodehouse"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"437"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Pride and Prejudice"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Jane Austen"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"598"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Left Hand of Darkness"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Ursula LeGuin"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"720"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Mirror Dance"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Lois McMaster Bujold"})]})]})]})]}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:["\xa0","\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'UPDATE Loans\nSET DueDate = "November 20, 2010"\nWHERE BookID = 221\n'})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"Answer"}),(0,l.jsx)(t.p,{children:"The Loans table becomes:"}),(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"MemberID"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"BookID"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"DueDate"})})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"378"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"221"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"October 8, 2010"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"2889"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"182"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"November 1, 2010"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"4277"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"221"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"November 20, 2010"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"1782"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"38"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"October 30, 2010"})]})]})]})]}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:["\xa0","\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:"SELECT Title\nFROM Books, Loans\nWHERE Books.BookID = Loans.BookID\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"Answer"}),(0,l.jsx)(t.p,{children:"The result is a table listing all of the books currently on loan:"}),(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsx)(t.tr,{children:(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"Title"})})})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsx)(t.tr,{children:(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The Sound and the Fury"})}),(0,l.jsx)(t.tr,{children:(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"I, Robot"})}),(0,l.jsx)(t.tr,{children:(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"The Sound and the Fury"})}),(0,l.jsx)(t.tr,{children:(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"Summer Lightning"})})]})]})]}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsxs)(t.li,{children:["\xa0","\n",(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'DELETE FROM Loans\nWHERE MemberID IN (SELECT MemberID\n                   FROM Members\n                   WHERE Name = "Lee, Joseph")\n'})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"Answer"}),(0,l.jsx)(t.p,{children:"The Loans table becomes:"}),(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"MemberID"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"BookID"})}),(0,l.jsx)(t.th,{style:{textAlign:"left"},children:(0,l.jsx)(t.strong,{children:"DueDate"})})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"2889"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"182"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"November 1, 2010"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"4277"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"221"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"November 1, 2010"})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"1782"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"38"}),(0,l.jsx)(t.td,{style:{textAlign:"left"},children:"October 30, 2010"})]})]})]})]}),"\n"]}),"\n",(0,l.jsxs)(t.li,{children:["\n",(0,l.jsx)(t.p,{children:"Using the library database given above,\nwrite an SQL command to do each of the following database\nmanipulations:"}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"Find the BookID of every book that is due on November 1, 2010."}),"\n"]}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"Answer"}),(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'SELECT BookID\nFROM Loans\nWHERE DueDate = "November 1, 2010"\n'})})]}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"Change the DueDate of the book with BookID 221 to November 15, 2010."}),"\n"]}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"Answer"}),(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'UPDATE Loans\nSET DueDate = "November 15, 2010"\nWHERE BookID = 221\n'})})]}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:'Change the DueDate of the book with title "Summer Lightning" to November 14, 2010. Use a nested SELECT.'}),"\n"]}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"Answer"}),(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:'UPDATE Loans\nSET DueDate = "November 14, 2010"\nWHERE BookID IN (SELECT BookID\n                 FROM Books\n                 WHERE Title = "Summer Lightning")\n'})})]}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:"Find the name of every member who has a book out on loan. Use joined tables in the FROM clause of a SELECT command."}),"\n"]}),"\n",(0,l.jsxs)(s,{children:[(0,l.jsx)("summary",{children:"Answer"}),(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:"language-sql",children:"SELECT Name\nFROM Members, Loans\nWHERE Members.MemberID = Loans.MemberID\n"})})]}),"\n"]}),"\n",(0,l.jsxs)(t.li,{children:["\n",(0,l.jsx)(t.p,{children:"Suppose that a college wants to use a database to store\ninformation about its students, the courses that are offered in\na given term, and which students are taking which courses.\nDesign tables that could be used in a relational\ndatabase for representing this data. Then\nwrite SQL commands to do each of the following database\nmanipulations. (You should design your tables so that they\ncan support all these commands.)"}),"\n",(0,l.jsxs)(t.ul,{children:["\n",(0,l.jsx)(t.li,{children:'Enroll the student with ID number 1928882900 in "English 260".'}),"\n",(0,l.jsx)(t.li,{children:'Remove "John Smith" from "Biology 110".'}),"\n",(0,l.jsx)(t.li,{children:"Remove the student with ID number 2099299001 from every course in which that student is enrolled."}),"\n",(0,l.jsx)(t.li,{children:'Find the names and addresses of the students who are taking "Computer Science 229".'}),"\n",(0,l.jsx)(t.li,{children:'Cancel the course "History 101".'}),"\n"]}),"\n"]}),"\n"]})]})}function c(e={}){let{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(o,{...e})}):o(e)}},50065:function(e,t,s){s.d(t,{Z:function(){return r},a:function(){return i}});var n=s(67294);let l={},a=n.createContext(l);function i(e){let t=n.useContext(a);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);