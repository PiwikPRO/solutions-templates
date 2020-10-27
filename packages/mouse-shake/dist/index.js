(function (){
"use strict";var detectMouseShake=function(subscribe,_a){var interval=_a.interval,threshold=_a.threshold;var velocity;var direction;var directionChangeCount=0;var distance=0;var listener=function(event){var nextDirection=Math.sign(event.movementX);distance+=Math.abs(event.movementX)+Math.abs(event.movementY);if(nextDirection!==direction){direction=nextDirection;directionChangeCount++}};var intervalClear=setInterval((function(){var nextVelocity=distance/interval;if(!velocity){velocity=nextVelocity;return}var acceleration=(nextVelocity-velocity)/interval;if(directionChangeCount&&acceleration>threshold){subscribe((function(){clearInterval(intervalClear);document.removeEventListener("mousemove",listener)}))}distance=0;directionChangeCount=0;velocity=nextVelocity}),interval);document.addEventListener("mousemove",listener)};

detectMouseShake(function (unsubscribe) {
  window._paq.push(['trackEvent', 'UX Research', 'Mouse shake']);

  // unsubscribe() // Uncomment this line when you want to finish after first trigger
}, {
  interval: 350, // Number of milliseconds to reset counter
  threshold: 0.01, // Acceleration of mouse movement threshold
});
})()
