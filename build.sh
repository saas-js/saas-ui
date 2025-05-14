#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  yarn build:web
else 
  pnpm build:packages && pnpm build:web
fi