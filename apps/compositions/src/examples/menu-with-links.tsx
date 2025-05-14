'use client'

import { Button, Menu } from '@saas-ui/react'

export const MenuWithLinks = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button size="sm" variant="outline">
          Select Anime
        </Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item asChild value="naruto">
          <a
            href="https://www.crunchyroll.com/naruto"
            target="_blank"
            rel="noreferrer"
          >
            Naruto
          </a>
        </Menu.Item>
        <Menu.Item asChild value="one-piece">
          <a
            href="https://www.crunchyroll.com/one-piece"
            target="_blank"
            rel="noreferrer"
          >
            One Piece
          </a>
        </Menu.Item>
        <Menu.Item asChild value="attack-on-titan">
          <a
            href="https://www.crunchyroll.com/attack-on-titan"
            target="_blank"
            rel="noreferrer"
          >
            Attack on Titan
          </a>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  )
}
