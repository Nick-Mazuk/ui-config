const flatten = require('flat')
const colors = require('./colors')

const addRule = (root, Rule, selector, prop, value) => {
    let rule = new Rule({ selector })
    rule.append({ prop, value })

    root.append(rule)
}

const addColors = (root, Rule) => {
    const flattenedColors = flatten(colors, {
        delimiter: '-',
        safe: true
    })
    for (const color in flattenedColors) {
        if (typeof flattenedColors[color] === 'string') continue;
        addRule(root, Rule, ':root', '--c-' + color.toLowerCase(), flattenedColors[color].join(', '))
    }
    addRule(root, Rule, ':root', '--c-link', 'var(--c-primary-default)')
    css.prepend(rule.append(decls))
}

const addRules = (root, Rule) => {
    addRule(root, Rule, '.ql-editor', 'outline', 'none')
    addRule(root, Rule, '.ql-clipboard', 'display', 'none')
}

module.exports = () => {
    return {
        postcssPlugin: '@nick-mazuk/ui-config',
        Rule (root, { Rule }) {
            if (!root.source.input.file.includes('module')) {
                addColors(root, Rule)
                addRules(root, Rule)
            }
        }
    }
}
module.exports.postcss = true