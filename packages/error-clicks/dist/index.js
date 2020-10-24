(function (){
"use strict";var getSelectorFromTarget=function(target){var className=target.className!==""?"."+target.className:"";var targetId=target.id!==""?"#"+target.id:"";return[target.nodeName,className,targetId].join(" ")};var detectErrorClicks=function(subscribe){var error;window.onerror=function(msg){error=msg};var listener=function(event){var selector=getSelectorFromTarget(event.target);setTimeout((function(){if(error){subscribe(selector,error,(function(){document.removeEventListener("click",listener)}))}error=undefined}),0)};document.addEventListener("click",listener)};

detectErrorClicks(function (target, error, unsubscribe) {
  console.log('Error detected:', error);
  _paq.push(['trackEvent', 'UX Research', 'Error Click', target]);

  // unsubscribe() // Uncomment this line when you want to finish after first trigger
});
})()
