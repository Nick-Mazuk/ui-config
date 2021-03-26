const flatten = require('flat')
const colors = require('./colors')

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
    else if (lastNamePart.match(/d\d/u))
        colorNameParts[colorNameParts.length - 1].replace('d', '')
    else
        colorNameParts[colorNameParts.length - 1] = 'd' + colorNameParts[colorNameParts.length - 1]
    return colorNameParts.join('-')
}

const addRule = (root, Rule, selector, prop, value) => {
    let rule = new Rule({ selector })
    rule.append({ prop, value })
    root.append(rule)
}

const addColors = (root, Rule) => {
    let rule = new Rule({ selector: ':root' })
    let darkRule = new Rule({ selector: '.dark' })
    const flattenedColors = flatten(colors, {
        delimiter: '-',
        safe: true
    })
    for (const color in flattenedColors) {
        if (typeof flattenedColors[color] === 'string') continue;
        const colorName = color.toLowerCase()
        rule.append({ prop: '--c-' + colorName, value: flattenedColors[color].join(', ') })
        darkRule.append({ prop: '--c-' + getColorDarkName(colorName), value: flattenedColors[color].join(', ') })
    }
    rule.append( {prop: '--c-link', value: 'var(--c-primary-default)' })
    root.append(rule)
    root.append(darkRule)
}

const addRules = (root, Rule) => {
    addRule(root, Rule, '.ql-editor', 'outline', 'none')
    addRule(root, Rule, '.ql-clipboard', 'display', 'none')
}

module.exports = () => {
    return {
        postcssPlugin: '@nick-mazuk/ui-config',
        Rule(root, { Rule }) {
            if (root.source && root.source.input && root.source.input.file && root.source.input.file.includes('colors.css')) {
                console.log(root.source.input.file);
                addColors(root, Rule)
                addRules(root, Rule)
            }
        }
    }
}
module.exports.postcss = true