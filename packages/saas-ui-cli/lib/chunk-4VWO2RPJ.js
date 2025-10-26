import{b as C,c as J,d as W,e as $,f as O,g as P,h as B,i as H,j as G}from"./chunk-TXDPC5OL.js";import{a as p,b as r,c as N,e as L,f as V,g as z}from"./chunk-Y2SSMBR3.js";import{b as R}from"./chunk-L36FRG6H.js";import{promises as se}from"fs";import A from"path";import S from"prompts";import{z as y}from"zod";import F from"fs-extra";import _ from"path";import ge from"prompts";import q from"fast-glob";import E from"fs-extra";import T from"path";import{loadConfig as pe}from"tsconfig-paths";var v={"next-app":{name:"next-app",label:"Next.js",links:{installation:"https://saas-ui.dev/docs/core/installation/nextjs-guide"}},"next-pages":{name:"next-pages",label:"Next.js",links:{installation:"https://saas-ui.dev/docs/core/installation/nextjs-pages-guide"}},"tanstack-start":{name:"tanstack-start",label:"Remix",links:{installation:"https://saas-ui.dev/docs/core/installation/tanstack-start-guide"}},vite:{name:"vite",label:"Vite",links:{installation:"https://saas-ui.dev/docs/core/installation/vite-guide"}},manual:{name:"manual",label:"Manual"}};import ae from"fs";import ce from"path";function K(e="",t=!0){let n=ce.join(e,"package.json"),o=ae.readFileSync(n,"utf8");try{return JSON.parse(o)}catch(i){if(t)throw i}return null}var Q=["**/node_modules/**",".next","public","dist","build"];async function b(e){let[t,n,o,i,a]=await Promise.all([q.glob("**/{next,vite,astro}.config.*|gatsby-config.*|composer.json",{cwd:e,deep:3,ignore:Q}),E.pathExists(T.resolve(e,"src")),me(e),le(e),K(e,!1)]),f=await E.pathExists(T.resolve(e,`${n?"src/":""}app`)),c={framework:v.manual,system:null,isSrcDir:n,isRSC:!1,isTsx:o,aliasPrefix:i??null};return Object.keys(a?.dependencies??{}).find(u=>u.startsWith("@chakra-ui/"))&&(c.system=C.chakra),Object.keys(a?.devDependencies??{}).find(u=>u.startsWith("@pandacss/dev"))&&(c.system=C.panda),t.find(u=>u.startsWith("next.config."))?.length?(c.framework=f?v["next-app"]:v["next-pages"],c.isRSC=f,c):Object.keys(a?.dependencies??{}).find(u=>u.startsWith("@tanstack/react-start"))?(c.framework=v["tanstack-start"],c):(t.find(u=>u.startsWith("vite.config."))?.length&&(c.framework=v.vite),c)}async function le(e){let t=await pe(e);if(t?.resultType==="failed"||!t?.paths)return null;for(let[n,o]of Object.entries(t.paths))if(o.includes("./*")||o.includes("./src/*")||o.includes("./app/*")||o.includes("./resources/js/*"))return n.at(0)??null;return null}async function me(e){return(await q.glob("tsconfig.*",{cwd:e,deep:1,ignore:Q})).length>0}async function X(e=process.cwd()){try{let t=T.resolve(e,"tsconfig.json"),n=await E.readJSON(t);if(!n)throw new Error("tsconfig.json is missing");return n}catch{return null}}async function Z(e,t=null){let[n,o]=await Promise.all([O(e),t?Promise.resolve(t):b(e)]);if(n)return n;if(!o)return null;let i={$schema:R,rsc:o.isRSC,tsx:o.isTsx,system:o.system?.name??C.chakra.name,style:"default",aliases:{components:`${o.aliasPrefix}components`,ui:`${o.aliasPrefix}components/ui`,hooks:`${o.aliasPrefix}hooks`,lib:`${o.aliasPrefix}lib`,utils:`${o.aliasPrefix}lib/utils`}};return await P(e,i)}import ue from"ora";function g(e,t){return ue({text:e,isSilent:t?.silent})}async function ee(e){let t={};if(!F.existsSync(e.cwd))return t["1"]=!0,{errors:t,projectInfo:null};let n=g("Preflight checks.",{silent:e.silent}).start();F.existsSync(_.resolve(e.cwd,"components.json"))&&!e.force&&(n?.fail(),r.break(),r.error(`A ${p.info("components.json")} file already exists at ${p.info(e.cwd)}.
To start over, remove the ${p.info("components.json")} file and run ${p.info("init")} again.`),r.break(),process.exit(1)),n?.succeed();let o=g("Verifying framework.",{silent:e.silent}).start(),i=await b(e.cwd);(!i||i?.framework.name==="manual")&&(t["6"]=!0,o?.fail(),r.break(),i&&"links"in i.framework&&i.framework.links.installation&&r.error(`We could not detect a supported framework at ${p.info(e.cwd)}.
Visit ${p.info(i?.framework.links.installation)} to manually configure your project.
Once configured, you can use the cli to add components.`),r.break(),process.exit(1)),o?.succeed(`Verifying framework. Found ${p.info(i.framework.label)}.`);let a=g("Validating import alias.",{silent:e.silent}).start();if(i?.aliasPrefix)a?.succeed();else{a?.fail(),r.break(),r.warn("No import alias found in your tsconfig.json file."),r.break();let c=await F.pathExists(_.resolve(e.cwd,"src"))?"./src/*":"./*",{aliasPrefix:u}=await ge({type:"select",name:"aliasPrefix",message:"Which import alias would you like to use?",choices:[{title:p.info("#*"),description:`Maps to ${c}`,value:"#*"},{title:p.info("@/*"),description:`Maps to ${c}`,value:"@/*"}],initial:0});u||(r.break(),r.error("Import alias is required to continue."),r.break(),process.exit(1));let m=_.resolve(e.cwd,"tsconfig.json"),d=await X(e.cwd);d||(r.break(),r.error("Unable to read tsconfig.json"),r.break(),process.exit(1)),d.compilerOptions||(d.compilerOptions={}),d.compilerOptions.paths||(d.compilerOptions.paths={}),d.compilerOptions.paths[u]=[c],await F.writeJSON(m,d,{spaces:2});let{execa:w}=await import("execa");try{await w("npx",["prettier","--write",m],{cwd:e.cwd})}catch{}r.break(),r.success(`Added ${p.info(u)} to tsconfig.json paths.`),r.break(),a?.succeed()}return Object.keys(t).length>0&&(r.break(),process.exit(1)),{errors:t,projectInfo:i}}import{execa as he}from"execa";import{detect as de}from"@antfu/ni";async function j(e,{withFallback:t}={withFallback:!1}){let n=await de({programmatic:!0,cwd:e}),[o,i="0.0.0"]=n?.split("@")??["","0.0.0"];if(o==="yarn")return{packageManager:"yarn",version:i};if(o==="pnpm")return{packageManager:"pnpm",version:i};if(o==="bun")return{packageManager:"bun",version:i};if(!t)return{packageManager:"npm",version:"0.0.0"};let a=process.env.npm_config_user_agent||"";return a.startsWith("yarn")?{packageManager:"yarn",version:"0.0.0"}:a.startsWith("pnpm")?{packageManager:"pnpm",version:"0.0.0"}:a.startsWith("bun")?{packageManager:"bun",version:"0.0.0"}:{packageManager:"npm",version:"0.0.0"}}async function te(e,t,n){if(e=Array.from(new Set(e)),!e?.length)return;n={silent:!1,...n};let o=g("Installing dependencies.",{silent:n.silent})?.start(),{packageManager:i}=await j(t.resolvedPaths.cwd);await he(i,[i==="npm"?"install":"add",...e],{cwd:t.resolvedPaths.cwd}),o?.succeed()}import{existsSync as ne,promises as ie}from"fs";import k,{basename as we}from"path";import ye from"prompts";function ke(e,t,n){return n.startsWith("~/")?k.join(t.resolvedPaths.cwd,n.replace("~/","")):e?.isSrcDir?k.join(t.resolvedPaths.cwd,"src",n):k.join(t.resolvedPaths.cwd,n)}async function oe(e,t,n){if(!e?.length)return;n={overwrite:!1,force:!1,silent:!1,...n};let o=g("Updating files.",{silent:n.silent})?.start(),[i]=await Promise.all([b(t.resolvedPaths.cwd)]),a=[],f=[],c=[];for(let m of e){if(!m.content)continue;let d=V(m,t),w=we(m.path),h=k.join(d,w);m.target&&(h=ke(i,t,m.target),d=k.dirname(h)),t.tsx||(h=h.replace(/\.tsx?$/,x=>x===".tsx"?".jsx":".js"));let M=ne(h);if(M&&!n.overwrite){o.stop();let{overwrite:x}=await ye({type:"confirm",name:"overwrite",message:`The file ${p.info(w)} already exists. Would you like to overwrite?`,initial:!1});if(!x){c.push(k.relative(t.resolvedPaths.cwd,h));continue}o?.start()}ne(d)||await ie.mkdir(d,{recursive:!0});let I=await G({filename:m.path,raw:m.content,config:t,transformJsx:!t.tsx},[B,H]);await ie.writeFile(h,I,"utf-8"),M?f.push(k.relative(t.resolvedPaths.cwd,h)):a.push(k.relative(t.resolvedPaths.cwd,h))}if(!(a.length||f.length)&&!c.length&&o?.info("No files updated."),a.length){if(o?.succeed(`Created ${a.length} ${a.length===1?"file":"files"}:`),!n.silent)for(let m of a)r.log(`  - ${m}`)}else o?.stop();if(f.length&&(g(`Updated ${f.length} ${f.length===1?"file":"files"}:`,{silent:n.silent})?.info(),!n.silent))for(let m of f)r.log(`  - ${m}`);if(c.length&&(g(`Skipped ${c.length} ${f.length===1?"file":"files"}:`,{silent:n.silent})?.info(),!n.silent))for(let m of c)r.log(`  - ${m}`);n.silent||r.break()}async function re(e,t,n){n={overwrite:!1,silent:!1,isNewProject:!1,...n};let o=g("Checking registry.",{silent:n.silent})?.start(),i=await z(e,t);if(!i)return o?.fail(),N(new Error("Failed to fetch components from registry."));o?.succeed(),await te(i.dependencies,t,{silent:n.silent}),await oe(i.files,t,{overwrite:n.overwrite,silent:n.silent}),i.docs&&r.info(i.docs)}import{execa as be}from"execa";import{promises as l}from"fs";import s from"path";async function D(e){let{cwd:t,name:n,packageManager:o="pnpm",packageManagerVersion:i="0.0.0",typescript:a=!0,skipInstall:f=!1}=e,c=s.join(t,n),u=g("Creating monorepo structure...").start();try{if(await l.mkdir(c,{recursive:!0}),await xe(c,{packageManager:o,packageManagerVersion:i,typescript:a}),u.succeed("Monorepo structure created"),!f){let m=g("Installing dependencies...").start();try{await be(o,["install"],{cwd:c}),m.succeed("Dependencies installed")}catch{m.fail("Failed to install dependencies"),r.warn(`You can manually install dependencies by running ${p.info(`cd ${n} && ${o} install`)}`)}}r.break(),r.success("Monorepo created successfully!"),r.break(),r.info("Next steps:"),r.info(`  1. ${p.info(`cd ${n}`)}`),r.info(`  2. ${p.info(`${o} ${o==="npm"?"run":""} dev`)}`),r.break()}catch(m){throw u.fail("Failed to create monorepo"),m}}async function xe(e,t){let{packageManager:n,packageManagerVersion:o,typescript:i}=t;await Promise.all([l.mkdir(s.join(e,"apps","web"),{recursive:!0}),l.mkdir(s.join(e,"packages","ui"),{recursive:!0}),l.mkdir(s.join(e,"packages","config"),{recursive:!0})]),await l.writeFile(s.join(e,"package.json"),JSON.stringify({name:s.basename(e),private:!0,packageManager:`${n}@${o}`,workspaces:n==="pnpm"?void 0:["apps/*","packages/*"],scripts:{dev:"turbo dev",build:"turbo build",lint:"turbo lint",clean:"turbo clean"},devDependencies:{turbo:"^2.5.8",typescript:i?"^5.9.3":void 0}},null,2)),n==="pnpm"&&await l.writeFile(s.join(e,"pnpm-workspace.yaml"),`packages:
  - 'apps/*'
  - 'packages/*'
`),await l.writeFile(s.join(e,"turbo.json"),JSON.stringify({$schema:"https://turbo.build/schema.json",tasks:{build:{dependsOn:["^build"],inputs:["$TURBO_DEFAULT$",".env*"],outputs:[".next/**","!.next/cache/**"]},lint:{dependsOn:["^lint"]},checkTypes:{dependsOn:["^check-types"]},dev:{cache:!1,persistent:!0}}},null,2)),await l.writeFile(s.join(e,"apps","web","package.json"),JSON.stringify({name:"web",version:"0.1.0",private:!0,scripts:{dev:"next dev",build:"next build",start:"next start",lint:"next lint"},dependencies:{react:"^19.2.0","react-dom":"^19.2.0",next:"^15.5.4","@saas-ui/react":"^2.11.4","@chakra-ui/react":"^2.10.9","@emotion/react":"^11.14.0","@emotion/styled":"^11.14.1","framer-motion":"^10.18.0"},devDependencies:{"@types/node":i?"^24.7.0":void 0,"@types/react":i?"^19.2.2":void 0,"@types/react-dom":i?"^19.2.0":void 0,typescript:i?"^5.9.3":void 0,eslint:"^9.37.0","eslint-config-next":"^15.5.4"}},null,2));let a=i?"ts":"js",f=i?`import type { NextConfig } from 'next'

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
`;await l.writeFile(s.join(e,"apps","web",`next.config.${a}`),f);let c=i?"tsconfig.json":"jsconfig.json";await l.writeFile(s.join(e,"apps","web",c),JSON.stringify({compilerOptions:{target:"es5",lib:["dom","dom.iterable","esnext"],allowJs:!0,skipLibCheck:!0,strict:i?!0:void 0,forceConsistentCasingInFileNames:!0,noEmit:!0,esModuleInterop:!0,module:"esnext",moduleResolution:"bundler",resolveJsonModule:!0,isolatedModules:!0,jsx:"preserve",incremental:!0,plugins:[{name:"next"}],paths:{"@/*":["./src/*"],"@/components":["./src/components"],"@/lib":["./src/lib"],"@/lib/utils":["./src/lib/utils"],"@/hooks":["./src/hooks"],"@repo/ui":["../../packages/ui/src"],"@repo/ui/*":["../../packages/ui/src/*"],"@repo/ui/components":["../../packages/ui/src/components/"],"@repo/ui/components/*":["../../packages/ui/src/components/*"]}},include:["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],exclude:["node_modules"]},null,2)),await Promise.all([l.mkdir(s.join(e,"apps","web","src","app"),{recursive:!0}),l.mkdir(s.join(e,"apps","web","src","components"),{recursive:!0}),l.mkdir(s.join(e,"apps","web","src","lib"),{recursive:!0}),l.mkdir(s.join(e,"apps","web","src","hooks"),{recursive:!0})]);let u=i?"tsx":"jsx",m=i?`import type { Metadata } from 'next'
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
`;await l.writeFile(s.join(e,"apps","web","src","app",`layout.${u}`),m),await l.writeFile(s.join(e,"apps","web","src","app",`page.${u}`),`import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";

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
`),await l.writeFile(s.join(e,"apps","web","components.json"),JSON.stringify({$schema:"https://saas-ui.dev/r/schema.json",system:"chakra",style:"default",rsc:!0,tsx:i,aliases:{components:"@/components",ui:"@repo/ui/components",lib:"@/lib",utils:"@/lib/utils",hooks:"@/hooks"}},null,2)),await l.writeFile(s.join(e,"apps","web",".gitignore"),`# dependencies
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
`),await l.writeFile(s.join(e,"packages","ui","package.json"),JSON.stringify({name:"@repo/ui",version:"0.1.0",private:!0,main:"./src/index.ts",types:"./src/index.ts",exports:{"./components/*":"./src/components/*.tsx","./lib/*":"./src/lib/*.ts","./hooks/*":"./src/hooks/*.ts"},scripts:{lint:"eslint ."},dependencies:{"@saas-ui/react":"^2.11.4","@chakra-ui/react":"^2.10.9","@emotion/react":"^11.14.0","@emotion/styled":"^11.14.1","framer-motion":"^10.18.0"},devDependencies:{"@types/react":i?"^19.2.2":void 0,"@types/react-dom":i?"^19.2.0":void 0,typescript:i?"^5.9.3":void 0,eslint:"^9.37.0"},peerDependencies:{react:"^19.2.0","react-dom":"^19.2.0"}},null,2)),await l.mkdir(s.join(e,"packages","ui","src"),{recursive:!0}),await Promise.all([l.mkdir(s.join(e,"packages","ui","src","components"),{recursive:!0}),l.mkdir(s.join(e,"packages","ui","src","lib"),{recursive:!0}),l.mkdir(s.join(e,"packages","ui","src","hooks"),{recursive:!0})]),await l.writeFile(s.join(e,"packages","ui","components.json"),JSON.stringify({$schema:"https://saas-ui.dev/r/schema.json",system:"chakra",style:"default",rsc:!0,tsx:i,aliases:{components:"@repo/ui/components",ui:"@repo/ui/components/ui",lib:"@repo/ui/lib",utils:"@repo/ui/lib/utils",hooks:"@repo/ui/hooks"}},null,2)),i&&await l.writeFile(s.join(e,"packages","ui","tsconfig.json"),JSON.stringify({compilerOptions:{target:"ES2020",useDefineForClassFields:!0,lib:["ES2020","DOM","DOM.Iterable"],module:"ESNext",skipLibCheck:!0,moduleResolution:"bundler",allowImportingTsExtensions:!0,resolveJsonModule:!0,isolatedModules:!0,noEmit:!0,jsx:"react-jsx",strict:!0,noUnusedLocals:!0,noUnusedParameters:!0,noFallthroughCasesInSwitch:!0,baseUrl:".",paths:{"@repo/ui/*":["./src/*"],"@repo/ui/components":["./src/components"],"@repo/ui/lib":["./src/lib"],"@repo/ui/lib/utils":["./src/lib/utils"],"@repo/ui/hooks":["./src/hooks"]}},include:["src"],exclude:["node_modules"]},null,2)),await l.writeFile(s.join(e,"packages","config","package.json"),JSON.stringify({name:"@repo/config",version:"0.1.0",private:!0},null,2)),await l.writeFile(s.join(e,".gitignore"),`# dependencies
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
`),await l.writeFile(s.join(e,"README.md"),`# ${s.basename(e)}

This is a monorepo created with Saas UI CLI.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

- \`apps/web\`: a [Next.js](https://nextjs.org/) app with Saas UI
- \`packages/ui\`: a shared React component library with Saas UI components
- \`packages/config\`: shared configuration (eslint, typescript)

### Structure

\`\`\`
${s.basename(e)}/
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
cd ${s.basename(e)}
${n} dev
\`\`\`

This will start the Next.js development server for the web app at \`http://localhost:3000\`.

### Build

To build all apps and packages, run the following command:

\`\`\`bash
cd ${s.basename(e)}
${n} build
\`\`\`

### Learn More

- [Saas UI Documentation](https://saas-ui.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
`)}var ve=y.object({cwd:y.string(),components:y.array(y.string()).optional(),yes:y.boolean(),defaults:y.boolean(),force:y.boolean(),silent:y.boolean()}),Se=ve.extend({components:y.array(y.string()).optional()});async function Ht(e,...t){try{let n=Se.parse({...e,cwd:A.resolve(e.cwd??process.cwd()),isNewProject:!1,components:t});if(await je(n)===null)return;r.break(),r.log(`${p.success("Success!")} Project initialization completed.
You may now add components.`),r.break()}catch(n){r.break(),N(n)}}async function je(e){let t;if(e.createMonorepo){let{packageManager:w,version:h}=await j(e.cwd);return await D({cwd:e.cwd,name:e.name||"my-app",packageManager:w,packageManagerVersion:h,typescript:!0,skipInstall:!1}),null}let n=A.resolve(e.cwd,"package.json");if(await se.access(n).then(()=>!0).catch(()=>!1))t=await b(e.cwd);else{let{createMonorepo:w}=await S({type:"confirm",name:"createMonorepo",message:"No project found. Would you like to create a new monorepo?",initial:!1});if(w){let{projectName:h}=await S({type:"text",name:"projectName",message:"What is your project named?",initial:"my-app",validate:x=>x?/^[a-z0-9-]+$/.test(x)?!0:"Project name must contain only lowercase letters, numbers, and hyphens":"Project name is required"}),{typescript:M}=await S({type:"confirm",name:"typescript",message:"Would you like to use TypeScript?",initial:!0}),I=await j(e.cwd);return await D({cwd:e.cwd,name:h||"my-app",packageManager:I.packageManager,packageManagerVersion:I.version,typescript:M,skipInstall:!1}),null}r.error(`No ${p.info("package.json")} found in ${p.info(e.cwd)}.`),r.error(`Please run ${p.info("init")} in a valid Node.js project or create a monorepo.`),process.exit(1)}let i=await ee(e);i.errors["1"]&&process.exit(1),t=i.projectInfo;let a=await Z(e.cwd,t),f=a?await Ie(a,e):await Me(await O(e.cwd));if(!e.yes){let{proceed:w}=await S({type:"confirm",name:"proceed",message:`Write configuration to ${p.info("components.json")}. Proceed?`,initial:!0});w||process.exit(0)}let c=g("Writing components.json.").start(),u=A.resolve(e.cwd,"components.json");await se.writeFile(u,JSON.stringify(f,null,2),"utf8"),c.succeed();let m=await P(e.cwd,f),d=["index",...e.components||[]];return await re(d,m,{overwrite:!0,silent:e.silent,isNewProject:e.isNewProject||t?.framework.name==="next-app"}),m}async function Me(e=null){r.info("");let t=await S([{type:"toggle",name:"typescript",message:`Would you like to use ${p.info("TypeScript")} (recommended)?`,initial:e?.tsx??!0,active:"yes",inactive:"no"},{type:"text",name:"components",message:`Configure the import alias for ${p.info("components")}:`,initial:e?.aliases.components??J},{type:"text",name:"utils",message:`Configure the import alias for ${p.info("utils")}:`,initial:e?.aliases.utils??W},{type:"toggle",name:"rsc",message:`Are you using ${p.info("React Server Components")}?`,initial:e?.rsc??!0,active:"yes",inactive:"no"}]);return $.parse({$schema:R,system:"chakra",style:"default",rsc:t.rsc,tsx:t.typescript,aliases:{utils:t.utils,components:t.components,lib:t.components.replace(/\/components$/,"lib"),hooks:t.components.replace(/\/components$/,"hooks")}})}async function Ie(e,t){let n=e.style;if(!t.defaults){let o=await L();n=(await S([{type:"select",name:"style",message:`Which ${p.info("style")} would you like to use?`,choices:o.map(a=>({title:a.label,value:a.name})),initial:o.findIndex(a=>a.name===n)}])).style}return $.parse({$schema:e?.$schema,style:n,rsc:e?.rsc,tsx:e?.tsx,aliases:e?.aliases})}export{re as a,ve as b,Ht as c,je as d};
//# sourceMappingURL=chunk-4VWO2RPJ.js.map