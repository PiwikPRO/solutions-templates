/* eslint-disable no-useless-escape */
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
${fs.readFileSync(path.join(__dirname, 'build/postIframeMessage.js'), { encoding: 'utf-8' })}    
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}       
${fs.readFileSync(path.join(__dirname, 'build/detectDeadClicks.js'), { encoding: 'utf-8' })}

var unsubscribe = detectDeadClicks(function (eventData) {
  var trackFromIframe = {{iframeTracking}}; 
  if(!trackFromIframe){
    pushToAnalytics(eventData);
  } else {
    postIframeMessage(eventData);
  }

// unsubscribe();
}, {
interval: {{interval}},
limit: {{limit}},
});
      `,
      arguments: [
        { id: 'interval', type: 'number', displayName: 'Time interval', description: 'Number of milliseconds to reset counter', default: 1000 },
        { id: 'limit', type: 'number', displayName: 'Number of clicks needed to trigger subscription', default: 2 },
        { id: 'iframeTracking',
        type: 'boolean',
        displayName: 'Send messages from iframes',
        description: 'If checked, you won’t send the _paq.push but instead you will send a message to the parent window',
        default: false
        },
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
${fs.readFileSync(path.join(__dirname, 'build/postIframeMessage.js'), { encoding: 'utf-8' })}    
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}         
${fs.readFileSync(path.join(__dirname, 'build/detectErrorClicks.js'), { encoding: 'utf-8' })}

var unsubscribe = detectErrorClicks(function (eventData) {
  var trackFromIframe = {{iframeTracking}}; 
  if(!trackFromIframe){
    pushToAnalytics(eventData);
  } else {
    postIframeMessage(eventData);
  }
// unsubscribe(); // Uncomment this line when you want to finish after first trigger
});
      `,
      arguments: [        
        { id: 'iframeTracking',
        type: 'boolean',
        displayName: 'Send messages from iframes',
        description: 'If checked, you won’t send the _paq.push but instead you will send a message to the parent window',
        default: false
        }, ]
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
${fs.readFileSync(path.join(__dirname, 'build/postIframeMessage.js'), { encoding: 'utf-8' })}    
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}          
${fs.readFileSync(path.join(__dirname, 'build/detectMouseShake.js'), { encoding: 'utf-8' })}

var unsubscribe = detectMouseShake(function (eventData) {
  var trackFromIframe = {{iframeTracking}}; 
  if(!trackFromIframe){
    pushToAnalytics(eventData);
  } else {
    postIframeMessage(eventData);
  }

// unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
interval: {{interval}},
threshold: {{threshold}},
});
      `,
      arguments: [
        { id: 'interval', type: 'number', displayName: 'Time interval', description: 'Number of milliseconds to reset counter', default: 350 },
        { id: 'threshold', type: 'number', displayName: 'Acceleration of mouse movement threshold', default: 0.01 },
        { id: 'iframeTracking',
        type: 'boolean',
        displayName: 'Send messages from iframes',
        description: 'If checked, you won’t send the _paq.push but instead you will send a message to the parent window',
        default: false
        }, 
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
${fs.readFileSync(path.join(__dirname, 'build/postIframeMessage.js'), { encoding: 'utf-8' })}    
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}         
${fs.readFileSync(path.join(__dirname, 'build/detectRageClicks.js'), { encoding: 'utf-8' })}

var unsubscribe = detectRageClicks(function (eventData) {
  var trackFromIframe = {{iframeTracking}}; 
  if(!trackFromIframe){
    pushToAnalytics(eventData);
  } else {
    postIframeMessage(eventData);
  }

// unsubscribe(); // Uncomment this line when you want to finish after first trigger
}, {
interval: {{interval}},
limit: {{limit}},
});
      `,
      arguments: [
        { id: 'interval', type: 'number', displayName: 'Time interval', description: 'Number of milliseconds to reset counter', default: 750 },
        { id: 'limit', type: 'number', displayName: 'Number of clicks to trigger event', default: 3 },
        { id: 'iframeTracking',
        type: 'boolean',
        displayName: 'Send messages from iframes',
        description: 'If checked, you won’t send the _paq.push but instead you will send a message to the parent window',
        default: false
        }, 
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
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}       
${fs.readFileSync(path.join(__dirname, 'build/detectQuickBacks.js'), { encoding: 'utf-8' })}

