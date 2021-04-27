import flatten from 'flat'
import fs from 'fs-extra'

import type { FlattenedColors } from '../raw-colors'
import { colors } from '../raw-colors'

const getFlattenedCssColors = () => {
    const flattenedColors = flatten(colors, {
        delimiter: '-',
        safe: true,
    }) as FlattenedColors
    return Object.keys(flattenedColors).map((name) => name.toLowerCase())
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

const createColorsMap = (flattenedColors: string[], flattenedCssColors: string[]): string => {
    return `
export const colorsMap = {
${flattenedColors
    .map(
        (color, index) =>
            `    '${color}': '--c-${flattenedCssColors[index].replace('-default', '')}',`
    )
    .join('\n')}
} as const
    `
}

export const createColorTypes = (): void => {
    const flattenedCssColors = getFlattenedCssColors()
    const flattenedColors = flattenedCssColors.map((name) => name.replace('-default', ''))
    const output: string[] = []
    output.push(createColorsArray(flattenedColors))
    output.push(createColorType())
    output.push(createCategoryType())
    output.push(createCategoryNames())
    output.push(createColorsMap(flattenedColors, flattenedCssColors))

    fs.writeFileSync('lib/colors.ts', output.join('\n'))
}
