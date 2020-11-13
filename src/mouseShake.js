import { detectMouseShake } from './helpers/detectMouseShake';

detectMouseShake((unsubscribe) => {
  window._paq.push(['trackEvent', 'UX Research', 'Mouse shake']);

  // unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
  interval: 350, // Number of milliseconds to reset counter
  threshold: 0.01, // Acceleration of mouse movement threshold
});
