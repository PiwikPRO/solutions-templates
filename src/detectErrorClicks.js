import getSelectorFromTarget from 'helpers/getSelectorFromTarget';

/**
 * Detects error clicks
 * 
 * Error clicks are clicks that result in JavaScript errors.
 * The visitor doesn’t have to click on something many times in a row.
 * Just one click is enough to spot an error.
 * Often the visitor doesn’t notice that something is broken, but for you,
 * it’s a signal that a particular JavaScript element is not working.
 */
export default (subscribe, { iframeTracking }) => {
  let error;

  window.onerror = (msg) => {
    error = msg;
  };

  const listener = (event) => {
    const selector = getSelectorFromTarget(event.target);

    setTimeout(() => {
      if (error) {
        var eventData = ['trackEvent', 'UX Research', 'Error Click', selector];
        if(iframeTracking){
          window.parent.postMessage({type: "PiwikPRO", payload: eventData}, "*"); 
        }
        else{
          subscribe(eventData);
        }
      }

      error = undefined;
    }, 0);
  };

  // Listen on all clicks
  document.addEventListener('click', listener);

  return () => {
    document.removeEventListener('click', listener);
  };
};
