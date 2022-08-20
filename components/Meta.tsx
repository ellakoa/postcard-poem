import * as attributes from '../content/settings.yaml'

interface MetaProps {
  title: string
  description: string
  image: string
  url: string
}
const Meta = (props: MetaProps) => {
  const { title, description, image, url } = props
  return (
    <>
      {/* Sharing meta tags */}
      <meta property='og:title' content={`${title}`} />
      <meta property='og:type' content='blog' />
      <meta property='og:description' content={`${description}`} />
      <meta property='og:image' content={`${image}`} />
      <meta property='og:url' content={`${url}`} />
      <meta name='twitter:card' content='summary_large_image' />
    </>
  )
}

Meta.defaultProps = {
  title: attributes.name,
  description: attributes.description,
  image: attributes.metaImage,
  url: attributes.url,
}
export default Meta
