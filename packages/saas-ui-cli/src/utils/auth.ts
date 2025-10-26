import { readFileSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const CONFIG_FILE = '.saas-ui'

export type AuthData = {
  token: string
}

export async function writeConfig(data: AuthData) {
  try {
    const homeDir = os.homedir()
    const filePath = path.join(homeDir, CONFIG_FILE)
    writeFileSync(filePath, JSON.stringify(data))
  } catch (error) {
    console.error('Error writing to local config file', error)
  }
}

export async function readConfig(): Promise<AuthData | null> {
  try {
    const homeDir = os.homedir()
    const filePath = path.join(homeDir, CONFIG_FILE)
    const data = readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch {
    return null
  }
}
