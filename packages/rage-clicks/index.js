const getSelectorFromTarget = (target) => {
  const className = target.className !== '' ? `.${target.className}` : '';
  const targetId = target.id !== '' ? `#${target.id}` : '';

  return [target.nodeName, className, targetId].join(' ');
}

const detectRageClicks = (subscribe, { interval, limit }) => {
  let count = 1;

  // Clear state when reach time limit
  const countClear = setInterval(() => {
    count = 1;
  }, interval);

  const listener = (event) => {
    if (count === limit) {
      subscribe(getSelectorFromTarget(event.target), () => {
        clearInterval(countClear);
        document.removeEventListener('click', listener);
      });
    }

    count++
  };

  // Listen on all clicks
  document.addEventListener('click', listener);
}
