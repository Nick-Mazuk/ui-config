import fs from 'fs-extra'

export const createCss = (): void => {
    fs.copyFileSync('src/styles.css', 'lib/styles.css')
}
