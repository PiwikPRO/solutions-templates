detectMouseShake((target) => {
  _paq.push(['trackEvent', 'UX Research', 'Mouse shake']);

  // unsubscribe() // Uncomment this line when you want to finish after first trigger
}, {
  interval: 200, // Number of milliseconds to reset counter
  sensitiveness: 10, // Number from 0 to 100
});
