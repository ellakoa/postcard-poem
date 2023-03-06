import fs from 'fs'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { join } from 'path'
import Breadcrumbs from '../../components/Breadcrumbs'
import CollectionPreview from '../../components/CollectionPreview'

import Meta from '../../components/meta'

const POSTS_PATH = join(process.cwd(), 'content/posts')

interface PostsProps {
  posts: any
  collection: string
}
export default function Posts(props: PostsProps) {
  const { collection, posts } = props
  return (
    <>
      <Head>
        <Meta />
      </Head>
      <div className='container max-w-3xl my-10 px-3 md:px-6'>
        <Breadcrumbs
          links={[{ url: '/collections', label: '← Collections' }]}
        />
        <h1 className='font-bold font-serif text-5xl mb-10'>{collection}</h1>
      </div>
      <div className='container max-w-3xl my-10 px-3 md:px-6'>
        {' '}
        {posts ? (
          <ul className='grid gap-4'>{posts.map(CollectionPreview)}</ul>
        ) : (
          <p>No posts found!</p>
        )}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  const collection = params?.slug

  // Get post paths
  const paths: any = fs
    .readdirSync(POSTS_PATH)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    //   Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  // Load post front matter attributes from paths
  const posts = paths
    .map(({ params }: { params: any }) => {
      const { slug } = params
      const markdown = require(`/content/posts/${slug}.md`)
      const { attributes } = markdown
      return { slug, attributes }
    })
    .filter((post: any, index: number) => {
      if (!collection) {
        return true
      } else {
        const { slug, attributes } = post
        return attributes.collection === collection
      }
    })

  // Sort by most recent
  posts.sort((itemA: any, itemB: any) => {
    const dateA = new Date(itemA.attributes.date).getTime()
    const dateB = new Date(itemB.attributes.date).getTime()
    return dateB - dateA
  })

  return {
    props: { posts, collection }, // will be passed to the page component as props
  }
}

export async function getStaticPaths(args: any) {
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
  const collectionPaths = uniqueCollections.map((slug: string) => ({
    params: { slug },
  }))
  return {
    paths: collectionPaths,
    fallback: false,
  }
}
