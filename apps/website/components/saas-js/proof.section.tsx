import { highlightCode } from '@/lib/highlight-code'

import { proofFiles } from './proof-files'
import { ProofWorkspace } from './proof-workspace'

export async function ProofSection() {
  const files = await Promise.all(
    proofFiles.map(async (file) => ({
      ...file,
      highlighted: await highlightCode(file.code, { lang: file.language }),
    })),
  )

  return <ProofWorkspace files={files} />
}
