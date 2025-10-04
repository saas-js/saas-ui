#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  npx vercel-submodules --all --verbose && yarn
else 
  npx vercel-submodules --all --verbose && pnpm install
fi