---
to: "<%= h.packageDir(org, name) %>/package.json"
---
{
  "name": "<%= h.packageName(org, name) %>",
  "version": "0.0.0",
  "description": "<%= h.inflection.camelize(name) %> Component",
  "source": "src/index.ts",
  "type": "module",
  "exports": {
    "require": "./dist/index.cjs",
    "import": "./dist/index.mjs"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "microbundle --tsconfig ./tsconfig.json -f cjs,modern --compress",
    "lint": "eslint src --ext .ts,.tsx,.js,.jsx --config ../../eslint.config.js",
    "lint:staged": "lint-staged --allow-empty --config ../../lint-staged.config.js",
    "typecheck": "tsc --noEmit"
  },
  "sideEffects": false,
  "publishConfig": {
    "access": "public"
  },
  "author": "<%- h.config('author') %>",
  "license": "MIT",
  "homepage": "https://saas-ui.dev/",
  "repository": {
    "type": "git",
    "url": "https://github.com/saas-js/saas-ui",
    "directory": "<%= h.packageDir(org, name) %>"
  },
  "keywords": [
    "react",
    "ui",
    "chakra-ui",
    "design-system",
    "react-components",
    "uikit",
    "accessible",
    "components",
    "emotion",
    "library",
    "design-system"
  ],
  "storybook": {
    "title": "Saas UI",
    "url": "https://storybook.saas-ui.dev"
  },
  "dependencies": {
  },
  "peerDependencies": {
    "react": ">=18.0.0"
  }
}
