/**
 * Copyright (c) 2025 OpenIPC community
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-check

// See Netlify env variables here: https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
const isNetlify = process.env.NETLIFY === 'true';
const isNetlifyDeployPreview =
  isNetlify && process.env.CONTEXT === 'deploy-preview';

// Deploy preview: we want to test the Infima RTL support!
/** @type {import("@docusaurus/types").I18nConfig} */
const i18n = isNetlifyDeployPreview
  ? {
      defaultLocale: 'LTR',
      locales: ['LTR', 'RTL'],
      localeConfigs: {
        LTR: {
          direction: 'ltr',
        },
        RTL: {
          direction: 'rtl',
        },
      },
    }
  : undefined;

/** @type {import("@docusaurus/types").Config} */
const config = {
  i18n,
  title: 'OpenIPC',
  tagline: 'OpenIPC is an open source operating system from the open community targeting for IP cameras with ARM and MIPS processors. 🔥',
  organizationName: 'OpenIPC community',
  projectName: 'openipc',
  baseUrl: '/',
  url: 'https://openipc.link',
  favicon: 'img/logo.svg',
  /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'OpenIPC',
      logo: {
        alt: 'OpenIPC Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/getting-started/introduction',
          label: 'Docs',
          /** @type {"left" | "right"} */
          position: 'left',
        },
        isNetlifyDeployPreview && {
          to: 'pathname:///demo',
          label: 'Demo',
          /** @type {"left" | "right"} */
          position: 'left',
        },
        isNetlifyDeployPreview && {
          type: 'localeDropdown',
          /** @type {"left" | "right"} */
          position: 'left',
        },
      ].filter(Boolean),
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'docs/getting-started/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/openipc',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/openipc/',
            },
          ],
        },
        {
          title: 'Legal',
          // Please do not remove the privacy and terms, it's a legal requirement.
          items: [
            {
              label: 'Privacy',
              href: 'https://openipc.org/legal/privacy/',
              target: '_blank',
              rel: 'noreferrer noopener',
            },
            {
              label: 'Terms',
              href: 'https://openipc.org/legal/terms/',
              target: '_blank',
              rel: 'noreferrer noopener',
            },
          ],
        },
      ],
      logo: {
        alt: 'Meta Open Source Logo',
        // This default includes a positive & negative version, allowing for
        // appropriate use depending on your site's style.
        src: '/img/meta_opensource_logo_negative.svg',
        href: 'https://openipc.org',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Meta Platforms, Inc.`,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [require('./src/remark/playground')],
        },
        blog: false,
      }),
    ],
  ],
};

module.exports = config;
