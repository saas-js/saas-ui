import * as React from 'react'

import { SaasContext } from '@saas-ui/provider'

export interface ErrorBoundaryProps {
  errorComponent?: React.ReactNode
  children: React.ReactNode
}

interface ErrorBoundaryState {
  error?: Error | null
  errorInfo?: any
}

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
      return this.props.errorComponent || <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
