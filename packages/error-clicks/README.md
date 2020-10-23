# Error Clicks detection

Error clicks are clicks that result in JavaScript errors. The visitor doesn’t have to click on something many times in a row. Just one click is enough to spot an error. Often the visitor doesn’t notice that something is broken, but for you, it’s a signal that a particular JavaScript element is not working.

## Solution

This scripts listen on click, when click is triggered set timeout for 0 ms (this move execution of code for the next tick what allow us to catch error). The second listening watch for errors in browser

## Configuration

```js
detectErrorClicks((target, error, unsubscribe) => {
  console.log('Error detected:', error); // You can get message from error
  _paq.push(['trackEvent', 'UX Research', 'Error Click', target]);

  // unsubscribe() // Uncomment this line when you want to finish after first trigger
});
```
