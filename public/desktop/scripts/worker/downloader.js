/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// Copyright Joyent, Inc. and other Node contributors.

// distribute, sublicense, and/or sell copies of the Software, and to permit

// The above copyright notice and this permission notice shall be included

(function(e){if(typeof bootstrap=="function")bootstrap("promise",e);else if(typeof exports=="object")module.exports=e();else if(typeof define=="function"&&define.amd)define("vendors/utili/q",e);else if(typeof ses!="undefined"){if(!ses.ok())return;ses.makeQ=e}else Q=e()})(function(){function u(e){return function(){return o.apply(e,arguments)}}function m(e){return e===Object(e)}function g(e){return v(e)==="[object StopIteration]"||e instanceof y}function w(t,n){if(e&&n.stack&&typeof t=="object"&&t!==null&&t.stack&&t.stack.indexOf(b)===-1){var r=[];for(var i=n;!!i;i=i.source)i.stack&&r.unshift(i.stack);r.unshift(t.stack);var s=r.join("\n"+b+"\n");t.stack=E(s)}}function E(e){var t=e.split("\n"),n=[];for(var r=0;r<t.length;++r){var i=t[r];!T(i)&&!S(i)&&i&&n.push(i)}return n.join("\n")}function S(e){return e.indexOf("(module.js:")!==-1||e.indexOf("(node.js:")!==-1}function x(e){var t=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(e);if(t)return[t[1],Number(t[2])];var n=/at ([^ ]+):(\d+):(?:\d+)$/.exec(e);if(n)return[n[1],Number(n[2])];var r=/.*@(.+):(\d+)$/.exec(e);if(r)return[r[1],Number(r[2])]}function T(e){var t=x(e);if(!t)return!1;var i=t[0],s=t[1];return i===r&&s>=n&&s<=ot}function N(){if(!e)return;try{throw new Error}catch(t){var n=t.stack.split("\n"),i=n[0].indexOf("@")>0?n[1]:n[2],s=x(i);if(!s)return;return r=s[0],s[1]}}function C(e,t,n){return function(){return typeof console!="undefined"&&typeof console.warn=="function"&&console.warn(t+" is deprecated, use "+n+" instead.",(new Error("")).stack),e.apply(e,arguments)}}function k(e){return P(e)?e:H(e)?$(e):V(e)}function L(){function l(e){r=e,o.source=e,f(t,function(t,n){s(function(){e.promiseDispatch.apply(e,n)})},void 0),t=void 0,n=void 0}var t=[],n=[],r,i=h(L.prototype),o=h(M.prototype);o.promiseDispatch=function(e,i,o){var u=a(arguments);t?(t.push(u),i==="when"&&o[1]&&n.push(o[1])):s(function(){r.promiseDispatch.apply(r,u)})},o.valueOf=function(){if(t)return o;var e=D(r);return P(e)&&(r=e),e},o.inspect=function(){return r?r.inspect():{state:"pending"}};if(k.longStackSupport&&e)try{throw new Error}catch(u){o.stack=u.stack.substring(u.stack.indexOf("\n")+1)}return i.promise=o,i.resolve=function(e){if(r)return;l(k(e))},i.fulfill=function(e){if(r)return;l(V(e))},i.reject=function(e){if(r)return;l(X(e))},i.notify=function(e){if(r)return;f(n,function(t,n){s(function(){n(e)})},void 0)},i}function A(e){if(typeof e!="function")throw new TypeError("resolver must be a function.");var t=L();try{e(t.resolve,t.reject,t.notify)}catch(n){t.reject(n)}return t.promise}function O(e){return A(function(t,n){for(var r=0,i=e.length;r<i;r++)k(e[r]).then(t,n)})}function M(e,t,n){t===void 0&&(t=function(e){return X(new Error("Promise does not support operation: "+e))}),n===void 0&&(n=function(){return{state:"unknown"}});var r=h(M.prototype);r.promiseDispatch=function(n,i,s){var o;try{e[i]?o=e[i].apply(r,s):o=t.call(r,i,s)}catch(u){o=X(u)}n&&n(o)},r.inspect=n;if(n){var i=n();i.state==="rejected"&&(r.exception=i.reason),r.valueOf=function(){var e=n();return e.state==="pending"||e.state==="rejected"?r:e.value}}return r}function _(e,t,n,r){return k(e).then(t,n,r)}function D(e){if(P(e)){var t=e.inspect();if(t.state==="fulfilled")return t.value}return e}function P(e){return m(e)&&typeof e.promiseDispatch=="function"&&typeof e.inspect=="function"}function H(e){return m(e)&&typeof e.then=="function"}function B(e){return P(e)&&e.inspect().state==="pending"}function j(e){return!P(e)||e.inspect().state==="fulfilled"}function F(e){return P(e)&&e.inspect().state==="rejected"}function U(){I.length=0,q.length=0,R||(R=!0)}function z(e,t){if(!R)return;q.push(e),t&&typeof t.stack!="undefined"?I.push(t.stack):I.push("(no stack) "+t)}function W(e){if(!R)return;var t=l(q,e);t!==-1&&(q.splice(t,1),I.splice(t,1))}function X(e){var t=M({when:function(t){return t&&W(this),t?t(e):this}},function(){return this},function(){return{state:"rejected",reason:e}});return z(t,e),t}function V(e){return M({when:function(){return e},get:function(t){return e[t]},set:function(t,n){e[t]=n},"delete":function(t){delete e[t]},post:function(t,n){return t===null||t===void 0?e.apply(void 0,n):e[t].apply(e,n)},apply:function(t,n){return e.apply(t,n)},keys:function(){return d(e)}},void 0,function(){return{state:"fulfilled",value:e}})}function $(e){var t=L();return s(function(){try{e.then(t.resolve,t.reject,t.notify)}catch(n){t.reject(n)}}),t.promise}function J(e){return M({isDef:function(){}},function(n,r){return et(e,n,r)},function(){return k(e).inspect()})}function K(e,t,n){return k(e).spread(t,n)}function Q(e){return function(){function t(e,t){var s;if(typeof StopIteration=="undefined"){try{s=n[e](t)}catch(o){return X(o)}return s.done?s.value:_(s.value,r,i)}try{s=n[e](t)}catch(o){return g(o)?o.value:X(o)}return _(s,r,i)}var n=e.apply(this,arguments),r=t.bind(t,"next"),i=t.bind(t,"throw");return r()}}function G(e){k.done(k.async(e)())}function Y(e){throw new y(e)}function Z(e){return function(){return K([this,tt(arguments)],function(t,n){return e.apply(t,n)})}}function et(e,t,n){return k(e).dispatch(t,n)}function tt(e){return _(e,function(e){var t=0,n=L();return f(e,function(r,i,s){var o;P(i)&&(o=i.inspect()).state==="fulfilled"?e[s]=o.value:(++t,_(i,function(r){e[s]=r,--t===0&&n.resolve(e)},n.reject,function(e){n.notify({index:s,value:e})}))},void 0),t===0&&n.resolve(e),n.promise})}function nt(e){return _(e,function(e){return e=c(e,k),_(tt(c(e,function(e){return _(e,i,i)})),function(){return e})})}function rt(e){return k(e).allSettled()}function it(e,t){return k(e).then(void 0,void 0,t)}function st(e,t){return k(e).nodeify(t)}var e=!1;try{throw new Error}catch(t){e=!!t.stack}var n=N(),r,i=function(){},s=function(){function o(){while(e.next){e=e.next;var t=e.task;e.task=void 0;var r=e.domain;r&&(e.domain=void 0,r.enter());try{t()}catch(s){if(i)throw r&&r.exit(),setTimeout(o,0),r&&r.enter(),s;setTimeout(function(){throw s},0)}r&&r.exit()}n=!1}var e={task:void 0,next:null},t=e,n=!1,r=void 0,i=!1;s=function(e){t=t.next={task:e,domain:i&&process.domain,next:null},n||(n=!0,r())};if(typeof process!="undefined"&&process.nextTick)i=!0,r=function(){process.nextTick(o)};else if(typeof setImmediate=="function")typeof window!="undefined"?r=setImmediate.bind(window,o):r=function(){setImmediate(o)};else if(typeof MessageChannel!="undefined"){var u=new MessageChannel;u.port1.onmessage=function(){r=a,u.port1.onmessage=o,o()};var a=function(){u.port2.postMessage(0)};r=function(){setTimeout(o,0),a()}}else r=function(){setTimeout(o,0)};return s}(),o=Function.call,a=u(Array.prototype.slice),f=u(Array.prototype.reduce||function(e,t){var n=0,r=this.length;if(arguments.length===1)do{if(n in this){t=this[n++];break}if(++n>=r)throw new TypeError}while(1);for(;n<r;n++)n in this&&(t=e(t,this[n],n));return t}),l=u(Array.prototype.indexOf||function(e){for(var t=0;t<this.length;t++)if(this[t]===e)return t;return-1}),c=u(Array.prototype.map||function(e,t){var n=this,r=[];return f(n,function(i,s,o){r.push(e.call(t,s,o,n))},void 0),r}),h=Object.create||function(e){function t(){}return t.prototype=e,new t},p=u(Object.prototype.hasOwnProperty),d=Object.keys||function(e){var t=[];for(var n in e)p(e,n)&&t.push(n);return t},v=u(Object.prototype.toString),y;typeof ReturnValue!="undefined"?y=ReturnValue:y=function(e){this.value=e};var b="From previous event:";k.resolve=k,k.nextTick=s,k.longStackSupport=!1,k.defer=L,L.prototype.makeNodeResolver=function(){var e=this;return function(t,n){t?e.reject(t):arguments.length>2?e.resolve(a(arguments,1)):e.resolve(n)}},k.Promise=A,k.promise=A,A.race=O,A.all=tt,A.reject=X,A.resolve=k,k.passByCopy=function(e){return e},M.prototype.passByCopy=function(){return this},k.join=function(e,t){return k(e).join(t)},M.prototype.join=function(e){return k([this,e]).spread(function(e,t){if(e===t)return e;throw new Error("Can't join: not the same: "+e+" "+t)})},k.race=O,M.prototype.race=function(){return this.then(k.race)},k.makePromise=M,M.prototype.toString=function(){return"[object Promise]"},M.prototype.then=function(e,t,n){function u(t){try{return typeof e=="function"?e(t):t}catch(n){return X(n)}}function a(e){if(typeof t=="function"){w(e,r);try{return t(e)}catch(n){return X(n)}}return X(e)}function f(e){return typeof n=="function"?n(e):e}var r=this,i=L(),o=!1;return s(function(){r.promiseDispatch(function(e){if(o)return;o=!0,i.resolve(u(e))},"when",[function(e){if(o)return;o=!0,i.resolve(a(e))}])}),r.promiseDispatch(void 0,"when",[void 0,function(e){var t,n=!1;try{t=f(e)}catch(r){n=!0;if(!k.onerror)throw r;k.onerror(r)}n||i.notify(t)}]),i.promise},k.when=_,M.prototype.thenResolve=function(e){return this.then(function(){return e})},k.thenResolve=function(e,t){return k(e).thenResolve(t)},M.prototype.thenReject=function(e){return this.then(function(){throw e})},k.thenReject=function(e,t){return k(e).thenReject(t)},k.nearer=D,k.isPromise=P,k.isPromiseAlike=H,k.isPending=B,M.prototype.isPending=function(){return this.inspect().state==="pending"},k.isFulfilled=j,M.prototype.isFulfilled=function(){return this.inspect().state==="fulfilled"},k.isRejected=F,M.prototype.isRejected=function(){return this.inspect().state==="rejected"};var I=[],q=[],R=!0;k.resetUnhandledRejections=U,k.getUnhandledReasons=function(){return I.slice()},k.stopUnhandledRejectionTracking=function(){U(),R=!1},U(),k.reject=X,k.fulfill=V,k.master=J,k.spread=K,M.prototype.spread=function(e,t){return this.all().then(function(t){return e.apply(void 0,t)},t)},k.async=Q,k.spawn=G,k["return"]=Y,k.promised=Z,k.dispatch=et,M.prototype.dispatch=function(e,t){var n=this,r=L();return s(function(){n.promiseDispatch(r.resolve,e,t)}),r.promise},k.get=function(e,t){return k(e).dispatch("get",[t])},M.prototype.get=function(e){return this.dispatch("get",[e])},k.set=function(e,t,n){return k(e).dispatch("set",[t,n])},M.prototype.set=function(e,t){return this.dispatch("set",[e,t])},k.del=k["delete"]=function(e,t){return k(e).dispatch("delete",[t])},M.prototype.del=M.prototype["delete"]=function(e){return this.dispatch("delete",[e])},k.mapply=k.post=function(e,t,n){return k(e).dispatch("post",[t,n])},M.prototype.mapply=M.prototype.post=function(e,t){return this.dispatch("post",[e,t])},k.send=k.mcall=k.invoke=function(e,t){return k(e).dispatch("post",[t,a(arguments,2)])},M.prototype.send=M.prototype.mcall=M.prototype.invoke=function(e){return this.dispatch("post",[e,a(arguments,1)])},k.fapply=function(e,t){return k(e).dispatch("apply",[void 0,t])},M.prototype.fapply=function(e){return this.dispatch("apply",[void 0,e])},k["try"]=k.fcall=function(e){return k(e).dispatch("apply",[void 0,a(arguments,1)])},M.prototype.fcall=function(){return this.dispatch("apply",[void 0,a(arguments)])},k.fbind=function(e){var t=k(e),n=a(arguments,1);return function(){return t.dispatch("apply",[this,n.concat(a(arguments))])}},M.prototype.fbind=function(){var e=this,t=a(arguments);return function(){return e.dispatch("apply",[this,t.concat(a(arguments))])}},k.keys=function(e){return k(e).dispatch("keys",[])},M.prototype.keys=function(){return this.dispatch("keys",[])},k.all=tt,M.prototype.all=function(){return tt(this)},k.allResolved=C(nt,"allResolved","allSettled"),M.prototype.allResolved=function(){return nt(this)},k.allSettled=rt,M.prototype.allSettled=function(){return this.then(function(e){return tt(c(e,function(e){function t(){return e.inspect()}return e=k(e),e.then(t,t)}))})},k.fail=k["catch"]=function(e,t){return k(e).then(void 0,t)},M.prototype.fail=M.prototype["catch"]=function(e){return this.then(void 0,e)},k.progress=it,M.prototype.progress=function(e){return this.then(void 0,void 0,e)},k.fin=k["finally"]=function(e,t){return k(e)["finally"](t)},M.prototype.fin=M.prototype["finally"]=function(e){return e=k(e),this.then(function(t){return e.fcall().then(function(){return t})},function(t){return e.fcall().then(function(){throw t})})},k.done=function(e,t,n,r){return k(e).done(t,n,r)},M.prototype.done=function(e,t,n){var r=function(e){s(function(){w(e,i);if(!k.onerror)throw e;k.onerror(e)})},i=e||t||n?this.then(e,t,n):this;typeof process=="object"&&process&&process.domain&&(r=process.domain.bind(r)),i.then(void 0,r)},k.timeout=function(e,t,n){return k(e).timeout(t,n)},M.prototype.timeout=function(e,t){var n=L(),r=setTimeout(function(){n.reject(new Error(t||"Timed out after "+e+" ms"))},e);return this.then(function(e){clearTimeout(r),n.resolve(e)},function(e){clearTimeout(r),n.reject(e)},n.notify),n.promise},k.delay=function(e,t){return t===void 0&&(t=e,e=void 0),k(e).delay(t)},M.prototype.delay=function(e){return this.then(function(t){var n=L();return setTimeout(function(){n.resolve(t)},e),n.promise})},k.nfapply=function(e,t){return k(e).nfapply(t)},M.prototype.nfapply=function(e){var t=L(),n=a(e);return n.push(t.makeNodeResolver()),this.fapply(n).fail(t.reject),t.promise},k.nfcall=function(e){var t=a(arguments,1);return k(e).nfapply(t)},M.prototype.nfcall=function(){var e=a(arguments),t=L();return e.push(t.makeNodeResolver()),this.fapply(e).fail(t.reject),t.promise},k.nfbind=k.denodeify=function(e){var t=a(arguments,1);return function(){var n=t.concat(a(arguments)),r=L();return n.push(r.makeNodeResolver()),k(e).fapply(n).fail(r.reject),r.promise}},M.prototype.nfbind=M.prototype.denodeify=function(){var e=a(arguments);return e.unshift(this),k.denodeify.apply(void 0,e)},k.nbind=function(e,t){var n=a(arguments,2);return function(){function s(){return e.apply(t,arguments)}var r=n.concat(a(arguments)),i=L();return r.push(i.makeNodeResolver()),k(s).fapply(r).fail(i.reject),i.promise}},M.prototype.nbind=function(){var e=a(arguments,0);return e.unshift(this),k.nbind.apply(void 0,e)},k.nmapply=k.npost=function(e,t,n){return k(e).npost(t,n)},M.prototype.nmapply=M.prototype.npost=function(e,t){var n=a(t||[]),r=L();return n.push(r.makeNodeResolver()),this.dispatch("post",[e,n]).fail(r.reject),r.promise},k.nsend=k.nmcall=k.ninvoke=function(e,t){var n=a(arguments,2),r=L();return n.push(r.makeNodeResolver()),k(e).dispatch("post",[t,n]).fail(r.reject),r.promise},M.prototype.nsend=M.prototype.nmcall=M.prototype.ninvoke=function(e){var t=a(arguments,1),n=L();return t.push(n.makeNodeResolver()),this.dispatch("post",[e,t]).fail(n.reject),n.promise},k.nodeify=st,M.prototype.nodeify=function(e){if(!e)return this;this.then(function(t){s(function(){e(null,t)})},function(t){s(function(){e(t)})})};var ot=N();return k}),define("configs/client",[],function(){var e={version:1,debug:!1,neededQuata:10485760,maxSimultaneousDownloads:6};return e}),define("desktop/worker/promiseWorker",["vendors/utili/q"],function(e,t){function n(){self.onmessage=this.onmessage.bind(this),this.listeners={}}n.prototype.onmessage=function(t){if(t&&t.work&&t.id&&t.args){var n=this.listeners[t.work];if(n){var r=t.id;e.when(n.func.apply(n.context,t.args)).then(this.send.bind(this,r,"resolve"),this.send.bind(this,r,"reject"),this.send.bidn(this,r,"notify"))}}},n.prototype.on=function(e,t,n){this.listeners[e]={func:t,context:n}},n.prototype.send=function(e,t,n){self.postMessage({id:e,stat:t,arg:n})},n.prototype.applyQueue=function(e){e.forEach(function(e){this.onmessage(e)},this)}}),define("vendors/utili/path",[],function(){function n(e,t){var n=0;for(var r=e.length;r>=0;r--){var i=e[r];i=="."?e.splice(r,1):i===".."?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..");return e}var e={},t=!1,r=/^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;return e.resolve=function(){var e="",t=!1;for(var r=arguments.length;r>=-1&&!t;r--){var i=r>=0?arguments[r]:process.cwd();if(typeof i!="string"||!i)continue;e=i+"/"+e,t=i.charAt(0)==="/"}return e=n(e.split("/").filter(function(e){return!!e}),!t).join("/"),(t?"/":"")+e||"."},e.normalize=function(e){var t=e.charAt(0)==="/",r=e.slice(-1)==="/";return e=n(e.split("/").filter(function(e){return!!e}),!t).join("/"),!e&&!t&&(e="."),e&&r&&(e+="/"),(t?"/":"")+e},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(t.filter(function(e,t){return e&&typeof e=="string"}).join("/"))},e.relative=function(t,n){function r(e){var t=0;for(;t<e.length;t++)if(e[t]!=="")break;var n=e.length-1;for(;n>=0;n--)if(e[n]!=="")break;return t>n?[]:e.slice(t,n-t+1)}t=e.resolve(t).substr(1),n=e.resolve(n).substr(1);var i=r(t.split("/")),s=r(n.split("/")),o=Math.min(i.length,s.length),u=o;for(var a=0;a<o;a++)if(i[a]!==s[a]){u=a;break}var f=[];for(var a=u;a<i.length;a++)f.push("..");return f=f.concat(s.slice(u)),f.join("/")},e.dirname=function(e){var n=r.exec(e)[1]||"";return n?n.length===1||t&&n.length<=3&&n.charAt(1)===":"?n:n.substring(0,n.length-1):"."},e.basename=function(e,t){var n=r.exec(e)[2]||"";return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},e.extname=function(e){return r.exec(e)[3]||""},e}),define("desktop/patcher/loader",["vendors/utili/q"],function(e){function t(){this.xhr=new XMLHttpRequest,this.deferred=e.defer()}return t.prototype.promise=function(){return this.deferred.promise},t.prototype.load=function(e){return this.xhr.open("GET",e,!0),this.onload=this.onload.bind(this),this.onprogress=this.onprogress.bind(this),this.onerror=this.onerror.bind(this),this.promise()},t.prototype.onload=function(){},t.prototype.onprogress=function(e){this.deferred.notify(e.loaded/e.total)},t.prototype.onerror=function(e){this.deferred.reject(e)},t.prototype.abort=function(){this.xhr.abort(),this.deferred.reject(new Error("abort"))},t}),define("desktop/patcher/binaryLoader.js",["./loader"],function(e){function t(){e.call(this)}t.prototype=Object.create(e.prototype),t.prototype.load=function(t){return e.prototype.load.call(this,t),this.xhr.responseType="blob",this.xhr.send(),this.promise()},t.prototype.onload=function(){this.deferred.resolve(this.xhr.response)}}),define("vendors/msgpack",[],function(){function t(e){if(e===undefined)return"undefined";var t,n;e instanceof ArrayBuffer?(n="ArrayBuffer",t=new DataView(e)):e instanceof DataView&&(n="DataView",t=e);if(!t)return JSON.stringify(e);var r=[];for(var i=0;i<e.byteLength;i++){if(i>20){r.push("...");break}var s=t.getUint8(i).toString(16);s.length===1&&(s="0"+s),r.push(s)}return"<"+n+" "+r.join(" ")+">"}function n(e,t,n){var r=e.byteLength;for(var i=0,s=n.length;i<s;i++){var o=n.charCodeAt(i);if(o<128){e.setUint8(t++,o>>>0&127|0);continue}if(o<2048){e.setUint8(t++,o>>>6&31|192),e.setUint8(t++,o>>>0&63|128);continue}if(o<65536){e.setUint8(t++,o>>>12&15|224),e.setUint8(t++,o>>>6&63|128),e.setUint8(t++,o>>>0&63|128);continue}if(o<1114112){e.setUint8(t++,o>>>18&7|240),e.setUint8(t++,o>>>12&63|128),e.setUint8(t++,o>>>6&63|128),e.setUint8(t++,o>>>0&63|128);continue}throw new Error("bad codepoint "+o)}}function r(e,t,n){var r="";for(var i=t,s=t+n;i<s;i++){var o=e.getUint8(i);if((o&128)===0){r+=String.fromCharCode(o);continue}if((o&224)===192){r+=String.fromCharCode((o&15)<<6|e.getUint8(++i)&63);continue}if((o&240)===224){r+=String.fromCharCode((o&15)<<12|(e.getUint8(++i)&63)<<6|(e.getUint8(++i)&63)<<0);continue}if((o&248)===240){r+=String.fromCharCode((o&7)<<18|(e.getUint8(++i)&63)<<12|(e.getUint8(++i)&63)<<6|(e.getUint8(++i)&63)<<0);continue}throw new Error("Invalid byte "+o.toString(16))}return r}function i(e){var t=0;for(var n=0,r=e.length;n<r;n++){var i=e.charCodeAt(n);if(i<128){t+=1;continue}if(i<2048){t+=2;continue}if(i<65536){t+=3;continue}if(i<1114112){t+=4;continue}throw new Error("bad codepoint "+i)}return t}function s(e,t){this.offset=t||0,this.view=e}function o(e){var t=new DataView(e),n=new s(t),r=n.parse();if(n.offset!==e.byteLength)throw new Error(e.byteLength-n.offset+" trailing bytes");return r}function u(e,t,r){var s=typeof e;if(s==="string"){var o=i(e);if(o<32)return t.setUint8(r,o|160),n(t,r+1,e),1+o;if(o<65536)return t.setUint8(r,218),t.setUint16(r+1,o),n(t,r+3,e),3+o;if(o<4294967296)return t.setUint8(r,219),t.setUint32(r+1,o),n(t,r+5,e),5+o}if(e instanceof ArrayBuffer){var o=e.byteLength;if(o<65536)return t.setUint8(r,216),t.setUint16(r+1,o),(new Uint8Array(t.buffer)).set(new Uint8Array(e),r+3),3+o;if(o<4294967296)return t.setUint8(r,217),t.setUint32(r+1,o),(new Uint8Array(t.buffer)).set(new Uint8Array(e),r+5),5+o}if(s==="number"){if(e<<0!==e)return t.setUint8(r,203),t.setFloat64(r+1,e),9;if(e>=0){if(e<128)return t.setUint8(r,e),1;if(e<256)return t.setUint8(r,204),t.setUint8(r+1,e),2;if(e<65536)return t.setUint8(r,205),t.setUint16(r+1,e),3;if(e<4294967296)return t.setUint8(r,206),t.setUint32(r+1,e),5;throw new Error("Number too big 0x"+e.toString(16))}if(e>=-32)return t.setInt8(r,e),1;if(e>=-128)return t.setUint8(r,208),t.setInt8(r+1,e),2;if(e>=-32768)return t.setUint8(r,209),t.setInt16(r+1,e),3;if(e>=-2147483648)return t.setUint8(r,210),t.setInt32(r+1,e),5;throw new Error("Number too small -0x"+(-e).toString(16).substr(1))}if(s==="undefined")return t.setUint8(r,196),1;if(e===null)return t.setUint8(r,192),1;if(s==="boolean")return t.setUint8(r,e?195:194),1;if(s==="object"){var o,a=0,f=Array.isArray(e);if(f)o=e.length;else{var l=Object.keys(e);o=l.length}var a;o<16?(t.setUint8(r,o|(f?144:128)),a=1):o<65536?(t.setUint8(r,f?220:222),t.setUint16(r+1,o),a=3):o<4294967296&&(t.setUint8(r,f?221:223),t.setUint32(r+1,o),a=5);if(f)for(var c=0;c<o;c++)a+=u(e[c],t,r+a);else for(var c=0;c<o;c++){var h=l[c];a+=u(h,t,r+a),a+=u(e[h],t,r+a)}return a}throw new Error("Unknown type "+s)}function a(e){var t=typeof e;if(t==="string"){var n=i(e);if(n<32)return 1+n;if(n<65536)return 3+n;if(n<4294967296)return 5+n}if(e instanceof ArrayBuffer){var n=e.byteLength;if(n<65536)return 3+n;if(n<4294967296)return 5+n}if(t==="number"){if(e<<0!==e)return 9;if(e>=0){if(e<128)return 1;if(e<256)return 2;if(e<65536)return 3;if(e<4294967296)return 5;if(e<0x10000000000000000)return 9;throw new Error("Number too big 0x"+e.toString(16))}if(e>=-32)return 1;if(e>=-128)return 2;if(e>=-32768)return 3;if(e>=-2147483648)return 5;if(e>=-0x8000000000000000)return 9;throw new Error("Number too small -0x"+e.toString(16).substr(1))}if(t==="boolean"||t==="undefined"||e===null)return 1;if(t==="object"){var n,r=0;if(Array.isArray(e)){n=e.length;for(var s=0;s<n;s++)r+=a(e[s])}else{var o=Object.keys(e);n=o.length;for(var s=0;s<n;s++){var u=o[s];r+=a(u)+a(e[u])}}if(n<16)return 1+r;if(n<65536)return 3+r;if(n<4294967296)return 5+r;throw new Error("Array or object too long 0x"+n.toString(16))}throw new Error("Unknown type "+t)}var e={};return e.inspect=t,e.utf8Write=n,e.utf8Read=r,e.utf8ByteCount=i,e.encode=function(e){var t=new ArrayBuffer(a(e)),n=new DataView(t);return u(e,n,0),t},e.decode=o,s.prototype.map=function(e){var t={};for(var n=0;n<e;n++){var r=this.parse();t[r]=this.parse()}return t},s.prototype.buf=function(e){var t=new ArrayBuffer(e);return(new Uint8Array(t)).set(new Uint8Array(this.view.buffer,this.offset,e),0),this.offset+=e,t},s.prototype.raw=function(e){var t=r(this.view,this.offset,e);return this.offset+=e,t},s.prototype.array=function(e){var t=new Array(e);for(var n=0;n<e;n++)t[n]=this.parse();return t},s.prototype.parse=function(){var e=this.view.getUint8(this.offset),t,n;if((e&224)===160)return n=e&31,this.offset++,this.raw(n);if((e&240)===128)return n=e&15,this.offset++,this.map(n);if((e&240)===144)return n=e&15,this.offset++,this.array(n);if((e&128)===0)return this.offset++,e;if((e&224)===224)return t=this.view.getInt8(this.offset),this.offset++,t;switch(e){case 218:return n=this.view.getUint16(this.offset+1),this.offset+=3,this.raw(n);case 219:return n=this.view.getUint32(this.offset+1),this.offset+=5,this.raw(n);case 192:return this.offset++,null;case 194:return this.offset++,!1;case 195:return this.offset++,!0;case 196:return this.offset++,undefined;case 204:return t=this.view.getUint8(this.offset+1),this.offset+=2,t;case 205:return t=this.view.getUint16(this.offset+1),this.offset+=3,t;case 206:return t=this.view.getUint32(this.offset+1),this.offset+=5,t;case 208:return t=this.view.getInt8(this.offset+1),this.offset+=2,t;case 209:return t=this.view.getInt16(this.offset+1),this.offset+=3,t;case 210:return t=this.view.getInt32(this.offset+1),this.offset+=5,t;case 222:return n=this.view.getUint16(this.offset+1),this.offset+=3,this.map(n);case 223:return n=this.view.getUint32(this.offset+1),this.offset+=5,this.map(n);case 220:return n=this.view.getUint16(this.offset+1),this.offset+=3,this.array(n);case 221:return n=this.view.getUint32(this.offset+1),this.offset+=5,this.array(n);case 216:return n=this.view.getUint16(this.offset+1),this.offset+=3,this.buf(n);case 217:return n=this.view.getUint32(this.offset+1),this.offset+=5,this.buf(n);case 202:return t=this.view.getFloat32(this.offset+1),this.offset+=5,t;case 203:return t=this.view.getFloat64(this.offset+1),this.offset+=9,t}throw new Error("Unknown type 0x"+e.toString(16))},e}),define("desktop/patcher/jsonLoader.js",["./loader","vendors/msgpack"],function(e,t){function n(){e.call(this)}n.prototype=Object.create(e.prototype),n.prototype.load=function(t){e.prototype.load.call(this,t),this.xhr.responseType="arraybuffer",this.xhr.send()},n.prototype.onload=function(){var e=this.defrred;t.decode(this.xhr.response).then(function(e){new Blob([JSON.stringify(e)],{type:"application/json"})}).then(e.resolve,e.reject)}}),importScripts("/vendors/scripts/requirejs.min.js");var queue=[];self.onmessage=function(e){queue.push(e)},require(["vendors/utili/q","configs/client","desktop/worker/promiseWorker","vendors/utili/path","desktop/patcher/binaryLoader.js","desktop/patcher/jsonLoader.js"],function(e,t,n,r,i,s){function o(){n.call(this),this.on("downloadAndSave",this.downloadAndSave.bind(this)),this.on("requestFileSystem",function(e){this.fs=this.getFilesystem(e)}.bind(this)),this.fs=this.getFilesystem(t.get("neededQuata")),this.applyQueue(queue),delete queue}o.prototype.getFilesystem=function(t){return e.Promise(function(e,n){self.requestFileSystem(self.PERSISTENT,t,e,n)})},o.prototype.downloadAndSave=function(n){var i=e.defer(),s=r.join(t.get("assetPath"),n);return this.download(s).then(function(e){return this.save(e,n)}.bind(this),i.reject,i.notify).then(i.resolve,i.reject,i.notify),i.promise},o.prototype.save=function(t,n){return this.fs.then(function(r){this.createFile(r.root,n).then(function(n){return e.Promise(function(e,r){n.createWriter(function(n){n.onwrite=e,n.onerror=r,t.length<n.length&&n.truncate(t.length),n.write(t)},r)})})}.bind(this))},o.prototype.download=function(e){var t=r.extname(e),n=t===".js"?s:i,o=new n;return o.load(e)},o.prototype.createFile=function(t,n){return this.createDirectorys(t,r.dirname(n)).then(function(){return e.Promise(function(e,r){t.getFile(n,{create:!0},e,r)})})},o.prototype.createDirectorys=function(t,n){function s(e){var t=n.shift();t?e.getDirectory(t,{create:!0},s,i.reject):i.resolve(e)}var i=e.defer();return n=r.normalize(n).split("/").slice(1),s(t),i.promise},new o}),define("desktop/worker/downloader.js",function(){});