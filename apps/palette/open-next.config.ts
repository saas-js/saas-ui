import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// The only route renders per request from the URL, so no incremental cache.
export default defineCloudflareConfig()
