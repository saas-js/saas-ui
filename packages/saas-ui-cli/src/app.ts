import {
  buildInstallCommand,
  buildUninstallCommand,
} from '@stricli/auto-complete'
import { buildApplication, buildRouteMap } from '@stricli/core'

import { description, version } from '../package.json'
import { addCommand } from './commands/add/command'
import { diffCommand } from './commands/diff/command'
import { initCommand } from './commands/init/command'
import { listCommand } from './commands/list/command'
import { loginCommand } from './commands/login/command'
import { migrateCommand } from './commands/migrate/command'
import { updateCommand } from './commands/update/command'

const routes = buildRouteMap({
  routes: {
    login: loginCommand,
    init: initCommand,
    add: addCommand,
    diff: diffCommand,
    list: listCommand,
    migrate: migrateCommand,
    update: updateCommand,
    install: buildInstallCommand('cli', { bash: '__cli_bash_complete' }),
    uninstall: buildUninstallCommand('cli', { bash: true }),
  },
  docs: {
    brief: description,
    hideRoute: {
      install: true,
      uninstall: true,
    },
  },
})

export const applicationName = 'saas-ui'

export const app = buildApplication(routes, {
  name: applicationName,
  scanner: {
    caseStyle: 'allow-kebab-for-camel',
  },
  versionInfo: {
    currentVersion: version,
  },
})
