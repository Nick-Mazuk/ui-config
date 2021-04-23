/* eslint-disable no-magic-numbers -- this file defined the magic numbers */
import { lchToRgb } from './lch-to-rgb'

type ColorValue = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

const lightest = 95
const darkest = 3
const increment = (lightest - darkest) / 17

const LIGHTNESS_MAP: Record<ColorValue, number> = {
    50: lightest,
    100: 16 * increment + darkest,
    200: 14 * increment + darkest,
    300: 12 * increment + darkest,
    400: 10 * increment + darkest,
    500: 8 * increment + darkest,
    600: 6 * increment + darkest,
    700: 4 * increment + darkest,
    800: 2 * increment + darkest,
    900: darkest,
}

// console.log(rgb2lch(216, 0, 11));

type Lightness = {
    value: ColorValue
    name: string
}

type PaletteItem = {
    [value: string]: [number, number, number]
}

const createPaletteItem = (hue: number, chroma: number, lightnesses: Lightness[]): PaletteItem => {
    const output: PaletteItem = {}

    lightnesses.forEach((lightness) => {
        output[lightness.name] = lchToRgb(LIGHTNESS_MAP[lightness.value], chroma, hue)
        const darkName = lightness.name === 'DEFAULT' ? 'i' : `i${lightness.name}`
        output[darkName] = lchToRgb(100 - LIGHTNESS_MAP[lightness.value], chroma, hue)
    })

    return output
}

const grayLightnesses: Lightness[] = [
    { name: '50', value: 50 },
    { name: '100', value: 100 },
    { name: '200', value: 200 },
    { name: '300', value: 300 },
    { name: '400', value: 400 },
    { name: '500', value: 500 },
    { name: 'DEFAULT', value: 500 },
    { name: '600', value: 600 },
    { name: '700', value: 700 },
    { name: '800', value: 800 },
    { name: '900', value: 900 },
]
const lightnesses: Lightness[] = [
    { name: 'lightest', value: 50 },
    { name: 'lighter', value: 100 },
    { name: 'light', value: 300 },
    { name: 'DEFAULT', value: 500 },
    { name: 'dark', value: 700 },
]

export type Color = [number, number, number]
export type ColorVariants = {
    [variant: string]: Color
}
export type Colors = {
    [label: string]: Color | ColorVariants
}
export type FlattenedColors = { [colorName: string]: Color }

export const colors: Colors = {
    black: [0, 0, 0],
    white: [255, 255, 255],
    link: createPaletteItem(282.521, 73.61, [{ name: 'DEFAULT', value: 500 }]),
    primary: createPaletteItem(282.521, 73.61, lightnesses),
    highlight: createPaletteItem(312.636, 79.63, lightnesses),
    success: createPaletteItem(134.383, 66.576, lightnesses),
    warning: createPaletteItem(59.816, 103, lightnesses),
    error: createPaletteItem(39.205, 92.083, lightnesses),
    gray: createPaletteItem(274.157, 6.052, grayLightnesses),
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
