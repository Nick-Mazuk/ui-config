const postcss = require('postcss')
const flatten = require('flat')
const colors = require('./colors')

const addColors = (css) => {
    const rule = postcss.rule({ selector: ':root' })
    const flattenedColors = flatten(colors, {
        delimiter: '-',
        safe: true
    })
    const decls = []
    for (const color in flattenedColors) {
        if (typeof flattenedColors[color] === 'string') continue;
        decls.push(postcss.decl({
            prop: '--c-' + color.toLocaleLowerCase(),
            value: flattenedColors[color].join(', ')
        }))
    }
    decls.push(postcss.decl({
        prop: '--c-link',
        value: 'var(--c-primary-default)'
    }))
    css.prepend(rule.append(decls))
}

const addRule = (css, selector, prop, value) => {
    const rule = postcss.rule({ selector: selector })
    css.prepend(rule.append([postcss.decl({
        prop: prop,
        value: value
    })]))
}

const addRules = (css) => {
    addRule(css, '.ql-editor', 'outline', 'none')
    addRule(css, '.ql-clipboard', 'display', 'none')
}

const fn = (vars = {}) => {
    return (css) => {
        if (!css.source.input.file.includes('module')) {
            addColors(css)
            addRules(css)
        }
    }
}

module.exports = postcss.plugin('ui-config', fn)