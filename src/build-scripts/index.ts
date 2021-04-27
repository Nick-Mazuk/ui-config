import fs from 'fs-extra'

import { createColorTypes } from './create-color-types'
import { createColorsCss } from './create-colors-css'
import { createCss } from './create-css'

fs.ensureDirSync('lib')
console.time('colors')
createColorsCss()
createColorTypes()
createCss()
console.timeEnd('colors')
