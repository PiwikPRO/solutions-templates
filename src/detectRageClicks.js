import getSelectorFromTarget from './getSelectorFromTarget'

/**
 * Detect rage clicks
 * 
 * Rage clicks are like punching your mouse or touchpad because it doesn’t do what you want.
 * They are triggered when a visitor clicks an element on your website multiple times, rapidly. 
 * In most cases, rage clicks signal that your website didn’t react the way your visitor expected,
 * so you may want to take a closer look at it.
 * 
 * @runtime
 * detectRageClicks((target, unsubscribe) => {
 *   window._paq.push(['trackEvent', 'UX research', 'Rage click', target]);
 *
 *   // unsubscribe(); // Uncomment this line when you want to finish after first trigger
 * }, {
 *   interval: 750, // Number of milliseconds to reset counter
 *   limit: 3, // Number of clicks to trigger function above
 * });
 */
export default (subscribe, { interval, limit }) => {
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
