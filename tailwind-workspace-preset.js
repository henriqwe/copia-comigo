const { join } = require('path')
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
module.exports = {
  // content: [
  //   join(__dirname, 'libs/domains/**/*.{js,ts,jsx,tsx}'),
  // ],
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  }
  // plugins: [require('@tailwindcss/typography')],
}
