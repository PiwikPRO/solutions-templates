const getSelectorFromTarget = (target) => {
  const className = target.className !== '' ? `.${target.className}` : '';
  const targetId = target.id !== '' ? `#${target.id}` : '';

  return [target.nodeName, className, targetId].join(' ');
}

const detectMouseShake = (subscribe, { interval, sensitiveness }) => {
  let distance = 0;
  let relative = 0;

  const listener = (event) => {
    relative += event.movementX + event.movementY;
    distance += Math.abs(event.movementX + event.movementY);
  };

  // Clear state when reach time limit
  const intervalClear = setInterval(() => {
    if ((Math.abs(relative) / distance) * 100 < sensitiveness) {
      subscribe(() => {
        clearInterval(intervalClear);
        document.removeEventListener('mounsemove', listener);
      });
    }

    distance = 0;
    relative = 0;
  }, interval);

  // Listen on all clicks
  document.addEventListener('mousemove', listener);
}
