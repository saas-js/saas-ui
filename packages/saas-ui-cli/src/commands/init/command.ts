import { buildCommand } from '@stricli/core'

function parseColorMode(value: string): 'on' | 'off' {
  if (value === 'on' || value === 'off') return value
  throw new Error('Expected "on" or "off".')
}

function parseSystem(value: string): 'chakra' {
  if (value === 'chakra') return value
  throw new Error(
    'Init currently supports only the "chakra" system. Panda requires a separate setup plan.',
  )
}

export const initCommand = buildCommand({
  loader: async () => {
    const { init } = await import('./impl')
    return init
  },
  parameters: {
    flags: {
      yes: {
        kind: 'boolean',
        default: false,
        brief: 'Skip confirmation prompt.',
      },
      defaults: {
        kind: 'boolean',
        default: false,
        brief: 'Use default configuration.',
      },
      force: {
        kind: 'boolean',
        default: false,
        brief: 'Force overwrite of existing configuration.',
      },
      cwd: {
        kind: 'parsed',
        parse: String,
        brief: 'The working directory. defaults to the current directory.',
        default: process.cwd(),
      },
      silent: {
        kind: 'boolean',
        default: false,
        brief: 'Mute output.',
      },
      colorMode: {
        kind: 'parsed',
        parse: parseColorMode,
        optional: true,
        brief: 'Install color mode support: on or off.',
      },
      starter: {
        kind: 'boolean',
        default: false,
        brief: 'Install the documented starter component set.',
      },
      style: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'Registry style to use.',
      },
      system: {
        kind: 'parsed',
        parse: parseSystem,
        optional: true,
        brief: 'Component system to use. Currently chakra only.',
      },
      componentsAlias: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'Import alias for components.',
      },
      utilsAlias: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'Import alias for utilities.',
      },
      uiAlias: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'Import alias for UI components.',
      },
      libAlias: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'Import alias for shared libraries.',
      },
      hooksAlias: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'Import alias for hooks.',
      },
      iconsAlias: {
        kind: 'parsed',
        parse: String,
        optional: true,
        brief: 'Import alias for icons.',
      },
    },
    positional: {
      kind: 'array',
      parameter: {
        parse: String,
        brief: 'Optional starter components to install.',
      },
      minimum: 0,
    },
  },
  docs: {
    brief: 'Initialize a project.',
  },
})
