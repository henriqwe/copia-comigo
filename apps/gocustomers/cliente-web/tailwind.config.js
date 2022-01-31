const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const { join } = require('path');

module.exports = {
  presets: [require('../../../tailwind-workspace-preset.js')],
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, '../../../libs/ui/common/src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, '../../../libs/ui/blocks/src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, '../../../libs/ui/templates/src/**/*.{js,ts,jsx,tsx}'),
    // ...createGlobPatternsForDependencies(join(__dirname, 'libs/ui-blocks')),
    // ...createGlobPatternsForDependencies(join(__dirname, 'libs/ui-common')),
    // ...createGlobPatternsForDependencies(join(__dirname, 'libs/ui-templates'))
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {},
  },
};
