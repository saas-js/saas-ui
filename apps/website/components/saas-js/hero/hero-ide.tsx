'use client'

import { useMemo, useState } from 'react'

import { TreeView, createTreeCollection } from '@chakra-ui/react'
import { LuFileCode, LuFileText, LuFolder, LuFolderOpen } from 'react-icons/lu'

import f from '../features/features.module.css'
import s from './hero.module.css'

export interface IdeFile {
  path: string
  html: string
  /** Lines added by the agent, shown as a diff stat on the tab. */
  added: number
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function basename(path: string) {
  return path.slice(path.lastIndexOf('/') + 1)
}

/** Every folder path above a file, so selecting it can reveal it. */
function ancestors(path: string) {
  const parts = path.split('/')
  return parts
    .slice(0, -1)
    .map((_, index) => parts.slice(0, index + 1).join('/'))
}

/** Folders first, then files, alphabetical within each. */
function sortNodes(nodes: Node[]) {
  nodes.sort((a, b) =>
    !!a.children === !!b.children
      ? a.name.localeCompare(b.name)
      : a.children
        ? -1
        : 1,
  )
  for (const node of nodes) if (node.children) sortNodes(node.children)
  return nodes
}

function buildTree(paths: string[]) {
  const root: Node = { id: 'ROOT', name: '', children: [] }
  for (const path of paths) {
    let parent = root
    path.split('/').forEach((name, index, parts) => {
      const id = parts.slice(0, index + 1).join('/')
      const isFile = index === parts.length - 1
      let node = parent.children!.find((child) => child.id === id)
      if (!node) {
        node = isFile ? { id, name } : { id, name, children: [] }
        parent.children!.push(node)
      }
      parent = node
    })
  }
  sortNodes(root.children!)
  return root
}

export function HeroIde({
  files,
  openFiles,
}: {
  files: IdeFile[]
  openFiles: string[]
}) {
  const byPath = useMemo(
    () => new Map(files.map((file) => [file.path, file])),
    [files],
  )

  const collection = useMemo(
    () =>
      createTreeCollection<Node>({
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.name,
        rootNode: buildTree(files.map((file) => file.path)),
      }),
    [files],
  )

  const [tabs, setTabs] = useState(openFiles)
  const [selected, setSelected] = useState(openFiles[0])
  const [expanded, setExpanded] = useState(() =>
    Array.from(new Set(openFiles.flatMap(ancestors))),
  )

  function open(path: string) {
    if (!byPath.has(path)) return
    setSelected(path)
    setTabs((current) =>
      current.includes(path) ? current : [...current, path],
    )
    setExpanded((current) =>
      Array.from(new Set([...current, ...ancestors(path)])),
    )
  }

  const file = byPath.get(selected)

  return (
    <div className={cx(f.panel, s.ide)}>
      <aside className={s.explorer}>
        <span className={s.explorerTitle}>saas-js</span>
        <TreeView.Root
          collection={collection}
          size="sm"
          aria-label="Starter kit files"
          className={s.treeView}
          selectedValue={[selected]}
          onSelectionChange={(details) => {
            const [value] = details.selectedValue
            if (value) open(value)
          }}
          expandedValue={expanded}
          onExpandedChange={(details) => setExpanded(details.expandedValue)}
        >
          <TreeView.Tree>
            <TreeView.Node<Node>
              indentGuide={<TreeView.BranchIndentGuide />}
              render={({ node, nodeState }) =>
                node.children ? (
                  <TreeView.BranchControl>
                    {nodeState.expanded ? <LuFolderOpen /> : <LuFolder />}
                    <TreeView.BranchText>{node.name}</TreeView.BranchText>
                  </TreeView.BranchControl>
                ) : (
                  <TreeView.Item>
                    {node.name.endsWith('.md') ? (
                      <LuFileText />
                    ) : (
                      <LuFileCode />
                    )}
                    <TreeView.ItemText>{node.name}</TreeView.ItemText>
                    {byPath.get(node.id)?.added ? (
                      <span className={s.treeModified}>M</span>
                    ) : null}
                  </TreeView.Item>
                )
              }
            />
          </TreeView.Tree>
        </TreeView.Root>
      </aside>

      <div className={s.editor}>
        <div className={f.codeTabs} role="tablist" aria-label="Open files">
          {tabs.map((path) => {
            const tab = byPath.get(path)!
            return (
              <button
                key={path}
                type="button"
                role="tab"
                aria-selected={path === selected}
                className={cx(
                  f.codeTab,
                  s.tabButton,
                  path === selected && f.codeTabActive,
                )}
                onClick={() => open(path)}
              >
                {path.endsWith('.md') ? (
                  <LuFileText size={13} />
                ) : (
                  <LuFileCode size={13} />
                )}
                {basename(path)}
                {tab.added > 0 && (
                  <span className={s.diffAdd}>+{tab.added}</span>
                )}
              </button>
            )
          })}
        </div>
        {file && (
          <div
            key={file.path}
            className={cx(f.code, s.diffCode)}
            role="tabpanel"
            aria-label={file.path}
            dangerouslySetInnerHTML={{ __html: file.html }}
          />
        )}
      </div>
    </div>
  )
}
