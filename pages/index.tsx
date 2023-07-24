import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { attributes } from '../content/home.md'
import fs from 'fs'
import { join } from 'path'
const POSTS_PATH = join(process.cwd(), 'content/posts')
import Postcard from '../components/Postcard'
import Link from 'next/link'
import Meta from '../components/meta'
import sizeOf from 'image-size'
import Card from '../components/Card'
import StampCta from '../components/StampCta'
const PUBLIC_PATH = join(process.cwd(), 'public')
const Home: NextPage = ({
  imageWidth,
  imageHeight,
  latest,
  imageSrc,
  postcardAttributes,
}: any) => {
  const { image, title, welcome } = attributes
  return (
    <>
      <Head>
        <Meta />
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
        {/* <!-- Netlify Identity Widget --> */}
        <script
          type='text/javascript'
          src='https://identity.netlify.com/v1/netlify-identity-widget.js'
          defer
        ></script>
      </Head>
      <div className='relative p-3'>
        <Card className='w-full h-auto object-cover'>
          {!!imageSrc && (
            <Image
              layout='responsive'
              src={imageSrc}
              alt=''
              width={imageWidth}
              height={imageHeight}
            />
          )}
        </Card>
      </div>
      <div className='container prose lg:prose-xl text-center my-10 p-3'>
        <h1 className='font-serif text-5xl'>{title}</h1>
        <p>{welcome}</p>
      </div>
      <article className='container max-w-5xl px-3 md:px-6 my-10 flex flex-col'>
        <Postcard {...{ ...latest.attributes, ...postcardAttributes }}>
          <StampCta href={`/posts/${latest.slug}`} className='ml-auto'>
            Read more
          </StampCta>
        </Postcard>
      </article>
    </>
  )
}

export async function getStaticProps() {
  // Get data for latest
  const paths = fs
    .readdirSync(POSTS_PATH)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))
  // Load post front matter attributes from paths
  const posts = paths.map(({ params }: { params: any }) => {
    const { slug } = params
    const markdown = require(`/content/posts/${slug}.md`)
    const { attributes } = markdown
    return { slug, attributes }
  })
  // Sort by most recent
  posts.sort((itemA: any, itemB: any) => {
    const dateA = new Date(itemA.attributes.date).getTime()
    const dateB = new Date(itemB.attributes.date).getTime()
    return dateB - dateA
  })
  const imageDimensions = sizeOf(`${PUBLIC_PATH}/${attributes.image}`)
  const imageWidth = imageDimensions.width
  const imageHeight = imageDimensions.height

  const getPostcardAttributes = (slug: string) => {
    // Get post data and image dimensions
    const markdown = require(`/content/posts/${slug}.md`)
    const { attributes, html } = markdown
    const imagePath = `${PUBLIC_PATH}/${attributes.image}`
    const imageDimensions = sizeOf(imagePath)

    attributes.width = imageDimensions.width
    attributes.height = imageDimensions.height

    const stampDimensions = sizeOf(`${PUBLIC_PATH}/${attributes.stamp}`)
    attributes.stampWidth = stampDimensions.width
    attributes.stampHeight = stampDimensions.height
    return attributes
  }
  const latestPost = posts[0]
  return {
    props: {
      imageSrc: attributes.image,
      imageWidth,
      imageHeight,
      latest: latestPost,
      postcardAttributes: getPostcardAttributes(latestPost.slug),
    }, // will be passed to the page component as props
  }
}

export default Home
