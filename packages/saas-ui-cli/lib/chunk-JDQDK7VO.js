import{a as g}from"./chunk-VJEAJKHP.js";import{a as z,b as G,c as B}from"./chunk-VAIDCNBY.js";import{b as J,c as V,e as W}from"./chunk-GLV3F3GR.js";import{b as p,c as A,d as D,e as $,f as C,g as P,i as o,j as O}from"./chunk-TLFJOCN6.js";import{a as F,b as M,f as L}from"./chunk-IMPGVV52.js";import{promises as pe}from"fs";import U from"path";import S from"prompts";import{z as h}from"zod";import te from"fs-extra";import we from"path";import Q from"fast-glob";import K from"fs-extra";import q from"path";import{loadConfig as fe}from"tsconfig-paths";var v={"next-app":{name:"next-app",label:"Next.js",links:{installation:"https://saas-ui.dev/docs/core/installation/nextjs-guide"}},"next-pages":{name:"next-pages",label:"Next.js",links:{installation:"https://saas-ui.dev/docs/core/installation/nextjs-pages-guide"}},remix:{name:"remix",label:"Remix",links:{installation:"https://saas-ui.dev/docs/core/installation/remix-guide"}},vite:{name:"vite",label:"Vite",links:{installation:"https://saas-ui.dev/docs/core/installation/vite-guide"}},manual:{name:"manual",label:"Manual"}};import me from"fs";import ue from"path";function Y(e="",t=!0){let n=ue.join(e,"package.json"),r=me.readFileSync(n,"utf8");try{return JSON.parse(r)}catch(i){if(t)throw i}return null}var X=["**/node_modules/**",".next","public","dist","build"];async function x(e){let[t,n,r,i,s]=await Promise.all([Q.glob("**/{next,vite,astro}.config.*|gatsby-config.*|composer.json",{cwd:e,deep:3,ignore:X}),K.pathExists(q.resolve(e,"src")),de(e),ge(e),Y(e,!1)]),u=await K.pathExists(q.resolve(e,`${n?"src/":""}app`)),l={framework:v.manual,isSrcDir:n,isRSC:!1,isTsx:r,aliasPrefix:i??null};return t.find(f=>f.startsWith("next.config."))?.length?(l.framework=u?v["next-app"]:v["next-pages"],l.isRSC=u,l):Object.keys(s?.dependencies??{}).find(f=>f.startsWith("@remix-run/"))?(l.framework=v.remix,l):(t.find(f=>f.startsWith("vite.config."))?.length&&(l.framework=v.vite),l)}async function ge(e){let t=await fe(e);if(t?.resultType==="failed"||!t?.paths)return null;for(let[n,r]of Object.entries(t.paths))if(r.includes("./*")||r.includes("./src/*")||r.includes("./app/*")||r.includes("./resources/js/*"))return n.at(0)??null;return null}async function de(e){return(await Q.glob("tsconfig.*",{cwd:e,deep:1,ignore:X})).length>0}async function Z(e,t=null){let[n,r]=await Promise.all([C(e),t?Promise.resolve(t):x(e)]);if(n)return n;if(!r)return null;let i={$schema:M,rsc:r.isRSC,tsx:r.isTsx,system:"chakra",style:"default",aliases:{components:`${r.aliasPrefix}/components`,ui:`${r.aliasPrefix}/components/ui`,hooks:`${r.aliasPrefix}/hooks`,lib:`${r.aliasPrefix}/lib`,utils:`${r.aliasPrefix}/lib/utils`}};return await P(e,i)}async function ne(e){let t={};if(!te.existsSync(e.cwd))return t["1"]=!0,{errors:t,projectInfo:null};let n=g("Preflight checks.",{silent:e.silent}).start();te.existsSync(we.resolve(e.cwd,"components.json"))&&!e.force&&(n?.fail(),o.break(),o.error(`A ${p.info("components.json")} file already exists at ${p.info(e.cwd)}.
To start over, remove the ${p.info("components.json")} file and run ${p.info("init")} again.`),o.break(),process.exit(1)),n?.succeed();let r=g("Verifying framework.",{silent:e.silent}).start(),i=await x(e.cwd);(!i||i?.framework.name==="manual")&&(t["6"]=!0,r?.fail(),o.break(),i&&"links"in i.framework&&i.framework.links.installation&&o.error(`We could not detect a supported framework at ${p.info(e.cwd)}.
Visit ${p.info(i?.framework.links.installation)} to manually configure your project.
Once configured, you can use the cli to add components.`),o.break(),process.exit(1)),r?.succeed(`Verifying framework. Found ${p.info(i.framework.label)}.`);let s=g("Validating import alias.",{silent:e.silent}).start();return i?.aliasPrefix?s?.succeed():(t["5"]=!0,s?.fail()),Object.keys(t).length>0&&(t["5"]&&(o.break(),o.error("No import alias found in your tsconfig.json file."),i?.framework.links.installation&&o.error(`Visit ${p.info(i?.framework.links.installation)} to learn how to set an import alias.`)),o.break(),process.exit(1)),{errors:t,projectInfo:i}}import{promises as N}from"fs";import T from"path";var ie=`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,re=`import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`;import{execa as ke}from"execa";import{detect as ye}from"@antfu/ni";async function j(e,{withFallback:t}={withFallback:!1}){let n=await ye({programmatic:!0,cwd:e}),[r,i="0.0.0"]=n?.split("@")??["","0.0.0"];if(r==="yarn")return{packageManager:"yarn",version:i};if(r==="pnpm")return{packageManager:"pnpm",version:i};if(r==="bun")return{packageManager:"bun",version:i};if(!t)return{packageManager:"npm",version:"0.0.0"};let s=process.env.npm_config_user_agent||"";return s.startsWith("yarn")?{packageManager:"yarn",version:"0.0.0"}:s.startsWith("pnpm")?{packageManager:"pnpm",version:"0.0.0"}:s.startsWith("bun")?{packageManager:"bun",version:"0.0.0"}:{packageManager:"npm",version:"0.0.0"}}async function se(e,t,n){if(e=Array.from(new Set(e)),!e?.length)return;n={silent:!1,...n};let r=g("Installing dependencies.",{silent:n.silent})?.start(),{packageManager:i}=await j(t.resolvedPaths.cwd);await ke(i,[i==="npm"?"install":"add",...e],{cwd:t.resolvedPaths.cwd}),r?.succeed()}import{existsSync as oe,promises as ae}from"fs";import k,{basename as xe}from"path";import be from"prompts";function ve(e,t,n){return n.startsWith("~/")?k.join(t.resolvedPaths.cwd,n.replace("~/","")):e?.isSrcDir?k.join(t.resolvedPaths.cwd,"src",n):k.join(t.resolvedPaths.cwd,n)}async function ce(e,t,n){if(!e?.length)return;n={overwrite:!1,force:!1,silent:!1,...n};let r=g("Updating files.",{silent:n.silent})?.start(),[i]=await Promise.all([x(t.resolvedPaths.cwd)]),s=[],u=[],l=[];for(let m of e){if(!m.content)continue;let w=W(m,t),y=xe(m.path),d=k.join(w,y);m.target&&(d=ve(i,t,m.target),w=k.dirname(d)),t.tsx||(d=d.replace(/\.tsx?$/,b=>b===".tsx"?".jsx":".js"));let I=oe(d);if(I&&!n.overwrite){r.stop();let{overwrite:b}=await be({type:"confirm",name:"overwrite",message:`The file ${p.info(y)} already exists. Would you like to overwrite?`,initial:!1});if(!b){l.push(k.relative(t.resolvedPaths.cwd,d));continue}r?.start()}oe(w)||await ae.mkdir(w,{recursive:!0});let R=await B({filename:m.path,raw:m.content,config:t,transformJsx:!t.tsx},[z,G]);await ae.writeFile(d,R,"utf-8"),I?u.push(k.relative(t.resolvedPaths.cwd,d)):s.push(k.relative(t.resolvedPaths.cwd,d))}if(!(s.length||u.length)&&!l.length&&r?.info("No files updated."),s.length){if(r?.succeed(`Created ${s.length} ${s.length===1?"file":"files"}:`),!n.silent)for(let m of s)o.log(`  - ${m}`)}else r?.stop();if(u.length&&(g(`Updated ${u.length} ${u.length===1?"file":"files"}:`,{silent:n.silent})?.info(),!n.silent))for(let m of u)o.log(`  - ${m}`);if(l.length&&(g(`Skipped ${l.length} ${u.length===1?"file":"files"}:`,{silent:n.silent})?.info(),!n.silent))for(let m of l)o.log(`  - ${m}`);n.silent||o.break()}async function le(e,t,n){n={overwrite:!1,silent:!1,isNewProject:!1,...n},e.some(u=>{let{registry:l}=L(u);if(l){let f=t.registries?.[l];if(f)return(typeof f=="string"?f:f.url).includes("shadcn.com")}return!1})&&await Se(t,n);let i=g("Checking registry.",{silent:n.silent})?.start(),s=await V(e,t);if(!s)return i?.fail(),O(new Error("Failed to fetch components from registry."));i?.succeed(),await se(s.dependencies,t,{silent:n.silent}),await ce(s.files,t,{overwrite:n.overwrite,silent:n.silent}),s.docs&&o.info(s.docs)}async function Se(e,t){let n=T.join(e.resolvedPaths.lib,"utils.ts"),r=T.join(e.resolvedPaths.lib,"utils.js"),i=e.tsx?n:r,s=e.tsx?ie:re;if(await N.access(i).then(()=>!0).catch(()=>!1)&&!t.overwrite){t.silent||o.info(`Skipping ${i} (already exists)`);return}if(await N.mkdir(T.dirname(i),{recursive:!0}),t.silent)await N.writeFile(i,s,"utf-8");else{let l=g("Adding shadcn utils file.").start();await N.writeFile(i,s,"utf-8"),l.succeed()}}import{execa as je}from"execa";import{promises as c}from"fs";import a from"path";async function _(e){let{cwd:t,name:n,packageManager:r="pnpm",packageManagerVersion:i="0.0.0",typescript:s=!0,skipInstall:u=!1}=e,l=a.join(t,n),f=g("Creating monorepo structure...").start();try{if(await c.mkdir(l,{recursive:!0}),await Ie(l,{packageManager:r,packageManagerVersion:i,typescript:s}),f.succeed("Monorepo structure created"),!u){let m=g("Installing dependencies...").start();try{await je(r,["install"],{cwd:l}),m.succeed("Dependencies installed")}catch{m.fail("Failed to install dependencies"),o.warn(`You can manually install dependencies by running ${p.info(`cd ${n} && ${r} install`)}`)}}o.break(),o.success("Monorepo created successfully!"),o.break(),o.info("Next steps:"),o.info(`  1. ${p.info(`cd ${n}`)}`),o.info(`  2. ${p.info(`${r} ${r==="npm"?"run":""} dev`)}`),o.break()}catch(m){throw f.fail("Failed to create monorepo"),m}}async function Ie(e,t){let{packageManager:n,packageManagerVersion:r,typescript:i}=t;await Promise.all([c.mkdir(a.join(e,"apps","web"),{recursive:!0}),c.mkdir(a.join(e,"packages","ui"),{recursive:!0}),c.mkdir(a.join(e,"packages","config"),{recursive:!0})]),await c.writeFile(a.join(e,"package.json"),JSON.stringify({name:a.basename(e),private:!0,packageManager:`${n}@${r}`,workspaces:n==="pnpm"?void 0:["apps/*","packages/*"],scripts:{dev:"turbo dev",build:"turbo build",lint:"turbo lint",clean:"turbo clean"},devDependencies:{turbo:"^2.5.8",typescript:i?"^5.9.3":void 0}},null,2)),n==="pnpm"&&await c.writeFile(a.join(e,"pnpm-workspace.yaml"),`packages:
  - 'apps/*'
  - 'packages/*'
