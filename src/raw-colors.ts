/* eslint-disable no-magic-numbers -- this file defined the magic numbers */
import AcColor from 'ac-colors'

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
        min: 4.5,
        max: 4.545,
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
    const white = new AcColor({ color: [255, 255, 255] })
    const color = new AcColor({ color: rgb })
    return AcColor.contrastRatio(white, color)
}

const getLchFromColorStops = (colorStops: AcColor[], lightness: number): AcColor => {
    if (colorStops.length === 1) return colorStops[0]
    if (lightness < colorStops[0].lchab[0]) return colorStops[0]
    if (lightness > colorStops[colorStops.length - 1].lchab[0])
        return colorStops[colorStops.length - 1]
    for (let index = 0; index < colorStops.length; index++) {
        // eslint-disable-next-line no-continue -- just easier
        if (lightness > colorStops[index + 1].lchab[0]) continue
        const weight =
            (lightness - colorStops[index].lchab[0]) /
            (colorStops[index + 1].lchab[0] - colorStops[index].lchab[0])
        return AcColor.blend(colorStops[index], colorStops[index + 1], 'lchab', 1 - weight)
    }
    return colorStops[colorStops.length - 1]
}

const createPaletteItem = (colorStops: AcColor[], lightnesses: Lightness[]): PaletteItem => {
    const output: PaletteItem = {}
    const sortedColorStops = colorStops.sort((a, b) => {
        return a.lchab[0] < b.lchab[0] ? -1 : 1
    })

    lightnesses.forEach((lightness) => {
        let adjustedLightness = LIGHTNESS_MAP[lightness].lightness
        const { min, max } = LIGHTNESS_MAP[lightness]
        if (!min || !max) return
        let currentColor: [number, number, number] = [0, 0, 0]
        let currentContrast = 0

        do {
            const initialColor = getLchFromColorStops(sortedColorStops, adjustedLightness).lchab
            currentColor = lchToRgb(adjustedLightness, initialColor[1], initialColor[2])
            currentContrast = getColorContrast(currentColor)
            if (currentContrast <= min) adjustedLightness -= 0.1
            else adjustedLightness += 0.1
        } while (currentContrast <= min || currentContrast >= max)

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
    link: createPaletteItem(
        [new AcColor({ color: [48.323, 73.61, 282.521], type: 'lchab' })],
        ['DEFAULT']
    ),
    primary: createPaletteItem(
        [
            new AcColor({ color: [9.254, 39.054, 288], type: 'lchab' }),
            new AcColor({ color: [39, 66, 282.521], type: 'lchab' }),
            new AcColor({ color: [48.323, 73.61, 282.521], type: 'lchab' }),
            new AcColor({ color: [60, 54, 267], type: 'lchab' }),
            new AcColor({ color: [73, 39, 261], type: 'lchab' }),
            new AcColor({ color: [83.663, 30, 254.699], type: 'lchab' }),
        ],
        lightnesses
    ),
    highlight: createPaletteItem(
        [new AcColor({ color: [48.323, 90, 312.636], type: 'lchab' })],
        lightnesses
    ),
    success: createPaletteItem(
        [
            new AcColor({ color: [48.323, 66.576, 134.383], type: 'lchab' }),
            new AcColor({ color: [60, 66.576, 134.383], type: 'lchab' }),
            new AcColor({ color: [74, 48, 134.383], type: 'lchab' }),
            new AcColor({ color: [92, 31, 134.383], type: 'lchab' }),
        ],
        lightnesses
    ),
    warning: createPaletteItem(
        [new AcColor({ color: [48.323, 80.022, 3.794], type: 'lchab' })],
        lightnesses
    ),
    error: createPaletteItem(
        [new AcColor({ color: [48.323, 101.398, 40.853], type: 'lchab' })],
        lightnesses
    ),
    gray: createPaletteItem(
        [new AcColor({ color: [48.323, 0, 282.521], type: 'lchab' })],
        lightnesses
    ),
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
