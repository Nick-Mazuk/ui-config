/* eslint-disable no-magic-numbers -- this file defined the magic numbers */
import Color from 'ac-colors'

import { lchToRgb } from './lch-to-rgb'

type Lightness = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'DEFAULT'

type Contrast = {
    lightness: number
    min: number
    max: number
}

// lightness is ideal LCH lightness. Min/max are real-world RGB contrast ratios from white.
const LIGHTNESS_MAP: Record<Lightness, Contrast> = {
    100: {
        lightness: 98.272,
        min: 1.03,
        max: 1.05,
    },
    200: {
        lightness: 92.698,
        min: 1.19,
        max: 1.21,
    },
    300: {
        lightness: 66.374,
        min: 2.57,
        max: 2.6,
    },
    400: {
        lightness: 57.258,
        min: 3.46,
        max: 3.5,
    },
    500: {
        lightness: 48.323,
        min: 4.55,
        max: 4.61,
    },
    DEFAULT: {
        lightness: 48.323,
        min: 4.55,
        max: 4.61,
    },
    600: {
        lightness: 39.297,
        min: 6.57,
        max: 6.68,
    },
    700: {
        lightness: 30.272,
        min: 9.15,
        max: 9.3,
    },
    800: {
        lightness: 21.247,
        min: 12.46,
        max: 12.66,
    },
    900: {
        lightness: 5.063,
        min: 18.78,
        max: 18.95,
    },
}

type PaletteItem = {
    [value: string]: [number, number, number]
}

const getColorContrast = (rgb: [number, number, number]): number => {
    const white = new Color({ color: [255, 255, 255] })
    const color = new Color({ color: rgb })
    return Color.contrastRatio(white, color)
}

const createPaletteItem = (hue: number, chroma: number, lightnesses: Lightness[]): PaletteItem => {
    const output: PaletteItem = {}

    lightnesses.forEach((lightness) => {
        let adjustedLightness = LIGHTNESS_MAP[lightness].lightness
        const { min, max } = LIGHTNESS_MAP[lightness]
        if (!min || !max) return
        let currentColor = lchToRgb(adjustedLightness, chroma, hue)
        let currentContrast = getColorContrast(currentColor)

        while (currentContrast <= min || currentContrast >= max) {
            if (currentContrast <= min) adjustedLightness -= 0.1
            else adjustedLightness += 0.1

            currentColor = lchToRgb(adjustedLightness, chroma, hue)
            currentContrast = getColorContrast(currentColor)
        }

        output[lightness] = currentColor
    })

    Object.keys(output).forEach((name) => {
        const darkName = name === 'DEFAULT' ? 'i' : `i${1000 - parseInt(name)}`
        output[darkName] = output[name]
    })

    return output
}

const lightnesses: Lightness[] = [100, 200, 300, 400, 500, 600, 700, 800, 900, 'DEFAULT']

export type Color = [number, number, number]
export type ColorVariants = {
    [variant: string]: Color
}
export type Colors = {
    [label: string]: Color | ColorVariants
}
export type FlattenedColors = { [colorName: string]: Color }

export const colors: Colors = {
    foreground: {
        DEFAULT: [0, 0, 0],
        i: [255, 255, 255],
    },
    background: {
        DEFAULT: [255, 255, 255],
        i: [0, 0, 0],
    },
    link: createPaletteItem(282.521, 73.61, ['DEFAULT']),
    primary: createPaletteItem(282.521, 73.61, lightnesses),
    highlight: createPaletteItem(312.636, 90, lightnesses),
    success: createPaletteItem(134.383, 66.576, lightnesses),
    warning: createPaletteItem(3.794, 80.022, lightnesses),
    error: createPaletteItem(40.853, 101.398, lightnesses),
    gray: createPaletteItem(282.521, 0, lightnesses),
    accent: {
        cyan: [17, 213, 239],
        magenta: [191, 64, 162],
        yellow: [255, 245, 0],
        green: [0, 217, 36],
        indigo: [98, 42, 255],
        blue: [14, 144, 219],
        pink: [250, 36, 60],
    },
}
