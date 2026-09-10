#!/usr/bin/env node
import { run } from '@stricli/core'

import { app } from '../app'
import { buildContext } from '../context'

await run(app, process.argv.slice(2), buildContext(process))
