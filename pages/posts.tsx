import fs from 'fs'
import Head from 'next/head'
import { join } from 'path'
import Meta from '../components/meta'
import Preview from '../components/preview'

const POSTS_PATH = join(process.cwd(), 'content/posts')

interface PostsProps {
  posts: any
  page?: number
  collection?: string
}
export default function Posts(props: PostsProps) {
  const { collection, page, posts } = props
  return (
    <>
      <Head>
        <Meta />
      </Head>
      <div className='container max-w-3xl my-10 px-6'>
        <h1 className='font-bold font-serif text-5xl mb-10'>
          {collection ? collection : 'Posts'}
        </h1>
      </div>
      <div className='container max-w-3xl my-10 px-6'>
        <ul className=''>{!!posts && posts.map(Preview)}</ul>
        {!posts && <p>No posts found!</p>}
      </div>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { query } = context
  const collection = query?.collection || null
  const page = query?.page || 1
  const postsPerPage = 10

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
    props: { posts, collection, page }, // will be passed to the page component as props
  }
}
