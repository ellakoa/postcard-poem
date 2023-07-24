import fs from 'fs'
import Head from 'next/head'
import { join } from 'path'
import Meta from '../components/meta'
import PageHeading from '../components/PageHeading'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PostList from '@/components/PostList'

const POSTS_PATH = join(process.cwd(), 'content/posts')
const PAGE_COUNT = 5

interface PostsProps {
  pageNumber: number
  posts: any
}
export default function Posts(props: PostsProps) {
  const { posts } = props
  const { query, push } = useRouter()
  const pageParam = (query?.page as string) || '1'
  const pageNumber = parseInt(pageParam, 10)
  const length = posts.length
  const totalPages = Math.ceil(length / PAGE_COUNT)
  if (totalPages < pageNumber) {
    push('/posts?page=1')
  }
  const paginationRequired = totalPages > 1
  const sliceStart = pageNumber * PAGE_COUNT - PAGE_COUNT
  const sliceEnd = Math.min(pageNumber * PAGE_COUNT, length)

  return (
    <>
      <Head>
        <Meta />
      </Head>
      <PageHeading title='Posts' />
      <div className='container max-w-3xl my-10 px-3 md:px-6  space-y-4'>
        <ul className='grid gap-4 sm:grid-cols-2 md:grid-cols-1 '>{}</ul>
        <PostList
          posts={paginationRequired ? posts.slice(sliceStart, sliceEnd) : posts}
        />
        <hr className='border-neutral-800' />
        {paginationRequired && (
          <div className='grid gap-2'>
            <p className='text-center'>
              Page {pageNumber} of {totalPages}
            </p>

            <div className='flex items-center justify-center gap-4'>
              {pageNumber > 1 && (
                <Link
                  className='stamp inline-block text-sm text-red-800'
                  href={`/posts?page=${pageNumber - 1}`}
                >
                  Previous
                </Link>
              )}
              {pageNumber < totalPages && (
                <Link
                  className='stamp inline-block text-sm text-green-900'
                  href={`/posts?page=${pageNumber + 1}`}
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
        {!posts && <p>No posts found!</p>}
      </div>
    </>
  )
}

export async function getStaticProps(context: any) {
  const { query } = context
  const pageNumber = query?.page || 1
  // Get post paths
  const paths: any = fs
    .readdirSync(POSTS_PATH)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    //   Map the path into the static paths object required by Next.js
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

  return {
    props: { posts, pageNumber }, // will be passed to the page component as props
  }
}
