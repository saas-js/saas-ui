module.exports = {
  '*.{js,ts,tsx}': 'yarn run eslint',
  '*.{js,ts,tsx,css,md}': 'prettier --write',
  '*.{ts,tsx}': () => 'yarn run typecheck',
}
