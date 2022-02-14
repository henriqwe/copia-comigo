const { join } = require('path');

module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-import': {},
    'postcss-advanced-variables': {},
    'tailwindcss/nesting': {},
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
  },
};
