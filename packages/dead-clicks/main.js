detectDeadClicks(function (target, unsubscribe) {
  window._paq.push(['trackEvent', 'UX Research', 'Dead Click', target]);

  // unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
  interval: 1000, // Number of milliseconds to reset counter
  limit: 2, // Number of clicks to trigger function above
});
