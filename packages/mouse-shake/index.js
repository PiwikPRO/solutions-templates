const detectMouseShake = (subscribe, { interval, threshold }) => {
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
    const nextVelocity = distance / interval
    
    if (!velocity) {
      velocity = nextVelocity;
    
      return
    }

    const acceleration = (nextVelocity - velocity) / interval

    if (directionChangeCount && acceleration > threshold) {
      subscribe(() => {
        clearInterval(intervalClear);
        document.removeEventListener('mousemove', listener);
      });
    }

    distance = 0;
    directionChangeCount = 0;
    velocity = nextVelocity;
  }, interval);

  // Listen on all clicks
  document.addEventListener('mousemove', listener);
}
