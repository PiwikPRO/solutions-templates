(function (){
"use strict";var getSelectorFromTarget=function(target){var className=target.className!==""?"."+target.className:"";var targetId=target.id!==""?"#"+target.id:"";return[target.nodeName,className,targetId].join(" ")};var detectDeadClicks=function(subscribe,_a){var interval=_a.interval,limit=_a.limit;var clickCounts={};var countClear=setInterval((function(){clickCounts={}}),interval);var listener=function(event){var selector=getSelectorFromTarget(event.target);if(clickCounts[selector]===limit){subscribe(selector,(function(){clearInterval(countClear);document.removeEventListener("click",listener)}))}clickCounts[selector]=clickCounts[selector]?clickCounts[selector]+1:1};document.addEventListener("click",listener)};

detectDeadClicks(function (target, unsubscribe) {
  window._paq.push(['trackEvent', 'UX Research', 'Dead Click', target]);

  // unsubscribe() // Uncomment this line when you want to finish after first trigger
}, {
  interval: 1000, // Number of milliseconds to reset counter
  limit: 2, // Number of clicks to trigger function above
});
})()
