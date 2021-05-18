/* eslint-disable max-lines-per-function -- just defining things */
import aspectRatio from '@tailwindcss/aspect-ratio'
import forms from '@tailwindcss/forms'
import lineClamp from '@tailwindcss/line-clamp'
import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

import { createTailwindColors } from './build-scripts/create-tailwind-colors'

type Theme = typeof defaultTheme

export const config = {
    theme: {
        colors: {
            ...createTailwindColors(),
            transparent: 'transparent',
            current: 'currentColor',
            background: 'rgb(var(--c-background))',
        },
        inset: (theme: Theme, { negative }) => ({
            auto: 'auto',
            '1/2': '50%',
            ...theme('spacing'),
            ...negative(theme('spacing')),
        }),
        fontSize: {
            xs: ['0.625rem', { lineHeight: '0.875rem' }],
            sm: ['0.75rem', { lineHeight: '1rem' }],
            base: ['0.875rem', { lineHeight: '1.25rem' }],
            lg: ['1rem', { lineHeight: '1.5rem' }],
            xl: ['1.125rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.25rem', { lineHeight: '1.75rem' }],
            '3xl': ['1.5rem', { lineHeight: '2rem' }],
            '4xl': ['1.875rem', { lineHeight: '2.25rem' }],
            '5xl': ['2.25rem', { lineHeight: '2.5rem' }],
            '6xl': ['3rem', { lineHeight: '1' }],
            '7xl': ['3.75rem', { lineHeight: '1' }],
            '8xl': ['4.5rem', { lineHeight: '1' }],
            '9xl': ['6rem', { lineHeight: '1' }],
            '10xl': ['8rem', { lineHeight: '1' }],
        },
        fontWeight: {
            thin: 'calc(100 * var(--font-weight-multiplier, 1))',
            extralight: 'calc(200 * var(--font-weight-multiplier, 1))',
            light: 'calc(300 * var(--font-weight-multiplier, 1))',
            normal: 'calc(400 * var(--font-weight-multiplier, 1))',
            semibold: 'calc(500 * var(--font-weight-multiplier, 1))',
            bold: 'calc(600 * var(--font-weight-multiplier, 1))',
            extrabold: 'calc(700 * var(--font-weight-multiplier, 1))',
            black: 'calc(800 * var(--font-weight-multiplier, 1))',
        },
        boxShadow: {
            xs: '0 0 0 1px rgba(var(--c-shadow), var(--shadow-opacity, 0.05))',
            sm: '0 1px 2px 0 rgba(var(--c-shadow), var(--shadow-opacity, 0.05))',
            DEFAULT:
                '0 1px 3px 0 rgba(var(--c-shadow), 0.1), 0 1px 2px 0 rgba(var(--c-shadow), var(--shadow-opacity, 0.06))',
            md: '0 4px 6px -1px rgba(var(--c-shadow), 0.1), 0 2px 4px -1px rgba(var(--c-shadow), var(--shadow-opacity, 0.06))',
            lg: '0 10px 15px -3px rgba(var(--c-shadow), 0.1), 0 4px 6px -2px rgba(var(--c-shadow), var(--shadow-opacity, 0.05))',
            xl: '0 20px 25px -5px rgba(var(--c-shadow), 0.1), 0 10px 10px -5px rgba(var(--c-shadow), var(--shadow-opacity, 0.04))',
            '2xl': '0 25px 50px -12px rgba(var(--c-shadow), var(--shadow-opacity, 0.25))',
            inner: 'inset 0 2px 4px 0 rgba(var(--c-shadow), var(--shadow-opacity, 0.06))',
            none: 'none',
        },
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Gilroy', 'Inter', ...defaultTheme.fontFamily.sans],
                mono: ['SFMono-Regular', ...defaultTheme.fontFamily.mono],
            },
            maxWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '1/3': '33%',
                '2/3': '66%',
            },
            minWidth: (theme) => ({
                ...theme('spacing'),
            }),
            minHeight: (theme) => ({
                ...theme('spacing'),
            }),
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
                '1/2': 0.5,
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        a: {
                            textDecoration: 'none',
                            fontWeight: theme('fontWeight.semibold'),
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        },
                        strong: {
                            fontWeight: theme('fontWeight.bold'),
                        },
                        ol: {
                            paddingLeft: theme('padding.10'),
                        },
                        ul: {
                            paddingLeft: theme('padding.10'),
                        },
                        'ol > li': {
                            paddingLeft: '0px',
                        },
                        'ul > li': {
                            paddingLeft: '0px',
                        },
                        'ol > li::before': {
                            fontWeight: theme('fontWeight.normal'),
                            marginLeft: '-25px',
                        },
                        'ul > li::before': {
                            content: '"-"',
                            position: 'absolute',
                            borderRadius: '50%',
                            marginLeft: '-25px',
                            width: '0px',
                            top: '0px',
                            left: '0px',
                            background: 'none',
                        },
                        blockquote: {
                            fontStyle: '',
                            paddingLeft: theme('padding.9'),
                            borderLeftWidth: theme('spacing.1'),
                        },
                        img: {
                            borderRadius: theme('borderRadius.lg'),
                        },
                        h2: {
                            marginTop: '2em',
                            marginBottom: '1em',
                        },
                        h3: {
                            marginTop: '2em',
                            marginBottom: '1em',
                        },
                        h4: {
                            marginTop: '2em',
                            marginBottom: '1em',
                        },
                    },
                },
            }),
        },
    },

    plugins: [typography({ modifiers: [] }), forms, aspectRatio, lineClamp],
    mode: 'jit',
    darkMode: 'class',
}
