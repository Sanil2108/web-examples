!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);let r,o;const s=new WeakMap,i=new WeakMap,a=new WeakMap,c=new WeakMap,u=new WeakMap;let f={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return i.get(e);if("objectStoreNames"===t)return e.objectStoreNames||a.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return l(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function d(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(o||(o=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(y(this),t),l(s.get(this))}:function(...t){return l(e.apply(y(this),t))}:function(t,...n){const r=e.call(y(this),t,...n);return a.set(r,t.sort?t.sort():[t]),l(r)}}function p(e){return"function"==typeof e?d(e):(e instanceof IDBTransaction&&function(e){if(i.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});i.set(e,t)}(e),t=e,(r||(r=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,f):e);var t}function l(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{t(l(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(t=>{t instanceof IDBCursor&&s.set(t,e)}).catch(()=>{}),u.set(t,e),t}(e);if(c.has(e))return c.get(e);const t=p(e);return t!==e&&(c.set(e,t),u.set(t,e)),t}const y=e=>u.get(e);const b=["get","getKey","getAll","getAllKeys","count"],v=["put","add","delete","clear"],m=new Map;function D(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(m.get(t))return m.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=v.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!b.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,o?"readwrite":"readonly");let i=s.store;r&&(i=i.index(t.shift()));const a=i[n](...t);return o&&await s.done,a};return m.set(t,s),s}f=(e=>({...e,get:(t,n,r)=>D(t,n)||e.get(t,n,r),has:(t,n)=>!!D(t,n)||e.has(t,n)}))(f),window.onload=function(){"indexedDB"in window||document.write("IndexedDB not supported")}}]);