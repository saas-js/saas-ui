import Features, {FeaturesProps} from './index'

const FeatureList = ({
  title,
  description,
  columns = 4,
  features
}: FeaturesProps) => {
  return (
    <Features
      title={title}
      description={description}
      features={features}
    />
  )
}

export default FeatureList
