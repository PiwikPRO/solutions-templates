
(function() {
  var collectHeatmapClicks;collectHeatmapClicks=(()=>{"use strict";var e={460:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){var r=function(e){for(var r,t=[],a=0,o=e[a];o&&o!==document&&o!==window&&"html"!==(r=o.tagName.toLowerCase());o=o.parentNode,a++){if(o.id){r="#"+o.id,t.push(r);break}if(Array.prototype.slice.call(o.parentNode.children).filter((function(e){return e.tagName.toLowerCase()===r})).length>1){var n=Array.prototype.slice.call(o.parentNode.children).indexOf(o)+1;n>0&&(r+=":nth-child("+n+")")}if("string"==typeof o.className&&o.className){var c=o.className.replaceAll(" ",".");r+="."+c}t.push(r)}return t.reverse().join(">")};document.addEventListener("click",(function(t){var a=[],o="";if(t.composedPath)o=r(t.composedPath());else{for(var n=t.target;null!==n.parentNode;)a.push(n),n=n.parentNode;a.push(window.document),o=r(a)}e(o)}))}}},r={};return function t(a){if(r[a])return r[a].exports;var o=r[a]={exports:{}};return e[a](o,o.exports,t),o.exports}(460)})();
  
collectHeatmapClicks((targetPath) => {
window._paq.push(['trackEvent', 'Heatmap events', 'Click', targetPath]);
});

})();
    