type ColorTuple = [number, number, number]

// from https://drafts.csswg.org/css-color-4/multiply-matrices.js
const multiplyMatrices = (
    inputA: number[] | number[][],
    inputB: number[] | number[][]
): number[][] => {
    const m = inputA.length
    const A = (Array.isArray(inputA[0]) ? inputA : [inputA]) as number[][]
    const B = (Array.isArray(inputB[0]) ? inputB : inputB.map((x: any) => [x])) as number[][]

    const p = B[0].length
    const bColumns = B[0].map((_, index) => B.map((x) => x[index]))
    let product = A.map((row) =>
        bColumns.map((col) => {
            if (!Array.isArray(row)) return col.reduce((a, c) => a + c * row, 0)

            return row.reduce((a, c, index) => a + c * (col[index] || 0), 0)
        })
    )

    if (m === 1) product = product[0] as unknown as number[][]

    if (p === 1) return product.map((x) => x[0]) as unknown as number[][]

    return product
}

// from https://drafts.csswg.org/css-color-4/conversions.js
const gamToRgb = (RGB: any): ColorTuple => {
    return RGB.map((value: any) => {
        const sign = value < 0 ? -1 : 1
        const abs = Math.abs(value)

        if (abs > 0.0031308) return sign * (1.055 * abs ** (1 / 2.4) - 0.055)

        return 12.92 * value
    })
}

// from https://drafts.csswg.org/css-color-4/conversions.js
const xyzToRgb = (XYZ: number[][]): number[][] => {
    const M = [
        [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
        [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
        [0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
    ]

    return multiplyMatrices(M, XYZ)
}

// from https://drafts.csswg.org/css-color-4/conversions.js
const d50ToD65 = (XYZ: ColorTuple): number[][] => {
    const M = [
        [0.9555766, -0.0230393, 0.0631636],
        [-0.0282895, 1.0099416, 0.0210077],
        [0.0122982, -0.020483, 1.3299098],
    ]

    return multiplyMatrices(M, XYZ)
}

// from https://drafts.csswg.org/css-color-4/conversions.js
const labToXyz = (Lab: ColorTuple): ColorTuple => {
    const Îº = 24389 / 27
    const Îµ = 216 / 24389
    const white = [0.96422, 1, 0.82521]
    const f = []

    f[1] = (Lab[0] + 16) / 116
    f[0] = Lab[1] / 500 + f[1]
    f[2] = f[1] - Lab[2] / 200

    const xyz = [
        f[0] ** 3 > Îµ ? f[0] ** 3 : (116 * f[0] - 16) / Îº,
        Lab[0] > Îº * Îµ ? ((Lab[0] + 16) / 116) ** 3 : Lab[0] / Îº,
        f[2] ** 3 > Îµ ? f[2] ** 3 : (116 * f[2] - 16) / Îº,
    ]

    return xyz.map((value, index) => value * white[index]) as ColorTuple
}

// from https://drafts.csswg.org/css-color-4/conversions.js
const lchToLab = (LCH: ColorTuple): ColorTuple => {
    return [
        LCH[0],
        LCH[1] * Math.cos((LCH[2] * Math.PI) / 180),
        LCH[1] * Math.sin((LCH[2] * Math.PI) / 180),
    ]
}

// from https://drafts.csswg.org/css-color-4/utilities.js
const lchToRgbConversion = (LCH: ColorTuple): ColorTuple => {
    return gamToRgb(xyzToRgb(d50ToD65(labToXyz(lchToLab(LCH)))))
}

// from https://github.com/LeaVerou/css.land/blob/master/lch/lch.js
const isLchWithinRgb = (l: number, c: number, h: number) => {
    const rgb = lchToRgbConversion([Number(l), Number(c), Number(h)])
    const ε = 0.000005
    return rgb.reduce((a, b) => a && b >= 0 - ε && b <= 1 + ε, true)
}

// from https://github.com/LeaVerou/css.land/blob/master/lch/lch.js
const forceIntoGamut = (l: number, c: number, h: number): ColorTuple => {
    if (isLchWithinRgb(l, c, h)) return [l, c, h]

    let hiC = c
    let loC = 0
    const ε = 0.0001

    // eslint-disable-next-line no-param-reassign -- not my function
    c /= 2

    while (hiC - loC > ε) {
        if (isLchWithinRgb(l, c, h)) loC = c
        else hiC = c

        // eslint-disable-next-line no-param-reassign -- not my function
        c = (hiC + loC) / 2
    }

    return [l, c, h]
}

export const lchToRgb = (lightness: number, chroma: number, hue: number): ColorTuple => {
    const [l, c, h] = forceIntoGamut(lightness, chroma, hue)
    const rgb = lchToRgbConversion([Number(l), Number(c), Number(h)]).map((index) =>
        Math.abs(Math.round(index * 255))
    )
    return rgb as ColorTuple
}
