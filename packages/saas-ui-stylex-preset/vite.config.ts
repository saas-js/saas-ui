import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            '@stylexjs/babel-plugin',
            {
              dev: process.env.NODE_ENV === 'development',
              runtimeInjection: true,
              genConditionalClasses: true,
              treeshakeCompensation: true,
              unstable_moduleResolution: {
                type: 'commonJS',
                rootDir,
              },
            },
          ],
        ],
      },
    }),
  ],
})
