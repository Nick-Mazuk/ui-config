# UI Config

## Installation

This configuration relies on TailwindCSS 2.1. So to install, you'll also need to install TailwindCSS and its dependencies.

```bash
npm install @nick-mazuk/ui-config tailwindcss postcss autoprefixer
```

Then, just add the config to your `tailwind.config.js`, `postcss.config.js`, and your global css stylesheet.

### Tailwind config

Create a `tailwind.config.js` file if you haven't already. Then add `@nick-mazuk/ui-config` as a preset.

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
        'autoprefixer',
    ],
}
```

### Add stylesheet

Just import the CSS stylesheets.

```ts
import '@nick-mazuk/ui-config/lib/colors.css'
import '@nick-mazuk/ui-config/lib/styles.css'
```
