import { buildSync } from 'esbuild'

export const createTailwindConfig = (): void => {
    try {
        buildSync({
            entryPoints: ['src/tailwind.ts'],
            bundle: true,
            outfile: 'lib/tailwind.js',
        })
    } catch (error: unknown) {
        console.log(error)
    }
}
