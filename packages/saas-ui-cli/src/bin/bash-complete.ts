#!/usr/bin/env node
import { proposeCompletions } from '@stricli/core'

import { app } from '../app'
import { buildContext } from '../context'

const inputs = process.argv.slice(3)
if (process.env['COMP_LINE']?.endsWith(' ')) {
  inputs.push('')
}
await proposeCompletions(app, inputs, buildContext(process))
