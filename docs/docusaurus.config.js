/**
 * Copyright (c) Piwik PRO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
const path = require('path');
const generator = require('../templates');

module.exports = {
  title: 'Solution Templates | Piwik PRO',
  tagline: 'Use our library of custom tags to collect more data from your site.',
  url: 'https://piwikpro.github.io',
  baseUrl: '/solutions-templates/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://piwik.pro/wp-content/assets/img/favicon.png?ver=1608560712',
  organizationName: 'Piwik PRO', // Usually your GitHub org/user name.
  projectName: 'solutions-templates', // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: 'Solution Templates',
      logo: {
        alt: 'Piwik PRO logo',
        src: 'https://piwik.pro/wp-content/assets/img/pp-logo_dark.svgz?ver=1610458769',
      },
      items: [
        // Please keep GitHub link to the right for consistency.
        {
          href: 'https://github.com/PiwikPRO/solutions-templates',
          label: 'GitHub',
          position: 'right',
        },
        {
          label: 'Ecommerce tracking',
          position: 'left',
          items: [
            {
              label: 'Product detail view',
              to: '#ecommerce-product-detail-view',
            },
            {
              label: 'Add to cart',
              to: '#ecommerce-add-to-cart',
            },
            {
              label: 'Remove from cart',
              to: '#ecommerce-remove-from-cart',
            },
            {
              label: 'Order',
              to: '#ecommerce-order',
            },
          ]
        },
        {
          label: 'CDP',
          position: 'left',
          items: [
            {
              label: 'Simple Popup',
              to: '#cdp-simple-popup',
            },
            {
              label: 'Newsletter Popup',
              to: '#cdp-newsletter-popup',
            },
            {
              label: 'Banner',
              to: '#cdp-banner',
            },
            {
              label: 'Timer Popup',
              to: '#cdp-timer-popup',
            },
          ]
        },
        {
          label: 'UX research',
          position: 'left',
          items: [
            {
              label: 'Dead clicks',
              to: '#dead-clicks',
            },
            {
              label: 'Error clicks',
              to: '#error-clicks',
            },
            {
              label: 'Mouse shake',
              to: '#mouse-shake',
            },
            {
              label: 'Rage clicks',
              to: '#rage-clicks',
            },
            {
              label: 'Quick Back',
              to: '#quick-back',
            },
            {
              label: 'Excessive Scroll',
              to: '#excessive-scroll',
            },
            {
              label: 'Copied text',
              to: '#track-copied-text',
            },
          ]
        },
        {
          label: 'Form tracking',
          position: 'left',
          items: [
            {
              label: 'Form tracking',
              to: '#form-tracking',
            },
            {
              label: 'Enhanced form analytics (beta)',
              to: '#enhanced-form-analytics-(beta)',
            },
          ]
        },
        {
          label: 'Utilities',
          position: 'left',
          items: [
            {
              label: 'Iframe tracking handler',
              to: '#iframe-tracking-handler'
            }
          ]
        },
        {
          label: 'Deprecated',
          position: 'left',
          items: [
            {
              label: 'Heatmap clicks collector (deprecated)',
              to: '#heatmap-clicks-collector-(deprecated)',
            },
            {
              label: 'Video tracking for HTML5 videos (deprecated)',
              to: '#video-tracking-for-html5-videos-(deprecated)',
            },
            {
              label: 'Ecommerce cart update (deprecated)',
              to: '#ecommerce-cart-update-(deprecated)',
            },
            {
              label: 'Ecommerce order confirmation (deprecated)',
              to: '#ecommerce-order-confirmation-(deprecated)',
            },
          ]
        },
      ],
    },
    generator,
    footer: {
      style: 'dark',
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} Piwik PRO, Inc. Built with Docusaurus.`,
    },
    piwikProAnalytics: {
      appId: 'd2febe1a-02de-4b15-bc7a-88ef411d177a',
      instanceAddress: 'marketing.containers.piwik.pro',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [path.resolve(__dirname, 'src/plugins/piwikProAnalytics')],
};
