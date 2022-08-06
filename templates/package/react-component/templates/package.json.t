---
to: "<%= h.packageDir(org, name) %>/package.json"
---
{
  "name": "<%= h.packageName(org, name) %>",
  "version": "0.0.0",
  "description": "<%= h.inflection.camelize(name) %> Component",
  "source": "src/index.ts",
  "exports": {
    "require": "./dist/index.js",
    "import": "./dist/index.modern.js"
  },
  "main": "./dist/index.js",
  "module": "./dist/index.modern.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "clean": "rimraf --no-glob ./dist",
    "build": "yarn clean && cross-env NODE_ENV=production microbundle --tsconfig ./tsconfig.json --jsx React.createElement --jsxFragment React.Fragment -f cjs,modern --compress",
    "lint": "eslint src --ext .ts,.tsx,.js,.jsx --config ../../.eslintrc.js",
    "lint:staged": "lint-staged --allow-empty --config ../../lint-staged.config.js",
    "typecheck": "tsc --noEmit"
  },
  "files": [
    "dist",
    "src"
  ],
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
    "library"
  ],
  "storybook": {
    "title": "Saas UI",
    "url": "https://storybook.saas-ui.dev"
  },
  "dependencies": {
  },
  "peerDependencies": {
    "@chakra-ui/system": ">=2.0.0",
    "react": ">=18.0.0"
  }
}
