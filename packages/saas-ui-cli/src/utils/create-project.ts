import { execa } from 'execa'
import { promises as fs } from 'node:fs'
import path from 'node:path'

import { highlighter } from '#utils/highlighter'
import { logger } from '#utils/logger'
import { spinner } from '#utils/spinner'

export interface CreateProjectOptions {
  cwd: string
  name: string
  packageManager?: 'npm' | 'yarn' | 'pnpm' | 'bun'
  packageManagerVersion?: string
  typescript?: boolean
  skipInstall?: boolean
}

export async function createMonorepoProject(
  options: CreateProjectOptions,
): Promise<void> {
  const {
    cwd,
    name,
    packageManager = 'pnpm',
    packageManagerVersion = '0.0.0',
    typescript = true,
    skipInstall = false,
  } = options

  const projectPath = path.join(cwd, name)

  const createSpinner = spinner('Creating monorepo structure...').start()

  try {
    // root dir
    await fs.mkdir(projectPath, { recursive: true })

    await createMonorepoStructure(projectPath, {
      packageManager,
      packageManagerVersion,
      typescript,
    })

    createSpinner.succeed('Monorepo structure created')

    if (!skipInstall) {
      const installSpinner = spinner('Installing dependencies...').start()
      try {
        await execa(packageManager, ['install'], { cwd: projectPath })
        installSpinner.succeed('Dependencies installed')
      } catch (error) {
        installSpinner.fail('Failed to install dependencies')
        logger.warn(
          `You can manually install dependencies by running ${highlighter.info(
            `cd ${name} && ${packageManager} install`,
          )}`,
        )
      }
    }

    logger.break()
    logger.success('Monorepo created successfully!')
    logger.break()
    logger.info(`Next steps:`)
    logger.info(`  1. ${highlighter.info(`cd ${name}`)}`)
    logger.info(
      `  2. ${highlighter.info(
        `${packageManager} ${packageManager === 'npm' ? 'run' : ''} dev`,
      )}`,
    )
    logger.break()
  } catch (error) {
    createSpinner.fail('Failed to create monorepo')
    throw error
  }
}

