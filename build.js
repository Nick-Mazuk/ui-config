const flatten = require('flat')
const colors = require('./colors')
const fs = require('fs')

const getColorDarkName = (colorName) => {
    const colorNameParts = colorName.split('-')
    const lastNamePart = colorNameParts[colorNameParts.length - 1]
    if (lastNamePart === 'd')
        colorNameParts[colorNameParts.length - 1] = 'default'
    else if (lastNamePart === 'default')
        colorNameParts[colorNameParts.length - 1] = 'd'
    else if (lastNamePart === 'white')
        colorNameParts[colorNameParts.length - 1] = 'black'
    else if (lastNamePart === 'black')
        colorNameParts[colorNameParts.length - 1] = 'white'
    else if (lastNamePart.match('d'))
        colorNameParts[colorNameParts.length - 1] = lastNamePart.replace('d', '')
    else
        colorNameParts[colorNameParts.length - 1] = 'd' + lastNamePart
    return colorNameParts.join('-')
}

const createColorsCss = () => {
    const flattenedColors = flatten(colors, {
        delimiter: '-',
        safe: true
    })
    
    let lightColors = ':root{'
    let darkColors = '.dark{'
    
    for (const color in flattenedColors) {
        if (typeof flattenedColors[color] === 'string') continue;
        const colorName = color.toLowerCase()
        const values = flattenedColors[color].join(', ')
        
        console.log(colorName, getColorDarkName(colorName));
    
        lightColors += '--c-' + colorName + ': ' + values + ';'
        darkColors += '--c-' + getColorDarkName(colorName) + ': ' + values + ';'
    }
    
    lightColors += '}'
    darkColors += '}'
    
    const colorsCss = lightColors + '\n' + darkColors
    
    fs.writeFileSync('./colors.css', colorsCss)
}

createColorsCss()