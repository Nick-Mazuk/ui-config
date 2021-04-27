/* eslint-disable no-magic-numbers -- this file defined the magic numbers */
import { lchToRgb } from './lch-to-rgb'

type Lightness = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'DEFAULT'

const LIGHTNESS_MAP: Record<Lightness, number> = {
    100: 98.272,
    200: 92.698,
    300: 66.374,
    400: 57.258,
    500: 48.323,
    DEFAULT: 48.323,
    600: 39.297,
    700: 30.272,
    800: 21.247,
    900: 5.063,
}

type PaletteItem = {
    [value: string]: [number, number, number]
}

const createPaletteItem = (hue: number, chroma: number, lightnesses: Lightness[]): PaletteItem => {
    const output: PaletteItem = {}

    lightnesses.forEach((lightness) => {
        output[lightness] = lchToRgb(LIGHTNESS_MAP[lightness], chroma, hue)
        const darkName = lightness === 'DEFAULT' ? 'i' : `i${lightness}`
        const darkLightness: Lightness =
            lightness === 'DEFAULT' ? 'DEFAULT' : ((1000 - lightness) as Lightness)
        output[darkName] = lchToRgb(LIGHTNESS_MAP[darkLightness], chroma, hue)
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
