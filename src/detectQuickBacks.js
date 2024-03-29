import appendTimeState from 'helpers/appendTimeState';
import isUrlFromExternalSite from 'helpers/isUrlFromExternalSite';

const STATE_KEY = '__pp_detect_quick_backs';

export default (subscribe, { threshold = 12000 }) => {
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
    const target = state[currentStateIndex - 1].value;

    subscribe(target);
  }

  document.addEventListener('click', listener);

  return () => {
    removeEventListener('click', listener);
  }; 
};
