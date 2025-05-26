// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add custom resolver options with expanded extensions
config.resolver = {
  ...config.resolver,
  sourceExts: [
    'js',
    'jsx',
    'json',
    'ts',
    'tsx',
    'cjs',
    'd.ts',
    'web.js',
    'web.jsx',
    'web.ts',
    'web.tsx'
  ],
  assetExts: [
    'ttf',
    'woff',
    'woff2',
    'eot',
    'otf',
    'png',
    'jpg',
    'jpeg',
    'gif',
    'mp4',
    'mov',
    'webp',
    'pdf'
  ],
  platforms: ['web', 'ios', 'android']
};

module.exports = config;