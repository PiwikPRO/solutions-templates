(()=>{"use strict";var e={74:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.detectMouseShake=void 0,t.detectMouseShake=function(e,t){var n,o,r=t.interval,a=t.threshold,s=0,u=0,v=function(e){var t=Math.sign(e.movementX);u+=Math.abs(e.movementX)+Math.abs(e.movementY),t!==o&&(o=t,s++)},c=setInterval((function(){var t=u/r;n?(s&&(t-n)/r>a&&e((function(){clearInterval(c),document.removeEventListener("mousemove",v)})),u=0,s=0,n=t):n=t}),r);document.addEventListener("mousemove",v)}},930:(e,t,n)=>{n(74).detectMouseShake((function(e){window._paq.push(["trackEvent","UX Research","Mouse shake"])}),{interval:350,threshold:.01})}},t={};!function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}(930)})();