var unsubscribe = detectQuickBacks(function (url) {
  pushToAnalytics(['trackEvent', 'UX Research', 'Quick Back', url]);

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
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}           
${fs.readFileSync(path.join(__dirname, 'build/detectExcessiveScroll.js'), { encoding: 'utf-8' })}

var unsubscribe = detectExcessiveScroll(function (lastKnownPosition) {
  pushToAnalytics(['trackEvent', 'UX Research', 'Excessive Scroll', lastKnownPosition]);

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
      beforeDescriptionNote: '<b>IMPORTANT: If your PPAS version is higher than 16.8.0 you should migrate to integrated, backward compatible solution which is <a target="_blank" href="https://help.piwik.pro/support/tag-manager/heatmap-clickmap-tag/">Heatmap & clickmap tag</a></b>',
      description: `
      First exposed function (getElementPath) allow to collect clicks data for Site inspector's heatmap/clickmap feature.
      Second exposed function (injectConfigForSiteInspector) gets configuration from Tag manager container and exposes it for Site inspector.
      Provided solution saves clicked target paths under custom event which name should remain unchanged to correct work of Site inspector.
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}          
${fs.readFileSync(path.join(__dirname, 'build/collectHeatmapClicks.js'), { encoding: 'utf-8' })}
  var heatmapCollector = collectHeatmapClicks();

  heatmapCollector.injectConfigForSiteInspector();

  document.addEventListener('click', function(e) {
    pushToAnalytics([
      'trackEvent',
      'Heatmap events',
      'Click',
      heatmapCollector.getElementPath(
        e,
        { blacklistedClasses: {{blacklistedClasses}} },
      ),
    ]);
  });
      `,
      arguments: [
        { id: 'blacklistedClasses', type: 'text', displayName: 'Blacklisted classes', description: 'Array of regexps (eg. /class-name/ for strict string search) of CSS classnames which will be filtered from final path', default: '[]' },
      ],
    },
    {
      id: 'formTimingTracking',
      name: 'Form timing tracking',
      description: `
        This script will track events of focus, blur and change on <input>, <select>, <textarea> and <datalist> fields of <form> elements.
        Script will calculate the time spent on given field and submit value in seconds as Custom Event value (e.g. 2.345).
        <form> element on your website will be automatically detected. It will also track the submission of the form.
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/postIframeMessage.js'), { encoding: 'utf-8' })}    
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}    
${fs.readFileSync(path.join(__dirname, 'build/formTimingTracking.js'), { encoding: 'utf-8' })}

formTimingTracking(function (eventData) {
  var trackFromIframe = {{iframeTracking}}; 
  if(!trackFromIframe){
    pushToAnalytics(eventData);
  } else {
    postIframeMessage(eventData);
  }
}, {
  formNameAttribute: '{{formNameAttribute}}',
  fieldNameAttribute: '{{fieldNameAttribute}}',
  eventCategoryPrefix: '{{eventCategoryPrefix}}',
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
          displayName: 'Field name attribute',
          description: 'Attribute of field element that will be used to describe corresponding analytics event',
          default: 'name',
          choices: ['id','name','label','placeholder']
        },
        { id: 'iframeTracking',
        type: 'boolean',
        displayName: 'Send messages from iframes',
        description: 'If checked, you won’t send the _paq.push but instead you will send a message to the parent window',
        default: false
        },    
      ],
    },
  {
    id: 'trackCopiedText',
    name: 'Track copied text',
    description: `
    This template allows you to track pieces of text that are copied to clipboard by your website users.
    `,
    template: `
${fs.readFileSync(path.join(__dirname, 'build/postIframeMessage.js'), { encoding: 'utf-8' })}    
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}        
${fs.readFileSync(path.join(__dirname, 'build/trackCopiedText.js'), { encoding: 'utf-8' })}

trackCopiedText(function (eventData) {
  var trackFromIframe = {{iframeTracking}}; 
  if(!trackFromIframe){
    pushToAnalytics(eventData);
  } else {
    postIframeMessage(eventData);
  }
});
    `,
    arguments: [
      { id: 'iframeTracking',
      type: 'boolean',
      displayName: 'Send messages from iframes',
      description: 'If checked, you won’t send the _paq.push but instead you will send a message to the parent window',
      default: false
      },      
   ],
  },
  {
    id: 'videoTrackingHTML5',
    name: 'Video tracking for HTML5 videos',
    beforeDescriptionNote: '<b>IMPORTANT: If your PPAS version is higher than 16.5.0 consider using <a target="_blank" href="https://help.piwik.pro/support/tag-manager/html5-video-tracking-tag/">HTML5 video tracking tag</a></b>',
    description: `
    This template allows you to track videos watched on your website
    `,
    template: `
${fs.readFileSync(path.join(__dirname, 'build/postIframeMessage.js'), { encoding: 'utf-8' })}    
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}        
${fs.readFileSync(path.join(__dirname, 'build/videoTrackingHTML5.js'), { encoding: 'utf-8' })}

videoTrackingHTML5(function(eventData) {
  var trackFromIframe = {{iframeTracking}}; 
  if(!trackFromIframe){
    pushToAnalytics(eventData);
  } else {
    postIframeMessage(eventData);
  }
}, {
  videoElementSelector: '{{videoElementSelector}}',
  eventCategoryLabel: '{{eventCategoryLabel}}',
  videoTitleAttribute: '{{videoTitleAttribute}}',
  trackingAccuracy: '{{trackingAccuracy}}',
  trackThresholds: {{trackThresholds}},
  thresholdsToTrack: '{{thresholdsToTrack}}',
  trackTimestampAsDimension: {{trackTimestampAsDimension}},
  dimensionIdForTimestamps: '{{dimensionIdForTimestamps}}',
  trackVolumeAsDimension: {{trackVolumeAsDimension}},
  dimensionIdForVolume: '{{dimensionIdForVolume}}',
});
    `,
    arguments: [
      { id: 'videoElementSelector',
        type: 'text',
        displayName: 'Video element CSS selector',
        recommended: "video",
        description: "By default, this code captures interactions with all videos on a page. You can track interactions only with selected videos by using the CSS selector.",
        default: "video"
      },
      { id: 'eventCategoryLabel',
        type: 'text',
        displayName: 'Event category label',
        recommended: "Video",
        description: 'The category under which custom events are tracked. You can use it to filter events in reports and create custom reports.',
        default: "Video"
      },
      { id: 'videoTitleAttribute',
        type: 'text',
        displayName: 'Video title attribute',
        recommended: "data-video-title",
        description: 'Used to store the video title as a custom event name. You need to set it as an additional data attribute of your <video> element. If this attribute can’t be found, the source file’s name is used as a custom event name.',
        default: "data-video-title"
      },
      { id: 'trackingAccuracy',
        type: 'number',
        displayName: 'Tracking accuracy',
        recommended: 0,
        description: 'Each event has a timestamp expressed in seconds. This attribute can make timestamps more precise. You can set from 0 to 3 decimal places. We recommend leaving 0 because then your reports will be more readable.',
        default: 0
      },
      { id: 'trackThresholds',
        type: 'boolean',
        displayName: 'Track progress percentage thresholds',
        recommended: true,
        description: 'If checked, you’ll track percentage thresholds along with interaction timestamps.',
        default: true
      },
      { id: 'thresholdsToTrack',
        type: 'text',
        displayName: 'Progress thresholds',
        recommended: 'Yes',
        description: 'Percentage thresholds that track how far a visitor viewed a video.',
        choices: [['25','50','75']],
        default: ['25','50','75']
      },
      { id: 'trackTimestampAsDimension',
        type: 'boolean',
        displayName: 'Additionally track the timestamp as a custom dimension',
        description: 'If checked, you\'ll additionally track full timestamps with 5 decimal places. They will be stored as custom dimensions.',
        default: false
      },
      { id: 'dimensionIdForTimestamps',
        type: 'number',
        displayName: 'Custom dimension ID for storing timestamps',
        description: 'If you track timestamps as a custom dimension, create a custom dimension under Analytics > Settings > Custom dimensions and enter the dimension ID here.',
        default: 1
      },
      { id: 'trackVolumeAsDimension',
        type: 'boolean',
        displayName: 'Additionally track volume level as a custom dimension',
        description: 'If checked, you’ll track the volume level as a percentage. It will be stored as a custom dimension.',
        default: false
      },
      { id: 'dimensionIdForVolume',
        type: 'number',
        displayName: 'Custom dimension ID for storing volume level',
        description: 'If you track volume level as a custom dimension, create a custom dimension under Analytics > Settings > Custom dimensions and enter the dimension ID here.',
        default: 1
      },
      { id: 'iframeTracking',
      type: 'boolean',
      displayName: 'Send messages from iframes',
      description: 'If checked, you won’t send the _paq.push but instead you will send a message to the parent window',
      default: false
      },
    ],
  },
  {
    id: 'iframeTrackingHandler',
    name: 'Iframe Tracking Handler',
    description: `
      This is an iframe tracking handler.
      Add one of the templates with iframe tracking turned on to the website
      that will be shown as an iframe and use this handler to catch the messages
      sent from the iframe on the parent website and turn them into events.
    `,
    template: `
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}   

