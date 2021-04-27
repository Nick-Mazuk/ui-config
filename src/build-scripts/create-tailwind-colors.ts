import type { ColorVariants } from '../raw-colors'
import { colors } from '../raw-colors'

type ColorFunctionProps = {
    opacityVariable: string
    opacityValue: string
}
type ColorFunction = (props: ColorFunctionProps) => string

type ColorGroup = {
    [variant: string]: ColorFunction
}

type TailwindColorsObject = {
    [label: string]: ColorFunction | ColorGroup
}

const getTailwindColor = (color: string): ColorFunction => {
    const colorString = `var(--c-${color.toLowerCase().replace('-default', '')})`
    return ({ opacityVariable, opacityValue }) => {
        if (typeof opacityValue !== 'undefined') return `rgba(${colorString}, ${opacityValue})`
        if (typeof opacityVariable !== 'undefined')
            return `rgba(${colorString}, var(${opacityVariable}, 1))`
        return `rgb(${colorString})`
    }
}

const createTailwindColorGroup = (variants: ColorVariants, groupName: string): ColorGroup => {
    const finalGroup: ColorGroup = {}

    for (const variant in variants) {
        if (Object.prototype.hasOwnProperty.call(variants, variant))
            finalGroup[variant] = getTailwindColor(`${groupName}-${variant}`)
    }

    return finalGroup
}

export const createTailwindColors = (): TailwindColorsObject => {
    const tailwindColors: TailwindColorsObject = {}

    for (const colorGroup in colors) {
        if (Object.prototype.hasOwnProperty.call(colors, colorGroup)) {
            const groupValues = colors[colorGroup]
            if (Array.isArray(groupValues))
                tailwindColors[colorGroup] = getTailwindColor(colorGroup)
            else tailwindColors[colorGroup] = createTailwindColorGroup(groupValues, colorGroup)
        }
    }

    return tailwindColors
}
