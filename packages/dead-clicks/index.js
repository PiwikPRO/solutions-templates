const getSelectorFromTarget = (target) => {
  const className = target.className !== '' ? `.${target.className}` : '';
  const targetId = target.id !== '' ? `#${target.id}` : '';

  return [target.nodeName, className, targetId].join(' ');
}

const detectDeadClicks = (subscribe, { interval, limit }) => {
  let clickCounts = {};

  // Clear state when reach time limit
  const countClear = setInterval(() => {
    clickCounts = {};
  }, interval);

  const listener = (event) => {
    const selector = getSelectorFromTarget(event.target)

    clickCounts[selector] = clickCounts[selector] ? clickCounts[selector] + 1 : 1

    if (clickCounts[selector] === limit) {
      subscribe(selector, () => {
        clearInterval(countClear);
        document.removeEventListener('click', listener);
      });
    }
  };

  // Listen on all clicks
  document.addEventListener('click', listener);
}
