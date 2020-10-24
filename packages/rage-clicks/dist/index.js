(function (){
"use strict";var getSelectorFromTarget=function(target){var className=target.className!==""?"."+target.className:"";var targetId=target.id!==""?"#"+target.id:"";return[target.nodeName,className,targetId].join(" ")};var detectRageClicks=function(subscribe,_a){var interval=_a.interval,limit=_a.limit;var count=1;var countClear=setInterval((function(){count=1}),interval);var listener=function(event){if(count===limit){subscribe(getSelectorFromTarget(event.target),(function(){clearInterval(countClear);document.removeEventListener("click",listener)}))}count++};document.addEventListener("click",listener)};

detectRageClicks(function (target, unsubscribe) {
  _paq.push(['trackEvent', 'UX research', 'Rage click', target]);

  // unsubscribe() // Uncomment this line when you want to finish after first trigger
}, {
  interval: 750, // Number of milliseconds to reset counter
  limit: 3, // Number of clicks to trigger function above
});
})()
