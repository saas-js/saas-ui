#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  pnpm install
else 
  pnpm install
fi