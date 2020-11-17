
(function() {
  var detectErrorClicks;detectErrorClicks=(()=>{"use strict";var e={534:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(793));t.default=function(e){var t;window.onerror=function(e){t=e};var r=function(n){var i=o.default(n.target);setTimeout((function(){t&&e(i,t,(function(){document.removeEventListener("click",r)})),t=void 0}),0)};document.addEventListener("click",r)}},793:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=""!==e.className?"."+e.className:"",r=""!==e.id?"#"+e.id:"";return[e.nodeName,t,r].join(" ")}}},t={};return function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(534)})();
  
detectErrorClicks(function (target, error, unsubscribe) {
  window._paq.push(['trackEvent', 'UX Research', 'Error Click', target]);

  // unsubscribe(); // Uncomment this line when you want to finish after first trigger
});

})();
    