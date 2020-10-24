(function (){
"use strict";var detectMouseShake=function(subscribe,_a){var interval=_a.interval,sensitiveness=_a.sensitiveness;var distance=0;var relative=0;var listener=function(event){relative+=event.movementX+event.movementY;distance+=Math.abs(event.movementX+event.movementY)};var intervalClear=setInterval((function(){if(Math.abs(relative)/distance*100<sensitiveness){subscribe((function(){clearInterval(intervalClear);document.removeEventListener("mousemove",listener)}))}distance=0;relative=0}),interval);document.addEventListener("mousemove",listener)};

detectMouseShake(function (target) {
  _paq.push(['trackEvent', 'UX Research', 'Mouse shake']);

  // unsubscribe() // Uncomment this line when you want to finish after first trigger
}, {
  interval: 200, // Number of milliseconds to reset counter
  sensitiveness: 10, // Number from 0 to 100
});
})()
