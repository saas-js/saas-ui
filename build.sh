#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  yarn build:web
else 
  pnpm build:web
fi