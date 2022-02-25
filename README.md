# Saas UI - The frontend stack for SaaS companies

<p>
  <a href="https://www.npmjs.com/package/@saas-ui/react">
    <img src="https://img.shields.io/npm/v/@saas-ui/react" alt="NPM">
  </a>
  <a href="https://www.npmjs.com/package/@saas-ui/react">
    <img src="https://img.shields.io/npm/dm/@saas-ui/react.svg" alt="npm downloads">
  </a>
  <img alt="MIT License" src="https://img.shields.io/github/license/saas-js/saas-ui"/>
  <a href="https://twitter.com/intent/follow?screen_name=saas_js">
    <img src="https://img.shields.io/twitter/follow/saas_js?style=social&logo=twitter" alt="follow on Twitter">
  </a>
</p>

Saas UI is an advanced component library that helps you build essential SaaS functionality in hours instead of weeks.

It's build on top of Chakra UI and fully written in Typescript.

This repository contains all [open source components](/packages), aswell as the [documentation website](apps/website/pages/docs).

## Documentation

You can find the documentation on our website:

https://www.saas-ui.dev/docs/introduction

## Contributing & Support

Want to help? Great! Saas UI Core is getting close to a release candidate, but we need more feedback to fine tune the final release.

If you like to support the project financially consider [Pre-ordering Saas UI Pro](https://appulse.gumroad.com/l/saas-ui-pro-pre-order), all funds will go to the further development of Saas UI. This will give you access to the development version and our private Discord server. As an early adopter you will get 50% discount on the final price, life-time access, free updates and a lot of love ❤️.

The first beta version is expected end of Q1 2022.

## Roadmap

Saas UI core is currently is beta, the first release candidate as well as Saas UI Pro is expected in Q1 2022.

### Core

A set of essential open source components build on top of Chakra UI.
Including fully functional auth screens, forms (with react-hook-form), modal manager, and much more.

- [ ] Finish all v1 core components and hooks - 90%
- [ ] Full test coverage - 20%

### Pro

A premium starter pack designed for SaaS products.
Complete source code available in a monorepo that can serve as a starting point for your project.

- [ ] Example SaaS app (NextJS)
- [ ] Electron app
- [ ] Authentication
- [ ] User profiles
- [ ] Example pages (CRM, Inbox, CRUD)
- [ ] Charts / Sparklines
- [ ] Settings pages
- [ ] Feature flags
- [ ] Onboarding flows
- [ ] Upselling flows (Trials, upgrades, etc)
- [ ] Billing/subscription management
- [ ] Saas UI themes
- [ ] Custom color schemes
- [ ] File uploads

## Storybook

https://storybook.saas-ui.dev

Or run locally:

```bash
yarn storybook
```

## Build

```bash
yarn build:packages
```
