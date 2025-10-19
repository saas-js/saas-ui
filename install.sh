#!/bin/bash

if [[ $VERCEL_ENV == "production"  ]] ; then
  # Configure git to use GITHUB_TOKEN for private submodule access
  if [ -n "$GITHUB_TOKEN" ]; then
    git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "git@github.com:"
    git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
  fi

  npx vercel-submodules --all --verbose && yarn
else
  pnpm install
fi