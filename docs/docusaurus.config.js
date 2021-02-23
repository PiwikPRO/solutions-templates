/**
 * Copyright (c) Piwik PRO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
const generator = require('../templates');

module.exports = {
  title: 'Solutions Templates',
  tagline: 'A library of detection helpers that can be used in Tag Managers to improve tracking abilities of Analytics software.',
  url: 'https://piwikpro.github.io',
  baseUrl: '/solutions-templates/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'https://piwik.pro/wp-content/assets/img/favicon.png?ver=1608560712',
  organizationName: 'Piwik PRO', // Usually your GitHub org/user name.
  projectName: 'solution-templates', // Usually your repo name.
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
      ],
    },
    generator,
    footer: {
      style: 'dark',
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} Piwik PRO, Inc. Built with Docusaurus.`,
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
};
