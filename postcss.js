const postcss = require('postcss')
const flatten = require('flat')
const colors = require('./colors')

const fn = (vars = {}) => {
    return (css) => {
        if (!css.source.input.file.includes('module')) {
            const rule = postcss.rule({ selector: ':root' })
            const flattenedColors = flatten(colors, {
                delimiter: '-',
                safe: true
            })
            const decls = []
            for (const color in flattenedColors) {
                if (typeof flattenedColors[color] === 'string') continue;
                decls.push(postcss.decl({
                    prop: '--c-' + color,
                    value: flattenedColors[color].join(', ')
                }))
            }
            css.prepend(rule.append(decls))
        }
    }
}

module.exports = postcss.plugin('ui-config', fn)