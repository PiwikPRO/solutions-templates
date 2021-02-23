import getSelectorFromTarget from './getSelectorFromTarget';

/**
 * Detects dead clicks
 * 
 * Dead clicks are clicks that have no effect on the page. 
 * The visitor clicks on the image to zoom it in, but nothing happens. 
 * He expects a text string to be a link, but it isn’t. Or he clicks on a button, 
 * but to no avail. In such situations, the visitor will end up clicking twice, quickly.
 * Looking for dead clicks will help you find these main points of frustration and improve visitors` experience as soon as possible.
 */
export default (subscribe, { interval, limit }) => {
  let clickCounts = {};

  // Clear state when reach time limit
  const countClear = setInterval(() => {
    clickCounts = {};
  }, interval);

  const listener = (event) => {
    const selector = getSelectorFromTarget(event.target);

    clickCounts[selector] = clickCounts[selector] ? clickCounts[selector] + 1 : 1;

    if (clickCounts[selector] === limit) {
      subscribe(selector, () => {
        clearInterval(countClear);
        document.removeEventListener('click', listener);
      });
    }
  };

  // Listen on all clicks
  document.addEventListener('click', listener);
};
