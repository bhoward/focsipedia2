"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([["7"],{14657:function(e,n,o){o.r(n),o.d(n,{default:()=>m,frontMatter:()=>r,metadata:()=>t,assets:()=>s,toc:()=>A,contentTitle:()=>c});var t=JSON.parse('{"id":"fp/doodle-project","title":"Doodle Graphics Drawing Project","description":"Create a drawing using the Doodle graphics library. You should feel free to be as creative as you like, the only requirement is that the drawing use recursion in an essential way.","source":"@site/focsipedia-docs/target/mdoc/fp/doodle-project.md","sourceDirName":"fp","slug":"/fp/doodle-project","permalink":"/focsipedia2/docs/fp/doodle-project","draft":false,"unlisted":false,"editUrl":"https://github.com/bhoward/focsipedia2/edit/main/docs/fp/doodle-project.md","tags":[],"version":"current","frontMatter":{"id":"doodle-project","title":"Doodle Graphics Drawing Project"}}'),a=o("85893"),l=o("50065");let r={id:"doodle-project",title:"Doodle Graphics Drawing Project"},c=void 0,s={},A=[];function d(e){let n={a:"a",code:"code",em:"em",hr:"hr",img:"img",p:"p",pre:"pre",...(0,l.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:["Create a drawing using the ",(0,a.jsx)(n.a,{href:"/focsipedia2/docs/fp/doodle",children:"Doodle"})," graphics library. You should feel free to be as creative as you like, the only requirement is that the drawing use recursion in an essential way.\nYou should endeavor to only call the ",(0,a.jsx)(n.code,{children:"draw"})," method once to render a final ",(0,a.jsx)(n.code,{children:"Image"}),"; that is, the drawing should be built up as a ",(0,a.jsx)(n.em,{children:"composition"})," of smaller images (some of which should be generated recursively)."]}),"\n",(0,a.jsxs)(n.p,{children:["You should start by forking the ",(0,a.jsx)(n.a,{href:"https://github.com/bhoward/creative-scala-template",children:"template repository"})," on GitHub and following the instructions in its README file; this will be demonstrated in class.\nWhen you are done, upload your code (as a .zip file or as a link to a GitHub repository) to Moodle."]}),"\n",(0,a.jsx)(n.hr,{}),"\n",(0,a.jsx)(n.p,{children:"Here are some examples to give you ideas:"}),"\n",(0,a.jsx)(n.p,{children:"Bralin Coleman, Fall 2019:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"def col(count: Int): Image = {\n  count match\n    case 0 => Image.empty\n    case k => Image.rectangle(10, 10).fillColor(Color.hsl(k.degrees, 1, 0.5))\n}\n\ndef box(count: Int): Image = {\n  count match\n    case 0 => Image.empty\n    case n => col(n) `beside` box(n - 5)\n}\n\ndef row(count: Int): Image = {\n  count match\n    case 0 => Image.empty\n    case n => row(n - 10) `above` (col(n) `beside` box(n - 5))\n}\n\ndef rowR(count: Int): Image = {\n  count match\n    case 0 => Image.empty\n    case n => (col(n) `beside` box(n - 5)) `above` rowR(n - 10)\n}\n\ndef diamond(count: Int): Image = {\n  count match\n    case 0 => Image.empty\n    case n => row(n) `above` rowR(n)\n}\n\nval colemanResult = diamond(200)\n// colemanResult.draw()\n"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Doodle",src:o(77705).Z+"",width:"460",height:"460"})}),"\n",(0,a.jsx)(n.p,{children:"Kien Ta, Fall 2019:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"def sample(radius: Double, samples: Int): Image = {\n  val step = 10\n  val dot = Image.triangle(10, 10)\n  def loop(count: Int): Image = {\n    val angle = (step * count).radians\n    val r = count * radius / samples\n    count match\n      case 0 => Image.empty\n      case n =>\n        dot.at(r, angle).fillColor(Color.hsl((240 + count * 50).degrees, 1, 0.5)) `on`\n          loop(n - 1)\n  }\n\n  loop(samples)\n}\nval taResult = sample(250, 200)\n// taResult.draw()\n"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Doodle",src:o(87756).Z+"",width:"509",height:"507"})}),"\n",(0,a.jsx)(n.p,{children:"Michael Lackey, Fall 2019:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:"val sky = Image.rectangle(400, 200).fillColor(Color.skyBlue).noStroke\nval ground = Image.rectangle(400, 100).fillColor(Color.green).noStroke\nval roof = Image.triangle(50, 50).fillColor(Color.red).noStroke\nval frontDoor = Image.rectangle(50, 15).fillColor(Color.blue).noStroke `above`\n  (Image.rectangle(10, 25).fillColor(Color.black).noStroke `on`\n   Image.rectangle(50, 25).fillColor(Color.blue).noStroke)\nval house = roof `above` frontDoor\n\ndef town(count: Int): Image = {\n  count match\n    case 0 => Image.empty\n    case n => house `beside` town(n - 1)\n}\n\nval townPlace = town(5)\nval lackeyResult = townPlace.at(0, -40) `on` ground.at(0, -100) `on` sky\n// lackeyResult.draw()\n"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Doodle",src:o(31293).Z+"",width:"420",height:"270"})}),"\n",(0,a.jsx)(n.p,{children:"Abby Hutson-Comeaux, Fall 2019:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-scala",children:'/* Establishing colors for the honeycomb & bee */\nval orangeYellow = Color.rgb(255, 215, 0)\nval yellow = Color.rgb(255, 255, 0)\nval black = Color.rgb(0, 0, 0)\nval white = Color.rgb(255, 255, 255)\n\n/* Creating a plain yellow background */\nval background = Image.rectangle(480, 350).fillColor(yellow).noStroke\n\n/* oneComb generates each individual honey comb piece */\nval oneComb = Image.regularPolygon(6, 15).rotate(90.degrees)\n  .fillColor(orangeYellow).strokeColor(yellow).strokeWidth(3)\n\n/* Method to create each row with the desired number of combs per row */\ndef combsPerRow(num: Int): Image = {\n  num match \n    case 1 => oneComb\n    case num => oneComb `beside` combsPerRow(num - 1)\n}\n\n/* Method to actually create the honey comb that will be placed over the background */\ndef honeyComb(rows: Int): Image = {\n  rows match\n    case 0 => Image.empty \n    case rows => combsPerRow(16) `above` honeyComb(rows - 1)\n}\n\n/* Making the bottom piece to the bee, including the lines */\nval beeButt = Image.path(OpenPath.empty\n  .moveTo(-30, 0).curveTo(-30, 0, 0, -35, 30, 0)\n  .moveTo(-30, 0).curveTo(-30, 0, 0, 35, 30, 0)\n  /* add lines for the bees body */\n  .moveTo(-15, -12).lineTo(-15, 12)\n  .moveTo(-5, -16).lineTo(-5, 16)\n  .moveTo(5, -16).lineTo(5, 16)\n  .moveTo(15, -12).lineTo(15, 12)\n)\n\n/* Adding the wing to the bottom of the bee */\nval bottomWing = Image.path(OpenPath.empty\n  .moveTo(0, 17).lineTo(0, 35)\n) `on` Image.path(ClosedPath.empty\n  .moveTo(0, 10).curveTo(0, 10, -15, 30, 0, 40)\n  .curveTo(15, 30, 0, 10, 0, 10)\n).fillColor(white)\n\n/* Adding the wing to the top of the bee */\nval topWing = Image.path(OpenPath.empty\n  .moveTo(0, -17).lineTo(0, -35)\n) `on` Image.path(ClosedPath.empty\n  .moveTo(0, -10).curveTo(0, -10, -15, -30, 0, -40)\n  .curveTo(15, -30, 0, -10, 0, -10)\n).fillColor(white)\n\nval beeBody = Image.circle(11).fillColor(black)\nval beeHead = Image.circle(7).fillColor(yellow)\n\n/* Combining the parts of the bee */\nval bee = beeBody `on` beeHead.originAt(12, 0) `on` beeButt.originAt(-25, 0)\nval finalBee = bee `on` bottomWing `on` topWing\n\nval words = Image.text("~Bee Happy~").font(Font.defaultSerif.size(48))\n\n/* Joining the text, honey comb, and bee all together */\nval finalHoneyComb = words `on` (honeyComb(10) `on` background).originAt(0, 10)\n\n/* Add bees to the drawing */\nval oneBee = finalBee.rotate(40.degrees) `on` finalHoneyComb.originAt(120, -55)\nval twoBee = finalBee.rotate(220.degrees) `on` oneBee.originAt(-230, 120)\n\nval hutsonResult = twoBee\n// hutsonResult.draw()\n'})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Doodle",src:o(87997).Z+"",width:"531",height:"380"})})]})}function m(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},77705:function(e,n,o){o.d(n,{Z:function(){return t}});let t=o.p+"assets/images/ColemanDoodle-133c1ad64cf05b248b890a58a989eced.png"},87997:function(e,n,o){o.d(n,{Z:function(){return t}});let t=o.p+"assets/images/HutsonDoodle-72db08497a0e3deebda6adf437708ab0.png"},31293:function(e,n,o){o.d(n,{Z:function(){return t}});let t="data:image/png;base64,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"},87756:function(e,n,o){o.d(n,{Z:function(){return t}});let t=o.p+"assets/images/TaDoodle-958c7306d79d25a92a77d0683b1d0cf0.png"},50065:function(e,n,o){o.d(n,{Z:function(){return c},a:function(){return r}});var t=o(67294);let a={},l=t.createContext(a);function r(e){let n=t.useContext(l);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);