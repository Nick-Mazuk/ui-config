import { createTailwindColors } from './create-tailwind-colors'
import fs from 'fs-extra'

import { createColorTypes } from './create-color-types'
import { createColorsCss } from './create-colors-css'
import { createCss } from './create-css'

fs.ensureDirSync('lib')

createColorsCss()
createColorTypes()
createCss()

console.log(createTailwindColors().gray?.[700].toString());