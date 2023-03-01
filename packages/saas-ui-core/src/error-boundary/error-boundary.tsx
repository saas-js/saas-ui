import * as React from 'react'

import { SaasContext } from '../provider'

export interface ErrorBoundaryProps {
  fallback?: React.ReactNode
  children: React.ReactNode
}

export interface ErrorBoundaryState {
  error?: Error | null
  errorInfo?: any
}
/**
 * A container component that catches errors and displays a fallback UI.
 *
 * @see Docs https://saas-ui.dev/docs/components/utils/error-boundary
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState

  declare context: React.ContextType<typeof SaasContext>

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.context.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.error) {
      return this.props.fallback || <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
