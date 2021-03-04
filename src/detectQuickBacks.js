import getSelectorFromTarget from './getSelectorFromTarget';
import setPersistentState from './setPersistentState';
import getPersistentState from './getPersistentState';
import clearPersistentState from './clearPersistentState';
import isUrlFromExternalSite from './isUrlFromExternalSite';

const STATE_KEY = '__pp_detect_back_clicks';

export default (subscribe, { threshold }) => {
  const state = getPersistentState(STATE_KEY);
  const url = document.location.href;
  const now = new Date().getTime();

  if (state && now - state.time < threshold) {
    subscribe(state.selector, document.referrer);
    clearPersistentState(STATE_KEY);
  }

  const listener = (e) => {
    const selector = getSelectorFromTarget(e.target);

    if (e.target.href && isUrlFromExternalSite(e.target.href)) {
      setPersistentState(STATE_KEY, { url, selector, time: now });
    }
  };

  // Listen on all clicks
  document.addEventListener('click', listener);
};
