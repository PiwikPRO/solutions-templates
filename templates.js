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
    id: 'EcommerceProductDetailView',
    name: 'Ecommerce product detail view',
    description: `
    This script lets you track a product detail view. You can add it as a tag with a data layer event trigger in Tag Manager. You can see collected ecommerce data in Analytics > Ecommerce or use them in Analytics > Custom reports. Note: if you have an enhanced ecommerce setup, [detail] products should be a dataLayer variable with the value taken from ecommerce.detail.products
    `,
    template: `

  window._paq = window._paq || [];
  var products = {{ {{products}} }}.map(function(product) {
    return {
      sku: {{productSku}},
      name: {{productName}},
      category: {{productCategory}},
      price: {{productPrice}},
      brand: {{productBrand}},
      variant: {{productVariant}}
    };
  });

  _paq.push(["ecommerceProductDetailView", products]); 

    `,
    arguments: [ 
    { id: 'products',
      type: 'text',
      displayName: 'Products',
      recommended: "products",
      description: 'Variable name that stores the products in your virtual shopping cart',
      default: "[detail] products"
    },  
    { id: 'productSku',
      type: 'text',
      displayName: 'Product SKU',
      recommended: "sku",
      description: 'Product stock-keeping unit (required)',
      default: "product.id"
    }, 
    { id: 'productName',
    type: 'text',
    displayName: 'Product name',
    recommended: "name",
    description: 'The name of the product (optional)',
    default: "product.name"
    }, 
    { id: 'productCategory',
    type: 'text',
    displayName: 'Product category',
    recommended: "category",
    description: 'Product category (optional)',
    default: "product.category"
    }, 
    { id: 'productPrice',
    type: 'text',
    displayName: 'Product price',
    recommended: "price",
    description: 'The price of the product (optional)',
    default: "product.price"
    },  
    { id: 'productBrand',
    type: 'text',
    displayName: 'Product brand',
    recommended: "brand",
    description: 'The brand of the product (optional)',
    default: "product.brand"
    },  
    { id: 'productVariant',
    type: 'text',
    displayName: 'Product variant',
    recommended: "variant",
    description: 'The variant of the product (optional)',
    default: "product.variant"
    },      
   ]
  },
  {
    id: 'EcommerceAddToCart',
    name: 'Ecommerce add to cart',
    description: `
    This script lets you track an add to cart. You can add it as a tag with a data layer event trigger in Tag Manager. You can see collected ecommerce data in Analytics > Ecommerce or use them in Analytics > Custom reports. Note: if you have an enhanced ecommerce setup, [add] products should be a dataLayer variable with the value taken from ecommerce.add.products
    `,
    template: `

  window._paq = window._paq || [];
  var products = {{ {{products}} }}.map(function(product) {
    return {
      sku: {{productSku}},
      name: {{productName}},
      category: {{productCategory}},
      price: {{productPrice}},
      brand: {{productBrand}},
      variant: {{productVariant}},
      quantity: {{productQuantity}}
    };
  });

  _paq.push(["ecommerceAddToCart", products]);

    `,
    arguments: [ 
    { id: 'products',
      type: 'text',
      displayName: 'Products',
      recommended: "products",
      description: 'Variable name that stores the products in your virtual shopping cart',
      default: "[add] products"
    },  
    { id: 'productSku',
      type: 'text',
      displayName: 'Product SKU',
      recommended: "sku",
      description: 'Product stock-keeping unit (required)',
      default: "product.id"
    }, 
    { id: 'productName',
    type: 'text',
    displayName: 'Product name',
    recommended: "name",
    description: 'The name of the product (optional)',
    default: "product.name"
    }, 
    { id: 'productCategory',
    type: 'text',
    displayName: 'Product category',
    recommended: "category",
    description: 'Product category (optional)',
    default: "product.category"
    }, 
    { id: 'productPrice',
    type: 'text',
    displayName: 'Product price',
    recommended: "price",
    description: 'The price of the product (optional)',
    default: "product.price"
    }, 
    { id: 'productQuantity',
    type: 'text',
    displayName: 'Product quantity',
    recommended: "quantity",
    description: 'The number of units (optional)',
    default: "product.quantity"
    },   
    { id: 'productBrand',
    type: 'text',
    displayName: 'Product brand',
    recommended: "brand",
    description: 'The brand of the product (optional)',
    default: "product.brand"
    },  
    { id: 'productVariant',
    type: 'text',
    displayName: 'Product variant',
    recommended: "variant",
    description: 'The variant of the product (optional)',
    default: "product.variant"
    },      
   ]
  },
  {
    id: 'EcommerceRemoveFromCart',
    name: 'Ecommerce remove from cart',
    description: `
    This script lets you track a remove from cart. You can add it as a tag with a data layer event trigger in Tag Manager. You can see collected ecommerce data in Analytics > Ecommerce or use them in Analytics > Custom reports. Note:  if you have an enhanced ecommerce setup, [remove] products should be a dataLayer variable with the value taken from ecommerce.remove.products
    `,
    template: `

  window._paq = window._paq || [];
  var products = {{ {{products}} }}.map(function(product) {
    return {
      sku: {{productSku}},
      name: {{productName}},
      category: {{productCategory}},
      price: {{productPrice}},
      brand: {{productBrand}},
      variant: {{productVariant}},
      quantity: {{productQuantity}}
    };
  });
  
  _paq.push(["ecommerceRemoveFromCart", products]);

    `,
    arguments: [ 
    { id: 'products',
      type: 'text',
      displayName: 'Products',
      recommended: "products",
      description: 'Variable name that stores the products in your virtual shopping cart',
      default: "[remove] products"
    },  
    { id: 'productSku',
      type: 'text',
      displayName: 'Product SKU',
      recommended: "sku",
      description: 'Product stock-keeping unit (required)',
      default: "product.id"
    }, 
    { id: 'productName',
    type: 'text',
    displayName: 'Product name',
    recommended: "name",
    description: 'The name of the product (optional)',
    default: "product.name"
    }, 
    { id: 'productCategory',
    type: 'text',
    displayName: 'Product category',
    recommended: "category",
    description: 'Product category (optional)',
    default: "product.category"
    }, 
    { id: 'productPrice',
    type: 'text',
    displayName: 'Product price',
    recommended: "price",
    description: 'The price of the product (optional)',
    default: "product.price"
    }, 
    { id: 'productQuantity',
    type: 'text',
    displayName: 'Product quantity',
    recommended: "quantity",
    description: 'The number of units (optional)',
    default: "product.quantity"
    },   
    { id: 'productBrand',
    type: 'text',
    displayName: 'Product brand',
    recommended: "brand",
    description: 'The brand of the product (optional)',
    default: "product.brand"
    },  
    { id: 'productVariant',
    type: 'text',
    displayName: 'Product variant',
    recommended: "variant",
    description: 'The variant of the product (optional)',
    default: "product.variant"
    },      
   ]
  },
  {
    id: 'EcommerceOrder',
    name: 'Ecommerce order',
    description: `
    This script lets you track an ecommerce order. You can add it as a tag with a data layer event trigger in Tag Manager. You can see collected ecommerce data in Analytics > Ecommerce or use them in Analytics > Custom reports. Note:  if you have an enhanced ecommerce setup, [purchase] products should be a dataLayer variable with the value taken from ecommerce.purchase.products and actionField should be a dataLayer varialbe with the value taken from ecommerce.purchase.actionField
    `,
    template: `

  window._paq = window._paq || [];
  var products = {{ {{products}} }}.map(function(product) {
    return {
      sku: {{productSku}},
      name: {{productName}},
      category: {{productCategory}},
      price: {{productPrice}},
      brand: {{productBrand}},
      variant: {{productVariant}},
      quantity: {{productQuantity}}
    };
  });
  
  var paymentData = {{ {{actionField}} }};
  var paymentInformation = {
      orderId: {{orderId}},
      grandTotal: {{grandTotal}},
      subTotal: {{subTotal}},
      tax: {{tax}},
      shipping: {{shipping}}
  };
  
  _paq.push(["ecommerceOrder", products, paymentInformation]);  

    `,
    arguments: [ 
    { id: 'products',
      type: 'text',
      displayName: 'Products',
      recommended: "products",
      description: 'Variable name that stores the products in your virtual shopping cart',
      default: "[purchase] products"
    },  
    { id: 'productSku',
      type: 'text',
      displayName: 'Product SKU',
      recommended: "sku",
      description: 'Product stock-keeping unit (required)',
      default: "product.id"
    }, 
    { id: 'productName',
    type: 'text',
    displayName: 'Product name',
    recommended: "name",
    description: 'The name of the product (optional)',
    default: "product.name"
    }, 
    { id: 'productCategory',
    type: 'text',
    displayName: 'Product category',
    recommended: "category",
    description: 'Product category (optional)',
    default: "product.category"
    }, 
    { id: 'productPrice',
    type: 'text',
    displayName: 'Product price',
    recommended: "price",
    description: 'The price of the product (optional)',
    default: "product.price"
    }, 
    { id: 'productQuantity',
    type: 'text',
    displayName: 'Product quantity',
    recommended: "quantity",
    description: 'The number of units (optional)',
    default: "product.quantity"
    },   
    { id: 'productBrand',
    type: 'text',
    displayName: 'Product brand',
    recommended: "brand",
    description: 'The brand of the product (optional)',
    default: "product.brand"
    },  
    { id: 'productVariant',
    type: 'text',
    displayName: 'Product variant',
    recommended: "variant",
    description: 'The variant of the product (optional)',
    default: "product.variant"
    },    
    { id: 'actionField',
    type: 'text',
    displayName: 'Payment Information',
    recommended: "actionField",
    description: 'Variable name that stores the order payment information',
    default: "actionField"
    },   
    { id: 'orderId',
    type: 'text',
    displayName: 'Order ID',
    recommended: "id",
    description: 'The order ID (required)',
    default: "paymentData.id"
    }, 
    { id: 'grandTotal',
    type: 'text',
    displayName: 'Grand Total',
    recommended: "revenue",
    description: 'The grand total of the order (required)',
    default: "paymentData.revenue"
    }, 
    { id: 'subTotal',
    type: 'text',
    displayName: 'Sub Total',
    recommended: "subtotal",
    description: 'Total value of items in a cart without shipping (optional)',
    default: "paymentData.revenue - paymentData.shipping"
    }, 
    { id: 'tax',
    type: 'text',
    displayName: 'Tax',
    recommended: "tax",
    description: 'Total tax amount (optional)',
    default: "paymentData.tax"
    }, 
    { id: 'shipping',
    type: 'text',
    displayName: 'Shipping',
    recommended: "shipping",
    description: 'Total shipping cost (optional)',
    default: "paymentData.shipping"
    }, 
   ]
  },
  {
    id: 'CdpPopup',
    name: 'CDP Simple Popup',
    description: `
    <p>This is a simple popup template which can be used in a popup tag for CDP scenarios. For more information please have a look at these articles:</p>
    <ul>
      <li><a rel="noopener noreferrer" href="https://help.piwik.pro/support/cdp/6-useful-examples-of-how-to-use-audiences-and-data-activations/">6 useful examples of how to use audiences and data activations</a></li>
      <li><a rel="noopener noreferrer" href="https://help.piwik.pro/support/tag-manager/custom-pop-up-tag/">Custom popup tag</a></li>
    </ul>
    `,
    spoiler:`
    <img src='/solutions-templates/img/default-popup.png' alt='CDP Simple Popup'/>
    `,
    isolated:false,
    template: `<div class="ppms-popup-overlay">
  <div class="ppms-popup-box">
    <div class="ppms-popup-close-button">x</div>
    <!-- classname must stay as it is, otherwise close button will not work -->
    <div class="ppms-popup-content">
      <div class="ppms-popup-header">
        <span class="ppms-popup-header-sub">{{subTitle}}</span>
        <span class="ppms-popup-header-title">{{title}}</span>
      </div>
      <div class="ppms-popup-button-container">
        <button class="ppms-popup-button-container-button">
          {{buttonText}}
        </button>
      </div>
    </div>
  </div>
</div>
<style type="text/css">
  .ppms-popup-overlay {
        z-index: 1000;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);
  }
    .ppms-popup-box {
        width: 360px;
        height: 360px;
        box-sizing: border-box;
        position: relative;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 8px 8px 30px -14px rgba(66, 68, 90, 1);
        overflow: hidden;
  }
    .ppms-popup-content {
        padding: 60px 0;
        font-family: sans-serif;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        flex-direction: column;
        box-sizing: border-box;
        height: 100%;
  }
    .ppms-popup-box::after {
        content: '';
        position: absolute;
        background-color: rgb(240, 240, 240);
        width: 100%;
        height: 100%;
        border-radius: 1000px;
        z-index: 1;
        bottom: -50%;
  }
    .ppms-popup-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;
  }
    .ppms-popup-header-sub {
        font-size: 20px;
  }
    .ppms-popup-header-title {
        text-transform: uppercase;
        font-weight: bold;
        color: #086CD4;
        font-size: 36px;
        line-height: 44px;
  }
    .ppms-popup-button-container {
        z-index: 2;
  }
    .ppms-popup-button-container-button {
        background-color: #086CD4;
        border-radius: 0;
        border: none;
        color: #fff;
        font-size: 20px;
        padding: 10px 25px;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: 8px 8px 30px -14px rgba(66, 68, 90, 1);
  }
    .ppms-popup-button-container-button:hover {
        background-color: #086CD4;
  }
    .ppms-popup-close-button {
        height: 24px;
        width: 24px;
        padding: 4px;
        z-index: 1000;
        right: 10px;
        top: 10px;
        position: absolute;
        cursor: pointer;
        margin: 0;
        box-sizing: content-box;
        font-family: sans-serif;
        font-weight: bold;
        border-radius: 100%;
        transition: .3s;
        color: #000;
        text-align: center;
        line-height: 22px;
        font-size: 24px;
  }
    .ppms-popup-close-button:hover {
        background-color: #ccc;
        border-color: #ccc;
        color: #086CD4;
  }
    [id^="ppms-popup-wrapper-"] {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 1000;
  }
</style>`,
    arguments: [ 
      { id: 'subTitle',
      type: 'text',
      displayName: 'Text Line 1',
      recommended: "Welcome to our",
      description: 'First line of text',
      default: "Welcome to our"
    },  
    { id: 'title',
      type: 'text',
      displayName: 'Text Line 2',
      recommended: "website!",
      description: 'Second line of text',
      default: "website!"
    },  
    { id: 'buttonText',
      type: 'text',
      displayName: 'Button Text',
      recommended: "See Today's sale",
      description: 'Text which is displayed on the button',
      default: "See Today's sale"
    },    
   ]
  },
  {
    id: 'CdpNewsletter',
    name: 'CDP Newsletter Popup',
    description: `
    <p>This is a Newsletter template which can be used in a popup tag for CDP scenarios. For more information please have a look at these articles:</p>
    <ul>
      <li><a rel="noopener noreferrer" href="https://help.piwik.pro/support/cdp/6-useful-examples-of-how-to-use-audiences-and-data-activations/">6 useful examples of how to use audiences and data activations</a></li>
      <li><a rel="noopener noreferrer" href="https://help.piwik.pro/support/tag-manager/custom-pop-up-tag/">Custom popup tag</a></li>
    </ul>
    `,
    spoiler:`
    <img src='/solutions-templates/img/newsletter-popup.png' alt='CDP Newsletter Popup'/>
    `,
    isolated:false,
    template: `<div class="ppms-popup-overlay">
  <div class="ppms-popup-box">
    <div class="ppms-popup-close-button">x</div>
    <!-- classname must stay as it is, otherwise close button will not work -->
    <div class="ppms-popup-content">
      <div class="ppms-popup-info-container">
        <div class="ppms-popup-header">
          <span class="ppms-popup-header-sub">{{subTitle}}</span>
          <span class="ppms-popup-header-title">{{title}}</span>
        </div>
        <div class="ppms-popup-form-container">
          <span class="ppms-popup-form-info"
            >{{ctaText}}</span
          >

          <form>
            <span class="ppms-popup-form-label">{{inputLabel}}</span>
            <input class="ppms-popup-form-input" />
            <button class="ppms-popup-form-button">{{buttonText}}</button>
          </form>
        </div>
      </div>
      <div class="ppms-popup-image-container">
        <img
          class="ppms-popup-image"
          src="https://help.piwik.pro/wp-content/uploads/2019/04/analytics-for-beginners-spaced@2x.png?ver=1614783473"
        />
      </div>
    </div>
  </div>
</div>
<style type="text/css">
  .ppms-popup-overlay {
      z-index: 1000;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.7);
}
  .ppms-popup-box {
      width: 720px;
      box-sizing: border-box;
      position: relative;
      height: 400px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 8px 8px 30px -14px rgba(66, 68, 90, 1);
      overflow: hidden;
}
  .ppms-popup-content {
      font-family: sans-serif;
      --gap: 20px;
      display: flex;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
}
  .ppms-popup-info-container {
      padding: 60px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
}
  .ppms-popup-image-container {
      flex: 1;
      height: 100%;
      z-index: 2;
}
  .ppms-popup-image {
      object-fit: cover;
      width: 100%;
      height: 100%;
      object-position: left;
}
  .ppms-popup-box::after {
      content: '';
      position: absolute;
      background-color: rgb(240, 240, 240);
      width: 100%;
      height: 100%;
      border-radius: 1000px;
      z-index: 1;
      bottom: 0;
      left: -70%;
}
  .ppms-popup-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
}
  .ppms-popup-header-sub {
      font-size: 20px;
}
  .ppms-popup-header-title {
      text-transform: uppercase;
      font-weight: bold;
      color: #086CD4;
      font-size: 36px;
      line-height: 44px;
}
  .ppms-popup-form-container {
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
}
  .ppms-popup-form-container form {
      display: flex;
      flex-direction: column;
      width: 70%;
}
  .ppms-popup-form-info{
      font-size: 18px;
      margin-bottom: 30px;
}
  .ppms-popup-form-label {
      font-size: 14px;
      margin-bottom: 2px;
}
  .ppms-popup-form-input {
      height: 35px;
      border: none;
      border-radius: 5px;
      border: 1px solid #919191;
}
  .ppms-popup-form-button {
      background-color: #086CD4;
      border: none;
      color: #fff;
      font-size: 16px;
      padding: 10px 25px;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 8px 8px 30px -14px rgba(66, 68, 90, 1);
      align-self: center;
      margin-top: 20px;
      border-radius: 0;
}
  .ppms-popup-form-button:hover {
      background-color: #086CD4;
}
  .ppms-popup-close-button {
      height: 24px;
      width: 24px;
      padding: 4px;
      z-index: 1000;
      right: 10px;
      top: 10px;
      position: absolute;
      cursor: pointer;
      margin: 0;
      box-sizing: content-box;
      font-family: sans-serif;
      font-weight: bold;
      border-radius: 100%;
      transition: .3s;
      color: #000;
      text-align: center;
      line-height: 22px;
      font-size: 24px;
}
  .ppms-popup-close-button:hover {
      background-color: #ccc;
      border-color: #ccc;
      color: #086CD4;
}
  [id^="ppms-popup-wrapper-"] {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: 1000;
}
  @media (max-width: 720px) {
      .ppms-popup-box {
          width: 360px;
          height: 620px
    }
      .ppms-popup-content {
          flex-direction: column;
    }
      .ppms-popup-box::after {
          width: 100%;
          height: 50%;
          top: -35%;
          left: 0;
          right: 0;
    }
}
</style>`,
    arguments: [ 
      { id: 'subTitle',
      type: 'text',
      displayName: 'Sub Title',
      recommended: "Welcome to our",
      description: 'First line of text',
      default: "Welcome to our"
    },  
    { id: 'title',
      type: 'text',
      displayName: 'Title',
      recommended: "website!",
      description: 'Second line of text',
      default: "website!"
    },  
    { id: 'ctaText',
      type: 'text',
      displayName: 'CTA Text',
      recommended: "Sign up for our newsletter!",
      description: 'Call to action text',
      default: "Sign up for our newsletter!"
    },  
    { id: 'inputLabel',
    type: 'text',
    displayName: 'Input Label',
    recommended: "Email",
    description: 'Label above the input field',
    default: "Email"
    },  
    { id: 'buttonText',
    type: 'text',
    displayName: 'Button Text',
    recommended: "SEND",
    description: 'The text on the button',
    default: "SEND"
    },   
   ]
  },
  {
    id: 'CdpBanner',
    name: 'CDP Banner',
    description: `
    <p>This is a Banner template which can be used in a popup tag for CDP scenarios. For more information please have a look at these articles:</p>
    <ul>
      <li><a rel="noopener noreferrer" href="https://help.piwik.pro/support/cdp/6-useful-examples-of-how-to-use-audiences-and-data-activations/">6 useful examples of how to use audiences and data activations</a></li>
      <li><a rel="noopener noreferrer" href="https://help.piwik.pro/support/tag-manager/custom-pop-up-tag/">Custom popup tag</a></li>
    </ul>
    `,
    spoiler:`
    <img src='/solutions-templates/img/cdp-banner.png' alt='CDP Banner'/>
    `,
    isolated:false,
    template: `<div class="ppms-popup-box">
  <div class="ppms-popup-close-button">x</div>
  <!-- classname must stay as it is, otherwise close button will not work -->
  <div class="ppms-popup-content">
    <div class="ppms-popup-header">
      <span class="ppms-popup-header-sub">{{subTitle}}</span>
      <span class="ppms-popup-header-title">{{title}}</span>
    </div>
    <div class="ppms-popup-info">
      <p class="ppms-popup-info-text">
        {{infoText}}
      </p>
      <div class="ppms-popup-info-badge">
        <span class="ppms-popup-info-code">{{code}}</span>
      </div>
    </div>
  </div>
</div>
<style type="text/css">
  .ppms-popup-box {
        position: absolute;
        top: 0;
        width: 100%;
        height: 200px;
        box-sizing: border-box;
        position: relative;
        background-color: #fff;
        box-shadow: 8px 8px 30px -14px rgba(66, 68, 90, 1);
        overflow: hidden;
  }
    .ppms-popup-content {
        padding: 60px;
        font-family: sans-serif;
        display: flex;
        align-items: center;
        max-width: 1024px;
        flex-direction: row;
        margin: 0 auto;
        justify-content: space-between;
  }
    .ppms-popup-box::after {
        content: '';
        position: absolute;
        background-color: rgb(245, 245, 245);
        width: 100%;
        height: 5000%;
        border-radius: 1000px;
        z-index: 1;
        bottom: 10%;
  }
    .ppms-popup-header {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        z-index: 2;
  }
    .ppms-popup-header-sub {
        font-size: 20px;
  }
    .ppms-popup-header-title {
        text-transform: uppercase;
        font-weight: bold;
        color: #086CD4;
        font-size: 36px;
        line-height: 44px;
  }
    .ppms-popup-info {
        z-index: 2;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
  }
    .ppms-popup-info-text {
        font-size: 18px;
        margin: 0 0 20px 0;
  }
    .ppms-popup-info-badge {
        background-color: #086CD4;
        padding: 10px 25px;
  }
    .ppms-popup-info-code {
        color: #fff;
        letter-spacing: 4px;
        text-transform: uppercase;
  }
    .ppms-popup-close-button {
        height: 24px;
        width: 24px;
        padding: 4px;
        z-index: 1000;
        right: 10px;
        top: 10px;
        position: absolute;
        cursor: pointer;
        margin: 0;
        box-sizing: content-box;
        font-family: sans-serif;
        font-weight: bold;
        border-radius: 100%;
        transition: .3s;
        color: #000;
        text-align: center;
        line-height: 22px;
        font-size: 24px;
  }
    .ppms-popup-close-button:hover {
        background-color: #ccc;
        border-color: #ccc;
        color: #086CD4;
  }
    [id^="ppms-popup-wrapper-"] {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 1000;
  }
    @media (max-width: 720px) {
        .ppms-popup-box {
            height: auto;
      }
        .ppms-popup-content {
            flex-direction: column;
      }
  }
</style>`,
    arguments: [ 
      { id: 'subTitle',
      type: 'text',
      displayName: 'Sub Title',
      recommended: "Welcome to our",
      description: 'First line of text',
      default: "Welcome to our"
    },  
    { id: 'title',
      type: 'text',
      displayName: 'Title',
      recommended: "website!",
      description: 'Second line of text',
      default: "website!"
    },  
    { id: 'infoText',
      type: 'text',
      displayName: 'Info Text',
      recommended: "Use this promo code to get a discount:",
      description: 'Informational text',
      default: "Use this promo code to get a discount:"
    },   
    { id: 'code',
    type: 'text',
    displayName: 'Code',
    recommended: "code1234",
    description: 'Promo code value',
    default: "code1234"
    },   
   ]
  },
  {
    id: 'CdpTimer',
    name: 'CDP Timer Popup',
    description: `
    <p>This is a Timer popup template which can be used in a popup tag for CDP scenarios. For more information please have a look at these articles:</p>
    <ul>
      <li><a rel="noopener noreferrer" href="https://help.piwik.pro/support/cdp/6-useful-examples-of-how-to-use-audiences-and-data-activations/">6 useful examples of how to use audiences and data activations</a></li>
      <li><a rel="noopener noreferrer" href="https://help.piwik.pro/support/tag-manager/custom-pop-up-tag/">Custom popup tag</a></li>
    </ul>
    `,
    spoiler:`
    <img src='/solutions-templates/img/cdp-timer.png' alt='CDP Timer'/>
    `,
    isolated:false,
    template: `<div class="ppms-popup-overlay">
  <div class="ppms-popup-box">
    <div class="ppms-popup-close-button">x</div>
    <!-- classname must stay as it is, otherwise close button will not work -->
    <div class="ppms-popup-content">
      <div class="ppms-popup-header">
        <span class="ppms-popup-header-sub">{{subTitle}}</span>
        <span class="ppms-popup-header-title">{{title}}</span>
      </div>
      <div class="ppms-popup-timer">
        <span class="ppms-popup-timer-info"
          >{{infoText}}</span
        >
        <div>
          <span class="ppms-popup-timer-minutes">{{minutesPlaceholder}}</span>
          <span class="ppms-popup-timer-minutes">:</span>
          <span
            class="ppms-popup-timer-seconds"
            id="ppms-popup-timer-seconds"
            >{{secondsPlaceholder}}</span
          >
        </div>
      </div>
      <div class="ppms-popup-button-container">
        <button class="ppms-popup-button-container-button">
          {{buttonText}}
        </button>
      </div>
    </div>
  </div>
</div>
<style type="text/css">
  .ppms-popup-overlay {
        z-index: 1000;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);
  }
    .ppms-popup-box {
        width: 360px;
        height: 450px;
        box-sizing: border-box;
        position: relative;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 8px 8px 30px -14px rgba(66, 68, 90, 1);
        overflow: hidden;
  }
    .ppms-popup-content {
        padding: 60px 0;
        font-family: sans-serif;
        display: flex;
        align-items: center;
        width: 100%;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        box-sizing: border-box;
  }
    .ppms-popup-box::after {
        content: '';
        position: absolute;
        background-color: rgb(240, 240, 240);
        width: 100%;
        height: 100%;
        border-radius: 1000px;
        z-index: 1;
        bottom: -50%;
  }
    .ppms-popup-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 2;
        flex: 1;
  }
    .ppms-popup-header-sub {
        font-size: 20px;
  }
    .ppms-popup-header-title {
        text-transform: uppercase;
        font-weight: bold;
        color: #086CD4;
        font-size: 36px;
        line-height: 44px;
  }
    .ppms-popup-button-container {
        z-index: 2;
        flex: 1;
        display: flex;
        align-items: center;
  }
    .ppms-popup-button-container-button {
        background-color: #086CD4;
        border-radius: 0;
        border: none;
        color: #fff;
        font-size: 20px;
        padding: 10px 25px;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: 8px 8px 30px -14px rgba(66, 68, 90, 1);
  }
    .ppms-popup-timer {
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;
  }
    .ppms-popup-timer-info {
        font-size: 16px;
        color: #086CD4;
        margin-bottom: 20px;
  }
    .ppms-popup-timer-minutes {
        font-size: 62px;
        color: #383838;
  }
    .ppms-popup-timer-seconds {
        font-size: 62px;
        font-weight: bold;
        color: #086CD4;
  }
    .ppms-popup-button-container-button:hover {
        background-color: #086CD4;
  }
    .ppms-popup-close-button {
        height: 24px;
        width: 24px;
        padding: 4px;
        z-index: 1000;
        right: 10px;
        top: 10px;
        position: absolute;
        cursor: pointer;
        margin: 0;
        box-sizing: content-box;
        font-family: sans-serif;
        font-weight: bold;
        border-radius: 100%;
        transition: .3s;
        color: #000;
        text-align: center;
        line-height: 22px;
        font-size: 24px;
  }
    .ppms-popup-close-button:hover {
        background-color: #ccc;
        border-color: #ccc;
        color: #086CD4;
  }
    [id^="ppms-popup-wrapper-"] {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 1000;
  }
</style>
<script>
  let totalTimeInSeconds = {{counterValue}};
  const minutesElement = document.querySelector(".ppms-popup-timer-minutes");
  const secondsElement = document.querySelector(".ppms-popup-timer-seconds");
  const button = document.querySelector(".ppms-popup-button-container-button");
  const infoText = document.querySelector(".ppms-popup-timer-info");
  
  const interval = setInterval(() => {
      if (totalTimeInSeconds >= 0) {
          const minutes = Math.floor(totalTimeInSeconds / 60);
          const seconds = totalTimeInSeconds % 60;
  
          // Update the minutes and seconds elements
          minutesElement.innerHTML = minutes > 9 ? minutes : `+'`0${minutes}`'+`;
          secondsElement.innerHTML = seconds > 9 ? seconds : `+'`0${seconds}`'+`;
  
          totalTimeInSeconds--;
      } else {
          clearInterval(interval);
          infoText.innerHTML = "You cannot get a discount now.";
          button.style.backgroundColor = 'rgb(170, 170, 170)';
          infoText.style.color = 'rgb(170, 170, 170)';
          button.style.cursor = 'not-allowed';
      }
  }, 1000);
</script>`,
    arguments: [ 
      { id: 'subTitle',
      type: 'text',
      displayName: 'Sub Title',
      recommended: "Welcome to our",
      description: 'First line of text',
      default: "Welcome to our"
    },  
    { id: 'title',
      type: 'text',
      displayName: 'Title',
      recommended: "website!",
      description: 'Second line of text',
      default: "website!"
    },  
    { id: 'infoText',
      type: 'text',
      displayName: 'Info Text',
      recommended: "You have 1 minute to get a discount!",
      description: 'Informational text',
      default: "You have 1 minute to get a discount!"
    },   
    { id: 'minutesPlaceholder',
    type: 'text',
    displayName: 'Minutes Placeholder',
    recommended: "01",
    description: 'The amount of minutes to start from. For example if our counter value is 90 our Minutes Placeholder value should be 01 since there is 1 minute in 90 seconds',
    default: "01"
    },  
    { id: 'secondsPlaceholder',
    type: 'text',
    displayName: 'Seconds Placeholder',
    recommended: "00",
    description: 'The amount of seconds to start from. For example if our counter value is 90 our Seconds Placeholder value should be 30 since it is 1 minute and 30 seconds',
    default: "00"
    }, 
    { id: 'buttonText',
    type: 'text',
    displayName: 'Button Text',
    recommended: "Get discount",
    description: 'The text on the button',
    default: "Get discount"
    },   
    { id: 'counterValue',
    type: 'text',
    displayName: 'Counter Value',
    recommended: "60",
    description: 'The value of the countdown in seconds',
    default: "60"
    },      
   ]
  },
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
        description: 'If checked, you will pass messages to the parent window instead of _paq.push',
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
        description: 'If checked, you will pass messages to the parent window instead of _paq.push',
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
        description: 'If checked, you will pass messages to the parent window instead of _paq.push',
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
        description: 'If checked, you will pass messages to the parent window instead of _paq.push',
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
      id: 'formTimingTracking',
      name: 'Form tracking',
      description: `
        About: This script lets you track interactions with forms on your site.
        Tracked interactions: (1) focus, blur or change on input, select, textarea and datalist in a form element,
        (2) time spent on a form field, (3) form submission.
        Reporting: All interactions are tracked as custom events.
        You can see them in Analytics > Reports > Custom events or use them in Analytics > Custom reports.
        Note: This script automatically detects all form elements on your site.
        Note: This is a deprecated version because a better one is now available.
        We recommend switching to this solution: Form analytics (beta).
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
          default: 'Form tracking: '
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
        description: 'If checked, you will pass messages to the parent window instead of _paq.push',
        default: false
        },    
      ],
    },
    {
      id: 'formAnalytics',
      name: 'Enhanced form analytics (beta)',
      description: `
        About: This script lets you track interactions with forms on your site.
        Tracked dimensions: formView, formStarted, formCompleted, fieldType, fieldName, fieldLabel, fieldMessage, formLastField, formLastFieldLabel.
        (Note: You can use your own names for custom dimensions.)
        Tracked interactions: (1) Field click: A visitor clicked on a field, (2) Field input: A visitor typed something in a field,
        (3) Field leave: A visitor left a field (blur), (4) Time to complete or abandon a form, (5) Time spent on a form field.
        Reporting: All tracked events are saved as custom events.
        You can see them in Analytics > Reports > Custom events or use them in Analytics > Custom reports.
        Customization: Each tracked form needs a customized script because the script uses a form ID and other identifying parameters.
        Note: This is a beta version of this solution, and we'll improve it to track more form details.
        We also recommend switching to this solution if you currently use this script: Form timing tracking.
      `,
      template: `
