# Mouse shake detection

Mouse shaking is when users erratically move their cursor back and forth.
Rapidly moving the cursor over a page can indicate the user is getting exasperated with some aspect of their experience. Perhaps the site performance is slow or they are struggling to figure something out.

## Solution

This script count distance traveled by mouse and calculate how often visitor change direction of movement and calculate acceleration of mouse.

Detects sudden raise of speed with at least one direction change.

## Configuration

```js
detectMouseShake(function (unsubscribe) {
  _paq.push(['trackEvent', 'UX Research', 'Mouse shake']);

  // unsubscribe() // Uncomment this line when you want to finish after first trigger
}, {
  interval: 350, // Number of milliseconds to reset counter
  threshold: 0.01, // Acceleration of mouse movement threshold
});

```
