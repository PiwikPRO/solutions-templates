detectRageClicks(function (target, unsubscribe) {
  window._paq.push(['trackEvent', 'UX research', 'Rage click', target]);

  // unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
  interval: 750, // Number of milliseconds to reset counter
  limit: 3, // Number of clicks to trigger function above
});
