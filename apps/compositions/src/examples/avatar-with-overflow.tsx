import { Group } from '@chakra-ui/react'
import { Avatar } from '@saas-ui/react'
import { Menu } from '@saas-ui/react'

const names = [
  'Naruto Uzumaki',
  'Sakura Haruno',
  'Kakashi Hatake',
  'Hinata Hyuga',
  'Shikamaru Nara',
]

const maxAvatars = 3

export const AvatarWithOverflow = () => {
  const { items, overflow } = partition(names, maxAvatars)
  return (
    <Group gap="0" spaceX="2">
      {items.map((item) => (
        <Avatar key={item} name={item} colorPalette={pickPalette(item)} />
      ))}
      {overflow.length > 0 && (
        <Menu.Root positioning={{ placement: 'bottom' }}>
          <Menu.Trigger rounded="full" focusRing="outside">
            <Avatar variant="outline" fallback={`+${overflow.length}`} />
          </Menu.Trigger>
          <Menu.Content>
            {overflow.map((item) => (
              <Menu.Item value={item} key={item}>
                <Avatar
                  size="xs"
                  name={item}
                  colorPalette={pickPalette(item)}
                />
                {item}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Root>
      )}
    </Group>
  )
}

const colorPalette = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

const partition = (arr: string[], max: number) => {
  const items = []
  const overflow = []
  for (const item of arr) {
    if (items.length < max) items.push(item)
    else overflow.push(item)
  }
  return { items, overflow }
}
