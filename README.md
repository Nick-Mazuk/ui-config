# ui-config

> **Note: this package is considered experimental and can change at any time without notice. Updates are not covered by semver until 1.0**

## Installation

This configuration relies on TailwindCSS 2.0. So to install, you'll also need to install TailwindCSS and its dependencies.

```bash
    npm install @nick-mazuk/ui-config tailwindcss postcss autoprefixer
```

Then, just add the config to your `tailwind.config.js`, `postcss.config.js`, and your global css stylesheet.

### Tailwind config

Create a `tailwind.config.js` file if you haven't already. Then add `@nick-mazuk/ui-config/tailwind` as a preset.

```js
module.exports = {
    presets: [require('@nick-mazuk/ui-config')],
}
```

### Postcss config

Create a `postcss.config.js` file if you haven't already.

```js
module.exports = {
    plugins: [
        'tailwindcss',
        'postcss-flexbugs-fixes',
        [
            'postcss-preset-env',
            {
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
                features: {
                    'custom-properties': false,
                },
            },
        ],
        '@nick-mazuk/ui-config/postcss',
        'autoprefixer',
    ],
}
```

### Global css stylesheet

Add this to your global stylesheet.

```css
@tailwind base;

/* Write your own custom base styles here */

/* Start purging... */
@tailwind components;
/* Stop purging. */

/* layout */

@responsive {
    .wrapper {
        @apply w-full max-w-screen-xl px-6 mx-auto;
    }
}

/* Start purging... */
@tailwind utilities;
/* Stop purging. */
```
