/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

module.exports = {
  arguments: [
    { id: 'iife', type: 'boolean', displayName: 'Isolated', recommended: true, description: 'Protect against source code conflicts', default: true },
  ],
  templates: [
    {
      id: 'deadClicks',
      name: 'Dead clicks',
      description: `
      Dead clicks are clicks that have no effect on the page. 
      The visitor clicks on the image to zoom it in, but nothing happens. 
      He expects a text string to be a link, but it isn’t. Or he clicks on a button, 
      but to no avail. In such situations, the visitor will end up clicking twice, quickly.
      Looking for dead clicks will help you find these main points of frustration and improve visitors\` experience as soon as possible.
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/detectDeadClicks.js'), { encoding: 'utf-8' })}

var unsubscribe = detectDeadClicks(function (target) {
window._paq.push(['trackEvent', 'UX Research', 'Dead Click', target]);

// unsubscribe();
}, {
interval: {{interval}},
limit: {{limit}},
});
      `,
      arguments: [
        { id: 'interval', type: 'number', displayName: 'Time interval', description: 'Number of milliseconds to reset counter', default: 1000 },
        { id: 'limit', type: 'number', displayName: 'Number of clicks needed to trigger subscription', default: 2 },
      ],
    },
    {
      id: 'errorClicks',
      name: 'Error clicks',
      description: `
        Error clicks are clicks that result in JavaScript errors.
        The visitor doesn’t have to click on something many times in a row.
        Just one click is enough to spot an error.
        Often the visitor doesn’t notice that something is broken, but for you,
        it’s a signal that a particular JavaScript element is not working.
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/detectErrorClicks.js'), { encoding: 'utf-8' })}

var unsubscribe = detectErrorClicks(function (target, error) {
window._paq.push(['trackEvent', 'UX Research', 'Error Click', target]);

// unsubscribe(); // Uncomment this line when you want to finish after first trigger
});
      `,
      arguments: []
    },
    {
      id: 'mouseShake',
      name: 'Mouse shake',
      description: `
        Mouse shaking is when users erratically move their cursor back and forth.
        Rapidly moving the cursor over a page can indicate 
        the user is getting exasperated with some aspect of their experience. 
        Perhaps the site performance is slow or they are struggling to figure something out.
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/detectMouseShake.js'), { encoding: 'utf-8' })}

var unsubscribe = detectMouseShake(function () {
window._paq.push(['trackEvent', 'UX Research', 'Mouse shake']);

// unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
interval: {{interval}},
threshold: {{threshold}},
});
      `,
      arguments: [
        { id: 'interval', type: 'number', displayName: 'Time interval', description: 'Number of milliseconds to reset counter', default: 350 },
        { id: 'threshold', type: 'number', displayName: 'Acceleration of mouse movement threshold', default: 0.01 },
      ],
    },
    {
      id: 'rageClicks',
      name: 'Rage clicks',
      description: `
        Rage clicks are like punching your mouse or touchpad because it doesn’t do what you want.
        They are triggered when a visitor clicks an element on your website multiple times, rapidly. 
        In most cases, rage clicks signal that your website didn’t react the way your visitor expected,
        so you may want to take a closer look at it.
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/detectRageClicks.js'), { encoding: 'utf-8' })}

var unsubscribe = detectRageClicks(function (target) {
window._paq.push(['trackEvent', 'UX Research', 'Rage click', target]);

// unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
interval: {{interval}},
limit: {{limit}},
});
      `,
      arguments: [
        { id: 'interval', type: 'number', displayName: 'Time interval', description: 'Number of milliseconds to reset counter', default: 750 },
        { id: 'limit', type: 'number', displayName: 'Number of clicks to trigger event', default: 3 },
      ],
    },
    {
      id: 'quickBack',
      name: 'Quick Back',
      description: `
        A quick back is a click on a page that leads the user away from the current page to another web site, 
        which the user does not find useful and returns to the original page or website under a certain threshold of time.
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/detectQuickBacks.js'), { encoding: 'utf-8' })}

var unsubscribe = detectQuickBacks(function (url) {
window._paq.push(['trackEvent', 'UX Research', 'Quick Back', url]);

// unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
  threshold: {{threshold}},
});      
      `,
      arguments: [
        { id: 'threshold', type: 'number', displayName: 'Threshold', default: 12000 },
      ],
    },
    {
      id: 'excessiveScroll',
      name: 'Excessive Scroll',
      description: `
        Excessive scrolling detects when a user scrolls through site content at a higher rate than expected for standard content consumption.
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/detectExcessiveScroll.js'), { encoding: 'utf-8' })}

var unsubscribe = detectExcessiveScroll(function (lastKnownPosition) {
window._paq.push(['trackEvent', 'UX Research', 'Excessive Scroll', lastKnownPosition]);

// unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
  threshold: {{threshold}},
});      
      `,
      arguments: [
        { id: 'threshold', type: 'number', displayName: 'Threshold', default: 3 },
      ],
    },
    {
      id: 'heatmapClicks',
      name: 'Heatmap clicks collector',
      description: `
      Exposed function allow to collect clicks data for Site inspector's heatmap/clickmap feature.
      Provided solution saves clicked target paths under custom event which name should remain unchanged to correct work of Site inspector. 
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/collectHeatmapClicks.js'), { encoding: 'utf-8' })}

collectHeatmapClicks(function (targetPath) {
  window._paq.push(['trackEvent', 'Heatmap events', 'Click', targetPath]);
}, {
  interval: {{interval}},
});
      `,
      arguments: [
        { id: 'interval', type: 'number', displayName: 'Time interval', description: 'Number of milliseconds to prevent click events spam', default: 100 },
      ],
    },
    {
      id: 'formTimingTracking',
      name: 'Form timing tracking',
      description: `
        The form tracking script you've been waiting for.
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/formTimingTracking.js'), { encoding: 'utf-8' })}

formTimingTracking(function (fieldInteractionData) {
  console.log(fieldInteractionData);
  window._paq.push([
                  'trackEvent',
                  '{{eventCategoryPrefix}}'+fieldInteractionData.formName,
                  fieldInteractionData.fieldName,
                  fieldInteractionData.leaveType,
                  fieldInteractionData.timeSpent/1000
                  ])
}, {
  formNameAttribute: '{{formNameAttribute}}',
  fieldNameAttribute: '{{fieldNameAttribute}}',
});
      `,
      arguments: [
        { id: 'eventCategoryPrefix',
          type: 'text',
          displayName: 'Event category prefix',
          description: 'Prefix that will preceed form name in Custom Event Category of the event that you will track',
          default: 'Form timing: '
        },
        { id: 'formNameAttribute',
          type: 'text',
          displayName: 'Form name attribute',
          description: 'Attribute of the <form> element that will be used to identify the form',
          default: 'id',
          choices: ['id','name','label','placeholder']
        },
        { id: 'fieldNameAttribute',
          type: 'text',
          displayName: 'Input label attribute',
          description: 'Name of HTML attribute of input that is used for naming the events',
          default: 'name',
          choices: ['id','name','label','placeholder']
        },
      ],
    },
  ]
};
