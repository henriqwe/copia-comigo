const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const { join } = require('path');
const colors = require("tailwindcss/colors");
const {
    toRGB,
    withOpacityValue,
} = require("@left4code/tw-starter/dist/js/tailwind-config-helper");

module.exports = {
    content: [
        join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
        '~@left4code/tw-starter/**/*.js',
        join(__dirname, '../../libs/ui/common/src/**/*.{js,ts,jsx,tsx}'),
        join(__dirname, '../../libs/ui/blocks/src/**/*.{js,ts,jsx,tsx}'),
        join(__dirname, '../../libs/ui/templates/src/**/*.{js,ts,jsx,tsx}')
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                rgb: toRGB(colors),
                primary: withOpacityValue("--color-primary"),
                secondary: withOpacityValue("--color-secondary"),
                success: withOpacityValue("--color-success"),
                info: withOpacityValue("--color-info"),
                warning: withOpacityValue("--color-warning"),
                pending: withOpacityValue("--color-pending"),
                danger: withOpacityValue("--color-danger"),
                light: withOpacityValue("--color-light"),
                dark: withOpacityValue("--color-dark"),
                slate: {
                    50: withOpacityValue("--color-slate-50"),
                    100: withOpacityValue("--color-slate-100"),
                    200: withOpacityValue("--color-slate-200"),
                    300: withOpacityValue("--color-slate-300"),
                    400: withOpacityValue("--color-slate-400"),
                    500: withOpacityValue("--color-slate-500"),
                    600: withOpacityValue("--color-slate-600"),
                    700: withOpacityValue("--color-slate-700"),
                    800: withOpacityValue("--color-slate-800"),
                    900: withOpacityValue("--color-slate-900"),
                },
                darkmode: {
                    50: withOpacityValue("--color-darkmode-50"),
                    100: withOpacityValue("--color-darkmode-100"),
                    200: withOpacityValue("--color-darkmode-200"),
                    300: withOpacityValue("--color-darkmode-300"),
                    400: withOpacityValue("--color-darkmode-400"),
                    500: withOpacityValue("--color-darkmode-500"),
                    600: withOpacityValue("--color-darkmode-600"),
                    700: withOpacityValue("--color-darkmode-700"),
                    800: withOpacityValue("--color-darkmode-800"),
                    900: withOpacityValue("--color-darkmode-900"),
                },
                white: 'white',
                black: 'black',
                current: 'current',
                transparent: 'transparent',
                theme: {
                    1: '#1C3FAA',
                    2: '#F1F5F8', // #D6DBDF
                    3: '#2E51BB',
                    4: '#274AB7',
                    5: '#DEE7EF',
                    6: '#D32929',
                    7: '#365A74',
                    8: '#D2DFEA',
                    9: '#91C714',
                    10: '#3160D8',
                    11: '#F78B00',
                    12: '#FBC500',
                    13: '#7F9EB9',
                    14: '#E6F3FF',
                    15: '#8DA9BE',
                    16: '#607F96',
                    17: '#FFEFD9',
                    18: '#D8F8BC',
                    19: '#2449AF',
                    20: '#395EC1',
                    21: '#C6D4FD',
                    22: '#E8EEFF',
                    23: '#1A389F',
                    24: '#163296',
                    25: '#C7D2FF',
                    26: '#15329A',
                    27: '#203FAD',
                    28: '#BBC8FD',
                    29: '#284EB2',
                    30: '#98AFF5'
                }
            },
            fontFamily: {
                roboto: ["Roboto"],
            },
            container: {
                center: true,
            },
            maxWidth: {
                "1/4": "25%",
                "1/2": "50%",
                "3/4": "75%",
            },
            strokeWidth: {
                0.5: 0.5,
                1.5: 1.5,
                2.5: 2.5,
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
    variants: {
        extend: {
            boxShadow: ["dark"],
        },
    },
};