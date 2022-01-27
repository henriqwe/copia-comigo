const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
    'postcss-import': {},
    'postcss-advanced-variables': {},
    'tailwindcss/nesting': {}
  },
};