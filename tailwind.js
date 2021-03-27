const defaultTheme = require('tailwindcss/defaultTheme')

const getTailwindColor = (color) => {
    const colorString = 'var(--c-' + color.toLowerCase() + ')'
    return ({ opacityVariable, opacityValue }) => {
        if (typeof opacityValue !== 'undefined') return `rgba(${colorString}, ${opacityValue})`
        if (typeof opacityVariable !== 'undefined')
            return `rgba(${colorString}, var(${opacityVariable}, 1))`
        return `rgb(${colorString})`
    }
}

const createTailwindColors = (colors) => {
    const tailwindColors = {}

    for (const colorGroup in colors) {
        if (Array.isArray(colors[colorGroup])) {
            tailwindColors[colorGroup] = getTailwindColor(colorGroup)
        } else {
            tailwindColors[colorGroup] = {}
            for (const colorName in colors[colorGroup]) 
                tailwindColors[colorGroup][colorName] = getTailwindColor(colorGroup + '-' + colorName)
        }
    }

    return tailwindColors
}

const round = (num) =>
    num
        .toFixed(7)
        .replace(/(\.[0-9]+?)0+$/, '$1')
        .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

module.exports = {
    theme: {
        colors: {
            ...createTailwindColors(require('./colors')),
            transparent: 'transparent',
            current: 'currentColor',
        },
        inset: (theme, { negative }) => ({
            auto: 'auto',
            '1/2': '50%',
            ...theme('spacing'),
            ...negative(theme('spacing')),
        }),
        minWidth: (theme) => ({
            0: 0,
            full: '100%',
            ...theme('spacing'),
        }),
        backgroundOpacity: {
            0: '0',
            5: '0.05',
            10: '0.1',
            20: '0.2',
            30: '0.3',
            40: '0.4',
            50: '0.5',
            60: '0.6',
            70: '0.7',
            80: '0.8',
            90: '0.9',
            100: '1',
        },
        boxShadow: {
            xs: '0 0 0 1px rgba(var(--c-gray-900), 0.05)',
            sm: '0 1px 2px 0 rgba(var(--c-gray-900), 0.05)',
            DEFAULT:
                '0 1px 3px 0 rgba(var(--c-gray-900), 0.1), 0 1px 2px 0 rgba(var(--c-gray-900), 0.06)',
            md:
                '0 4px 6px -1px rgba(var(--c-gray-900), 0.1), 0 2px 4px -1px rgba(var(--c-gray-900), 0.06)',
            lg:
                '0 10px 15px -3px rgba(var(--c-gray-900), 0.1), 0 4px 6px -2px rgba(var(--c-gray-900), 0.05)',
            xl:
                '0 20px 25px -5px rgba(var(--c-gray-900), 0.1), 0 10px 10px -5px rgba(var(--c-gray-900), 0.04)',
            '2xl': '0 25px 50px -12px rgba(var(--c-gray-900), 0.25)',
            inner: 'inset 0 2px 4px 0 rgba(var(--c-gray-900), 0.06)',
            outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
            'input-outline': 'inset 0 0 0 2px rgba(var(--c-primary-500), 1)',
            'input-hover': 'inset 0 0 0 2px rgba(var(--c-gray-300), 1)',
            'input-border': 'inset 0 0 0 1px rgba(var(--c-gray-300), 1)',
            'input-error-border': 'inset 0 0 0 1px rgba(var(--c-error-500), 1)',
            'input-error-outline': 'inset 0 0 0 2px rgba(var(--c-error-500), 1)',
            none: 'none',
        },
        // typography: () => ({
        //     DEFAULT: {
        //         css: {}
        //     }
        // }),
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                mono: ['SFMono-Regular', ...defaultTheme.fontFamily.mono],
            },
            scale: {
                1: '.01',
                101: '1.01',
            },
            maxWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '1/3': '33%',
                '2/3': '66%',
            },
            spacing: {
                content: 'max-content',
            },
            letterSpacing: {
                h1: '-1.5px',
                h2: '-0.5px',
                h4: '0.25px',
                h6: '0.15px',
            },
            skew: { 1.5: '1.5deg', '-1.5': '-1.5deg' },
            gridTemplateRows: {
                7: 'repeat(7, minmax(0, 1fr))',
                8: 'repeat(8, minmax(0, 1fr))',
                9: 'repeat(9, minmax(0, 1fr))',
                10: 'repeat(10, minmax(0, 1fr))',
                11: 'repeat(11, minmax(0, 1fr))',
                12: 'repeat(12, minmax(0, 1fr))',
            },
            gridRowStart: {
                8: '8',
                9: '9',
                10: '10',
                11: '11',
                12: '12',
                13: '13',
            },
            gridRowEnd: {
                8: '8',
                9: '9',
                10: '10',
                11: '11',
                12: '12',
                13: '13',
            },
            gridRow: {
                'span-7': 'span 7 / span 7',
                'span-8': 'span 8 / span 8',
                'span-9': 'span 9 / span 9',
                'span-10': 'span 10 / span 10',
                'span-11': 'span 11 / span 11',
                'span-12': 'span 12 / span 12',
            },
            inset: {
                '1/2': '50%',
                full: '100%',
            },
            animation: {
                'pulse-small': 'pulse-small 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'pulse-small': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.8 },
                },
            },
            flexShrink: {
                '1/2': 0.5
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
    ],
    darkMode: 'class',
}
