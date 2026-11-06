/**
 * Polar's Next.js Checkout adapter appends `checkoutId` to POLAR_SUCCESS_URL.
 * Keep `checkout_id` as a fallback for older bookmarks / Polar dashboard URLs.
 */
export function polarCheckoutId(searchParams: {
  checkoutId?: string
  checkout_id?: string
}) {
  return searchParams.checkoutId || searchParams.checkout_id || undefined
}
