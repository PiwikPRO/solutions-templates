import getSelectorFromTarget from './getSelectorFromTarget';

/**
 * Detects error clicks
 * 
 * Error clicks are clicks that result in JavaScript errors.
 * The visitor doesn’t have to click on something many times in a row.
 * Just one click is enough to spot an error.
 * Often the visitor doesn’t notice that something is broken, but for you,
 * it’s a signal that a particular JavaScript element is not working.
 */
export default (subscribe) => {
  let error;

  window.onerror = (msg) => {
    error = msg;
  };

  const listener = (event) => {
    const selector = getSelectorFromTarget(event.target);

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
};
