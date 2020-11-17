
(function() {
  var detectMouseShake;detectMouseShake=(()=>{"use strict";var e={409:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n,r,o=t.interval,a=t.threshold,s=0,u=0,v=function(e){var t=Math.sign(e.movementX);u+=Math.abs(e.movementX)+Math.abs(e.movementY),t!==r&&(r=t,s++)},m=setInterval((function(){var t=u/o;n?(s&&(t-n)/o>a&&e((function(){clearInterval(m),document.removeEventListener("mousemove",v)})),u=0,s=0,n=t):n=t}),o);document.addEventListener("mousemove",v)}}},t={};return function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}(409)})();
  
detectMouseShake(function (unsubscribe) {
  window._paq.push(['trackEvent', 'UX Research', 'Mouse shake']);

  // unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
  interval: 350, // Number of milliseconds to reset counter
  threshold: 0.01, // Acceleration of mouse movement threshold
});

})();
    