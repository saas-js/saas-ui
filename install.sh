#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  yarn
else 
  pnpm install
fi