`),await c.writeFile(a.join(e,"turbo.json"),JSON.stringify({$schema:"https://turbo.build/schema.json",tasks:{build:{dependsOn:["^build"],inputs:["$TURBO_DEFAULT$",".env*"],outputs:[".next/**","!.next/cache/**"]},lint:{dependsOn:["^lint"]},checkTypes:{dependsOn:["^check-types"]},dev:{cache:!1,persistent:!0}}},null,2)),await c.writeFile(a.join(e,"apps","web","package.json"),JSON.stringify({name:"web",version:"0.1.0",private:!0,scripts:{dev:"next dev",build:"next build",start:"next start",lint:"next lint"},dependencies:{react:"^19.2.0","react-dom":"^19.2.0",next:"^15.5.4","@saas-ui/react":"^2.11.4","@chakra-ui/react":"^2.10.9","@emotion/react":"^11.14.0","@emotion/styled":"^11.14.1","framer-motion":"^10.18.0"},devDependencies:{"@types/node":i?"^24.7.0":void 0,"@types/react":i?"^19.2.2":void 0,"@types/react-dom":i?"^19.2.0":void 0,typescript:i?"^5.9.3":void 0,eslint:"^9.37.0","eslint-config-next":"^15.5.4"}},null,2));let s=i?"ts":"js",u=i?`import type { NextConfig } from 'next'

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
`;await c.writeFile(a.join(e,"apps","web",`next.config.${s}`),u);let l=i?"tsconfig.json":"jsconfig.json";await c.writeFile(a.join(e,"apps","web",l),JSON.stringify({compilerOptions:{target:"es5",lib:["dom","dom.iterable","esnext"],allowJs:!0,skipLibCheck:!0,strict:i?!0:void 0,forceConsistentCasingInFileNames:!0,noEmit:!0,esModuleInterop:!0,module:"esnext",moduleResolution:"bundler",resolveJsonModule:!0,isolatedModules:!0,jsx:"preserve",incremental:!0,plugins:[{name:"next"}],paths:{"@/*":["./src/*"],"@/components":["./src/components"],"@/lib":["./src/lib"],"@/lib/utils":["./src/lib/utils"],"@/hooks":["./src/hooks"],"@repo/ui":["../../packages/ui/src"],"@repo/ui/*":["../../packages/ui/src/*"],"@repo/ui/components":["../../packages/ui/src/components/"],"@repo/ui/components/*":["../../packages/ui/src/components/*"]}},include:["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],exclude:["node_modules"]},null,2)),await Promise.all([c.mkdir(a.join(e,"apps","web","src","app"),{recursive:!0}),c.mkdir(a.join(e,"apps","web","src","components"),{recursive:!0}),c.mkdir(a.join(e,"apps","web","src","lib"),{recursive:!0}),c.mkdir(a.join(e,"apps","web","src","hooks"),{recursive:!0})]);let f=i?"tsx":"jsx",m=i?`import type { Metadata } from 'next'
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
`:`import { SaasProvider } from '@saas-ui/react'

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
`;await c.writeFile(a.join(e,"apps","web","src","app",`layout.${f}`),m),await c.writeFile(a.join(e,"apps","web","src","app",`page.${f}`),`import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";

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
`),await c.writeFile(a.join(e,"apps","web","components.json"),JSON.stringify({$schema:"https://saas-ui.dev/r/schema.json",system:"chakra",style:"default",rsc:!0,tsx:i,registries:{"@saas-ui":{url:"https://saas-ui.dev/r/styles/{style}/{name}.json"}},aliases:{components:"@/components",ui:"@repo/ui/components",lib:"@/lib",utils:"@/lib/utils",hooks:"@/hooks"}},null,2)),await c.writeFile(a.join(e,"apps","web",".gitignore"),`# dependencies
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
`),await c.writeFile(a.join(e,"packages","ui","package.json"),JSON.stringify({name:"@repo/ui",version:"0.1.0",private:!0,main:"./src/index.ts",types:"./src/index.ts",exports:{"./components/*":"./src/components/*.tsx","./lib/*":"./src/lib/*.ts","./hooks/*":"./src/hooks/*.ts"},scripts:{lint:"eslint ."},dependencies:{"@saas-ui/react":"^2.11.4","@chakra-ui/react":"^2.10.9","@emotion/react":"^11.14.0","@emotion/styled":"^11.14.1","framer-motion":"^10.18.0"},devDependencies:{"@types/react":i?"^19.2.2":void 0,"@types/react-dom":i?"^19.2.0":void 0,typescript:i?"^5.9.3":void 0,eslint:"^9.37.0"},peerDependencies:{react:"^19.2.0","react-dom":"^19.2.0"}},null,2)),await c.mkdir(a.join(e,"packages","ui","src"),{recursive:!0}),await Promise.all([c.mkdir(a.join(e,"packages","ui","src","components"),{recursive:!0}),c.mkdir(a.join(e,"packages","ui","src","lib"),{recursive:!0}),c.mkdir(a.join(e,"packages","ui","src","hooks"),{recursive:!0})]),await c.writeFile(a.join(e,"packages","ui","components.json"),JSON.stringify({$schema:"https://saas-ui.dev/r/schema.json",system:"chakra",style:"default",rsc:!0,tsx:i,registries:{"@saas-ui":{url:"https://saas-ui.dev/r/styles/{style}/{name}.json"}},aliases:{components:"@repo/ui/components",ui:"@repo/ui/components/ui",lib:"@repo/ui/lib",utils:"@repo/ui/lib/utils",hooks:"@repo/ui/hooks"}},null,2)),i&&await c.writeFile(a.join(e,"packages","ui","tsconfig.json"),JSON.stringify({compilerOptions:{target:"ES2020",useDefineForClassFields:!0,lib:["ES2020","DOM","DOM.Iterable"],module:"ESNext",skipLibCheck:!0,moduleResolution:"bundler",allowImportingTsExtensions:!0,resolveJsonModule:!0,isolatedModules:!0,noEmit:!0,jsx:"react-jsx",strict:!0,noUnusedLocals:!0,noUnusedParameters:!0,noFallthroughCasesInSwitch:!0,baseUrl:".",paths:{"@repo/ui/*":["./src/*"],"@repo/ui/components":["./src/components"],"@repo/ui/lib":["./src/lib"],"@repo/ui/lib/utils":["./src/lib/utils"],"@repo/ui/hooks":["./src/hooks"]}},include:["src"],exclude:["node_modules"]},null,2)),await c.writeFile(a.join(e,"packages","config","package.json"),JSON.stringify({name:"@repo/config",version:"0.1.0",private:!0},null,2)),await c.writeFile(a.join(e,".gitignore"),`# dependencies
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
`),await c.writeFile(a.join(e,"README.md"),`# ${a.basename(e)}

