import { getLatestChangelog } from '@/lib/get-latest-changelog'
import { highlightCode } from '@/lib/highlight-code'
import { Box, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react'

import f from '../features/features.module.css'
import { HeroActions, HeroProof } from '../hero.ui'
import { type HeroFile, heroFiles, heroOpenFiles } from './hero-files'
import { HeroIde } from './hero-ide'
import s from './hero.module.css'

/**
 * Homepage hero: the starter's repo in an editor, with an agent adding a
 * feature by following the conventions in AGENTS.md. Illustrative content.
 */

const title = 'The TanStack Start starter kit for developers and agents.'
const description =
  'Production ready SaaS starter kit with strict types, consistent patterns, and test coverage that keep your agents on track.'
const docsHref = '/docs/starter-kits/tanstack-start'

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function latest() {
  const changelog = getLatestChangelog(['tanstack', 'tanstack-start', 'nextjs'])
  return changelog
    ? { title: changelog.title, link: `/changelog/${changelog.slug}` }
    : null
}

function HeroTitle() {
  return (
    <Heading
      as="h1"
      fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '7xl' }}
      lineHeight="1.05"
      letterSpacing="tight"
      textWrap="balance"
      maxW="4xl"
    >
      {title}
    </Heading>
  )
}

type HeroProps = { latestChangelog: { title: string; link: string } | null }

export function HeroWorkspaceSection() {
  return <HeroWorkspace latestChangelog={latest()} />
}

function markLines(html: string, lines: number[], className: string) {
  let line = 0
  return html.replace(/<span class="line">/g, (match) => {
    line += 1
    return lines.includes(line) ? `<span class="line ${className}">` : match
  })
}

const agentSteps: Array<{
  kind: 'read' | 'edit' | 'run'
  text: string
  meta?: string
}> = [
  { kind: 'read', text: 'AGENTS.md' },
  { kind: 'read', text: 'contacts.router.ts' },
  { kind: 'edit', text: 'contacts.router.ts', meta: '+14' },
  { kind: 'edit', text: 'contacts-list-page.tsx', meta: '+14' },
  { kind: 'run', text: 'pnpm typecheck', meta: 'passed' },
  { kind: 'run', text: 'pnpm test:smoke', meta: '1 passed' },
]

async function renderFile(file: HeroFile) {
  const html = await highlightCode(file.code, { lang: file.lang })
  return file.added ? markLines(html, file.added, 'is-added') : html
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

async function HeroWorkspace({ latestChangelog }: HeroProps) {
  const files = await Promise.all(
    heroFiles.map(async (file) => ({
      path: file.path,
      html: await renderFile(file),
      added: file.added?.length ?? 0,
    })),
  )

  return (
    <Box pt={{ base: '24', md: '36' }}>
      <Container maxW="8xl">
        <Stack gap={{ base: '8', md: '10' }}>
          <HeroTitle />
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'start', md: 'end' }}
            gap={{ base: '6', md: '8' }}
          >
            <Stack gap={{ base: '6', md: '8' }} maxW="xl">
              <Text textStyle={{ base: 'md', md: 'lg' }} color="fg.subtle">
                {description}
              </Text>
              <HeroActions docsHref={docsHref} />
            </Stack>
            <HeroProof latestChangelog={latestChangelog} />
          </Flex>
        </Stack>

        <div className={cx(f.stage, s.stage, s.stageWorkspace)}>
          <div className={cx(f.back, s.workspaceBack)}>
            <HeroIde files={files} openFiles={heroOpenFiles} />
          </div>

          <div
            className={cx(f.front, f.terminal, s.workspaceTerminal)}
            aria-hidden="true"
          >
            <div className={f.terminalHead}>
              <i />
              <i />
              <i />
              <span>Agent</span>
            </div>
            <div className={cx(f.terminalBody, s.agentBody)}>
              <p className={s.prompt}>
                <span className={f.prompt}>›</span> Add a CSV export to
                contacts, behind the export-contacts flag
              </p>
              {agentSteps.map((step) => (
                <p key={step.kind + step.text} className={s.step}>
                  <span className={step.kind === 'run' ? f.ok : f.dim}>
                    {step.kind === 'run' ? '✓' : '●'}
                  </span>
                  <span className={f.dim}>
                    {step.kind === 'read'
                      ? 'Read'
                      : step.kind === 'edit'
                        ? 'Edit'
                        : 'Run'}
                  </span>
                  <span className={s.stepText}>{step.text}</span>
                  {step.meta && (
                    <span className={step.kind === 'edit' ? s.diffAdd : f.ok}>
                      {step.meta}
                    </span>
                  )}
                </p>
              ))}
              <p className={s.done}>
                Done.
                <span className={f.caret} />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  )
}
