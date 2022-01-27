const { join } = require('path');

module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-advanced-variables': {},
        'tailwindcss/nesting': {},
        tailwindcss: {
            config: join(__dirname, 'tailwind.config.js'),
        },
        autoprefixer: {},
    },
};