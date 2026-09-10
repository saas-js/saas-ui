import{a as H}from"./chunk-MLXVRIKT.js";import{b as G,c as A,d as P,f as _,g as B,h as k,i as C,j as Y,k as K,l as F,o as U,q as Q,r as X,s as Z}from"./chunk-A2X64PLV.js";import{c as ee}from"./chunk-PMOGF2BN.js";import{a as q}from"./chunk-34YK7F5R.js";import{g as u,h as g}from"./chunk-C7PDYWAB.js";import{b as T}from"./chunk-JOUOBZXJ.js";import{existsSync as Ee,promises as M}from"fs";import S from"path";import I from"prompts";import{z as m}from"zod";import ae from"fs-extra";import Ce from"path";import se from"fast-glob";import ne from"fs-extra";import oe from"path";import{loadConfig as Se}from"tsconfig-paths";var x={"next-app":{name:"next-app",label:"Next.js",links:{installation:"https://saas-ui.dev/docs/core/installation/nextjs-guide"}},"next-pages":{name:"next-pages",label:"Next.js",links:{installation:"https://saas-ui.dev/docs/core/installation/nextjs-pages-guide"}},"tanstack-start":{name:"tanstack-start",label:"Remix",links:{installation:"https://saas-ui.dev/docs/core/installation/tanstack-start-guide"}},vite:{name:"vite",label:"Vite",links:{installation:"https://saas-ui.dev/docs/core/installation/vite-guide"}},react:{name:"react",label:"React",links:{installation:"https://saas-ui.dev/docs/core/installation"}},manual:{name:"manual",label:"Manual"}};import xe from"fs";import be from"path";function te(e="",t=!0){let n=be.join(e,"package.json"),o=xe.readFileSync(n,"utf8");try{return JSON.parse(o)}catch(s){if(t)throw s}return null}var D={chakra:{name:"chakra",label:"Chakra UI"},panda:{name:"panda",label:"Panda CSS"}};var ie=["**/node_modules/**",".next","public","dist","build"];async function j(e){let[t,n,o,s,i]=await Promise.all([se.glob("**/{next,vite,astro}.config.*|gatsby-config.*|composer.json",{cwd:e,deep:3,ignore:ie}),ne.pathExists(oe.resolve(e,"src")),Pe(e),ve(e),te(e,!1)]),l=await ne.pathExists(oe.resolve(e,`${n?"src/":""}app`)),c={framework:x.manual,system:null,isSrcDir:n,isRSC:!1,isTsx:o,aliasPrefix:s??null};return Object.keys(i?.dependencies??{}).find(p=>p.startsWith("@chakra-ui/"))&&(c.system=D.chakra),Object.keys(i?.devDependencies??{}).find(p=>p.startsWith("@pandacss/dev"))&&(c.system=D.panda),t.find(p=>p.startsWith("next.config."))?.length?(c.framework=l?x["next-app"]:x["next-pages"],c.isRSC=l,c):Object.keys(i?.dependencies??{}).find(p=>p.startsWith("@tanstack/react-start"))?(c.framework=x["tanstack-start"],c):t.find(p=>p.startsWith("vite.config."))?.length?(c.framework=x.vite,c):(Object.keys({...i?.dependencies,...i?.devDependencies}).includes("react")&&(c.framework=x.react),c)}async function ve(e){let t=await Se(e);if(t?.resultType==="failed"||!t?.paths)return null;for(let[n,o]of Object.entries(t.paths))if(o.includes("./*")||o.includes("./src/*")||o.includes("./app/*")||o.includes("./resources/js/*"))return n.endsWith("*")?n.slice(0,-1):n;return null}async function Pe(e){return(await se.glob("tsconfig.*",{cwd:e,deep:1,ignore:ie})).length>0}var R=class extends Error{constructor(n,o){super(n);this.code=o;this.name="InitPreflightError"}};async function ce(e){let t={};if(!ae.existsSync(e.cwd))throw t["1"]=!0,new R(`No project found at ${u.info(e.cwd)}.`,"1");if(!await ae.pathExists(Ce.resolve(e.cwd,"package.json")))throw t["1"]=!0,new R(`No ${u.info("package.json")} found in ${u.info(e.cwd)}.`,"1");k("Preflight checks.",{silent:e.silent}).start()?.succeed();let o=k("Verifying framework.",{silent:e.silent}).start(),s=await j(e.cwd);if(!s||s?.framework.name==="manual")throw t["6"]=!0,o?.fail(),new R(`We could not detect React, Next.js, or Vite at ${u.info(e.cwd)}.`,"6");o?.succeed(`Verifying framework. Found ${u.info(s.framework.label)}.`);let i=k("Validating import alias.",{silent:e.silent}).start();return s?.aliasPrefix?i?.succeed():i?.info("No import alias found. Init will configure one after validation."),{errors:t,projectInfo:s}}import{execa as Re}from"execa";import{promises as a}from"fs";import r from"path";var le=C["@chakra-ui/react"].specifier,pe=C["@emotion/react"].specifier,Ie=C["@saas-ui/chakra-preset"].specifier,Oe=C["next-themes"].specifier;async function J(e){let{cwd:t,name:n,packageManager:o="pnpm",packageManagerVersion:s="0.0.0",typescript:i=!0,skipInstall:l=!1}=e,c=r.join(t,n),p=k("Creating monorepo structure...").start();try{if(await a.mkdir(c,{recursive:!0}),await je(c,{packageManager:o,packageManagerVersion:s,typescript:i}),p.succeed("Monorepo structure created"),!l){let d=k("Installing dependencies...").start();try{await Re(o,["install"],{cwd:c}),d.succeed("Dependencies installed")}catch{d.fail("Failed to install dependencies"),g.warn(`You can manually install dependencies by running ${u.info(`cd ${n} && ${o} install`)}`)}}g.break(),g.success("Monorepo created successfully!"),g.break(),g.info("Next steps:"),g.info(`  1. ${u.info(`cd ${n}`)}`),g.info(`  2. ${u.info(`${o} ${o==="npm"?"run":""} dev`)}`),g.break()}catch(d){throw p.fail("Failed to create monorepo"),d}}async function je(e,t){let{packageManager:n,packageManagerVersion:o,typescript:s}=t;await Promise.all([a.mkdir(r.join(e,"apps","web"),{recursive:!0}),a.mkdir(r.join(e,"packages","ui"),{recursive:!0}),a.mkdir(r.join(e,"packages","config"),{recursive:!0})]),await a.writeFile(r.join(e,"package.json"),JSON.stringify({name:r.basename(e),private:!0,packageManager:`${n}@${o}`,workspaces:n==="pnpm"?void 0:["apps/*","packages/*"],scripts:{dev:"turbo dev",build:"turbo build",lint:"turbo lint",clean:"turbo clean"},devDependencies:{turbo:"^2.5.8",typescript:s?"^5.9.3":void 0}},null,2)),n==="pnpm"&&await a.writeFile(r.join(e,"pnpm-workspace.yaml"),`packages:
  - 'apps/*'
  - 'packages/*'
`),await a.writeFile(r.join(e,"turbo.json"),JSON.stringify({$schema:"https://turbo.build/schema.json",tasks:{build:{dependsOn:["^build"],inputs:["$TURBO_DEFAULT$",".env*"],outputs:[".next/**","!.next/cache/**"]},lint:{dependsOn:["^lint"]},checkTypes:{dependsOn:["^check-types"]},dev:{cache:!1,persistent:!0}}},null,2)),await a.writeFile(r.join(e,"apps","web","package.json"),JSON.stringify({name:"web",version:"0.1.0",private:!0,scripts:{dev:"next dev",build:"next build",start:"next start",lint:"next lint"},dependencies:{react:"^19.2.0","react-dom":"^19.2.0",next:"^15.5.4","@chakra-ui/react":le,"@emotion/react":pe},devDependencies:{"@types/node":s?"^24.7.0":void 0,"@types/react":s?"^19.2.2":void 0,"@types/react-dom":s?"^19.2.0":void 0,typescript:s?"^5.9.3":void 0,eslint:"^9.37.0","eslint-config-next":"^15.5.4"}},null,2));let i=s?"ts":"js",l=s?`import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
}

export default config
`:`/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
}

module.exports = config
`;await a.writeFile(r.join(e,"apps","web",`next.config.${i}`),l);let c=s?"tsconfig.json":"jsconfig.json";await a.writeFile(r.join(e,"apps","web",c),JSON.stringify({compilerOptions:{target:"es5",lib:["dom","dom.iterable","esnext"],allowJs:!0,skipLibCheck:!0,strict:s?!0:void 0,forceConsistentCasingInFileNames:!0,noEmit:!0,esModuleInterop:!0,module:"esnext",moduleResolution:"bundler",resolveJsonModule:!0,isolatedModules:!0,jsx:"preserve",incremental:!0,plugins:[{name:"next"}],paths:{"@/*":["./src/*"],"@/components":["./src/components"],"@/lib":["./src/lib"],"@/lib/utils":["./src/lib/utils"],"@/hooks":["./src/hooks"],"@repo/ui":["../../packages/ui/src"],"@repo/ui/*":["../../packages/ui/src/*"],"@repo/ui/components":["../../packages/ui/src/components/"],"@repo/ui/components/*":["../../packages/ui/src/components/*"]}},include:["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],exclude:["node_modules"]},null,2)),await Promise.all([a.mkdir(r.join(e,"apps","web","src","app"),{recursive:!0}),a.mkdir(r.join(e,"apps","web","src","components"),{recursive:!0}),a.mkdir(r.join(e,"apps","web","src","lib"),{recursive:!0}),a.mkdir(r.join(e,"apps","web","src","hooks"),{recursive:!0})]);let p=s?"tsx":"jsx",d=s?`import type { Metadata } from 'next'
import { Provider } from '@repo/ui/components/provider'

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
`:`import { Provider } from '@repo/ui/components/provider'

export const metadata = {
  title: 'My App',
  description: 'Generated with Saas UI CLI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
`;await a.writeFile(r.join(e,"apps","web","src","app",`layout.${p}`),d),await a.writeFile(r.join(e,"apps","web","src","app",`page.${p}`),`import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";

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
          <Button colorPalette="purple">Let's go!</Button>
          <Button variant="outline">sui add sidebar</Button>
        </HStack>
      </VStack>
    </Box>
  );
}
`),await a.writeFile(r.join(e,"apps","web","components.json"),JSON.stringify({$schema:"https://saas-ui.dev/r/schema/components.json",system:"chakra",style:"default",rsc:!0,tsx:s,installed:[],aliases:{components:"@/components",ui:"@repo/ui/components",lib:"@/lib",utils:"@/lib/utils",hooks:"@/hooks"}},null,2)),await a.writeFile(r.join(e,"apps","web",".gitignore"),`# dependencies
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
`),await a.writeFile(r.join(e,"packages","ui","package.json"),JSON.stringify({name:"@repo/ui",version:"0.1.0",private:!0,main:`./src/index.${s?"ts":"js"}`,types:s?"./src/index.ts":void 0,exports:{"./components/*":`./src/components/*.${s?"tsx":"jsx"}`,"./lib/*":`./src/lib/*.${s?"ts":"js"}`,"./hooks/*":`./src/hooks/*.${s?"ts":"js"}`},scripts:{lint:"eslint ."},dependencies:{"@chakra-ui/react":le,"@emotion/react":pe,"@saas-ui/chakra-preset":Ie,"next-themes":Oe},devDependencies:{"@types/react":s?"^19.2.2":void 0,"@types/react-dom":s?"^19.2.0":void 0,typescript:s?"^5.9.3":void 0,eslint:"^9.37.0"},peerDependencies:{react:"^19.2.0","react-dom":"^19.2.0"}},null,2)),await a.mkdir(r.join(e,"packages","ui","src"),{recursive:!0}),await Promise.all([a.mkdir(r.join(e,"packages","ui","src","components"),{recursive:!0}),a.mkdir(r.join(e,"packages","ui","src","lib"),{recursive:!0}),a.mkdir(r.join(e,"packages","ui","src","hooks"),{recursive:!0})]);let f=s?"tsx":"jsx",h=s?`'use client'

import type { ThemeProviderProps } from 'next-themes'
import type { ReactNode } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { ThemeProvider } from 'next-themes'

export interface ProviderProps extends Omit<ThemeProviderProps, 'children'> {
  children: ReactNode
}

export function Provider({ children, ...themeProps }: ProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        {...themeProps}
      >
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
`:`'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@saas-ui/chakra-preset'
import { ThemeProvider } from 'next-themes'

export function Provider({ children, ...themeProps }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider
        attribute="class"
        disableTransitionOnChange
        {...themeProps}
      >
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
`;await Promise.all([a.writeFile(r.join(e,"packages","ui","src","components",`provider.${f}`),h),a.writeFile(r.join(e,"packages","ui","src",`index.${s?"ts":"js"}`),`export { Provider } from './components/provider'
`)]),await a.writeFile(r.join(e,"packages","ui","components.json"),JSON.stringify({$schema:"https://saas-ui.dev/r/schema/components.json",system:"chakra",style:"default",rsc:!0,tsx:s,installed:[],aliases:{components:"@repo/ui/components",ui:"@repo/ui/components/ui",lib:"@repo/ui/lib",utils:"@repo/ui/lib/utils",hooks:"@repo/ui/hooks"}},null,2)),s&&await a.writeFile(r.join(e,"packages","ui","tsconfig.json"),JSON.stringify({compilerOptions:{target:"ES2020",useDefineForClassFields:!0,lib:["ES2020","DOM","DOM.Iterable"],module:"ESNext",skipLibCheck:!0,moduleResolution:"bundler",allowImportingTsExtensions:!0,resolveJsonModule:!0,isolatedModules:!0,noEmit:!0,jsx:"react-jsx",strict:!0,noUnusedLocals:!0,noUnusedParameters:!0,noFallthroughCasesInSwitch:!0,baseUrl:".",paths:{"@repo/ui/*":["./src/*"],"@repo/ui/components":["./src/components"],"@repo/ui/lib":["./src/lib"],"@repo/ui/lib/utils":["./src/lib/utils"],"@repo/ui/hooks":["./src/hooks"]}},include:["src"],exclude:["node_modules"]},null,2)),await a.writeFile(r.join(e,"packages","config","package.json"),JSON.stringify({name:"@repo/config",version:"0.1.0",private:!0},null,2)),await a.writeFile(r.join(e,".gitignore"),`# dependencies
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
`),await a.writeFile(r.join(e,"README.md"),`# ${r.basename(e)}

This is a monorepo created with Saas UI CLI.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- \`apps/web\`: a [Next.js](https://nextjs.org/) app with Saas UI
- \`packages/ui\`: a shared React component library with Saas UI components
- \`packages/config\`: shared configuration (eslint, typescript)

### Structure

\`\`\`
${r.basename(e)}/
\u251C\u2500\u2500 apps/
\u2502   \u2514\u2500\u2500 web/                    # Next.js application
\u2502       \u251C\u2500\u2500 src/
\u2502       \u2502   \u251C\u2500\u2500 app/           # Next.js app directory
\u2502       \u2502   \u251C\u2500\u2500 components/    # App-specific components
\u2502       \u2502   \u251C\u2500\u2500 lib/           # App-specific utilities
\u2502       \u2502   \u2514\u2500\u2500 hooks/         # App-specific hooks
\u2502       \u2514\u2500\u2500 components.json    # Saas UI config for the app
\u251C\u2500\u2500 packages/
\u2502   \u2514\u2500\u2500 ui/                    # Shared UI component library
\u2502       \u251C\u2500\u2500 src/
\u2502       \u2502   \u251C\u2500\u2500 components/   # Shared components
\u2502       \u2502   \u251C\u2500\u2500 lib/          # Shared utilities
\u2502       \u2502   \u2514\u2500\u2500 hooks/        # Shared hooks
\u2502       \u2514\u2500\u2500 components.json   # Saas UI config for the UI package
\u2514\u2500\u2500 turbo.json                # Turborepo configuration
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
cd ${r.basename(e)}
${n} dev
\`\`\`

This will start the Next.js development server for the web app at \`http://localhost:3000\`.

### Build

To build all apps and packages, run the following command:

\`\`\`bash
cd ${r.basename(e)}
${n} build
\`\`\`

### Learn More

- [Saas UI Documentation](https://saas-ui.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
`)}var Me=Y.map(F),Ne=F(K),ue=["sidebar"],$e=m.enum(["on","off"]),Te=m.object({cwd:m.string(),yes:m.boolean().default(!1),defaults:m.boolean().default(!1),force:m.boolean().default(!1),silent:m.boolean().default(!1),colorMode:$e.optional(),starter:m.boolean().default(!1),style:m.string().min(1).optional(),system:m.literal("chakra").optional(),componentsAlias:m.string().min(1).optional(),utilsAlias:m.string().min(1).optional(),uiAlias:m.string().min(1).optional(),libAlias:m.string().min(1).optional(),hooksAlias:m.string().min(1).optional(),iconsAlias:m.string().min(1).optional()}),me=Te.extend({components:m.array(m.string()).optional()}),O=class extends Error{constructor(n){super(Ye(n));this.conflicts=n;this.name="InitConflictError"}},W=class extends Error{constructor(n){super(`Cannot initialize the "${n}" system. Phase 5 init installs Chakra, Emotion, the Saas UI Chakra preset, and Chakra setup templates; a Panda project requires a separate setup plan. Use --system chakra --force to replace the existing system explicitly.`);this.system=n;this.name="InitUnsupportedSystemError"}};async function Gt(e,...t){try{let n=me.parse({...e,cwd:S.resolve(e.cwd??process.cwd()),components:t});if(await fe(n)===null)return;g.break(),g.log(`${u.success("Success!")} Project initialization completed.
You may now add components.`),g.break()}catch(n){g.break(),q(n)}}async function Bt(e,t={}){return(await fe(e,t))?.config??null}async function fe(e,t={}){let n=me.parse({...e,cwd:S.resolve(e.cwd)}),o={...e,...n};if(o.createMonorepo){let{packageManager:w,version:we}=await U(o.cwd);return await J({cwd:o.cwd,name:o.name||"my-app",packageManager:w,packageManagerVersion:we,typescript:!0,skipInstall:!1}),null}if(!Ee(S.resolve(o.cwd,"package.json")))return await Ae(o,t.prompt??I);let i=(o.skipPreflight?{errors:{},projectInfo:await(t.getProjectInfo??j)(o.cwd)}:await(t.preflight??ce)(o)).projectInfo;if(!i)throw new Error(`Unable to inspect the project at ${o.cwd}.`);let c=await(t.getRawConfig??B)(o.cwd),p=_e(i),d=await Fe(c,p,o,t),y=await ge(o.cwd,d,i),f=t.resolveConfigPaths??_,h=await f(o.cwd,d,y.effectiveConfig),v=await Ve(o,t.prompt??I),N=await ze(o,t.prompt??I,v),L=[...Me,...v?[Ne]:[]],b=await(t.createInstallPlan??X)(N,h,{client:t.registryClient,dependencies:L,force:o.force,overwrite:!0});if(b.conflicts?.length)throw new O(b.conflicts);if(!o.yes&&!o.defaults){let{proceed:w}=await(t.prompt??I)({type:"confirm",name:"proceed",message:`Install ${N.length} setup/component item(s) and write ${u.info("components.json")}?`,initial:!0});if(!w)return null}let $=H(d,b.requestedItems,b.replacedItems),V=await de(o.cwd,$),he=await Promise.all([y.update,V].filter(w=>w!==null).map(w=>Q(o.cwd,w.targetPath,w.content))),z=await f(o.cwd,$,y.effectiveConfig);return await(t.applyInstallPlan??Z)(b,z,{dependencyInstaller:t.dependencyInstaller,silent:o.silent,stagedProjectFiles:he,transaction:t.transaction}),{config:z,rawConfig:$,components:N,dependencies:L,colorMode:v,plan:b,configWritten:V!==null,aliasWritten:y.update!==null}}async function Ae(e,t){if(e.yes||e.defaults)throw new Error(`No package.json found in ${e.cwd}. Run init in an existing React project.`);let{createMonorepo:n}=await t({type:"confirm",name:"createMonorepo",message:"No project found. Would you like to create a new monorepo?",initial:!1});if(!n)throw new Error(`No package.json found in ${e.cwd}. Run init in an existing React project.`);let{projectName:o,typescript:s}=await t([{type:"text",name:"projectName",message:"What is your project named?",initial:"my-app",validate:l=>/^[a-z0-9-]+$/.test(l)?!0:"Use lowercase letters, numbers, and hyphens."},{type:"confirm",name:"typescript",message:"Would you like to use TypeScript?",initial:!0}]),i=await U(e.cwd);return await J({cwd:e.cwd,name:o||"my-app",packageManager:i.packageManager,packageManagerVersion:i.version,typescript:s,skipInstall:!1}),null}function _e(e){let t=e.aliasPrefix??"@/";return P.parse({$schema:T,system:e.system?.name??"chakra",style:"default",rsc:e.isRSC,tsx:e.isTsx,aliases:{components:`${t}components`,ui:`${t}components/ui`,utils:`${t}lib/utils`,lib:`${t}lib`,hooks:`${t}hooks`,icons:`${t}components/icons`}})}async function Fe(e,t,n,o){let i=n.defaults&&n.force?{...t,installed:e?.installed??[]}:e??t;!n.yes&&!n.defaults&&(i=await Ue(i,o.prompt??I,o.getRegistryStyles??ee));let l=De(n),c=e?We(e,l):[];if(c.length&&!n.force)throw new O(c);let p=P.parse(Je(i,l));if(p.system!=="chakra")throw new W(p.system);return p}async function Ue(e,t,n){let o=await n(),s=await t([{type:"toggle",name:"typescript",message:`Would you like to use ${u.info("TypeScript")}?`,initial:e.tsx,active:"yes",inactive:"no"},{type:"select",name:"style",message:`Which ${u.info("style")} would you like to use?`,choices:o.map(l=>({title:l.label,value:l.name})),initial:Math.max(0,o.findIndex(l=>l.name===e.style))},{type:"text",name:"components",message:`Configure the import alias for ${u.info("components")}:`,initial:e.aliases.components},{type:"text",name:"utils",message:`Configure the import alias for ${u.info("utils")}:`,initial:e.aliases.utils},{type:"toggle",name:"rsc",message:`Are you using ${u.info("React Server Components")}?`,initial:e.rsc,active:"yes",inactive:"no"}]),i=Le(s.components,s.utils,e);return P.parse({...e,style:s.style??e.style,rsc:s.rsc??e.rsc,tsx:s.typescript??e.tsx,aliases:i})}function De(e){let t={};return e.componentsAlias&&(t.components=e.componentsAlias),e.utilsAlias&&(t.utils=e.utilsAlias),e.uiAlias&&(t.ui=e.uiAlias),e.libAlias&&(t.lib=e.libAlias),e.hooksAlias&&(t.hooks=e.hooksAlias),e.iconsAlias&&(t.icons=e.iconsAlias),{...e.style?{style:e.style}:{},...e.system?{system:e.system}:{},...Object.keys(t).length?{aliases:t}:{}}}function Je(e,t){let n={...e.aliases,...t.aliases??{}};return t.aliases?.components&&!t.aliases.ui&&(n.ui=`${t.aliases.components}/ui`),{...e,...t,aliases:n}}function We(e,t){let n=[];t.style&&t.style!==e.style&&n.push(`style: ${e.style} -> ${t.style}`),t.system&&t.system!==e.system&&n.push(`system: ${e.system} -> ${t.system}`);for(let[o,s]of Object.entries(t.aliases??{})){let i=e.aliases[o];s&&i!==s&&n.push(`aliases.${o}: ${i??"(unset)"} -> ${s}`)}return n}function Le(e,t,n){let o=e.replace(/\/components$/,""),s=t.replace(/\/utils$/,"");return{...n.aliases,components:e,ui:`${e}/ui`,utils:t,lib:s,hooks:`${o}/hooks`,icons:`${e}/icons`}}async function Ve(e,t){return e.colorMode?e.colorMode==="on":e.yes||e.defaults?!0:(await t({type:"confirm",name:"colorMode",message:"Install color-mode support with next-themes?",initial:!0})).colorMode!==!1}async function ze(e,t,n){let o=e.starter,s=new Set(["provider","provider-no-color-mode","color-mode"]),i=(e.components??[]).filter(l=>s.has(l));if(i.length)throw new O(i.map(l=>`The "${l}" setup item is selected by --color-mode and cannot be passed as a starter component.`));return!o&&!e.components?.length&&!e.yes&&!e.defaults&&(o=!!(await t({type:"confirm",name:"starter",message:`Install the documented starter set (${ue.join(", ")})?`,initial:!1})).starter),Array.from(new Set([n?"provider":"provider-no-color-mode",...o?ue:[],...e.components??[]]))}async function Ht(e,t){let n=await de(e,t);return n?(await ye(n.targetPath,n.content),!0):!1}async function de(e,t){let n=S.resolve(e,"components.json"),o=`${JSON.stringify(t,null,2)}
`,s=await M.readFile(n,"utf8").catch(()=>null);return s===o||Ge(s,t)?null:{targetPath:n,content:o}}function Ge(e,t){if(!e)return!1;try{let n=P.parse(JSON.parse(e));return JSON.stringify(n)===JSON.stringify(t)}catch{return!1}}async function Yt(e,t,n){let o=await ge(e,t,n);return Be(o.update)}async function ge(e,t,n){let o=[...new Set(Object.values(t.aliases).flatMap(f=>{let h=f?He(f):null;return h?[h]:[]}))],s=n.isTsx?"tsconfig.json":"jsconfig.json",i=await G(e,s);if(!o.length)return{update:null,effectiveConfig:i};let l=[];for(let f of o)Object.hasOwn(i.paths,f)||l.push(f);if(!l.length)return{update:null,effectiveConfig:i};let c=i.document,p={...c.compilerOptions??{}},d={};for(let[f,h]of Object.entries(i.paths))d[f]=h.targets.map(v=>A(i.baseUrl,v));let y=S.join(e,n.isSrcDir?"src":"","*");for(let f of l)d[f]=[A(i.baseUrl,y)],i.paths[f]={targets:[y],sourcePath:i.configPath};return i.hasExplicitBaseUrl||(p.baseUrl="."),p.paths=d,c.compilerOptions=p,{update:{targetPath:i.configPath,content:`${JSON.stringify(c,null,2)}
`},effectiveConfig:i}}async function Be(e){return e?(await ye(e.targetPath,e.content),!0):!1}function He(e){return e.startsWith("@/")?"@/*":e.startsWith("~/")?"~/*":e.startsWith("#/")?"#/*":e.startsWith("#")?"#*":null}async function ye(e,t){let n=`${e}.${process.pid}.${Date.now()}.tmp`;await M.mkdir(S.dirname(e),{recursive:!0}),await M.writeFile(n,t,"utf8"),await M.rename(n,e)}function Ye(e){let t=e.map(n=>typeof n=="string"?n:JSON.stringify(n)).join(`
- `);return`Initialization has conflicts. No files were written.${t?`
- ${t}`:""}`}export{Me as a,Ne as b,ue as c,$e as d,Te as e,O as f,W as g,Gt as h,Bt as i,fe as j,_e as k,Ht as l,Yt as m};
