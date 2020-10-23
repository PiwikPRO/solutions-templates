# Dead Clicks detection

Dead clicks are clicks that have no effect on the page. The visitor clicks on the image to zoom it in, but nothing happens. He expects a text string to be a link, but it isn’t. Or he clicks on a button, but to no avail. In such situations, the visitor will end up clicking twice, quickly. Looking for dead clicks will help you find these main points of frustration and improve visitors` experience as soon as possible.

## Solution

This script listen on click event on whole document and count number of clicks on the same element in interval of time

## Configuration

```js
detectDeadClicks((target, unsubscribe) => {
  _paq.push(['trackEvent', 'UX Research', 'Dead Click', target]);

  // unsubscribe() // Uncomment this line when you want to finish after first trigger
}, {
  interval: 1000, // Number of milliseconds to reset counter
  limit: 2, // Number of clicks to trigger function above
});
```

