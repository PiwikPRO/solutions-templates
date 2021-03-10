import appendTimeState from './appendTimeState';
import isUrlFromExternalSite from './isUrlFromExternalSite';

const STATE_KEY = '__pp_detect_quick_backs';

export default (subscribe, { threshold }) => {
  const now = new Date().getTime();
  const url = document.location.href;
  const state = appendTimeState(STATE_KEY, url, now - threshold);  
  const hasQuickBack = state.filter(entry => entry.value === url).length > 1;

  const listener = (event) => {
    if (event.target.href && isUrlFromExternalSite(event.target.href)) {
      appendTimeState(STATE_KEY, event.target.href, now - threshold);
    }
  };

  if (hasQuickBack) {
    const currentStateIndex = state.map(entry => entry.value).lastIndexOf(url);

    subscribe(state[currentStateIndex - 1].value, () => {
      removeEventListener('click', listener);
    });
  }

  document.addEventListener('click', listener);
};
