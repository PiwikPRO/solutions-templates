export default (payload) => {
    window.parent.postMessage({ type: 'PiwikPRO', payload }, '*');
  };