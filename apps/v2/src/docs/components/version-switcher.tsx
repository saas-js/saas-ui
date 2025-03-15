import { Select, SelectProps, useColorModeValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import packageJSON from 'package.json'

function VersionSwitcher(props: SelectProps) {
  const router = useRouter()

  const versions = [
    {
      label: `v${packageJSON.dependencies['@saas-ui/react']}`,
      url: 'https://saas-ui.dev',
    },
  ]

  const v1Url = versions[0].url

  return (
    <Select
      marginEnd="0rem"
      variant="unstyled"
      fontWeight="semibold"
      color={useColorModeValue('gray.600', 'whiteAlpha.600')}
      value={v1Url}
      aria-label="Select the Saas UI Docs version. You're currently viewing the version 0.0.1 docs"
      onChange={(e) => {
        router.push(e.target.value)
      }}
      {...props}
    >
      {versions.map(({ label, url }) => (
        <option key={url} value={url}>
          {label}
        </option>
      ))}
    </Select>
  )
}

export default VersionSwitcher
