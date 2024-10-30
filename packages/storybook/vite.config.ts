import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
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
