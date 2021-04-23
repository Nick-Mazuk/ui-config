import flatten from 'flat'
import fs from 'fs-extra'

import type { FlattenedColors } from '../raw-colors'
import { colors } from '../raw-colors'

const getColorDarkName = (colorName: string) => {
    const colorNameParts = colorName.split('-')
    const lastNamePart = colorNameParts[colorNameParts.length - 1]
    if (lastNamePart === 'i') colorNameParts[colorNameParts.length - 1] = 'default'
    else if (lastNamePart === 'default') colorNameParts[colorNameParts.length - 1] = 'i'
    else if (lastNamePart === 'white') colorNameParts[colorNameParts.length - 1] = 'black'
    else if (lastNamePart === 'black') colorNameParts[colorNameParts.length - 1] = 'white'
    else if (lastNamePart.match(/^i/u))
        colorNameParts[colorNameParts.length - 1] = lastNamePart.replace('i', '')
    else colorNameParts[colorNameParts.length - 1] = `i${lastNamePart}`
    return colorNameParts.join('-')
}

const createColorDefinition = (name: string, value: string) => {
    return `--c-${name}: ${value};`
}

const getDerivedLightColors = () => {
    let output = ''
    output += createColorDefinition('shadow', 'var(--c-gray-900)')
    output += createColorDefinition('background', '255, 255, 255')
    return output
}

const getDerivedDarkColors = () => {
    let output = ''
    output += createColorDefinition('shadow', '0,0,0')
    output += createColorDefinition('background', 'var(--c-white)')
    output += '--shadow-opacity: 1;'
    output += '--font-weight-multiplier: 0.93;'
    return output
}

export const createColorsCss = (): void => {
    const flattenedColors = flatten(colors, {
        delimiter: '-',
        safe: true,
    }) as FlattenedColors

    let lightColors = ':root,.light{'
    let darkColors = '.dark{'

    for (const color in flattenedColors) {
        if (Object.prototype.hasOwnProperty.call(flattenedColors, color)) {
            const colorName = color.toLowerCase()
            const values = flattenedColors[color].join(', ')
            lightColors += createColorDefinition(colorName, values)
            darkColors += createColorDefinition(getColorDarkName(colorName), values)
        }
    }

    lightColors += `${getDerivedLightColors()}}`
    darkColors += `${getDerivedDarkColors()}}`

    const colorsCss = `${lightColors}\n${darkColors}`

    fs.writeFileSync('lib/colors.css', colorsCss)
}
