import { exportTokens } from './export-tokens'

async function build() {
  try {
    console.log('🚀 Building Tailwind preset...\n')

    await exportTokens()

    console.log('\n✨ Build complete!')
  } catch (error) {
    console.error('❌ Build failed:', error)
    process.exit(1)
  }
}

build()
