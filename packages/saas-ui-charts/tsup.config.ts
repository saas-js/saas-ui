import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'tsup',
  target: 'es2019',
  dts: {
    resolve: true,
  },
  clean: true,
  sourcemap: true,
  external: [
    'react',
    'recharts',
    '@chakra-ui/react',
    '@chakra-ui/system',
    '@chakra-ui/utils',
  ],
  format: ['esm', 'cjs'],

  treeshake: 'smallest',
})
