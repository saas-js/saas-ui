# CLAUDE.md — Saas UI

## Project Overview

Saas UI is a React component library and design system for SaaS applications.
It's built on top of Chakra UI v3 and Ark UI, providing unstyled primitives
(`@saas-ui/core`) and styled components (`@saas-ui/react`).

**Repository**: https://github.com/saas-js/saas-ui
**Main branch**: `v3`

## Monorepo Structure

This is a pnpm workspaces monorepo orchestrated with Turborepo.

```
apps/
  website/           # Next.js documentation site
  compositions/      # Composition showcase
  palette/           # Palette documentation
packages/
  saas-ui-core/      # Unstyled primitives (GridList, Navbar, Sidebar, Steps, ErrorBoundary)
  saas-ui-react/     # Styled Chakra UI components (30+ components)
  saas-ui-forms/     # React Hook Form + Zod integration
  saas-ui-hooks/     # React hooks library
  saas-ui-modals/    # Modal manager
  saas-ui-auth-provider/ # Authentication provider primitives
  saas-ui-chakra-preset/ # Chakra UI design system preset (recipes, slot-recipes, colors)
  saas-ui-panda-preset/  # Panda CSS preset (experimental)
  saas-ui-tailwind-preset/ # Tailwind CSS preset
  saas-ui-cli/       # CLI tool for scaffolding
  saas-ui-use-hotkeys/ # Hotkeys hook
  saas-ui-assets/    # Design assets and icons
  storybook/         # Storybook documentation site
  pro/               # Pro/premium packages (private)
tooling/             # Build and utility tools
examples/            # Example apps (Next.js, Remix, Vite, React Router, etc.)
```

## Essential Commands

```bash
# Package manager: pnpm v10+ (required)
pnpm install                    # Install all dependencies

# Development
pnpm dev:web                    # Start website dev server on localhost:3020
pnpm storybook                  # Start Storybook

# Building
pnpm build:packages             # Build all packages (via Turbo)
pnpm build:tokens               # Generate Chakra UI type tokens
pnpm w <package> build          # Build a single package (pnpm --filter shorthand)

# Testing
pnpm test                       # Run unit tests (Vitest)
pnpm test:ci                    # Run tests in CI mode (no watch)
pnpm test:e2e                   # Run Playwright E2E tests

# Code quality
pnpm lint                       # Run ESLint across repo (via Turbo)

# Releasing
pnpm changeset                  # Create a changeset entry
pnpm changeset:version          # Update package versions
pnpm publish:next               # Publish pre-release to npm
```

## Code Style & Conventions

### Formatting (Prettier)

- No semicolons
- Single quotes
- Trailing commas
- 80 character line width
- Imports are auto-sorted via `@trivago/prettier-plugin-sort-imports`

### TypeScript

- Strict mode enabled
- Target: ESNext
- Module resolution: bundler
- Custom condition: `"sui"` for conditional exports (source code access)
- JSX: react-jsx

### Naming Conventions

- **Packages**: `@saas-ui/{kebab-case}` (directories: `saas-ui-{kebab-case}`)
- **Components**: PascalCase (`Sidebar`, `GridList`, `Navbar`)
- **Files**: kebab-case (`sidebar.tsx`, `grid-list.tsx`)
- **Hooks**: camelCase with `use` prefix (`useSidebar`, `useStepper`)
- **Types/Interfaces**: PascalCase with `Props` suffix (`SidebarProps`)

### Component File Structure

Each component lives in its own directory under `src/components/`:

```
src/components/sidebar/
  sidebar.tsx           # Main component implementation
  sidebar.context.ts    # Context/providers (if needed)
  sidebar.stories.tsx   # Storybook stories
  sidebar.test.tsx      # Unit tests
  index.ts              # Re-exports
```

### Commit Convention

Follow conventional commits: `category(scope): message`

Categories: `feat`, `fix`, `refactor`, `docs`, `build`, `test`, `ci`, `chore`

## Architecture

### Component Layering

1. **`@saas-ui/core`** — Unstyled, headless primitives built on Ark UI
2. **`@saas-ui/react`** — Styled components built on core + Chakra UI v3
3. **Presets** — Design tokens for Chakra (`chakra-preset`), Tailwind
   (`tailwind-preset`), or Panda CSS (`panda-preset`)

This separation allows using core primitives with different styling systems.

### Build System

- **tsup** bundles packages to ESM + CJS (target: ES2022)
- All component bundles include `'use client'` banner for React Server Component
  compatibility
- **Turbo** orchestrates builds with dependency tracking and caching
- TypeScript declarations generated via `experimentalDts` in tsup

### Key Dependencies

- **React 19** / React DOM 19
- **Chakra UI v3** (v3.28+) — styled component system
- **Ark UI v5** — headless component primitives
- **Emotion v11** — CSS-in-JS runtime
- **React Hook Form** — form state management
- **Zod** — schema validation
- **Framer Motion** — animations
- **Zustand / Jotai** — state management

### Testing

- **Vitest** with jsdom environment for unit tests
- Test files: `packages/saas-ui-*/**/*.test.{ts,tsx}`
- **Playwright** for E2E tests in `./tests/`
- Tests must pass before merging

### Changesets

Use `pnpm changeset` to document any user-facing changes. This powers automated
changelog generation and npm publishing. Empty changesets for non-user-facing
changes: `pnpm changeset add --empty`.

## CI/CD

- **test.yml**: Runs on all pushes — installs, builds, runs tests
- **release-v3.yml**: Runs on `v3` branch — uses changesets/action for automated
  npm releases

## Tips for AI Agents

- Always run `pnpm build:packages` before testing to ensure dependencies are
  built
- The `pnpm w` shorthand is equivalent to `pnpm --filter` for targeting specific
  packages
- When modifying a component, check for both `core` (unstyled) and `react`
  (styled) versions
- Storybook stories serve as both documentation and visual tests
- The `"sui"` custom condition in tsconfig allows importing package source
  directly during development
