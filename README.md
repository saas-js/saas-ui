# Saas UI - The frontend stack for SaaS companies

<p>
  <a href="https://www.npmjs.com/package/@saas-ui/react">
    <img src="https://img.shields.io/npm/v/@saas-ui/react" alt="NPM">
  </a>
  <img alt="MIT License" src="https://img.shields.io/github/license/saas-js/saas-ui"/>
  <a href="https://twitter.com/intent/follow?screen_name=saas_js">
    <img src="https://img.shields.io/twitter/follow/saas_js?style=social&logo=twitter" alt="follow on Twitter">
  </a>
</p>

Saas UI is an advanced component library that helps you build essential SaaS functionality in hours instead of weeks.

It's build on top of Chakra UI and fully written in Typescript.

This repository contains all [open source components](/packages), aswell as the [documentation](apps/website/pages/docs).

## Documentation

You can find the documentation on our website:

https://www.saas-ui.dev/docs/introduction

## Roadmap

Saas UI core is currently is beta, the first release candidate as well as Saas UI Pro is expected in Q1 2022.

### Core
- [ ] Finish all v1 core components and hooks
- [ ] Full test coverage

### Pro
- [ ] Example Saas metrics dashboard app (NextJS)
- [ ] RedwoodJS app
- [ ] Electron app
- [ ] User profiles
- [ ] Example pages (Todo, inbox, etc)
- [ ] Settings pages
- [ ] Feature flags
- [ ] Onboarding flows
- [ ] Upselling flows (Trials, upgrades, etc)
- [ ] Billing/subscription management
- [ ] CRUD scaffolds
- [ ] Saas UI themes
- [ ] File uploads
 
## Features

### Core

A set of essential open source components build on top of Chakra UI.
Including fully functional auth screens, forms (with react-hook-form), modal manager, and much more.

### Pro

A premium starter pack designed for SaaS products.

- Multiple themes, page layouts, navigations, feature flags, subscription management, and much more.
- Complete source code available in a monorepo that can serve as a starting point for your project.
- Example apps with RedwoodJS, Next.js and Electron.

## Storybook

https://storybook.saas-ui.dev

Or run locally:

```bash
yarn storybook
```

## Build

```bash
yarn turbo run build
```
