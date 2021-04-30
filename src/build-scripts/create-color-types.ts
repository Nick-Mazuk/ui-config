import AcColor from 'ac-colors'
import flatten from 'flat'
import fs from 'fs-extra'

import type { FlattenedColors } from '../raw-colors'
import { colors } from '../raw-colors'

const getFlattenedCssColors = () => {
    const flattenedColors = flatten(colors, {
        delimiter: '-',
        safe: true,
    }) as FlattenedColors

    const cssColors: FlattenedColors = {}
    Object.keys(flattenedColors).forEach((name) => {
        cssColors[name] = flattenedColors[name]
    })
    return cssColors
}

const getFlattenedColorNames = (flattenedColors: FlattenedColors) => {
    return Object.keys(flattenedColors)
}

const createColorsArray = (flattenedColors: string[]): string => {
    return `export const colors = ${JSON.stringify(flattenedColors)} as const`
}

const createColorType = (): string => {
    return 'export type Color = typeof colors[number]'
}

const createCategoryType = (): string => {
    return `export type ColorCategory = 'primary' | 'highlight' | 'error' | 'warning' | 'success' | 'gray'`
}

const createCategoryNames = (): string => {
    return `export const colorCategories = ['primary', 'highlight', 'error', 'warning', 'success', 'gray'] as const`
}

const createColorsCssMap = (flattenedColors: string[], flattenedCssColors: string[]): string => {
    return `
export const colorsCssMap = {
${flattenedColors
    .map(
        (color, index) =>
            `    '${color}': '--c-${flattenedCssColors[index].replace('-default', '')}',`
    )
    .join('\n')}
} as const`
}

const createColorsRgbMap = (flattenedColors: string[], colorValues: FlattenedColors): string => {
    return `
export const colorsRgbMap = {
${flattenedColors.map((color) => `    '${color}': '${colorValues[color].join(', ')}',`).join('\n')}
} as const`
}

const createColorsHexMap = (flattenedColors: string[], colorValues: FlattenedColors): string => {
    const color = new AcColor({ color: [0, 0, 0] })
    return `
export const colorsHexMap = {
${flattenedColors
    .map((colorName) => {
        color.rgb = colorValues[colorName]
        return `    '${colorName}': '${color.hexString}',`
    })
    .join('\n')}
} as const`
}

export const createColorTypes = (): void => {
    const flattenedCssColors = getFlattenedCssColors()
    const flattenedColorNames = getFlattenedColorNames(flattenedCssColors)
    const flattenedColors = flattenedColorNames.map((name) => name.replace('-default', ''))
    const output: string[] = []
    output.push(createColorsArray(flattenedColors))
    output.push(createColorType())
    output.push(createCategoryType())
    output.push(createCategoryNames())
    output.push(createColorsCssMap(flattenedColors, flattenedColorNames))
    output.push(createColorsRgbMap(flattenedColors, flattenedCssColors))
    output.push(createColorsHexMap(flattenedColors, flattenedCssColors))

    fs.writeFileSync('lib/colors.ts', output.join('\n'))
}
