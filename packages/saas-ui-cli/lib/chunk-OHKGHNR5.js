import{b as C,c as W,d as L,e as $,f as O,g as P,h as H,i as G,j as Y}from"./chunk-TXDPC5OL.js";import{a as l,b as r,c as N,e as V,f as z,g as B}from"./chunk-Y2SSMBR3.js";import{b as R}from"./chunk-L36FRG6H.js";import{promises as ae}from"fs";import J from"path";import S from"prompts";import{z as k}from"zod";import F from"fs-extra";import _ from"path";import de from"prompts";import Q from"fast-glob";import E from"fs-extra";import T from"path";import{loadConfig as le}from"tsconfig-paths";var v={"next-app":{name:"next-app",label:"Next.js",links:{installation:"https://saas-ui.dev/docs/core/installation/nextjs-guide"}},"next-pages":{name:"next-pages",label:"Next.js",links:{installation:"https://saas-ui.dev/docs/core/installation/nextjs-pages-guide"}},"tanstack-start":{name:"tanstack-start",label:"Remix",links:{installation:"https://saas-ui.dev/docs/core/installation/tanstack-start-guide"}},vite:{name:"vite",label:"Vite",links:{installation:"https://saas-ui.dev/docs/core/installation/vite-guide"}},manual:{name:"manual",label:"Manual"}};import ce from"fs";import pe from"path";function q(e="",t=!0){let n=pe.join(e,"package.json"),o=ce.readFileSync(n,"utf8");try{return JSON.parse(o)}catch(i){if(t)throw i}return null}var X=["**/node_modules/**",".next","public","dist","build"];async function b(e){let[t,n,o,i,a]=await Promise.all([Q.glob("**/{next,vite,astro}.config.*|gatsby-config.*|composer.json",{cwd:e,deep:3,ignore:X}),E.pathExists(T.resolve(e,"src")),ue(e),me(e),q(e,!1)]),g=await E.pathExists(T.resolve(e,`${n?"src/":""}app`)),p={framework:v.manual,system:null,isSrcDir:n,isRSC:!1,isTsx:o,aliasPrefix:i??null};return Object.keys(a?.dependencies??{}).find(u=>u.startsWith("@chakra-ui/"))&&(p.system=C.chakra),Object.keys(a?.devDependencies??{}).find(u=>u.startsWith("@pandacss/dev"))&&(p.system=C.panda),t.find(u=>u.startsWith("next.config."))?.length?(p.framework=g?v["next-app"]:v["next-pages"],p.isRSC=g,p):Object.keys(a?.dependencies??{}).find(u=>u.startsWith("@tanstack/react-start"))?(p.framework=v["tanstack-start"],p):(t.find(u=>u.startsWith("vite.config."))?.length&&(p.framework=v.vite),p)}async function me(e){let t=await le(e);if(t?.resultType==="failed"||!t?.paths)return null;for(let[n,o]of Object.entries(t.paths))if(o.includes("./*")||o.includes("./src/*")||o.includes("./app/*")||o.includes("./resources/js/*"))return n.at(0)??null;return null}async function ue(e){return(await Q.glob("tsconfig.*",{cwd:e,deep:1,ignore:X})).length>0}async function Z(e=process.cwd()){try{let t=T.resolve(e,"tsconfig.json"),n=await E.readJSON(t);if(!n)throw new Error("tsconfig.json is missing");return n}catch{return null}}async function ee(e,t=null){let[n,o]=await Promise.all([O(e),t?Promise.resolve(t):b(e)]);if(n)return n;if(!o)return null;let i={$schema:R,rsc:o.isRSC,tsx:o.isTsx,system:o.system?.name??C.chakra.name,style:"default",aliases:{components:`${o.aliasPrefix}components`,ui:`${o.aliasPrefix}components/ui`,hooks:`${o.aliasPrefix}hooks`,lib:`${o.aliasPrefix}lib`,utils:`${o.aliasPrefix}lib/utils`}};return await P(e,i)}import fe from"ora";function d(e,t){return fe({text:e,isSilent:t?.silent})}async function te(e){let t={};if(!F.existsSync(e.cwd))return t["1"]=!0,{errors:t,projectInfo:null};let n=d("Preflight checks.",{silent:e.silent}).start();F.existsSync(_.resolve(e.cwd,"components.json"))&&!e.force&&(n?.fail(),r.break(),r.error(`A ${l.info("components.json")} file already exists at ${l.info(e.cwd)}.
To start over, remove the ${l.info("components.json")} file and run ${l.info("init")} again.`),r.break(),process.exit(1)),n?.succeed();let o=d("Verifying framework.",{silent:e.silent}).start(),i=await b(e.cwd);(!i||i?.framework.name==="manual")&&(t["6"]=!0,o?.fail(),r.break(),i&&"links"in i.framework&&i.framework.links.installation&&r.error(`We could not detect a supported framework at ${l.info(e.cwd)}.
Visit ${l.info(i?.framework.links.installation)} to manually configure your project.
Once configured, you can use the cli to add components.`),r.break(),process.exit(1)),o?.succeed(`Verifying framework. Found ${l.info(i.framework.label)}.`);let a=d("Validating import alias.",{silent:e.silent}).start();if(i?.aliasPrefix)a?.succeed();else{a?.fail(),r.break(),r.warn("No import alias found in your tsconfig.json file."),r.break();let p=await F.pathExists(_.resolve(e.cwd,"src"))?"./src/*":"./*",{aliasPrefix:u}=await de({type:"select",name:"aliasPrefix",message:"Which import alias would you like to use?",choices:[{title:l.info("#*"),description:`Maps to ${p}`,value:"#*"},{title:l.info("@/*"),description:`Maps to ${p}`,value:"@/*"}],initial:0});u||(r.break(),r.error("Import alias is required to continue."),r.break(),process.exit(1));let c=_.resolve(e.cwd,"tsconfig.json"),f=await Z(e.cwd);f||(r.break(),r.error("Unable to read tsconfig.json"),r.break(),process.exit(1)),f.compilerOptions||(f.compilerOptions={}),f.compilerOptions.paths||(f.compilerOptions.paths={}),f.compilerOptions.paths[u]=[p],await F.writeJSON(c,f,{spaces:2});let{execa:w}=await import("execa");try{await w("npx",["prettier","--write",c],{cwd:e.cwd})}catch{}r.break(),r.success(`Added ${l.info(u)} to tsconfig.json paths.`),r.break(),a?.succeed()}return Object.keys(t).length>0&&(r.break(),process.exit(1)),{errors:t,projectInfo:i}}import{execa as we}from"execa";import{detect as he}from"@antfu/ni";async function j(e,{withFallback:t}={withFallback:!1}){let n=await he({programmatic:!0,cwd:e}),[o,i="0.0.0"]=n?.split("@")??["","0.0.0"];if(o==="yarn")return{packageManager:"yarn",version:i};if(o==="pnpm")return{packageManager:"pnpm",version:i};if(o==="bun")return{packageManager:"bun",version:i};if(!t)return{packageManager:"npm",version:"0.0.0"};let a=process.env.npm_config_user_agent||"";return a.startsWith("yarn")?{packageManager:"yarn",version:"0.0.0"}:a.startsWith("pnpm")?{packageManager:"pnpm",version:"0.0.0"}:a.startsWith("bun")?{packageManager:"bun",version:"0.0.0"}:{packageManager:"npm",version:"0.0.0"}}async function ne(e,t,n){if(e=Array.from(new Set(e)),!e?.length)return;n={silent:!1,...n};let o=d("Installing dependencies.",{silent:n.silent})?.start(),{packageManager:i}=await j(t.resolvedPaths.cwd);await we(i,[i==="npm"?"install":"add",...e],{cwd:t.resolvedPaths.cwd}),o?.succeed()}import{existsSync as ie,promises as oe}from"fs";import y,{basename as D}from"path";import ye from"prompts";function ke(e,t,n){return n.startsWith("~/")?y.join(t.resolvedPaths.cwd,n.replace("~/","")):e?.isSrcDir?y.join(t.resolvedPaths.cwd,"src",n):y.join(t.resolvedPaths.cwd,n)}async function re(e,t,n){if(!e?.length)return;n={overwrite:!1,force:!1,silent:!1,...n};let o=d("Updating files.",{silent:n.silent})?.start(),[i]=await Promise.all([b(t.resolvedPaths.cwd)]),a=[],g=[],p=[];for(let c of e){if(!c.content)continue;let f=z(c,t);console.log({targetDir:f,path:c.path}),c.path.startsWith(D(f))&&(f=y.join(f,y.dirname(c.path.replace(D(f),""))));let w=D(c.path),h=y.join(f,w);c.target&&(h=ke(i,t,c.target),f=y.dirname(h)),t.tsx||(h=h.replace(/\.tsx?$/,x=>x===".tsx"?".jsx":".js"));let M=ie(h);if(M&&!n.overwrite){o.stop();let{overwrite:x}=await ye({type:"confirm",name:"overwrite",message:`The file ${l.info(w)} already exists. Would you like to overwrite?`,initial:!1});if(!x){p.push(y.relative(t.resolvedPaths.cwd,h));continue}o?.start()}ie(f)||await oe.mkdir(f,{recursive:!0});let I=await Y({filename:c.path,raw:c.content,config:t,transformJsx:!t.tsx},[H,G]);await oe.writeFile(h,I,"utf-8"),M?g.push(y.relative(t.resolvedPaths.cwd,h)):a.push(y.relative(t.resolvedPaths.cwd,h))}if(!(a.length||g.length)&&!p.length&&o?.info("No files updated."),a.length){if(o?.succeed(`Created ${a.length} ${a.length===1?"file":"files"}:`),!n.silent)for(let c of a)r.log(`  - ${c}`)}else o?.stop();if(g.length&&(d(`Updated ${g.length} ${g.length===1?"file":"files"}:`,{silent:n.silent})?.info(),!n.silent))for(let c of g)r.log(`  - ${c}`);if(p.length&&(d(`Skipped ${p.length} ${g.length===1?"file":"files"}:`,{silent:n.silent})?.info(),!n.silent))for(let c of p)r.log(`  - ${c}`);n.silent||r.break()}async function se(e,t,n){n={overwrite:!1,silent:!1,isNewProject:!1,...n};let o=d("Checking registry.",{silent:n.silent})?.start(),i=await B(e,t);if(!i)return o?.fail(),N(new Error("Failed to fetch components from registry."));o?.succeed(),await ne(i.dependencies,t,{silent:n.silent}),await re(i.files,t,{overwrite:n.overwrite,silent:n.silent}),i.docs&&r.info(i.docs)}import{execa as be}from"execa";import{promises as m}from"fs";import s from"path";async function A(e){let{cwd:t,name:n,packageManager:o="pnpm",packageManagerVersion:i="0.0.0",typescript:a=!0,skipInstall:g=!1}=e,p=s.join(t,n),u=d("Creating monorepo structure...").start();try{if(await m.mkdir(p,{recursive:!0}),await xe(p,{packageManager:o,packageManagerVersion:i,typescript:a}),u.succeed("Monorepo structure created"),!g){let c=d("Installing dependencies...").start();try{await be(o,["install"],{cwd:p}),c.succeed("Dependencies installed")}catch{c.fail("Failed to install dependencies"),r.warn(`You can manually install dependencies by running ${l.info(`cd ${n} && ${o} install`)}`)}}r.break(),r.success("Monorepo created successfully!"),r.break(),r.info("Next steps:"),r.info(`  1. ${l.info(`cd ${n}`)}`),r.info(`  2. ${l.info(`${o} ${o==="npm"?"run":""} dev`)}`),r.break()}catch(c){throw u.fail("Failed to create monorepo"),c}}async function xe(e,t){let{packageManager:n,packageManagerVersion:o,typescript:i}=t;await Promise.all([m.mkdir(s.join(e,"apps","web"),{recursive:!0}),m.mkdir(s.join(e,"packages","ui"),{recursive:!0}),m.mkdir(s.join(e,"packages","config"),{recursive:!0})]),await m.writeFile(s.join(e,"package.json"),JSON.stringify({name:s.basename(e),private:!0,packageManager:`${n}@${o}`,workspaces:n==="pnpm"?void 0:["apps/*","packages/*"],scripts:{dev:"turbo dev",build:"turbo build",lint:"turbo lint",clean:"turbo clean"},devDependencies:{turbo:"^2.5.8",typescript:i?"^5.9.3":void 0}},null,2)),n==="pnpm"&&await m.writeFile(s.join(e,"pnpm-workspace.yaml"),`packages:
  - 'apps/*'
  - 'packages/*'
`),await m.writeFile(s.join(e,"turbo.json"),JSON.stringify({$schema:"https://turbo.build/schema.json",tasks:{build:{dependsOn:["^build"],inputs:["$TURBO_DEFAULT$",".env*"],outputs:[".next/**","!.next/cache/**"]},lint:{dependsOn:["^lint"]},checkTypes:{dependsOn:["^check-types"]},dev:{cache:!1,persistent:!0}}},null,2)),await m.writeFile(s.join(e,"apps","web","package.json"),JSON.stringify({name:"web",version:"0.1.0",private:!0,scripts:{dev:"next dev",build:"next build",start:"next start",lint:"next lint"},dependencies:{react:"^19.2.0","react-dom":"^19.2.0",next:"^15.5.4","@saas-ui/react":"^2.11.4","@chakra-ui/react":"^2.10.9","@emotion/react":"^11.14.0","@emotion/styled":"^11.14.1","framer-motion":"^10.18.0"},devDependencies:{"@types/node":i?"^24.7.0":void 0,"@types/react":i?"^19.2.2":void 0,"@types/react-dom":i?"^19.2.0":void 0,typescript:i?"^5.9.3":void 0,eslint:"^9.37.0","eslint-config-next":"^15.5.4"}},null,2));let a=i?"ts":"js",g=i?`import type { NextConfig } from 'next'

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
`;await m.writeFile(s.join(e,"apps","web",`next.config.${a}`),g);let p=i?"tsconfig.json":"jsconfig.json";await m.writeFile(s.join(e,"apps","web",p),JSON.stringify({compilerOptions:{target:"es5",lib:["dom","dom.iterable","esnext"],allowJs:!0,skipLibCheck:!0,strict:i?!0:void 0,forceConsistentCasingInFileNames:!0,noEmit:!0,esModuleInterop:!0,module:"esnext",moduleResolution:"bundler",resolveJsonModule:!0,isolatedModules:!0,jsx:"preserve",incremental:!0,plugins:[{name:"next"}],paths:{"@/*":["./src/*"],"@/components":["./src/components"],"@/lib":["./src/lib"],"@/lib/utils":["./src/lib/utils"],"@/hooks":["./src/hooks"],"@repo/ui":["../../packages/ui/src"],"@repo/ui/*":["../../packages/ui/src/*"],"@repo/ui/components":["../../packages/ui/src/components/"],"@repo/ui/components/*":["../../packages/ui/src/components/*"]}},include:["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"],exclude:["node_modules"]},null,2)),await Promise.all([m.mkdir(s.join(e,"apps","web","src","app"),{recursive:!0}),m.mkdir(s.join(e,"apps","web","src","components"),{recursive:!0}),m.mkdir(s.join(e,"apps","web","src","lib"),{recursive:!0}),m.mkdir(s.join(e,"apps","web","src","hooks"),{recursive:!0})]);let u=i?"tsx":"jsx",c=i?`import type { Metadata } from 'next'
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
`;await m.writeFile(s.join(e,"apps","web","src","app",`layout.${u}`),c),await m.writeFile(s.join(e,"apps","web","src","app",`page.${u}`),`import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";

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
`),await m.writeFile(s.join(e,"apps","web","components.json"),JSON.stringify({$schema:"https://saas-ui.dev/r/schema.json",system:"chakra",style:"default",rsc:!0,tsx:i,aliases:{components:"@/components",ui:"@repo/ui/components",lib:"@/lib",utils:"@/lib/utils",hooks:"@/hooks"}},null,2)),await m.writeFile(s.join(e,"apps","web",".gitignore"),`# dependencies
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
`),await m.writeFile(s.join(e,"packages","ui","package.json"),JSON.stringify({name:"@repo/ui",version:"0.1.0",private:!0,main:"./src/index.ts",types:"./src/index.ts",exports:{"./components/*":"./src/components/*.tsx","./lib/*":"./src/lib/*.ts","./hooks/*":"./src/hooks/*.ts"},scripts:{lint:"eslint ."},dependencies:{"@saas-ui/react":"^2.11.4","@chakra-ui/react":"^2.10.9","@emotion/react":"^11.14.0","@emotion/styled":"^11.14.1","framer-motion":"^10.18.0"},devDependencies:{"@types/react":i?"^19.2.2":void 0,"@types/react-dom":i?"^19.2.0":void 0,typescript:i?"^5.9.3":void 0,eslint:"^9.37.0"},peerDependencies:{react:"^19.2.0","react-dom":"^19.2.0"}},null,2)),await m.mkdir(s.join(e,"packages","ui","src"),{recursive:!0}),await Promise.all([m.mkdir(s.join(e,"packages","ui","src","components"),{recursive:!0}),m.mkdir(s.join(e,"packages","ui","src","lib"),{recursive:!0}),m.mkdir(s.join(e,"packages","ui","src","hooks"),{recursive:!0})]),await m.writeFile(s.join(e,"packages","ui","components.json"),JSON.stringify({$schema:"https://saas-ui.dev/r/schema.json",system:"chakra",style:"default",rsc:!0,tsx:i,aliases:{components:"@repo/ui/components",ui:"@repo/ui/components/ui",lib:"@repo/ui/lib",utils:"@repo/ui/lib/utils",hooks:"@repo/ui/hooks"}},null,2)),i&&await m.writeFile(s.join(e,"packages","ui","tsconfig.json"),JSON.stringify({compilerOptions:{target:"ES2020",useDefineForClassFields:!0,lib:["ES2020","DOM","DOM.Iterable"],module:"ESNext",skipLibCheck:!0,moduleResolution:"bundler",allowImportingTsExtensions:!0,resolveJsonModule:!0,isolatedModules:!0,noEmit:!0,jsx:"react-jsx",strict:!0,noUnusedLocals:!0,noUnusedParameters:!0,noFallthroughCasesInSwitch:!0,baseUrl:".",paths:{"@repo/ui/*":["./src/*"],"@repo/ui/components":["./src/components"],"@repo/ui/lib":["./src/lib"],"@repo/ui/lib/utils":["./src/lib/utils"],"@repo/ui/hooks":["./src/hooks"]}},include:["src"],exclude:["node_modules"]},null,2)),await m.writeFile(s.join(e,"packages","config","package.json"),JSON.stringify({name:"@repo/config",version:"0.1.0",private:!0},null,2)),await m.writeFile(s.join(e,".gitignore"),`# dependencies
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
`),await m.writeFile(s.join(e,"README.md"),`# ${s.basename(e)}

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
`)}var ve=k.object({cwd:k.string(),yes:k.boolean(),defaults:k.boolean(),force:k.boolean(),silent:k.boolean()}),Se=ve.extend({components:k.array(k.string()).optional()});async function Ht(e,...t){try{let n=Se.parse({...e,cwd:J.resolve(e.cwd??process.cwd()),isNewProject:!1,components:t});if(await je(n)===null)return;r.break(),r.log(`${l.success("Success!")} Project initialization completed.
You may now add components.`),r.break()}catch(n){r.break(),N(n)}}async function je(e){let t;if(e.createMonorepo){let{packageManager:w,version:h}=await j(e.cwd);return await A({cwd:e.cwd,name:e.name||"my-app",packageManager:w,packageManagerVersion:h,typescript:!0,skipInstall:!1}),null}let n=J.resolve(e.cwd,"package.json");if(await ae.access(n).then(()=>!0).catch(()=>!1))t=await b(e.cwd);else{let{createMonorepo:w}=await S({type:"confirm",name:"createMonorepo",message:"No project found. Would you like to create a new monorepo?",initial:!1});if(w){let{projectName:h}=await S({type:"text",name:"projectName",message:"What is your project named?",initial:"my-app",validate:x=>x?/^[a-z0-9-]+$/.test(x)?!0:"Project name must contain only lowercase letters, numbers, and hyphens":"Project name is required"}),{typescript:M}=await S({type:"confirm",name:"typescript",message:"Would you like to use TypeScript?",initial:!0}),I=await j(e.cwd);return await A({cwd:e.cwd,name:h||"my-app",packageManager:I.packageManager,packageManagerVersion:I.version,typescript:M,skipInstall:!1}),null}r.error(`No ${l.info("package.json")} found in ${l.info(e.cwd)}.`),r.error(`Please run ${l.info("init")} in a valid Node.js project or create a monorepo.`),process.exit(1)}let i=await te(e);i.errors["1"]&&process.exit(1),t=i.projectInfo;let a=await ee(e.cwd,t),g=a?await Ie(a,e):await Me(await O(e.cwd));if(!e.yes){let{proceed:w}=await S({type:"confirm",name:"proceed",message:`Write configuration to ${l.info("components.json")}. Proceed?`,initial:!0});w||process.exit(0)}let p=d("Writing components.json.").start(),u=J.resolve(e.cwd,"components.json");await ae.writeFile(u,JSON.stringify(g,null,2),"utf8"),p.succeed();let c=await P(e.cwd,g),f=["index",...e.components||[]];return await se(f,c,{overwrite:!0,silent:e.silent,isNewProject:e.isNewProject||t?.framework.name==="next-app"}),c}async function Me(e=null){r.info("");let t=await S([{type:"toggle",name:"typescript",message:`Would you like to use ${l.info("TypeScript")} (recommended)?`,initial:e?.tsx??!0,active:"yes",inactive:"no"},{type:"text",name:"components",message:`Configure the import alias for ${l.info("components")}:`,initial:e?.aliases.components??W},{type:"text",name:"utils",message:`Configure the import alias for ${l.info("utils")}:`,initial:e?.aliases.utils??L},{type:"toggle",name:"rsc",message:`Are you using ${l.info("React Server Components")}?`,initial:e?.rsc??!0,active:"yes",inactive:"no"}]);return $.parse({$schema:R,system:"chakra",style:"default",rsc:t.rsc,tsx:t.typescript,aliases:{utils:t.utils,components:t.components,lib:t.components.replace(/\/components$/,"lib"),hooks:t.components.replace(/\/components$/,"hooks")}})}async function Ie(e,t){let n=e.style;if(!t.defaults){let o=await V();n=(await S([{type:"select",name:"style",message:`Which ${l.info("style")} would you like to use?`,choices:o.map(a=>({title:a.label,value:a.name})),initial:o.findIndex(a=>a.name===n)}])).style}return $.parse({$schema:e?.$schema,style:n,rsc:e?.rsc,tsx:e?.tsx,aliases:e?.aliases})}export{se as a,ve as b,Ht as c,je as d};
//# sourceMappingURL=chunk-OHKGHNR5.js.map