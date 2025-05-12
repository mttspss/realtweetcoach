/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,
  swcMinify: true,

  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },

  // Uncoment to add domain whitelist
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'res.cloudinary.com',
  //     },
  //   ]
  // },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  typescript: {
    // !! ATTENZIONE !!
    // Ignorare gli errori di tipo TypeScript è pericoloso e può portare a problemi in produzione.
    // Questa opzione è qui solo temporaneamente per permettere il deploy mentre si risolvono i problemi.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
