/**
 * Detect mouse shake
 * 
 * Mouse shaking is when users erratically move their cursor back and forth.
 * Rapidly moving the cursor over a page can indicate 
 * the user is getting exasperated with some aspect of their experience. 
 * Perhaps the site performance is slow or they are struggling to figure something out.
 * 
 * @runtime
 * detectMouseShake(function (unsubscribe) {
 *   window._paq.push(['trackEvent', 'UX Research', 'Mouse shake']);
 *
 *   // unsubscribe(); // Uncomment this line when you want to finish after first trigger
 * }, {
 *   interval: 350, // Number of milliseconds to reset counter
 *   threshold: 0.01, // Acceleration of mouse movement threshold
 * });
 */
export default (subscribe, { interval, threshold }) => {
  let velocity;
  let direction;
  let directionChangeCount = 0;
  let distance = 0;

  const listener = (event) => {
    const nextDirection = Math.sign(event.movementX);

    distance += Math.abs(event.movementX) + Math.abs(event.movementY);

    if (nextDirection !== direction) {
      direction = nextDirection;
      directionChangeCount++;
    }
  };

  // Clear state when reach time limit
  const intervalClear = setInterval(() => {
    const nextVelocity = distance / interval;
    
    if (!velocity) {
      velocity = nextVelocity;
    
      return;
    }

    const acceleration = (nextVelocity - velocity) / interval;

    if (directionChangeCount && acceleration > threshold) {
      let eventData = ['trackEvent', 'UX Research', 'Mouse shake'];
      subscribe(eventData); 
    }

    distance = 0;
    directionChangeCount = 0;
    velocity = nextVelocity;
  }, interval);

  // Listen on all clicks
  document.addEventListener('mousemove', listener);

  return () => {
    clearInterval(intervalClear);
    document.removeEventListener('mousemove', listener);
  };
};
