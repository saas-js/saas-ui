#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  npx vercel-submodules --all --verbose && yarn
else 
  pnpm install
fi