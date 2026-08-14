import { buildRouteMap } from '@stricli/core'

import { reactToRegistryCommand } from './react-to-registry/command'

export const migrateCommand = buildRouteMap({
  routes: {
    'react-to-registry': reactToRegistryCommand,
  },
  docs: {
    brief: 'Migrate legacy Saas UI projects',
  },
})
