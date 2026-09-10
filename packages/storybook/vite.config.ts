import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // optimizeDeps: {
  //   include: ['@saas-ui/storybook-addon'],
  // },
  resolve: {
    conditions: ['import', 'sui'],
  },
  // resolve: {
  //   alias: [
  //     {
  //       find: /(@saas-ui\/(?!storybook-addon\/?)[a-z-/]+)$/,
  //       replacement: '$1/src',
  //     },
  //   ],
  // },
})
