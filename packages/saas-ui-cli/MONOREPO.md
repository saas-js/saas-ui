# Monorepo Feature

The Saas UI CLI now supports creating monorepo projects from scratch!

## Usage

When you run `sui init` in a directory **without a package.json**, the CLI will automatically detect this and ask if you want to create a new monorepo:

```bash
mkdir my-new-project
cd my-new-project
sui init
```

The CLI will detect no `package.json` exists and prompt:

- Whether to create a new monorepo
- Project name (if yes)
- TypeScript preference (if yes)

### How it works:

1. **No package.json found** → Prompts to create monorepo
2. **package.json exists** → Runs normal init flow (adds components to existing project)

This means:

- ✅ You can create a monorepo from an empty directory
- ✅ You can run init on an existing project with package.json
- ✅ No package.json is required to create a monorepo
- ✅ package.json is required for adding components to an existing project

## What Gets Created

The CLI creates a modern monorepo structure with:

### Directory Structure

```
my-app/
├── apps/
│   └── web/                  # Next.js app
│       ├── src/
│       │   ├── app/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   └── globals.css
│       │   ├── components/
│       │   └── lib/
│       ├── package.json
│       ├── next.config.ts
│       ├── tsconfig.json
│       └── .gitignore
├── packages/
│   ├── ui/                   # Shared UI components
│   │   ├── src/
│   │   └── package.json
│   └── config/              # Shared config
│       └── package.json
├── package.json             # Root package.json with workspaces
├── turbo.json              # Turborepo configuration
├── pnpm-workspace.yaml     # PNPM workspaces (if using pnpm)
├── .gitignore
└── README.md
```

### Features

- **Next.js 15** app in `apps/web`
- **Saas UI** and Chakra UI pre-configured
- **Turborepo** for fast builds
- **TypeScript** support (optional)
- **Shared packages** structure ready to use
- **Package manager detection** (npm, yarn, pnpm, bun)

### Apps and Packages

- `web`: A Next.js application with Saas UI configured
- `@repo/ui`: Shared React component library
- `@repo/config`: Shared configuration packages

## Adding Components

After creating your monorepo, navigate to the web app directory to add components:

```bash
cd my-app/apps/web
sui add <component-name>
```

Or from the root:

```bash
cd my-app
cd apps/web && sui add <component-name>
```

## Development

To start developing:

```bash
cd my-app
pnpm dev       # or npm run dev / yarn dev / bun dev
```

This will start the Next.js development server for the web app.

## Building

To build all apps and packages:

```bash
pnpm build     # or npm run build / yarn build / bun build
```

Turborepo will automatically handle the build order and caching.

## Customization

You can customize the monorepo structure by:

1. **Adding more apps**: Create new directories in `apps/`
2. **Adding more packages**: Create new directories in `packages/`
3. **Configuring Turbo**: Edit `turbo.json` to customize build pipeline
4. **Workspace configuration**: Edit `pnpm-workspace.yaml` or root `package.json`

## Why Monorepo?

Using a monorepo structure offers several advantages:

- **Code Sharing**: Share components, utilities, and configurations across multiple apps
- **Unified Tooling**: One set of tools and configs for all projects
- **Atomic Changes**: Make changes across multiple packages in a single commit
- **Better DX**: Improved developer experience with fast builds via Turborepo
- **Type Safety**: TypeScript works seamlessly across package boundaries

## Package Manager Support

The CLI supports all major package managers:

- **npm** - Uses workspaces
- **yarn** - Uses workspaces
- **pnpm** - Uses `pnpm-workspace.yaml` (recommended)
- **bun** - Uses workspaces

The CLI will automatically detect your package manager or default to pnpm for new monorepos.
