<p align='center'>
<img src="./apps/website/public/saasui.svg#gh-light-mode-only" alt="Saas UI logo" height="60px" />
<img src="./apps/website/public/saasui-dark.svg#gh-dark-mode-only" alt="Saas UI logo" height="60px" />
</p>

<p align='center'>A design system and source component registry for SaaS products</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@saas-ui/cli">
    <img src="https://img.shields.io/npm/v/@saas-ui/cli/rc" alt="Saas UI CLI on npm">
  </a>
  <a href="https://www.npmjs.com/package/@saas-ui/chakra-preset">
    <img src="https://img.shields.io/npm/v/@saas-ui/chakra-preset" alt="Saas UI Chakra preset on npm">
  </a>
  <img alt="MIT License" src="https://img.shields.io/github/license/saas-js/saas-ui"/>
  <a href="https://twitter.com/intent/follow?screen_name=saas_js">
    <img src="https://img.shields.io/twitter/follow/saas_js" alt="follow on Twitter">
  </a>
</p>

<hr />

Saas UI helps teams build B2B applications and dashboards with Chakra UI. Chakra
primitives come from `@chakra-ui/react`, Saas UI tokens and recipes come from
`@saas-ui/chakra-preset`, and editable compositions such as Sidebar are
installed into applications with `@saas-ui/cli`.

This repository contains the preset, registry compiler and templates, CLI,
supporting packages, examples, and documentation website.

## Get started

Initialize an existing React project:

```sh
npx @saas-ui/cli@rc init
```

Add editable components or compositions:

```sh
npx @saas-ui/cli@rc add sidebar
```

Initialization installs compatible Chakra, Emotion, and preset dependencies,
creates `components.json`, and installs local provider setup. See the
[CLI README](packages/saas-ui-cli/README.md) for command details.

Existing `@saas-ui/react` users should follow the
[migration guide](MIGRATION.md). The package remains available during the
transition; this repository does not claim that npm deprecation or removal has
already occurred.

## Links

💡 [Documentation](https://saas-ui.dev/docs)

🧭 [Roadmap](https://roadmap.saas-ui.dev)

🖼 [Storybooks](https://storybook.saas-ui.pro)

🌟 [Saas UI Pro](https://saas-ui.dev/#pro-features)

## Sponsors ❤️

Saas UI is sponsored by these amazing companies and people.

- [LocalXPose](https://localxpose.io/)
- Frank Faubert

## Contributing & Support

Want to help? Great! Check out the [contributing guidelines](CONTRIBUTING.md)
and feel free to open a PR or
[discussion](https://github.com/saas-js/saas-ui/discussions/new) for feature
requests and feedback.

If you'd like to support the project financially, you can
[become a sponsor](https://github.com/sponsors/saas-js) of Saas UI or consider
ordering
[Saas UI Pro Beta](https://saas-ui.lemonsqueezy.com/checkout/buy/5c76854f-738a-46b8-b32d-932a97d477f5).
All funds will go toward the further development of Saas UI. This will give you
access to the private Git repository with the beta and our private Discord
server for support.

### Open source

The open-source distribution includes:

- Chakra tokens, recipes, semantic styling, and system configuration
- Editable registry components and application compositions
- CLI initialization, installation, migration, diff, and update workflows
- Supporting hooks, forms, authentication, and modal packages

### Pro

A premium catalog of editable application blocks for SaaS products. Pro blocks
are installed as source through the authenticated registry and can compose
public registry items.

![theme-tokens](https://user-images.githubusercontent.com/32583/172424112-72bacfdd-17df-4024-81db-690dc47d0c81.png)

- Example Next.js SaaS app (https://demo.saas-ui.dev)
- Authentication screens (Supabase/Magic/Clerk/Custom)
- App layout
- DataGrid and DataBoard (Kanban) with filtering/pagination
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

The docs website depends on private packages (`@saas-ui-pro/react`), and won't
build fully without access to the private Git submodule.

This repository is a pnpm workspace. Install pnpm 10 or newer, then run:

```bash
pnpm install
```

### Storybook

```bash
pnpm storybook
```

### Build

```bash
pnpm build:packages
```

### Website

Run the documentation website with:

```bash
pnpm dev:web
```

## License

All code in this repository, except for the Saas UI branding assets are licensed
under MIT.
