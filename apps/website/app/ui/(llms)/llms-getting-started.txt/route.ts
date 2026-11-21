import { bundleResponse, bundles } from '../shared'

export const dynamic = 'force-static'

export const GET = () => bundleResponse(bundles.gettingStarted)
