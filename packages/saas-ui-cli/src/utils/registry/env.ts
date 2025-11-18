export function expandEnvVars(value: string): string {
  return value.replace(/\${(\w+)}/g, (_match, key) => process.env[key] || '')
}

export function extractEnvVars(value: string): Array<string> {
  const vars: Array<string> = []
  const regex = /\${(\w+)}/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(value)) !== null) {
    if (match[1]) {
      vars.push(match[1])
    }
  }

  return vars
}