This is a monorepo created with Saas UI CLI.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- \`apps/web\`: a [Next.js](https://nextjs.org/) app with Saas UI
- \`packages/ui\`: a shared React component library with Saas UI components
- \`packages/config\`: shared configuration (eslint, typescript)

### Structure

\`\`\`
${a.basename(e)}/
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
cd ${a.basename(e)}
${n} dev
\`\`\`

This will start the Next.js development server for the web app at \`http://localhost:3000\`.

### Build

To build all apps and packages, run the following command:

\`\`\`bash
cd ${a.basename(e)}
${n} build
\`\`\`

### Learn More

- [Saas UI Documentation](https://saas-ui.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
`)}var Re=h.object({cwd:h.string(),yes:h.boolean(),defaults:h.boolean(),force:h.boolean(),silent:h.boolean(),monorepo:h.boolean()}),Me=Re.extend({components:h.array(h.string()).optional()});async function Qt(e,...t){try{let n=t.map(s=>s.includes("/")&&!s.startsWith("@")?`@${s}`:s),r=Me.parse({...e,cwd:U.resolve(e.cwd??process.cwd()),isNewProject:!1,components:n});if(await Ce(r)===null)return;o.break(),o.log(`${p.success("Success!")} Project initialization completed.
You may now add components.`),o.break()}catch(n){o.break(),O(n)}}async function Ce(e){let t;if(e.monorepo){let{packageManager:y,version:d}=await j(e.cwd);return await _({cwd:e.cwd,name:e.name||"my-app",packageManager:y,packageManagerVersion:d,typescript:!0,skipInstall:!1}),null}let n=U.resolve(e.cwd,"package.json");if(await pe.access(n).then(()=>!0).catch(()=>!1))t=await x(e.cwd);else{let{createMonorepo:y}=await S({type:"confirm",name:"createMonorepo",message:"No project found. Would you like to create a new monorepo?",initial:!1});if(y){let{projectName:d}=await S({type:"text",name:"projectName",message:"What is your project named?",initial:"my-app",validate:b=>b?/^[a-z0-9-]+$/.test(b)?!0:"Project name must contain only lowercase letters, numbers, and hyphens":"Project name is required"}),{typescript:I}=await S({type:"confirm",name:"typescript",message:"Would you like to use TypeScript?",initial:!0}),R=await j(e.cwd);return await _({cwd:e.cwd,name:d||"my-app",packageManager:R.packageManager,packageManagerVersion:R.version,typescript:I,skipInstall:!1}),null}o.error(`No ${p.info("package.json")} found in ${p.info(e.cwd)}.`),o.error(`Please run ${p.info("init")} in a valid Node.js project or create a monorepo.`),process.exit(1)}let i=await ne(e);i.errors["1"]&&process.exit(1),t=i.projectInfo;let s=await Z(e.cwd,t),u=s?await Oe(s,e):await Pe(await C(e.cwd));if(!e.yes){let{proceed:y}=await S({type:"confirm",name:"proceed",message:`Write configuration to ${p.info("components.json")}. Proceed?`,initial:!0});y||process.exit(0)}let l=g("Writing components.json.").start(),f=U.resolve(e.cwd,"components.json");await pe.writeFile(f,JSON.stringify(u,null,2),"utf8"),l.succeed();let m=await P(e.cwd,u),w=["index",...e.components||[]];return await le(w,m,{overwrite:!0,silent:e.silent,isNewProject:e.isNewProject||t?.framework.name==="next-app"}),m}async function Pe(e=null){o.info("");let t=await S([{type:"toggle",name:"typescript",message:`Would you like to use ${p.info("TypeScript")} (recommended)?`,initial:e?.tsx??!0,active:"yes",inactive:"no"},{type:"text",name:"components",message:`Configure the import alias for ${p.info("components")}:`,initial:e?.aliases.components??A},{type:"text",name:"utils",message:`Configure the import alias for ${p.info("utils")}:`,initial:e?.aliases.utils??D},{type:"toggle",name:"rsc",message:`Are you using ${p.info("React Server Components")}?`,initial:e?.rsc??!0,active:"yes",inactive:"no"}]);return $.parse({$schema:M,system:"chakra",style:"default",rsc:t.rsc,tsx:t.typescript,aliases:{utils:t.utils,components:t.components,lib:t.components.replace(/\/components$/,"lib"),hooks:t.components.replace(/\/components$/,"hooks")},registries:{"@saas-ui":{url:`${F}/r/styles/{style}/{name}.json`}}})}async function Oe(e,t){let n=e.style;if(!t.defaults){let r=await J();n=(await S([{type:"select",name:"style",message:`Which ${p.info("style")} would you like to use?`,choices:r.map(s=>({title:s.label,value:s.name})),initial:r.findIndex(s=>s.name===n)}])).style}return $.parse({$schema:e?.$schema,style:n,rsc:e?.rsc,tsx:e?.tsx,aliases:e?.aliases,registries:{"@saas-ui":{url:`${F}/r/styles/{style}/{name}.json`}}})}export{le as a,Re as b,Qt as c,Ce as d};
