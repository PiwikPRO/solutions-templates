
(function() {
  var detectDeadClicks;detectDeadClicks=(()=>{"use strict";var e={255:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(r(793));t.default=function(e,t){var r=t.interval,n=t.limit,i={},u=setInterval((function(){i={}}),r),c=function(t){var r=a.default(t.target);i[r]=i[r]?i[r]+1:1,i[r]===n&&e(r,(function(){clearInterval(u),document.removeEventListener("click",c)}))};document.addEventListener("click",c)}},793:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=""!==e.className?"."+e.className:"",r=""!==e.id?"#"+e.id:"";return[e.nodeName,t,r].join(" ")}}},t={};return function r(n){if(t[n])return t[n].exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,r),a.exports}(255)})();
  
detectDeadClicks(function (target, unsubscribe) {
   window._paq.push(['trackEvent', 'UX Research', 'Dead Click', target]);

   // unsubscribe(); // Uncomment this line when you want to finish after first trigger
 }, {
   interval: 1000, // Number of milliseconds to reset counter
   limit: 2, // Number of clicks to trigger function above
 });

})();
    