window.addEventListener('message', function(event){ 
  if(event.data.type === "PiwikPRO"){
    pushToAnalytics(event.data.payload); 
  }
}, false);  
    `,
    arguments: [        
   ]
  },
  {
    id: 'EcommerceCartUpdate',
    name: 'Ecommerce - cart update',
    beforeDescriptionNote: 'Important: This script uses an example data layer described in this <a target="_blank" href="https://help.piwik.pro/support/getting-started/track-ecommerce/">article</a>',
    description: `
    This script lets you track a cart update from a data layer. You can add it as a tag with a data layer event trigger in Tag Manager. You can see collected ecommerce data in Analytics > Ecommerce or use them in Analytics > Custom reports. 
    `,
    template: `

  var cart_amount = {{ {{cartAmount}} }};
  var products = {{ {{products}} }};
  products.forEach(function(product){
    _paq.push(["addEcommerceItem", {{productSku}} {{productName}} {{productCategory}} {{productPrice}} {{productQuantity}}]);
  });
  _paq.push(["trackEcommerceCartUpdate", cart_amount]);  

    `,
    arguments: [ 
      { id: 'cartAmount',
      type: 'text',
      displayName: 'Cart Amount',
      recommended: "cart_amount",
      description: 'Variable name that stores the total value of items in the cart',
      default: "cart_amount"
    },  
    { id: 'products',
      type: 'text',
      displayName: 'Products',
      recommended: "products",
      description: 'Variable name that stores the products in your virtual shopping cart',
      default: "products"
    },  
    { id: 'productSku',
      type: 'text',
      displayName: 'Product SKU',
      recommended: "sku",
      description: 'Product stock-keeping unit (required)',
      default: "product.sku,"
    }, 
    { id: 'productName',
    type: 'text',
    displayName: 'Product name',
    recommended: "name",
    description: 'The name of the product (optional)',
    default: "product.name,"
    }, 
    { id: 'productCategory',
    type: 'text',
    displayName: 'Product category',
    recommended: "category",
    description: 'Product category (optional)',
    default: "product.category,"
    }, 
    { id: 'productPrice',
    type: 'text',
    displayName: 'Product price',
    recommended: "price",
    description: 'The price of the product (optional)',
    default: "product.price,"
    }, 
    { id: 'productQuantity',
    type: 'text',
    displayName: 'Product quantity',
    recommended: "quantity",
    description: 'The number of units (optional)',
    default: "product.quantity"
    },       
   ]
  },
  {
    id: 'EcommerceOrderConfirmation',
    name: 'Ecommerce - Order confirmation',
    beforeDescriptionNote: 'Important: This script uses an example data layer described in this <a target="_blank" href="https://help.piwik.pro/support/getting-started/track-ecommerce/">article</a>',
    description: `
    This script lets you track an order confirmation from a data layer. You can add it as a tag with a data layer event trigger in Tag Manager. You can see collected ecommerce data in Analytics > Ecommerce or use it in Analytics > Custom reports. 
    `,
    template: `

  var products = {{ {{products}} }};
  products.forEach(function(product){
    _paq.push(["addEcommerceItem", {{productSku}} {{productName}} {{productCategory}} {{productPrice}} {{productQuantity}}]);
  });
  _paq.push(["trackEcommerceOrder",{{ {{orderID}} }}, {{ {{grandTotal}} }}, {{subtotal}} {{tax}} {{shipping}} {{discount}}]);  

    `,
    arguments: [   
      { id: 'products',
      type: 'text',
      displayName: 'Products',
      recommended: "products",
      description: 'Variable name that stores the products in your virtual shopping cart',
      default: "products"
    },  
    { id: 'productSku',
      type: 'text',
      displayName: 'Product SKU',
      recommended: "sku",
      description: 'Product stock-keeping unit (required)',
      default: "product.sku,"
    }, 
    { id: 'orderID',
    type: 'text',
    displayName: 'Order ID',
    recommended: "order_id",
    description: 'String uniquely identifying an order (required)',
    default: "order_id"
    },      
    { id: 'grandTotal',
    type: 'text',
    displayName: 'Grand Total',
    recommended: "grand_total",
    description: 'Order Revenue grand total - tax, shipping and discount included (required)',
    default: "grand_total"
    },      
    { id: 'productName',
    type: 'text',
    displayName: 'Product name',
    recommended: "name",
    description: 'The name of the product (optional)',
    default: "product.name,"
    }, 
    { id: 'productCategory',
    type: 'text',
    displayName: 'Product category',
    recommended: "category",
    description: 'Product category (optional)',
    default: "product.category,"
    }, 
    { id: 'productPrice',
    type: 'text',
    displayName: 'Product price',
    recommended: "price",
    description: 'The price of the product (optional)',
    default: "product.price,"
    }, 
    { id: 'productQuantity',
    type: 'text',
    displayName: 'Product quantity',
    recommended: "quantity",
    description: 'The number of units (optional)',
    default: "product.quantity"
    }, 
  
    { id: 'subtotal',
    type: 'text',
    displayName: 'Subtotal',
    recommended: "subtotal",
    description: 'Order subtotal - without shipping (optional)',
    default: "{{ subtotal }},"
    },
    { id: 'tax',
    type: 'text',
    displayName: 'Tax',
    recommended: "tax",
    description: 'Order tax amount (optional)',
    default: "{{ tax }},"
    },   
    { id: 'shipping',
    type: 'text',
    displayName: 'Shipping',
    recommended: "shipping",
    description: 'Order shipping cost (optional)',
    default: "{{ shipping }},"
    },  
    { id: 'discount',
    type: 'text',
    displayName: 'Discount',
    recommended: "discount",
    description: 'Order discount amount (optional)',
    default: "{{ discount }}"
    },             
   ]
  },
  ]
};
