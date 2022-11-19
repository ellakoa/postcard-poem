import fs from 'fs'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { join } from 'path'
import Meta from '../../components/meta'
import Preview from '../../components/preview'

const POSTS_PATH = join(process.cwd(), 'content/posts')

interface CollectionsProps {
  paths: any
  page?: number
  collection?: string
}
export default function Collections(props: CollectionsProps) {
  const { paths } = props

  const CollectionLink = (slug: string) => (
    <Link href={`/collections/${slug}`}>
      <a className='text-center font-bold text-sm px-2 py-1 border border-black rounded hover:bg-black hover:bg-opacity-20'>
        {slug}
      </a>
    </Link>
  )
  return (
    <>
      <Head>
        <Meta />
      </Head>
      <div className='container max-w-3xl my-10 px-6'>
        <h1 className='font-bold font-serif text-5xl mb-10'>Collections</h1>
      </div>
      <div className='container max-w-3xl my-10 px-6'>
        <ul className='flex gap-4 flex-wrap'>
          {!!paths && paths.map(CollectionLink)}
        </ul>
        {!paths && <p>No collections found!</p>}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  // Get paths
  const paths = fs
    .readdirSync(POSTS_PATH)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  const posts = paths.map(({ params }: { params: any }) => {
    const { slug } = params
    const markdown = require(`/content/posts/${slug}.md`)
    const { attributes } = markdown
    return { slug, attributes }
  })
  const collections = posts.map(({ slug, attributes }) => attributes.collection)
  const filteredCollections = collections.filter((collection) => !!collection)
  const uniqueCollections = filteredCollections.reduce(
    (prev, curr) => (prev.includes(curr) ? prev : [...prev, curr]),
    []
  )
  return {
    props: { paths: uniqueCollections }, // will be passed to the page component as props
  }
}
