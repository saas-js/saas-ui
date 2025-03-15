import dynamic from 'next/dynamic'

interface Props {
  name: string
}

function formatComponentName(name: string) {
  return name
    .split(/[-\/]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

export const ExamplePreview = (props: Props) => {
  const { name } = props
  const componentName = formatComponentName(name)
  const Component = dynamic(() =>
    import(`../../compositions/src/examples/${name}`).then(
      (mod) => mod[componentName],
    ),
  )
  return <Component />
}
