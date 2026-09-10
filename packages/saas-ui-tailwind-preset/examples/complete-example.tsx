/**
 * Complete Page Example
 *
 * A full-featured example showing how multiple components work together
 * to create a cohesive user interface using the Tailwind preset.
 */

import { Button } from './button'
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from './card'
import { Badge } from './badge'
import { Input, Field } from './input'
import { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription } from './alert'

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-border bg-bg-panel">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-fg-emphasized">
                Dashboard
              </h1>
              <nav className="flex gap-6">
                <a
                  href="#"
                  className="text-fg hover:text-fg-emphasized transition-colors"
                >
                  Overview
                </a>
                <a
                  href="#"
                  className="text-fg-muted hover:text-fg-emphasized transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="text-fg-muted hover:text-fg-emphasized transition-colors"
                >
                  Settings
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Notifications
              </Button>
              <Button variant="solid" size="sm">
                New Project
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Alert Banner */}
        <div className="mb-6">
          <Alert status="info" variant="subtle">
            <AlertIcon>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm.93 12.44H7.07v-1.88h1.86v1.88zm0-3.5H7.07V4.31h1.86v4.63z" />
              </svg>
            </AlertIcon>
            <AlertContent>
              <AlertTitle>New features available</AlertTitle>
              <AlertDescription>
                Check out our latest updates to improve your workflow.
              </AlertDescription>
            </AlertContent>
          </Alert>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant="outline">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-fg-muted mb-1">
                    Total Projects
                  </p>
                  <p className="text-3xl font-bold text-fg-emphasized">
                    24
                  </p>
                </div>
                <Badge variant="subtle" colorScheme="green">
                  +12%
                </Badge>
              </div>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-fg-muted mb-1">
                    Active Tasks
                  </p>
                  <p className="text-3xl font-bold text-fg-emphasized">
                    142
                  </p>
                </div>
                <Badge variant="subtle" colorScheme="blue">
                  Active
                </Badge>
              </div>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-fg-muted mb-1">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-fg-emphasized">
                    89
                  </p>
                </div>
                <Badge variant="subtle" colorScheme="accent">
                  This month
                </Badge>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects List */}
          <div className="lg:col-span-2">
            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>
                      Your most recently updated projects
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-[var(--spacing-4)]">
                  {/* Project Item */}
                  <div className="flex items-center justify-between p-4 rounded-md hover:bg-bg-subtle transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-fg-emphasized mb-1">
                        Website Redesign
                      </h4>
                      <p className="text-sm text-fg-muted">
                        Updated 2 hours ago
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="subtle" colorScheme="green" size="sm">
                        In Progress
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-md hover:bg-bg-subtle transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-fg-emphasized mb-1">
                        Mobile App Launch
                      </h4>
                      <p className="text-sm text-fg-muted">
                        Updated 5 hours ago
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="subtle" colorScheme="blue" size="sm">
                        Review
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-md hover:bg-bg-subtle transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-fg-emphasized mb-1">
                        API Documentation
                      </h4>
                      <p className="text-sm text-fg-muted">
                        Updated yesterday
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="subtle" colorScheme="orange" size="sm">
                        Pending
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-[var(--spacing-6)]">
            {/* Quick Actions */}
            <Card variant="outline">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="space-y-[var(--spacing-2)]">
                  <Button variant="outline" className="w-full justify-start">
                    Create New Project
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Invite Team Member
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Export Report
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Contact Form */}
            <Card variant="outline">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Have questions? Send us a message
                </CardDescription>
              </CardHeader>
              <CardBody>
                <form className="space-y-[var(--spacing-4)]">
                  <Field label="Email" required>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      size="sm"
                    />
                  </Field>
                  <Field label="Message" required>
                    <textarea
                      className="w-full h-24 px-3 py-2 text-sm rounded-md border border-border bg-transparent text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent-focus-ring focus:border-accent-fg transition-all"
                      placeholder="Your message..."
                    />
                  </Field>
                  <Button variant="solid" className="w-full" size="sm">
                    Send Message
                  </Button>
                </form>
              </CardBody>
            </Card>

            {/* Status */}
            <Card variant="subtle">
              <CardBody>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-fg-muted">
                    All systems operational
                  </span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-bg-panel mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between text-sm text-fg-muted">
            <p>© 2025 Your Company. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-fg transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-fg transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-fg transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Usage:
// Simply render <DashboardPage /> in your app
// Make sure you have imported the theme.css in your main CSS file:
// @import "tailwindcss";
// @import "@saas-ui/tailwind-preset/theme.css";
