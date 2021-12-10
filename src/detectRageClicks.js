import getSelectorFromTarget from 'helpers/getSelectorFromTarget';

/**
 * Detect rage clicks
 * 
 * Rage clicks are like punching your mouse or touchpad because it doesn’t do what you want.
 * They are triggered when a visitor clicks an element on your website multiple times, rapidly. 
 * In most cases, rage clicks signal that your website didn’t react the way your visitor expected,
 * so you may want to take a closer look at it.
 */
export default (subscribe, { interval, limit, iframeTracking }) => {
  let count = 1;

  // Clear state when reach time limit
  const countClear = setInterval(() => {
    count = 1;
  }, interval);

  const listener = (event) => {
    if (count === limit) {
      var eventData = ['trackEvent', 'UX Research', 'Rage click', getSelectorFromTarget(event.target)];
      if(iframeTracking)
      {
        window.parent.postMessage({type: "PiwikPRO", payload: eventData}, "*");
      }
      else{
        subscribe(eventData);
      }
    }

    count++;
  };

  // Listen on all clicks
  document.addEventListener('click', listener);

  return () => {
    clearInterval(countClear);
    document.removeEventListener('click', listener);
  };
};
