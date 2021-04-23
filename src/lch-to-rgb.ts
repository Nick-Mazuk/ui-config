type ColorTuple = [number, number, number]

// from https://drafts.csswg.org/css-color-4/multiply-matrices.js
const multiplyMatrices = (
    a: number[] | number[][],
    b: number[] | number[][]
): number[][] => {
    const m = a.length
    const A = (Array.isArray(a[0]) ? a : [a] ) as number[][]
    const B = (Array.isArray(b[0]) ? b : b.map((x:any) => [x])) as number[][]

    const p = B[0].length
    const B_cols = B[0].map((_, index) => B.map((x) => x[index])) // transpose B
    let product = A.map((row) =>
        B_cols.map((col) => {
            if (!Array.isArray(row)) return col.reduce((a, c) => a + c * row, 0)

            return row.reduce((a, c, index) => a + c * (col[index] || 0), 0)
        })
    )

    if (m === 1) product = product[0] as unknown as number[][] // avoid [[a, b, c, ...]]

    if (p === 1) return product.map((x) => x[0]) as unknown as number[][] // avoid [[a], [b], [c], ...]]

    return product
}

// from https://drafts.csswg.org/css-color-4/conversions.js
const gam_sRGB = (RGB: any): ColorTuple => {
    return RGB.map( (value:any) => {
        const sign = value < 0 ? -1 : 1
        const abs = Math.abs(value)

        if (abs > 0.0031308) return sign * (1.055 * abs ** (1 / 2.4) - 0.055)

        return 12.92 * value
    })
}

// from https://drafts.csswg.org/css-color-4/conversions.js
function XYZ_to_lin_sRGB(XYZ: number[][]): number[][] {
    // convert XYZ to linear-light sRGB

    const M = [
        [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
        [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
        [0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
    ]

    return multiplyMatrices(M, XYZ)
}

// from https://drafts.csswg.org/css-color-4/conversions.js
const D50_to_D65 = (XYZ: ColorTuple): number[][] => {
    // bradford chromatic adaptation from D50 to D65
    const M = [
        [0.9555766, -0.0230393, 0.0631636],
        [-0.0282895, 1.0099416, 0.0210077],
        [0.0122982, -0.020483, 1.3299098],
    ]

    return multiplyMatrices(M, XYZ)
}

// from https://drafts.csswg.org/css-color-4/conversions.js
const Lab_to_XYZ = (Lab: ColorTuple): ColorTuple => {
    /* convert Lab to D50-adapted XYZ
	   http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html */
    const Îº = 24389 / 27 // 29^3/3^3
    const Îµ = 216 / 24389 // 6^3/29^3
    const white = [0.96422, 1, 0.82521] // d50 reference white
    const f = []

    // compute f, starting with the luminance-related term
    f[1] = (Lab[0] + 16) / 116
    f[0] = Lab[1] / 500 + f[1]
    f[2] = f[1] - Lab[2] / 200

    // compute xyz
    const xyz = [
        f[0] ** 3 > Îµ ? f[0] ** 3 : (116 * f[0] - 16) / Îº,
        Lab[0] > Îº * Îµ ? ((Lab[0] + 16) / 116) ** 3 : Lab[0] / Îº,
        f[2] ** 3 > Îµ ? f[2] ** 3 : (116 * f[2] - 16) / Îº,
    ]

    // compute XYZ by scaling xyz by reference white
    return xyz.map((value, index) => value * white[index]) as ColorTuple
}

// from https://drafts.csswg.org/css-color-4/conversions.js
const LCH_to_Lab = (LCH: ColorTuple): ColorTuple => {
    // convert from polar form
    return [
        LCH[0], // l is still L
        LCH[1] * Math.cos((LCH[2] * Math.PI) / 180), // a
        LCH[1] * Math.sin((LCH[2] * Math.PI) / 180), // b
    ]
}

// from https://drafts.csswg.org/css-color-4/utilities.js
const LCH_to_sRGB = (LCH: ColorTuple): ColorTuple => {
    return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))))
}

// from https://github.com/LeaVerou/css.land/blob/master/lch/lch.js
const isLCH_within_sRGB = (l: number, c: number, h: number) => {
    const rgb = LCH_to_sRGB([Number(l), Number(c), Number(h)])
    const ε = 0.000005
    return rgb.reduce((a, b) => a && b >= 0 - ε && b <= 1 + ε, true)
}

// from https://github.com/LeaVerou/css.land/blob/master/lch/lch.js
const force_into_gamut = (l: number, c: number, h: number): ColorTuple => {
    if (isLCH_within_sRGB(l, c, h)) return [l, c, h]

    let hiC = c
    let loC = 0
    const ε = 0.0001
    c /= 2

    while (hiC - loC > ε) {
        if (isLCH_within_sRGB(l, c, h)) loC = c
        else hiC = c

        c = (hiC + loC) / 2
    }

    return [l, c, h]
}

export const lchToRgb = (lightness: number, chroma: number, hue: number): ColorTuple => {
    const [l, c, h] = force_into_gamut(lightness, chroma, hue)
    const rgb = LCH_to_sRGB([+l, +c, +h]).map((i) => Math.abs(Math.round(i * 255)))
    return rgb as ColorTuple
}
