# Mouse shake detection

Mouse shaking is when users erratically move their cursor back and forth.
Rapidly moving the cursor over a page can indicate the user is getting exasperated with some aspect of their experience. Perhaps the site performance is slow or they are struggling to figure something out.

## Solution

This script count distance traveled by mouse and calculate how often visitor change direction of movement.

We can treat the website as a coordinate system, it means that distance traveled to right is positive number, to the left negative. The same is with up and down.

If we sum distances as absolute values we have whole distance. We still need to know that we could move diagonally so we need to calculate distance hypotenuse of rectangle. To avoid exponentiation & squares we can assume that we move along the walls.

We store additional relative distance count ( move to right/up increase number, move left/down decrease number).

From those counters we can calculate percentage differance: (relative / total) * 100. We can call it **sensitiveness**.

## Configuration

```js
detectMouseShake((unsubscribe) => {
  _paq.push(['trackEvent', 'UX Research', 'Mouse shake']);

  // unsubscribe() // Uncomment this line when you want to finish after first trigger
}, {
  interval: 1000, // Number of milliseconds to reset counter
  sensitiveness: 10, // Number from 0 to 100. Larger number means more sensitive for mouse shaking
});
```
