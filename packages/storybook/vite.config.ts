import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@saas-ui/storybook-addon'],
  },
  resolve: {
    alias: [
      {
        find: /(@saas-ui\/(?!storybook-addon\/?)[a-z-/]+)$/,
        replacement: '$1/src',
      },
    ],
  },
})
