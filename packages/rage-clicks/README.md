# Rage Clicks detection

Rage clicks are like punching your mouse or touchpad because it doesn’t do what you want. They are triggered when a visitor clicks an element on your website multiple times, rapidly. In most cases, rage clicks signal that your website didn’t react the way your visitor expected, so you may want to take a closer look at it.

## Solution

This script listen on click event on whole document and count number of clicks. Is similar to Dead clicks detection, but we don't store counters for each element individually.

## Configuration

```js
detectRageClicks((target, unsubscribe) => {
  _paq.push(['trackEvent', 'UX research', 'Rage click', target]);
}, {
  interval: 750, // Number of milliseconds to reset counter
  limit: 3, // Number of clicks to trigger function above
});
```
