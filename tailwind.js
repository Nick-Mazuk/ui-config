const defaultTheme = require('tailwindcss/defaultTheme')

const isColor = (color) => {
    return Array.isArray(color)
}

const getTailwindColor = (color, isArray = true) => {
    const colorString = isArray ? color.join(', ') : color
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
        if (Object.prototype.hasOwnProperty.call(colors, colorGroup)) {
            const item = colors[colorGroup]
            if (isColor(item)) tailwindColors[colorGroup] = getTailwindColor(item)
            else tailwindColors[colorGroup] = createTailwindColors(item)
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
            link: getTailwindColor('var(--c-link)', false)
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
        lineHeight: {
            1: '0.9',
            2: '0.95',
            3: '1',
            4: '1.05',
            5: '1.1',
            6: '1.15',
            7: '1.2',
            8: '1.25',
            9: '1.3',
            10: '1.35',
            11: '1.4',
            12: '1.45',
            13: '1.5',
            14: '1.55',
            15: '1.6',
            16: '1.65',
            17: '1.7',
            18: '1.75',
            19: '1.8',
            20: '1.85',
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
        typography: (theme) => ({
            DEFAULT: {
                css: {
                    color: 'var(--c-gray-900)',
                    a: {
                        color: 'var(--c-primary-500)',
                        fontWeight: theme('fontWeight.semibold'),
                        textDecoration: 'none'
                    },
                    h1: {
                        fontWeight: theme('fontWeight.medium'),
                        fontSize: '2.25rem',
                    },
                    h2: {
                        fontWeight: theme('fontWeight.medium'),
                        fontSize: '1.875rem',
                    },
                    h3: {
                        fontWeight: theme('fontWeight.semibold'),
                        fontSize: '1.5rem',
                    },
                    h4: {
                        fontWeight: theme('fontWeight.semibold'),
                        fontSize: '1.25rem',
                    },
                    h5: {
                        fontWeight: theme('fontWeight.semibold'),
                        fontSize: '1.125rem',
                    },
                    h6: {
                        fontWeight: theme('fontWeight.bold'),
                        fontSize: '1rem',
                    },
                    iframe: {
                        borderRadius: theme('borderRadius.lg'),
                        marginTop: '0 !important',
                        marginBottom: '0 !important',
                    },
                    img: {
                        borderRadius: theme('borderRadius.lg'),
                        marginTop: em(32, 16),
                        marginBottom: em(32, 16),
                    },
                    video: {
                        borderRadius: theme('borderRadius.lg'),
                        marginTop: em(32, 16),
                        marginBottom: em(32, 16),
                    },
                    figure: {
                        borderRadius: theme('borderRadius.lg'),
                        marginTop: em(32, 16),
                        marginBottom: em(32, 16),
                    },
                },
            },
            lg: {
                css: {
                    fontSize: '1.125rem',
                    a: { 
                        color: 'var(--c-primary-500)',
                    },
                    h1: {
                        fontSize: '3rem',
                    },
                    h2: {
                        fontSize: '2.25rem',
                    },
                    h3: {
                        fontSize: '1.875rem',
                    },
                    h4: {
                        fontSize: '1.5rem',
                    },
                    h5: {
                        fontSize: '1.25rem',
                    },
                    h6: {
                        fontSize: '1.125rem',
                    },
                    img: {
                        marginTop: em(32, 18),
                        marginBottom: em(32, 18),
                    },
                    video: {
                        marginTop: em(32, 18),
                        marginBottom: em(32, 18),
                    },
                    figure: {
                        marginTop: em(32, 18),
                        marginBottom: em(32, 18),
                    },
                }
            },
            xl: {
                css: {
                    fontSize: '1.125rem',
                    a: { 
                        color: 'var(--c-primary-500)',
                    },
                    h1: {
                        fontSize: '4rem',
                    },
                    h2: {
                        fontSize: '3rem',
                    },
                    h3: {
                        fontSize: '2.25rem',
                    },
                    h4: {
                        fontSize: '1.875rem',
                    },
                    h5: {
                        fontSize: '1.5rem',
                    },
                    h6: {
                        fontSize: '1.25rem',
                    },
                    img: {
                        marginTop: em(40, 20),
                        marginBottom: em(40, 20),
                    },
                    video: {
                        marginTop: em(40, 20),
                        marginBottom: em(40, 20),
                    },
                    figure: {
                        marginTop: em(40, 20),
                        marginBottom: em(40, 20),
                    },
                }
            },
            '2xl': {
                css: {
                    a: { 
                        color: 'var(--c-primary-500)',
                    },
                }
            },
            sm: {
                css: {
                    a: { 
                        color: 'var(--c-primary-500)',
                    },
                }
            },
            'text-base': {
                css: {
                    fontSize: '1rem',
                    a: { 
                        color: 'var(--c-primary-500)',
                    },
                }
            }
        }),
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
    variants: {
        extend: {
            animation: ['motion-safe', 'motion-reduce'],
            backgroundColor: ['group-hover', 'focus-within'],
            backgroundOpacity: ['focus-within', 'active'],
            borderWidth: ['first'],
            boxShadow: ['focus-within', 'active'],
            display: ['group-hover', 'group-focus'],
            fontWeight: ['hover', 'focus'],
            margin: ['focus', 'last', 'first'],
            padding: ['first', 'last'],
            scale: ['focus-within', 'active'],
            textColor: ['focus-within'],
        }
    },
    plugins: [require('@tailwindcss/typography')],
    dark: 'class',
}
