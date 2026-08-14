import { config as loadEnv } from 'dotenv'
import path from 'node:path'

/** Load local registry credentials without overriding the command environment. */
export function loadProjectEnv(cwd: string) {
  const directories = [...new Set([path.resolve(cwd), process.cwd()])]
  loadEnv({
    path: directories.flatMap((directory) => [
      path.join(directory, '.env.local'),
      path.join(directory, '.env'),
    ]),
    override: false,
    quiet: true,
  })
}
