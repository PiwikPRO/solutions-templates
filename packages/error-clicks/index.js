const getSelectorFromTarget = (target) => {
  const className = target.className !== '' ? `.${target.className}` : '';
  const targetId = target.id !== '' ? `#${target.id}` : '';

  return [target.nodeName, className, targetId].join(' ');
}

const detectErrorClicks = (subscribe) => {
  let error;

  window.onerror = (msg) => {
    error = msg;
  }

  const listener = (event) => {
    const selector = getSelectorFromTarget(event.target)

    setTimeout(() => {
      if (error) {
        subscribe(selector, error, () => {
          document.removeEventListener('click', listener);
        });
      }

      error = undefined;
    }, 0);
  };

  // Listen on all clicks
  document.addEventListener('click', listener);
}
