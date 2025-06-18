#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  pnpm build:web
else 
  pnpm build:web
fi