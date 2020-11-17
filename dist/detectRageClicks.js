
(function() {
  var detectRageClicks;detectRageClicks=(()=>{"use strict";var e={253:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(r(793));t.default=function(e,t){var r=t.interval,n=t.limit,i=1,u=setInterval((function(){i=1}),r),c=function(t){i===n&&e(a.default(t.target),(function(){clearInterval(u),document.removeEventListener("click",c)})),i++};document.addEventListener("click",c)}},793:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=""!==e.className?"."+e.className:"",r=""!==e.id?"#"+e.id:"";return[e.nodeName,t,r].join(" ")}}},t={};return function r(n){if(t[n])return t[n].exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,r),a.exports}(253)})();
  
detectRageClicks((target, unsubscribe) => {
  window._paq.push(['trackEvent', 'UX research', 'Rage click', target]);

  // unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
  interval: 750, // Number of milliseconds to reset counter
  limit: 3, // Number of clicks to trigger function above
});

})();
    