const SAAS_JS = 'https://www.saas-js.com'

/**
 * Legacy saas-ui.dev URLs that earned search impressions before the v3 docs
 * restructure. Every entry here returned a 404 after the move; without them the
 * accumulated ranking signal is dropped instead of passed to the new location.
 */
export const saasUiRedirects: Record<string, string> = {
  // --- docs: category segment dropped from component URLs ---
  '/docs/components/layout/app-shell': '/docs/components/app-shell',
  '/docs/components/layout/app-shell/theming': '/docs/components/app-shell',
  '/docs/components/layout/sidebar': '/docs/components/sidebar',
  '/docs/components/layout/navbar': '/docs/components/navbar',
  '/docs/components/layout/navbar/props': '/docs/components/navbar',
  '/docs/components/layout/navbar/theming': '/docs/components/navbar',
  '/docs/components/layout/split-page/theming': '/docs/components/split-page',
  '/docs/components/layout/section/theming': '/docs/components/page',
  '/docs/components/layout/toolbar': '/docs/components/group',
  '/docs/components/data-display/data-table': '/docs/components/data-table',
  '/docs/components/data-display/timeline': '/docs/components/timeline',
  '/docs/components/data-display/empty-state': '/docs/components/empty-state',
  '/docs/components/data-display/icon-badge': '/docs/components/icon-badge',
  '/docs/components/data-display/divider': '/docs/components/separator',
  '/docs/components/data-display/property': '/docs/components/data-list',
  '/docs/components/data-display/property/props': '/docs/components/data-list',
  '/docs/components/data-display/structured-list': '/docs/components/list',
  '/docs/components/forms/file-upload': '/docs/components/file-upload',
  '/docs/components/forms/file-upload/theming': '/docs/components/file-upload',
  '/docs/components/forms/field': '/docs/components/field',
  '/docs/components/forms/field/props': '/docs/components/field',
  '/docs/components/forms/select': '/docs/components/select',
  '/docs/components/forms/select/props': '/docs/components/select',
  '/docs/components/forms/password-input': '/docs/components/password-input',
  '/docs/components/forms/search-input': '/docs/components/input',
  '/docs/components/forms/object-field': '/docs/forms/fields',
  '/docs/components/forms/array-field/props': '/docs/forms/fields',
  '/docs/components/forms/auto-form': '/docs/forms/overview',
  '/docs/components/forms/form': '/docs/forms/overview',
  '/docs/components/forms/form/props': '/docs/forms/overview',
  '/docs/components/forms/form-layout': '/docs/forms/overview',
  '/docs/components/forms/step-form': '/docs/components/steps',
  '/docs/components/navigation/stepper': '/docs/components/steps',
  '/docs/components/navigation/command-bar': '/docs/components/overview',
  '/docs/components/navigation/hotkeys': '/docs/components/overview',
  '/docs/components/navigation/hotkeys/props': '/docs/components/overview',
  '/docs/components/feedback/loader': '/docs/components/spinner',
  '/docs/components/feedback/loader/props': '/docs/components/spinner',
  '/docs/components/feedback/snackbar': '/docs/components/toast',
  '/docs/components/feedback/banner': '/docs/components/alert',
  '/docs/components/feedback/banner/theming': '/docs/components/alert',
  '/docs/components/feedback/nprogress': '/docs/components/progress',
  '/docs/components/feedback/nprogress/props': '/docs/components/progress',
  '/docs/components/overlay/modals-manager': '/docs/components/overlay-manager',
  '/docs/components/overlay/context-menu': '/docs/components/menu',
  '/docs/components/overlay/form-dialog': '/docs/components/dialog',
  '/docs/components/overlay/menu-dialog/props': '/docs/components/dialog',
  '/docs/components/date-time/date-picker': '/docs/components/date-picker',
  '/docs/components/date-time/date-picker/props': '/docs/components/date-picker',
  '/docs/components/date-time/date-picker-modal': '/docs/components/date-picker',
  '/docs/components/date-time/date-picker-static/props':
    '/docs/components/date-picker',
  '/docs/components/date-time/date-input': '/docs/components/date-picker',
  '/docs/components/date-time/date-input/props': '/docs/components/date-picker',
  '/docs/components/date-time/date-range-input': '/docs/components/date-picker',
  '/docs/components/date-time/date-range-input/props':
    '/docs/components/date-picker',
  '/docs/components/date-time/date-range-picker/props':
    '/docs/components/date-picker',
  '/docs/components/visualization/line-chart': '/docs/charts/line',
  '/docs/components/visualization/area-chart': '/docs/charts/area',
  '/docs/components/utils/resize-box': '/docs/components/splitter',
  '/docs/components/utils/resize-box/props': '/docs/components/splitter',
  '/docs/components/utils/feature-flags': '/docs/components/overview',
  '/docs/components/utils/error-boundary': '/docs/components/overview',
  '/docs/components/engagement/beacon': '/docs/components/overview',
  '/docs/components/web3/address': '/docs/components/overview',
  '/docs/components/advanced-data/filters': '/docs/components/filters',
  '/docs/components/advanced-data/data-grid': '/docs/pro/components/data-grid',
  '/docs/components/advanced-data/data-grid/props':
    '/docs/pro/components/data-grid',
  '/docs/components/advanced-data/data-grid/theming':
    '/docs/pro/components/data-grid',
  '/docs/components/advanced-data/kanban': '/docs/pro/components/kanban',
  '/docs/components/advanced-data/kanban/theming': '/docs/pro/components/kanban',
  '/docs/components/advanced-data/bulk-actions': '/docs/components/action-bar',
  '/docs/components': '/docs/components/overview',
  '/docs/hooks/use-local-storage': '/docs/components/overview',

  // --- docs: core/* folded into getting-started, styling and theming ---
  '/docs/core/theming/saas-ui-theme': '/docs/theming/overview',
  '/docs/core/theming/chakra-ui-theme': '/docs/theming/overview',
  '/docs/core/theming/fonts': '/docs/theming/typography',
  '/docs/core/principles': '/docs/getting-started/introduction',
  '/docs/core/quickstarts': '/docs/getting-started/installation',
  '/docs/core/installation/vite-guide': '/docs/getting-started/frameworks/vite',
  '/docs/core/installation/nextjs-guide':
    '/docs/getting-started/frameworks/next-app',
  '/docs/core/installation/nextjs-pages-guide':
    '/docs/getting-started/frameworks/next-pages',
  '/docs/core/installation/remix-guide':
    '/docs/getting-started/frameworks/react-router',
  '/themes': '/docs/theming/overview',

  // --- pro ---
  '/docs/pro': '/docs/pro/getting-started/introduction',
  '/docs/pro/overview': '/docs/pro/getting-started/introduction',
  '/docs/pro/upgrading-to-v1': '/docs/getting-started/migration',
  '/docs/pro/installation/dependabot': '/docs/pro/getting-started/introduction',
  '/docs/pro/installation/private-npm/overview':
    '/docs/pro/getting-started/introduction',
  '/docs/pro/installation/private-npm/npm':
    '/docs/pro/getting-started/introduction',
  '/docs/pro/installation/private-npm/pnpm':
    '/docs/pro/getting-started/introduction',
  '/docs/pro/installation/private-npm/yarn':
    '/docs/pro/getting-started/introduction',

  // --- starter kits and auth guides now live on saas-js.com ---
  '/nextjs-starter-kit': `${SAAS_JS}/nextjs`,
  '/docs/nextjs-starter-kit': `${SAAS_JS}/docs/starter-kits/nextjs`,
  '/docs/tanstack-router-starter-kit': `${SAAS_JS}/docs/starter-kits/tanstack-start`,
  // There is no /authentication index page — better-auth is the auth doc now.
  '/docs/guides/auth/clerk': `${SAAS_JS}/docs/starter-kits/nextjs/authentication/better-auth`,
  '/docs/guides/auth/supabase': `${SAAS_JS}/docs/starter-kits/nextjs/authentication/better-auth`,
  '/docs/guides/auth/magic': `${SAAS_JS}/docs/starter-kits/nextjs/authentication/better-auth`,
  '/docs/components/authentication/auth': `${SAAS_JS}/docs/starter-kits/nextjs/authentication/better-auth`,
  '/docs/components/authentication/auth-provider': `${SAAS_JS}/docs/starter-kits/nextjs/authentication/better-auth`,
  '/pricing/figma': '/pricing',
}

/**
 * Prefix moves where every descendant maps to the same subtree. Checked after
 * the exact map, longest prefix first.
 */
const prefixRedirects: Array<[string, string]> = [
  ['/docs/nextjs-starter-kit', `${SAAS_JS}/docs/starter-kits/nextjs`],
  [
    '/docs/tanstack-router-starter-kit',
    `${SAAS_JS}/docs/starter-kits/tanstack-start`,
  ],
  ['/blog', `${SAAS_JS}/blog`],
]

export function resolveSaasUiRedirect(pathname: string): string | undefined {
  const path = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname

  const exact = saasUiRedirects[path]
  if (exact && exact !== path) return exact

  for (const [prefix, destination] of prefixRedirects) {
    if (path === prefix) return destination
    if (path.startsWith(`${prefix}/`)) {
      return `${destination}${path.slice(prefix.length)}`
    }
  }

  return undefined
}
