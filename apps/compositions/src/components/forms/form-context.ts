'use client'

import { createFormHookContexts } from '@tanstack/react-form'

/**
 * Shared form/field contexts used by every field and form component in this
 * module. Kept in its own file (separate from `create-form.tsx`) so field
 * components can import the hooks without creating a circular dependency with
 * the `createFormHook` factory that registers those same components.
 */
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()
