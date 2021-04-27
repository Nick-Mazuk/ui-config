/* eslint-disable no-magic-numbers -- this file defined the magic numbers */
import { lchToRgb } from './lch-to-rgb'

type ColorValue =
    | 50
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | 'i50'
    | 'i100'
    | 'i200'
    | 'i300'
    | 'i400'
    | 'i500'
    | 'i600'
    | 'i700'
    | 'i800'
    | 'i900'

const lightest = 98
const darkest = 3
const increment = (lightest - darkest) / 17

const lightestInverted = 22
const darkestInverted = 95
const incrementInverted = (lightestInverted - darkestInverted) / 8

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
    i50: 5,
    i100: lightestInverted,
    i200: 7 * incrementInverted + darkestInverted,
    i300: 6 * incrementInverted + darkestInverted,
    i400: 5 * incrementInverted + darkestInverted,
    i500: 4 * incrementInverted + darkestInverted,
    i600: 3 * incrementInverted + darkestInverted,
    i700: 2 * incrementInverted + darkestInverted,
    i800: incrementInverted + darkestInverted,
    i900: darkestInverted,
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
    })

    return output
}

const lightnesses: Lightness[] = [
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
    { name: 'i50', value: 'i50' },
    { name: 'i100', value: 'i100' },
    { name: 'i200', value: 'i200' },
    { name: 'i300', value: 'i300' },
    { name: 'i400', value: 'i400' },
    { name: 'i500', value: 'i500' },
    { name: 'i', value: 'i500' },
    { name: 'i600', value: 'i600' },
    { name: 'i700', value: 'i700' },
    { name: 'i800', value: 'i800' },
    { name: 'i900', value: 'i900' },
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
    link: createPaletteItem(282.521, 73.61, [
        { name: 'DEFAULT', value: 500 },
        { name: 'i', value: 'i500' },
    ]),
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