${fs.readFileSync(path.join(__dirname, 'build/postIframeMessage.js'), { encoding: 'utf-8' })}
${fs.readFileSync(path.join(__dirname, 'build/pushToAnalytics.js'), { encoding: 'utf-8' })}
${fs.readFileSync(path.join(__dirname, 'build/formAnalytics.js'), { encoding: 'utf-8' })}
var fa = new formAnalytics('{{formId}}', {{target}},
    {
        fieldType: 'dimension{{fieldType}}',
        fieldName: 'dimension{{fieldName}}',
        fieldLabel: 'dimension{{fieldLabel}}',
        fieldMessage: 'dimension{{fieldMessage}}',
        formLastField: 'dimension{{formLastField}}',
        formLastFieldLabel: 'dimension{{formLastFieldLabel}}',
        formView: 'dimension{{formView}}',
        formStarted: 'dimension{{formStarted}}',
        formComplete: 'dimension{{formComplete}}'
    },
    function (eventData) {
      var trackFromIframe = {{iframeTracking}};
      if(!trackFromIframe){
        pushToAnalytics(eventData);
      } else {
        postIframeMessage(eventData);
      }
    },
    {{fieldLabelMap}}
);
fa.sendEvent(formAnalytics.event.{{eventName}});
      `,
      arguments: [
        {
          id: 'formId',
          type: 'text',
          displayName: 'Form ID used to identify form in reports',
          description: 'It needs to be unique ID for form tracked on the website.',
          default: 'test-form'
        },
        {
          id: 'target',
          type: 'text',
          displayName: 'Target element on page for listeners',
          description: 'Target element on page for listeners. You can leave default value if you don\'t have ' +
            'multiple forms on same page and don\'t use SPA.',
          default: 'document.body'
        },
        {
          id: 'fieldType',
          type: 'number',
          displayName: 'Tracking ID of a "fieldType" event dimension',
          description: 'Form analytics uses custom dimensions to track data about user behavior. If this is your ' +
            'first setup of form analytics, then you should create custom "fieldType" event dimension in ' +
            '"Analytics" > "Settings" > "Custom dimensions" of your website.',
          default: 1
        },
        {
          id: 'fieldName',
          type: 'number',
          displayName: 'Tracking ID of a "fieldName" event dimension',
          description: 'Form analytics uses custom dimensions to track data about user behavior. If this is your ' +
            'first setup of form analytics, then you should create custom "fieldName" event dimension in ' +
            '"Analytics" > "Settings" > "Custom dimensions" of your website.',
          default: 2
        },
        {
          id: 'fieldLabel',
          type: 'number',
          displayName: 'Tracking ID of a "fieldLabel" event dimension',
          description: 'Form analytics uses custom dimensions to track data about user behavior. If this is your ' +
            'first setup of form analytics, then you should create custom "fieldLabel" event dimension in ' +
            '"Analytics" > "Settings" > "Custom dimensions" of your website.',
          default: 3
        },
        {
          id: 'fieldMessage',
          type: 'number',
          displayName: 'Tracking ID of a "fieldMessage" event dimension',
          description: 'Form analytics uses custom dimensions to track data about user behavior. If this is your ' +
            'first setup of form analytics, then you should create custom "fieldMessage" event dimension in ' +
            '"Analytics" > "Settings" > "Custom dimensions" of your website.',
          default: 4
        },
        {
          id: 'formLastField',
          type: 'number',
          displayName: 'Tracking ID of a "formLastField" event dimension',
          description: 'Form analytics uses custom dimensions to track data about user behavior. If this is your ' +
            'first setup of form analytics, then you should create custom "formLastField" event dimension in ' +
            '"Analytics" > "Settings" > "Custom dimensions" of your website.',
          default: 5
        },
        {
          id: 'formLastFieldLabel',
          type: 'number',
          displayName: 'Tracking ID of a "formLastFieldLabel" event dimension',
          description: 'Form analytics uses custom dimensions to track data about user behavior. If this is your ' +
            'first setup of form analytics, then you should create custom "formLastFieldLabel" event dimension in ' +
            '"Analytics" > "Settings" > "Custom dimensions" of your website.',
          default: 6
        },
        {
          id: 'formView',
          type: 'number',
          displayName: 'Tracking ID of a "formView" session dimension',
          description: 'Form analytics uses custom dimensions to track data about user behavior. If this is your ' +
            'first setup of form analytics, then you should create custom "formView" session dimension in ' +
            '"Analytics" > "Settings" > "Custom dimensions" of your website.',
          default: 7
        },
        {
          id: 'formStarted',
          type: 'number',
          displayName: 'Tracking ID of a "formStarted" session dimension',
          description: 'Form analytics uses custom dimensions to track data about user behavior. If this is your ' +
            'first setup of form analytics, then you should create custom "formStarted" session dimension in ' +
            '"Analytics" > "Settings" > "Custom dimensions" of your website.',
          default: 8
        },
        {
          id: 'formComplete',
          type: 'number',
          displayName: 'Tracking ID of a "formComplete" session dimension',
          description: 'Form analytics uses custom dimensions to track data about user behavior. If this is your ' +
            'first setup of form analytics, then you should create custom "formComplete" session dimension in ' +
            '"Analytics" > "Settings" > "Custom dimensions" of your website.',
          default: 9
        },
        {
          id: 'eventName',
          type: 'text',
          choices: ['FormView', 'FormComplete'],
          displayName: 'Form event',
          description: 'You should send one of 2 events. ' +
            '"FormView" should be sent when a form using the provided ID is present on the displayed page. ' +
            '"FormComplete" should be sent when your system has accepted the form (there are no validation ' +
            'errors). If you redirect user to "thank you" page after accepting the form, you should add this code to it.',
          default: 'FormView'
        },
        {
          id: 'fieldLabelMap',
          type: 'text',
          displayName: 'Map of HTML form field names to human friendly labels',
          description: 'Optional: Form analytics will detect field labels attached to every field and it will ' +
            'send them to the server for easier identification of fields in reports. However, if your page supports' +
            ' different language versions the data may become fragmented. To fix this issue, configure JSON map of ' +
            'HTML field names to labels that should be used in reports or set your preferred names using ' +
            '"Analytics" > "Settings" > "Dimension value grouping". ' +
            'Example: `{"name": "First name", "surname": "Last name"}`.',
          default: '{}'
        },
        {
          id: 'iframeTracking',
          type: 'boolean',
          displayName: 'Send messages from iframes',
          description: 'If checked, you will pass messages to the parent window instead of _paq.push',
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
      description: 'If checked, you will pass messages to the parent window instead of _paq.push',
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
    id: 'heatmapClicks',
    name: 'Heatmap clicks collector (deprecated)',
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
    id: 'videoTrackingHTML5',
    name: 'Video tracking for HTML5 videos (deprecated)',
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
        description: 'The category under which custom events are tracked. You can use it to filter events in reports and create custom reports. Please remember that our Video Analytics reports have filters based on this setting so if you change this value, the Video Analytics reports will show up empty.',
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
      description: 'If checked, you will pass messages to the parent window instead of _paq.push',
      default: false
      },
    ],
  },
  ]
};
