<p align='center'>
<img src="./apps/website/public/saasui.svg#gh-light-mode-only" alt="Saas UI logo" height="60px" />
<img src="./apps/website/public/saasui-dark.svg#gh-dark-mode-only" alt="Saas UI logo" height="60px" />
</p>

<p align='center'>The React component library for Startups</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@saas-ui/react">
    <img src="https://img.shields.io/npm/v/@saas-ui/react" alt="NPM">
  </a>
  <a href="https://www.npmjs.com/package/@saas-ui/react">
    <img src="https://img.shields.io/npm/dm/@saas-ui/react.svg" alt="npm downloads">
  </a>
  <img alt="MIT License" src="https://img.shields.io/github/license/saas-js/saas-ui"/>
  <a href="https://twitter.com/intent/follow?screen_name=saas_js">
    <img src="https://img.shields.io/twitter/follow/saas_js" alt="follow on Twitter">
  </a>
</p>

<hr />

Saas UI is an advanced component library designed to build beautiful B2B and dashboard style apps with speed.
It's built on top of Chakra UI and fully written in Typescript.

This repository contains all [open source components](/packages), as well as the [documentation website](apps/website/pages/docs).

## Links

💡 [Documentation](https://saas-ui.dev/docs/introduction)

🧭 [Roadmap](https://roadmap.saas-ui.dev)

🖼 [Storybooks](https://storybook.saas-ui.pro)

🌟 [Saas UI Pro](https://saas-ui.dev/#pro-features)

## Contributing & Support

Want to help? Great! Check out the [contributing guidelines](CONTRIBUTING.md) and feel free to open a PR or [discussion](https://github.com/saas-js/saas-ui/discussions/new) for feature requests and feedback.

If you like to support the project financially you can [become a sponsor](https://github.com/sponsors/saas-js) of Saas UI, or consider ordering [Saas UI Pro Beta](https://saas-ui.lemonsqueezy.com/checkout/buy/5c76854f-738a-46b8-b32d-932a97d477f5), all funds will go to the further development of Saas UI. This will give you access to the private Git repository with the beta and our private Discord server for support.

## Sponsors ❤️

Saas UI is sponsored by these amazing companies and people.

- [LocalXPose](https://localxpose.io/)

### Core

40+ essential open-source components built on top of Chakra UI.

- Authentication screens
- Powerful forms manager
- DatePicker / DateRangePicker
- Stepper, Timeline, DataTable and much more.

### Pro

A premium frontend starter pack designed for SaaS products.
Complete source code available in a monorepo that can serve as a starting point or as a reference for your project.

![theme-tokens](https://user-images.githubusercontent.com/32583/172424112-72bacfdd-17df-4024-81db-690dc47d0c81.png)

- Example Next.js SaaS app (https://demo.saas-ui.dev)
- Authentication screens (Supabase/Magic/Clerk/Custom)
- App layout
- DataGrid and DataBoard (Kanban) with filtering/pagination
- Charts / Sparklines
- User account pages
- Settings pages
- Feature flags
- Billing/subscription management (Lemonsqueezy)
- Mocked API with React Query
- Custom color schemes
- Glass theme
- Onboarding flows
- Example pages (CRM, Inbox)

## Using this repo

The docs website depends on private packages (`@saas-ui-pro/react`), and won't build properly without access to the private Git submodule.

### Storybook

https://storybook.saas-ui.pro

Or run locally:

```bash
yarn storybook
```

### Build

```bash
yarn build:packages
```

### Website

Before running the website you need to build the props-docs by running this.

```bash
yarn build:props-docs
```

After that run the website with this command.

```bash
yarn w website dev
```

or

```bash
cd apps/website && yarn dev
```

## License

All code in this repository, except for the Saas UI branding assets are licensed under MIT.
