"use strict";(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[6788],{6788:(t,n,e)=>{e.d(n,{diagram:()=>H});var i=e(9702),s=e(6312);function r(t,n){let e;if(void 0===n)for(const i of t)null!=i&&(e>i||void 0===e&&i>=i)&&(e=i);else{let i=-1;for(let s of t)null!=(s=n(s,++i,t))&&(e>s||void 0===e&&s>=s)&&(e=s)}return e}function o(t){return t.target.depth}function c(t,n){return t.sourceLinks.length?t.depth:n-1}function l(t,n){let e=0;if(void 0===n)for(let i of t)(i=+i)&&(e+=i);else{let i=-1;for(let s of t)(s=+n(s,++i,t))&&(e+=s)}return e}function h(t,n){let e;if(void 0===n)for(const i of t)null!=i&&(e<i||void 0===e&&i>=i)&&(e=i);else{let i=-1;for(let s of t)null!=(s=n(s,++i,t))&&(e<s||void 0===e&&s>=s)&&(e=s)}return e}function a(t){return function(){return t}}function u(t,n){return y(t.source,n.source)||t.index-n.index}function f(t,n){return y(t.target,n.target)||t.index-n.index}function y(t,n){return t.y0-n.y0}function d(t){return t.value}function p(t){return t.index}function g(t){return t.nodes}function _(t){return t.links}function x(t,n){const e=t.get(n);if(!e)throw new Error("missing: "+n);return e}function k({nodes:t}){for(const n of t){let t=n.y0,e=t;for(const i of n.sourceLinks)i.y0=t+i.width/2,t+=i.width;for(const i of n.targetLinks)i.y1=e+i.width/2,e+=i.width}}function m(){let t,n,e,i=0,s=0,o=1,m=1,v=24,b=8,w=p,L=c,E=g,A=_,S=6;function M(){const c={nodes:E.apply(null,arguments),links:A.apply(null,arguments)};return function({nodes:t,links:n}){for(const[e,s]of t.entries())s.index=e,s.sourceLinks=[],s.targetLinks=[];const i=new Map(t.map(((n,e)=>[w(n,e,t),n])));for(const[e,s]of n.entries()){s.index=e;let{source:t,target:n}=s;"object"!=typeof t&&(t=s.source=x(i,t)),"object"!=typeof n&&(n=s.target=x(i,n)),t.sourceLinks.push(s),n.targetLinks.push(s)}if(null!=e)for(const{sourceLinks:s,targetLinks:r}of t)s.sort(e),r.sort(e)}(c),function({nodes:t}){for(const n of t)n.value=void 0===n.fixedValue?Math.max(l(n.sourceLinks,d),l(n.targetLinks,d)):n.fixedValue}(c),function({nodes:t}){const n=t.length;let e=new Set(t),i=new Set,s=0;for(;e.size;){for(const t of e){t.depth=s;for(const{target:n}of t.sourceLinks)i.add(n)}if(++s>n)throw new Error("circular link");e=i,i=new Set}}(c),function({nodes:t}){const n=t.length;let e=new Set(t),i=new Set,s=0;for(;e.size;){for(const t of e){t.height=s;for(const{source:n}of t.targetLinks)i.add(n)}if(++s>n)throw new Error("circular link");e=i,i=new Set}}(c),function(e){const c=function({nodes:t}){const e=h(t,(t=>t.depth))+1,s=(o-i-v)/(e-1),r=new Array(e);for(const n of t){const t=Math.max(0,Math.min(e-1,Math.floor(L.call(null,n,e))));n.layer=t,n.x0=i+t*s,n.x1=n.x0+v,r[t]?r[t].push(n):r[t]=[n]}if(n)for(const i of r)i.sort(n);return r}(e);t=Math.min(b,(m-s)/(h(c,(t=>t.length))-1)),function(n){const e=r(n,(n=>(m-s-(n.length-1)*t)/l(n,d)));for(const i of n){let n=s;for(const s of i){s.y0=n,s.y1=n+s.value*e,n=s.y1+t;for(const t of s.sourceLinks)t.width=t.value*e}n=(m-n+t)/(i.length+1);for(let t=0;t<i.length;++t){const e=i[t];e.y0+=n*(t+1),e.y1+=n*(t+1)}N(i)}}(c);for(let t=0;t<S;++t){const n=Math.pow(.99,t),e=Math.max(1-n,(t+1)/S);T(c,n,e),I(c,n,e)}}(c),k(c),c}function I(t,e,i){for(let s=1,r=t.length;s<r;++s){const r=t[s];for(const t of r){let n=0,i=0;for(const{source:e,value:r}of t.targetLinks){let s=r*(t.layer-e.layer);n+=$(e,t)*s,i+=s}if(!(i>0))continue;let s=(n/i-t.y0)*e;t.y0+=s,t.y1+=s,P(t)}void 0===n&&r.sort(y),O(r,i)}}function T(t,e,i){for(let s=t.length-2;s>=0;--s){const r=t[s];for(const t of r){let n=0,i=0;for(const{target:e,value:r}of t.sourceLinks){let s=r*(e.layer-t.layer);n+=j(t,e)*s,i+=s}if(!(i>0))continue;let s=(n/i-t.y0)*e;t.y0+=s,t.y1+=s,P(t)}void 0===n&&r.sort(y),O(r,i)}}function O(n,e){const i=n.length>>1,r=n[i];D(n,r.y0-t,i-1,e),C(n,r.y1+t,i+1,e),D(n,m,n.length-1,e),C(n,s,0,e)}function C(n,e,i,s){for(;i<n.length;++i){const r=n[i],o=(e-r.y0)*s;o>1e-6&&(r.y0+=o,r.y1+=o),e=r.y1+t}}function D(n,e,i,s){for(;i>=0;--i){const r=n[i],o=(r.y1-e)*s;o>1e-6&&(r.y0-=o,r.y1-=o),e=r.y0-t}}function P({sourceLinks:t,targetLinks:n}){if(void 0===e){for(const{source:{sourceLinks:t}}of n)t.sort(f);for(const{target:{targetLinks:n}}of t)n.sort(u)}}function N(t){if(void 0===e)for(const{sourceLinks:n,targetLinks:e}of t)n.sort(f),e.sort(u)}function $(n,e){let i=n.y0-(n.sourceLinks.length-1)*t/2;for(const{target:s,width:r}of n.sourceLinks){if(s===e)break;i+=r+t}for(const{source:t,width:s}of e.targetLinks){if(t===n)break;i-=s}return i}function j(n,e){let i=e.y0-(e.targetLinks.length-1)*t/2;for(const{source:s,width:r}of e.targetLinks){if(s===n)break;i+=r+t}for(const{target:t,width:s}of n.sourceLinks){if(t===e)break;i-=s}return i}return M.update=function(t){return k(t),t},M.nodeId=function(t){return arguments.length?(w="function"==typeof t?t:a(t),M):w},M.nodeAlign=function(t){return arguments.length?(L="function"==typeof t?t:a(t),M):L},M.nodeSort=function(t){return arguments.length?(n=t,M):n},M.nodeWidth=function(t){return arguments.length?(v=+t,M):v},M.nodePadding=function(n){return arguments.length?(b=t=+n,M):b},M.nodes=function(t){return arguments.length?(E="function"==typeof t?t:a(t),M):E},M.links=function(t){return arguments.length?(A="function"==typeof t?t:a(t),M):A},M.linkSort=function(t){return arguments.length?(e=t,M):e},M.size=function(t){return arguments.length?(i=s=0,o=+t[0],m=+t[1],M):[o-i,m-s]},M.extent=function(t){return arguments.length?(i=+t[0][0],o=+t[1][0],s=+t[0][1],m=+t[1][1],M):[[i,s],[o,m]]},M.iterations=function(t){return arguments.length?(S=+t,M):S},M}var v=Math.PI,b=2*v,w=1e-6,L=b-w;function E(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function A(){return new E}E.prototype=A.prototype={constructor:E,moveTo:function(t,n){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},quadraticCurveTo:function(t,n,e,i){this._+="Q"+ +t+","+ +n+","+(this._x1=+e)+","+(this._y1=+i)},bezierCurveTo:function(t,n,e,i,s,r){this._+="C"+ +t+","+ +n+","+ +e+","+ +i+","+(this._x1=+s)+","+(this._y1=+r)},arcTo:function(t,n,e,i,s){t=+t,n=+n,e=+e,i=+i,s=+s;var r=this._x1,o=this._y1,c=e-t,l=i-n,h=r-t,a=o-n,u=h*h+a*a;if(s<0)throw new Error("negative radius: "+s);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(u>w)if(Math.abs(a*c-l*h)>w&&s){var f=e-r,y=i-o,d=c*c+l*l,p=f*f+y*y,g=Math.sqrt(d),_=Math.sqrt(u),x=s*Math.tan((v-Math.acos((d+u-p)/(2*g*_)))/2),k=x/_,m=x/g;Math.abs(k-1)>w&&(this._+="L"+(t+k*h)+","+(n+k*a)),this._+="A"+s+","+s+",0,0,"+ +(a*f>h*y)+","+(this._x1=t+m*c)+","+(this._y1=n+m*l)}else this._+="L"+(this._x1=t)+","+(this._y1=n);else;},arc:function(t,n,e,i,s,r){t=+t,n=+n,r=!!r;var o=(e=+e)*Math.cos(i),c=e*Math.sin(i),l=t+o,h=n+c,a=1^r,u=r?i-s:s-i;if(e<0)throw new Error("negative radius: "+e);null===this._x1?this._+="M"+l+","+h:(Math.abs(this._x1-l)>w||Math.abs(this._y1-h)>w)&&(this._+="L"+l+","+h),e&&(u<0&&(u=u%b+b),u>L?this._+="A"+e+","+e+",0,1,"+a+","+(t-o)+","+(n-c)+"A"+e+","+e+",0,1,"+a+","+(this._x1=l)+","+(this._y1=h):u>w&&(this._+="A"+e+","+e+",0,"+ +(u>=v)+","+a+","+(this._x1=t+e*Math.cos(s))+","+(this._y1=n+e*Math.sin(s))))},rect:function(t,n,e,i){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +e+"v"+ +i+"h"+-e+"Z"},toString:function(){return this._}};const S=A;var M=Array.prototype.slice;function I(t){return function(){return t}}function T(t){return t[0]}function O(t){return t[1]}function C(t){return t.source}function D(t){return t.target}function P(t){var n=C,e=D,i=T,s=O,r=null;function o(){var o,c=M.call(arguments),l=n.apply(this,c),h=e.apply(this,c);if(r||(r=o=S()),t(r,+i.apply(this,(c[0]=l,c)),+s.apply(this,c),+i.apply(this,(c[0]=h,c)),+s.apply(this,c)),o)return r=null,o+""||null}return o.source=function(t){return arguments.length?(n=t,o):n},o.target=function(t){return arguments.length?(e=t,o):e},o.x=function(t){return arguments.length?(i="function"==typeof t?t:I(+t),o):i},o.y=function(t){return arguments.length?(s="function"==typeof t?t:I(+t),o):s},o.context=function(t){return arguments.length?(r=null==t?null:t,o):r},o}function N(t,n,e,i,s){t.moveTo(n,e),t.bezierCurveTo(n=(n+i)/2,e,n,s,i,s)}function $(t){return[t.source.x1,t.y0]}function j(t){return[t.target.x0,t.y1]}function z(){return P(N).source($).target(j)}e(4353),e(6750),e(2838);var U=function(){var t=function(t,n,e,i){for(e=e||{},i=t.length;i--;e[t[i]]=n);return e},n=[1,9],e=[1,10],i=[1,5,10,12],s={trace:function(){},yy:{},symbols_:{error:2,start:3,SANKEY:4,NEWLINE:5,csv:6,opt_eof:7,record:8,csv_tail:9,EOF:10,"field[source]":11,COMMA:12,"field[target]":13,"field[value]":14,field:15,escaped:16,non_escaped:17,DQUOTE:18,ESCAPED_TEXT:19,NON_ESCAPED_TEXT:20,$accept:0,$end:1},terminals_:{2:"error",4:"SANKEY",5:"NEWLINE",10:"EOF",11:"field[source]",12:"COMMA",13:"field[target]",14:"field[value]",18:"DQUOTE",19:"ESCAPED_TEXT",20:"NON_ESCAPED_TEXT"},productions_:[0,[3,4],[6,2],[9,2],[9,0],[7,1],[7,0],[8,5],[15,1],[15,1],[16,3],[17,1]],performAction:function(t,n,e,i,s,r,o){var c=r.length-1;switch(s){case 7:const t=i.findOrCreateNode(r[c-4].trim().replaceAll('""','"')),n=i.findOrCreateNode(r[c-2].trim().replaceAll('""','"')),e=parseFloat(r[c].trim());i.addLink(t,n,e);break;case 8:case 9:case 11:this.$=r[c];break;case 10:this.$=r[c-1]}},table:[{3:1,4:[1,2]},{1:[3]},{5:[1,3]},{6:4,8:5,15:6,16:7,17:8,18:n,20:e},{1:[2,6],7:11,10:[1,12]},t(e,[2,4],{9:13,5:[1,14]}),{12:[1,15]},t(i,[2,8]),t(i,[2,9]),{19:[1,16]},t(i,[2,11]),{1:[2,1]},{1:[2,5]},t(e,[2,2]),{6:17,8:5,15:6,16:7,17:8,18:n,20:e},{15:18,16:7,17:8,18:n,20:e},{18:[1,19]},t(e,[2,3]),{12:[1,20]},t(i,[2,10]),{15:21,16:7,17:8,18:n,20:e},t([1,5,10],[2,7])],defaultActions:{11:[2,1],12:[2,5]},parseError:function(t,n){if(!n.recoverable){var e=new Error(t);throw e.hash=n,e}this.trace(t)},parse:function(t){var n=this,e=[0],i=[],s=[null],r=[],o=this.table,c="",l=0,h=0,a=r.slice.call(arguments,1),u=Object.create(this.lexer),f={yy:{}};for(var y in this.yy)Object.prototype.hasOwnProperty.call(this.yy,y)&&(f.yy[y]=this.yy[y]);u.setInput(t,f.yy),f.yy.lexer=u,f.yy.parser=this,void 0===u.yylloc&&(u.yylloc={});var d=u.yylloc;r.push(d);var p=u.options&&u.options.ranges;"function"==typeof f.yy.parseError?this.parseError=f.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var g,_,x,k,m,v,b,w,L,E={};;){if(_=e[e.length-1],this.defaultActions[_]?x=this.defaultActions[_]:(null==g&&(L=void 0,"number"!=typeof(L=i.pop()||u.lex()||1)&&(L instanceof Array&&(L=(i=L).pop()),L=n.symbols_[L]||L),g=L),x=o[_]&&o[_][g]),void 0===x||!x.length||!x[0]){var A="";for(m in w=[],o[_])this.terminals_[m]&&m>2&&w.push("'"+this.terminals_[m]+"'");A=u.showPosition?"Parse error on line "+(l+1)+":\n"+u.showPosition()+"\nExpecting "+w.join(", ")+", got '"+(this.terminals_[g]||g)+"'":"Parse error on line "+(l+1)+": Unexpected "+(1==g?"end of input":"'"+(this.terminals_[g]||g)+"'"),this.parseError(A,{text:u.match,token:this.terminals_[g]||g,line:u.yylineno,loc:d,expected:w})}if(x[0]instanceof Array&&x.length>1)throw new Error("Parse Error: multiple actions possible at state: "+_+", token: "+g);switch(x[0]){case 1:e.push(g),s.push(u.yytext),r.push(u.yylloc),e.push(x[1]),g=null,h=u.yyleng,c=u.yytext,l=u.yylineno,d=u.yylloc;break;case 2:if(v=this.productions_[x[1]][1],E.$=s[s.length-v],E._$={first_line:r[r.length-(v||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(v||1)].first_column,last_column:r[r.length-1].last_column},p&&(E._$.range=[r[r.length-(v||1)].range[0],r[r.length-1].range[1]]),void 0!==(k=this.performAction.apply(E,[c,h,l,f.yy,x[1],s,r].concat(a))))return k;v&&(e=e.slice(0,-1*v*2),s=s.slice(0,-1*v),r=r.slice(0,-1*v)),e.push(this.productions_[x[1]][0]),s.push(E.$),r.push(E._$),b=o[e[e.length-2]][e[e.length-1]],e.push(b);break;case 3:return!0}}return!0}},r={EOF:1,parseError:function(t,n){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,n)},setInput:function(t,n){return this.yy=n||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var n=t.length,e=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-n),this.offset-=n;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),e.length-1&&(this.yylineno-=e.length-1);var s=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:e?(e.length===i.length?this.yylloc.first_column:0)+i[i.length-e.length].length-e[0].length:this.yylloc.first_column-n},this.options.ranges&&(this.yylloc.range=[s[0],s[0]+this.yyleng-n]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),n=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+n+"^"},test_match:function(t,n){var e,i,s;if(this.options.backtrack_lexer&&(s={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(s.yylloc.range=this.yylloc.range.slice(0))),(i=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],e=this.performAction.call(this,this.yy,this,n,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),e)return e;if(this._backtrack){for(var r in s)this[r]=s[r];return!1}return!1},next:function(){if(this.done)return this.EOF;var t,n,e,i;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var s=this._currentRules(),r=0;r<s.length;r++)if((e=this._input.match(this.rules[s[r]]))&&(!n||e[0].length>n[0].length)){if(n=e,i=r,this.options.backtrack_lexer){if(!1!==(t=this.test_match(e,s[r])))return t;if(this._backtrack){n=!1;continue}return!1}if(!this.options.flex)break}return n?!1!==(t=this.test_match(n,s[i]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return t||this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},pushState:function(t){this.begin(t)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(t,n,e,i){switch(e){case 0:return this.pushState("csv"),4;case 1:return 10;case 2:return 5;case 3:return 12;case 4:return this.pushState("escaped_text"),18;case 5:return 20;case 6:return this.popState("escaped_text"),18;case 7:return 19}},rules:[/^(?:sankey-beta\b)/i,/^(?:$)/i,/^(?:((\u000D\u000A)|(\u000A)))/i,/^(?:(\u002C))/i,/^(?:(\u0022))/i,/^(?:([\u0020-\u0021\u0023-\u002B\u002D-\u007E])*)/i,/^(?:(\u0022)(?!(\u0022)))/i,/^(?:(([\u0020-\u0021\u0023-\u002B\u002D-\u007E])|(\u002C)|(\u000D)|(\u000A)|(\u0022)(\u0022))*)/i],conditions:{csv:{rules:[1,2,3,4,5,6,7],inclusive:!1},escaped_text:{rules:[6,7],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7],inclusive:!0}}};function o(){this.yy={}}return s.lexer=r,o.prototype=s,s.Parser=o,new o}();U.parser=U;const F=U;let W=[],q=[],G={};class V{constructor(t,n,e=0){this.source=t,this.target=n,this.value=e}}class X{constructor(t){this.ID=t}}const K={nodesMap:G,getConfig:()=>(0,i.c)().sankey,getNodes:()=>q,getLinks:()=>W,getGraph:()=>({nodes:q.map((t=>({id:t.ID}))),links:W.map((t=>({source:t.source.ID,target:t.target.ID,value:t.value})))}),addLink:(t,n,e)=>{W.push(new V(t,n,e))},findOrCreateNode:t=>(t=i.e.sanitizeText(t,(0,i.c)()),G[t]||(G[t]=new X(t),q.push(G[t])),G[t]),getAccTitle:i.g,setAccTitle:i.s,getAccDescription:i.a,setAccDescription:i.b,getDiagramTitle:i.t,setDiagramTitle:i.q,clear:()=>{W=[],q=[],G={},(0,i.v)()}},Q=class t{static next(n){return new t(n+ ++t.count)}constructor(t){this.id=t,this.href=`#${t}`}toString(){return"url("+this.href+")"}};Q.count=0;let Y=Q;const B={left:function(t){return t.depth},right:function(t,n){return n-1-t.height},center:function(t){return t.targetLinks.length?t.depth:t.sourceLinks.length?r(t.sourceLinks,o)-1:0},justify:c},R={draw:function(t,n,e,r){const{securityLevel:o,sankey:c}=(0,i.c)(),l=i.K.sankey;let h;"sandbox"===o&&(h=(0,s.Ltv)("#i"+n));const a="sandbox"===o?(0,s.Ltv)(h.nodes()[0].contentDocument.body):(0,s.Ltv)("body"),u="sandbox"===o?a.select(`[id="${n}"]`):(0,s.Ltv)(`[id="${n}"]`),f=(null==c?void 0:c.width)??l.width,y=(null==c?void 0:c.height)??l.width,d=(null==c?void 0:c.useMaxWidth)??l.useMaxWidth,p=(null==c?void 0:c.nodeAlignment)??l.nodeAlignment,g=(null==c?void 0:c.prefix)??l.prefix,_=(null==c?void 0:c.suffix)??l.suffix,x=(null==c?void 0:c.showValues)??l.showValues,k=r.db.getGraph(),v=B[p];m().nodeId((t=>t.id)).nodeWidth(10).nodePadding(10+(x?15:0)).nodeAlign(v).extent([[0,0],[f,y]])(k);const b=(0,s.UMr)(s.zt);u.append("g").attr("class","nodes").selectAll(".node").data(k.nodes).join("g").attr("class","node").attr("id",(t=>(t.uid=Y.next("node-")).id)).attr("transform",(function(t){return"translate("+t.x0+","+t.y0+")"})).attr("x",(t=>t.x0)).attr("y",(t=>t.y0)).append("rect").attr("height",(t=>t.y1-t.y0)).attr("width",(t=>t.x1-t.x0)).attr("fill",(t=>b(t.id)));u.append("g").attr("class","node-labels").attr("font-family","sans-serif").attr("font-size",14).selectAll("text").data(k.nodes).join("text").attr("x",(t=>t.x0<f/2?t.x1+6:t.x0-6)).attr("y",(t=>(t.y1+t.y0)/2)).attr("dy",(x?"0":"0.35")+"em").attr("text-anchor",(t=>t.x0<f/2?"start":"end")).text((({id:t,value:n})=>x?`${t}\n${g}${Math.round(100*n)/100}${_}`:t));const w=u.append("g").attr("class","links").attr("fill","none").attr("stroke-opacity",.5).selectAll(".link").data(k.links).join("g").attr("class","link").style("mix-blend-mode","multiply"),L=(null==c?void 0:c.linkColor)||"gradient";if("gradient"===L){const t=w.append("linearGradient").attr("id",(t=>(t.uid=Y.next("linearGradient-")).id)).attr("gradientUnits","userSpaceOnUse").attr("x1",(t=>t.source.x1)).attr("x2",(t=>t.target.x0));t.append("stop").attr("offset","0%").attr("stop-color",(t=>b(t.source.id))),t.append("stop").attr("offset","100%").attr("stop-color",(t=>b(t.target.id)))}let E;switch(L){case"gradient":E=t=>t.uid;break;case"source":E=t=>b(t.source.id);break;case"target":E=t=>b(t.target.id);break;default:E=L}w.append("path").attr("d",z()).attr("stroke",E).attr("stroke-width",(t=>Math.max(1,t.width))),(0,i.o)(void 0,u,0,d)}},Z=F.parse.bind(F);F.parse=t=>Z((t=>t.replaceAll(/^[^\S\n\r]+|[^\S\n\r]+$/g,"").replaceAll(/([\n\r])+/g,"\n").trim())(t));const H={parser:F,db:K,renderer:R}}}]);