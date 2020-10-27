detectErrorClicks(function (target, error, unsubscribe) {
  console.log('Error detected:', error);
  window._paq.push(['trackEvent', 'UX Research', 'Error Click', target]);

  // unsubscribe(); // Uncomment this line when you want to finish after first trigger
});