async function createMonorepoStructure(
  projectPath: string,
  options: {
    packageManager: string
    packageManagerVersion: string
    typescript: boolean
  },
): Promise<void> {
  const { packageManager, packageManagerVersion, typescript } = options

  await Promise.all([
    fs.mkdir(path.join(projectPath, 'apps', 'web'), { recursive: true }),
    fs.mkdir(path.join(projectPath, 'packages', 'ui'), { recursive: true }),
    fs.mkdir(path.join(projectPath, 'packages', 'config'), {
      recursive: true,
    }),
  ])

  await fs.writeFile(
    path.join(projectPath, 'package.json'),
    JSON.stringify(
      {
        name: path.basename(projectPath),
        private: true,
        packageManager: `${packageManager}@${packageManagerVersion}`,
        workspaces:
          packageManager === 'pnpm' ? undefined : ['apps/*', 'packages/*'],
        scripts: {
          dev: 'turbo dev',
          build: 'turbo build',
          lint: 'turbo lint',
          clean: 'turbo clean',
        },
        devDependencies: {
          turbo: '^2.5.8',
          typescript: typescript ? '^5.9.3' : undefined,
        },
      },
      null,
      2,
    ),
  )

  if (packageManager === 'pnpm') {
    await fs.writeFile(
      path.join(projectPath, 'pnpm-workspace.yaml'),
      `packages:
  - 'apps/*'
  - 'packages/*'
`,
    )
  }

  await fs.writeFile(
    path.join(projectPath, 'turbo.json'),
    JSON.stringify(
      {
        $schema: 'https://turbo.build/schema.json',
        tasks: {
          build: {
            dependsOn: ['^build'],
            inputs: ['$TURBO_DEFAULT$', '.env*'],
            outputs: ['.next/**', '!.next/cache/**'],
          },
          lint: {
            dependsOn: ['^lint'],
          },
          checkTypes: {
            dependsOn: ['^check-types'],
          },
          dev: {
            cache: false,
            persistent: true,
          },
        },
      },
      null,
      2,
    ),
  )

  await fs.writeFile(
    path.join(projectPath, 'apps', 'web', 'package.json'),
    JSON.stringify(
      {
        name: 'web',
        version: '0.1.0',
        private: true,
        scripts: {
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
        },
        dependencies: {
          react: '^19.2.0',
          'react-dom': '^19.2.0',
          next: '^15.5.4',
          '@saas-ui/react': '^2.11.4',
          '@chakra-ui/react': '^2.10.9',
          '@emotion/react': '^11.14.0',
          '@emotion/styled': '^11.14.1',
          'framer-motion': '^10.18.0',
        },
        devDependencies: {
          '@types/node': typescript ? '^24.7.0' : undefined,
          '@types/react': typescript ? '^19.2.2' : undefined,
          '@types/react-dom': typescript ? '^19.2.0' : undefined,
          typescript: typescript ? '^5.9.3' : undefined,
          eslint: '^9.37.0',
          'eslint-config-next': '^15.5.4',
        },
      },
      null,
      2,
    ),
  )

  const nextConfigExt = typescript ? 'ts' : 'js'
  const nextConfigContent = typescript
    ? `import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
}

export default config
`
    : `/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
}

module.exports = config
`

  await fs.writeFile(
    path.join(projectPath, 'apps', 'web', `next.config.${nextConfigExt}`),
    nextConfigContent,
  )

  const configFileName = typescript ? 'tsconfig.json' : 'jsconfig.json'
  await fs.writeFile(
    path.join(projectPath, 'apps', 'web', configFileName),
    JSON.stringify(
      {
        // extends: typescript ? 'next/core-web-vitals' : undefined,
        compilerOptions: {
          target: 'es5',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          strict: typescript ? true : undefined,
          forceConsistentCasingInFileNames: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          incremental: true,
          plugins: [
            {
              name: 'next',
            },
          ],
          paths: {
            '@/*': ['./src/*'],
            '@/components': ['./src/components'],
            '@/lib': ['./src/lib'],
            '@/lib/utils': ['./src/lib/utils'],
            '@/hooks': ['./src/hooks'],
            '@repo/ui': ['../../packages/ui/src'],
            '@repo/ui/*': ['../../packages/ui/src/*'],
            '@repo/ui/components': ['../../packages/ui/src/components/'],
            '@repo/ui/components/*': ['../../packages/ui/src/components/*'],
          },
        },
        include: [
          'next-env.d.ts',
          '**/*.ts',
          '**/*.tsx',
          '.next/types/**/*.ts',
        ],
        exclude: ['node_modules'],
      },
      null,
      2,
    ),
  )

  await Promise.all([
    fs.mkdir(path.join(projectPath, 'apps', 'web', 'src', 'app'), {
      recursive: true,
    }),
    fs.mkdir(path.join(projectPath, 'apps', 'web', 'src', 'components'), {
      recursive: true,
    }),
    fs.mkdir(path.join(projectPath, 'apps', 'web', 'src', 'lib'), {
      recursive: true,
    }),
    fs.mkdir(path.join(projectPath, 'apps', 'web', 'src', 'hooks'), {
      recursive: true,
    }),
  ])

  const layoutExt = typescript ? 'tsx' : 'jsx'
  const layoutContent = typescript
    ? `import type { Metadata } from 'next'
import { SaasProvider } from '@saas-ui/react'

export const metadata: Metadata = {
  title: 'My App',
  description: 'Generated with Saas UI CLI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SaasProvider>{children}</SaasProvider>
      </body>
    </html>
  )
}
`
    : `import { SaasProvider } from '@saas-ui/react'

export const metadata = {
  title: 'My App',
  description: 'Generated with Saas UI CLI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SaasProvider>{children}</SaasProvider>
      </body>
    </html>
  )
}
`

  await fs.writeFile(
    path.join(projectPath, 'apps', 'web', 'src', 'app', `layout.${layoutExt}`),
    layoutContent,
  )

  const pageContent = `import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";

export default function Page() {
  return (
    <Box
      textAlign="center"
      fontSize="xl"
      h={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <VStack gap="8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 550 172"
          style={{ height: "60px", width: "180px" }}
        >
          <path
            fill="#8952e0"
            d="M117.67 16.59h-54c-1.86 0-3.36 1.5-3.36 3.36V46.2c0 2.11-.89 4.11-2.46 5.52l-.1.09a7.438 7.438 0 0 1-4.96 1.9H20.24c-1.86 0-3.36 1.5-3.36 3.36v38.44c0 1.86 1.5 3.36 3.36 3.36h34.51c1.86 0 3.36-1.5 3.36-3.36V59.25c0-2.11.89-4.11 2.46-5.52a7.438 7.438 0 0 1 4.96-1.9h52.15c1.86 0 3.36-1.5 3.36-3.36V19.95a3.37 3.37 0 0 0-3.37-3.36z"
          ></path>
          <path
            fill="#8952e0"
            d="M117.67 72.78h-34.5c-1.86 0-3.36 1.5-3.36 3.36v36.27c0 2.11-.89 4.11-2.46 5.52a7.438 7.438 0 0 1-4.96 1.9H20.24c-1.86 0-3.36 1.5-3.36 3.36v28.56c0 1.86 1.5 3.36 3.36 3.36h54c1.86 0 3.36-1.5 3.36-3.36v-26.3c0-2.11.89-4.11 2.46-5.52l.1-.09a7.438 7.438 0 0 1 4.96-1.9h32.54c1.86 0 3.36-1.5 3.36-3.36V76.13a3.337 3.337 0 0 0-3.35-3.35z"
          ></path>
          <path
            fill="currentColor"
            d="m221.7 58.08-5.35 10.82c-5.99-3.69-13.5-5.99-19.48-5.99-5.73 0-9.93 1.91-9.93 6.75 0 12.48 36.04 5.73 35.91 30.31 0 13.88-12.35 20.12-25.98 20.12-9.93 0-20.5-3.31-27.25-9.42l5.22-10.44c5.86 5.22 15.28 8.4 22.67 8.4 6.24 0 11.08-2.17 11.08-7.26 0-13.88-35.66-6.11-35.53-30.56 0-13.75 11.97-19.61 24.96-19.61 8.53 0 17.57 2.55 23.68 6.88zM277.38 111.31c-4.84 5.99-12.61 8.91-22.41 8.91-14.64 0-23.81-9.04-23.81-21.01 0-12.35 9.3-20.25 25.6-20.37h20.5V76.8c0-8.53-5.48-13.63-16.17-13.63-6.49 0-13.24 2.29-19.99 6.88l-5.98-10.19c9.42-5.6 16.3-8.53 29.16-8.53 17.45 0 27.25 8.91 27.38 23.81l.13 44.44H277.4v-8.27zm-.13-15.54v-6.24h-18.34c-9.55 0-14.01 2.55-14.01 9.04 0 6.11 4.97 10.06 13.12 10.06 10.45 0 18.47-5.47 19.23-12.86zM349.38 111.31c-4.84 5.99-12.61 8.91-22.41 8.91-14.64 0-23.81-9.04-23.81-21.01 0-12.35 9.3-20.25 25.6-20.37h20.5V76.8c0-8.53-5.48-13.63-16.17-13.63-6.49 0-13.24 2.29-19.99 6.88l-5.98-10.19c9.42-5.6 16.3-8.53 29.16-8.53 17.45 0 27.25 8.91 27.38 23.81l.13 44.44H349.4v-8.27zm-.12-15.54v-6.24h-18.34c-9.55 0-14.01 2.55-14.01 9.04 0 6.11 4.97 10.06 13.12 10.06 10.44 0 18.46-5.47 19.23-12.86zM425.59 58.08l-5.35 10.82c-5.99-3.69-13.5-5.99-19.48-5.99-5.73 0-9.93 1.91-9.93 6.75 0 12.48 36.04 5.73 35.91 30.31 0 13.88-12.35 20.12-25.98 20.12-9.93 0-20.5-3.31-27.25-9.42l5.22-10.44c5.86 5.22 15.28 8.4 22.67 8.4 6.24 0 11.08-2.17 11.08-7.26 0-13.88-35.66-6.11-35.53-30.56 0-13.75 11.97-19.61 24.96-19.61 8.53 0 17.57 2.55 23.68 6.88zM472.9 120.02c-8.55 0-15.12-2.22-19.51-6.6-4.39-4.37-6.62-10.91-6.62-19.43V51.87h8.8V88.6c0 8.73 1.31 14.71 4 18.28 2.71 3.59 7.28 5.41 13.59 5.41 6.3 0 10.85-1.8 13.52-5.35 2.65-3.52 3.93-9.52 3.93-18.34V51.87h8.54V94c0 8.56-2.22 15.1-6.61 19.46-4.39 4.35-11 6.56-19.64 6.56zM514.66 51.87h8.54v67.66h-8.54z"
          ></path>
        </svg>

        <Heading size="2xl" letterSpacing="tight">
          Welcome to SaaS UI + Next.js (Monorepo)
        </Heading>

        <HStack>
          <Button colorScheme="purple">Let's go!</Button>
          <Button variant="outline">bun install @saas-ui/react</Button>
        </HStack>
      </VStack>
    </Box>
  );
}
`

  await fs.writeFile(
    path.join(projectPath, 'apps', 'web', 'src', 'app', `page.${layoutExt}`),
    pageContent,
  )

  // Create apps/web/components.json
  await fs.writeFile(
    path.join(projectPath, 'apps', 'web', 'components.json'),
    JSON.stringify(
      {
        $schema: 'https://saas-ui.dev/r/schema.json',
        system: 'chakra',
        style: 'default',
        rsc: true,
        tsx: typescript,
        registries: {
          '@saas-ui': {
            url: 'https://saas-ui.dev/r/styles/{style}/{name}.json',
          },
        },
        aliases: {
          components: '@/components',
          ui: '@repo/ui/components',
          lib: '@/lib',
          utils: '@/lib/utils',
          hooks: '@/hooks',
        },
      },
      null,
      2,
    ),
  )

  await fs.writeFile(
    path.join(projectPath, 'apps', 'web', '.gitignore'),
    `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`,
  )

  await fs.writeFile(
    path.join(projectPath, 'packages', 'ui', 'package.json'),
    JSON.stringify(
      {
        name: '@repo/ui',
        version: '0.1.0',
        private: true,
        main: './src/index.ts',
        types: './src/index.ts',
        exports: {
          './components/*': './src/components/*.tsx',
          './lib/*': './src/lib/*.ts',
          './hooks/*': './src/hooks/*.ts',
        },
        scripts: {
          lint: 'eslint .',
        },
        dependencies: {
          '@saas-ui/react': '^2.11.4',
          '@chakra-ui/react': '^2.10.9',
          '@emotion/react': '^11.14.0',
          '@emotion/styled': '^11.14.1',
          'framer-motion': '^10.18.0',
        },
        devDependencies: {
          '@types/react': typescript ? '^19.2.2' : undefined,
          '@types/react-dom': typescript ? '^19.2.0' : undefined,
          typescript: typescript ? '^5.9.3' : undefined,
          eslint: '^9.37.0',
        },
        peerDependencies: {
          react: '^19.2.0',
          'react-dom': '^19.2.0',
        },
      },
      null,
      2,
    ),
  )

  await fs.mkdir(path.join(projectPath, 'packages', 'ui', 'src'), {
    recursive: true,
  })

  // Create packages/ui directory structure
  await Promise.all([
    fs.mkdir(path.join(projectPath, 'packages', 'ui', 'src', 'components'), {
      recursive: true,
    }),
    // fs.mkdir(
    //   path.join(projectPath, 'packages', 'ui', 'src', 'components', 'ui'),
    //   {
    //     recursive: true,
    //   },
    // ),
    fs.mkdir(path.join(projectPath, 'packages', 'ui', 'src', 'lib'), {
      recursive: true,
    }),
    fs.mkdir(path.join(projectPath, 'packages', 'ui', 'src', 'hooks'), {
      recursive: true,
    }),
  ])

  // Create packages/ui/components.json
  await fs.writeFile(
    path.join(projectPath, 'packages', 'ui', 'components.json'),
    JSON.stringify(
      {
        $schema: 'https://saas-ui.dev/r/schema.json',
        system: 'chakra',
        style: 'default',
        rsc: true,
        tsx: typescript,
        registries: {
          '@saas-ui': {
            url: 'https://saas-ui.dev/r/styles/{style}/{name}.json',
          },
        },
        aliases: {
          components: '@repo/ui/components',
          ui: '@repo/ui/components/ui',
          lib: '@repo/ui/lib',
          utils: '@repo/ui/lib/utils',
          hooks: '@repo/ui/hooks',
        },
      },
      null,
      2,
    ),
  )

  // Create packages/ui/tsconfig.json if TypeScript
  if (typescript) {
    await fs.writeFile(
      path.join(projectPath, 'packages', 'ui', 'tsconfig.json'),
      JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2020',
            useDefineForClassFields: true,
            lib: ['ES2020', 'DOM', 'DOM.Iterable'],
            module: 'ESNext',
            skipLibCheck: true,
            moduleResolution: 'bundler',
            allowImportingTsExtensions: true,
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: 'react-jsx',
            strict: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            noFallthroughCasesInSwitch: true,
            baseUrl: '.',
            paths: {
              '@repo/ui/*': ['./src/*'],
              '@repo/ui/components': ['./src/components'],
              '@repo/ui/lib': ['./src/lib'],
              '@repo/ui/lib/utils': ['./src/lib/utils'],
              '@repo/ui/hooks': ['./src/hooks'],
            },
          },
          include: ['src'],
          exclude: ['node_modules'],
        },
        null,
        2,
      ),
    )
  }

  await fs.writeFile(
    path.join(projectPath, 'packages', 'config', 'package.json'),
    JSON.stringify(
      {
        name: '@repo/config',
        version: '0.1.0',
        private: true,
      },
      null,
      2,
    ),
  )

  await fs.writeFile(
    path.join(projectPath, '.gitignore'),
    `# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env
.env*.local

# turbo
.turbo

# vercel
.vercel
`,
  )

  await fs.writeFile(
    path.join(projectPath, 'README.md'),
    `# ${path.basename(projectPath)}

This is a monorepo created with Saas UI CLI.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- \`apps/web\`: a [Next.js](https://nextjs.org/) app with Saas UI
- \`packages/ui\`: a shared React component library with Saas UI components
- \`packages/config\`: shared configuration (eslint, typescript)

### Structure

\`\`\`
${path.basename(projectPath)}/
├── apps/
│   └── web/                    # Next.js application
│       ├── src/
│       │   ├── app/           # Next.js app directory
│       │   ├── components/    # App-specific components
│       │   ├── lib/           # App-specific utilities
│       │   └── hooks/         # App-specific hooks
│       └── components.json    # Saas UI config for the app
├── packages/
│   └── ui/                    # Shared UI component library
│       ├── src/
│       │   ├── components/   # Shared components
│       │   ├── lib/          # Shared utilities
│       │   └── hooks/        # Shared hooks
│       └── components.json   # Saas UI config for the UI package
└── turbo.json                # Turborepo configuration
\`\`\`

### Adding Components

This monorepo is configured with Saas UI CLI. You can add components to the UI package:

\`\`\`bash
# From the root or packages/ui directory
cd packages/ui
sui add [component-name]
\`\`\`

Components will be added to \`packages/ui/src/components/\` and can be imported in your app:

\`\`\`tsx
// In apps/web/src/app/page.tsx
import { Button } from '@repo/ui/components/button'
\`\`\`

### Utilities

This monorepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Turborepo](https://turbo.build/repo) for fast builds
- [Saas UI](https://saas-ui.dev) for UI components

### Develop

To develop all apps and packages, run the following command:

\`\`\`bash
cd ${path.basename(projectPath)}
${packageManager} dev
\`\`\`

This will start the Next.js development server for the web app at \`http://localhost:3000\`.

### Build

To build all apps and packages, run the following command:

\`\`\`bash
cd ${path.basename(projectPath)}
${packageManager} build
\`\`\`

### Learn More

- [Saas UI Documentation](https://saas-ui.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
`,
  )
}
