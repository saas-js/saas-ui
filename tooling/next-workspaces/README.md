# Next.js Workspaces Plugin

This plugin makes using Yarn workspaces with Next.js dead simple.

The new `externalDir` and other solutions never seem to give the
desired results when using a monorepo with Yarn workspaces.

## Install

```sh
yarn add @saas-ui/next-workspaces
```

## Usage

Edit your `next.config.js` file

```js next.config.js
const withWorkspaces = require('@saas-ui/next-workspaces')

module.exports = withWorkspaces({
  workspaces: ['packages'],
  basePath: '../', // The root folder of your monorepo relative to your Next.js app.
})({
  // your next config
})
```

## Q&A

If your workspace contains public packages, you may need to make some changes to the package.json of the local package(s).
Webpack needs to know where your source files are located, otherwise it'll fail to find your package if they aren't build yet.

Assuming you are using Typescript, it will look something like this:

```
{
  "name": "@org/package",
  "source": "src/index.ts",
  "exports": {
    "require": "./dist/index.cjs",
    "development": "./src/index.ts", // This tells webpack to import the source files
    "default": "./dist/index.esm.js"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  // ...
}
```

## License

MIT
