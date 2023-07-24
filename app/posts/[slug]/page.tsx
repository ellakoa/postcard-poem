import { join } from 'path'
const PUBLIC_PATH = join(process.cwd(), 'public')
import Meta from '@/components/meta'
import * as siteSettings from '@/content/settings.json'
import StampCta from '@/components/StampCta'
import '@/styles/globals.css'
import Postcard from '@/components/Postcard'
import sizeOf from 'image-size'
import { fetchData, fetchPost } from '@/api/get'

interface PageProps {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}
export default async function Page(props: PageProps) {
  const { params } = props

  const post = await fetchPost(params.slug)
  return <></>
  const { attributes, html } = post
  const { title, description, date, author, collection, metaImage } = attributes
  const imageDimensions = sizeOf(`${PUBLIC_PATH}/${attributes.image}`)
  attributes.width = imageDimensions.width
  attributes.height = imageDimensions.height
  const stampDimensions = sizeOf(`${PUBLIC_PATH}/${attributes.stamp}`)
  attributes.stampWidth = stampDimensions.width
  attributes.stampHeight = stampDimensions.height

  return (
    <>
      <Meta
        title={title}
        description={description}
        image={metaImage}
        url={`${siteSettings.url}/posts/${params.slug}`}
      />
      <article className='container max-w-5xl px-3 md:px-6 my-10'>
        <header className='prose lg:prose-xl pb-5 mb-5 border-b border-gray-100 text-center mx-auto'>
          <h1 className='font-serif font-bold text-5xl'>{title}</h1>
          <p>{description}</p>
          <p className=' text-base leading-6 font-medium text-gray-500'>
            <time>
              {' '}
              {new Date(date).toDateString()} by <a>{author}</a>{' '}
            </time>
          </p>
          {!!collection && (
            <StampCta
              href={`/collections/${collection}`}
              className='flex-1 md:flex-initial'
            >
              Visit collection: {collection}
            </StampCta>
          )}
        </header>
        <Postcard card className='md:mx-auto' {...attributes} />
        {html && (
          <div
            className='prose lg:prose-xl my-10'
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}

        {!!(post.next || post.prev) && (
          <ul className='flex justify-between flex-wrap my-10'>
            {!!post.prev?.slug && (
              <li>
                <StampCta href={post.prev.slug}>
                  &#8592; {post.prev.title}
                </StampCta>
              </li>
            )}
            {!!post.next?.slug && (
              <li className='ml-auto'>
                <StampCta href={post.next.slug}>
                  {post.next.title} &#8594;
                </StampCta>
              </li>
            )}
          </ul>
        )}
      </article>
    </>
  )
}
