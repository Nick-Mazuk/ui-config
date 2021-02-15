const flatten = require('flat')
const colors = require('./colors')

const addRule = (root, Rule, selector, prop, value) => {
    let rule = new Rule({ selector })
    rule.append({ prop, value })

    root.append(rule)
}

const addColors = (root, Rule) => {
    let rule = new Rule({ selector: ':root' })
    const flattenedColors = flatten(colors, {
        delimiter: '-',
        safe: true
    })
    for (const color in flattenedColors) {
        if (typeof flattenedColors[color] === 'string') continue;
        rule.append( {prop: '--c-' + color.toLowerCase(), value: flattenedColors[color].join(', ') })
    }
    rule.append( {prop: '--c-link', value: 'var(--c-primary-default)' })
    root.append(rule)
}

const addRules = (root, Rule) => {
    addRule(root, Rule, '.ql-editor', 'outline', 'none')
    addRule(root, Rule, '.ql-clipboard', 'display', 'none')
}

module.exports = () => {
    return {
        postcssPlugin: '@nick-mazuk/ui-config',
        Rule(root, { Rule }) {
            if (root.source && root.source.input && root.source.input.file && !root.source.input.file.includes('module')) {
                addColors(root, Rule)
                addRules(root, Rule)
            }
        }
    }
}
module.exports.postcss = true