import Head from 'next/head'

import Meta from '@/components/meta'
import PageHeading from '@/components/PageHeading'
import Preview from '@/components/preview'
import '@/styles/globals.css'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { fetchData } from '@/api/get'

interface PageProps {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}
export default async function Page(props: PageProps) {
  const { params, searchParams } = props

  const pageNumber = parseInt((searchParams?.page as string) || '1', 10)

  let posts = await fetchData('posts')

  const length = posts.length
  const quantity = 5
  const totalPages = Math.ceil(length / quantity)
  if (totalPages < pageNumber) {
    redirect('/posts?page=1')
  }
  const paginationRequired = totalPages > 1
  const sliceStart = pageNumber * quantity - quantity
  const sliceEnd = Math.min(pageNumber * quantity, length)

  return (
    <>
      <Head>
        <Meta />
      </Head>
      <PageHeading title='Posts' />

      <div className='container max-w-3xl my-10 px-3 md:px-6 space-y-4'>
        <ul className='grid gap-4 sm:grid-cols-2 md:grid-cols-1'>
          {paginationRequired
            ? posts.slice(sliceStart, sliceEnd).map(Preview)
            : posts.map(Preview)}
        </ul>
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
