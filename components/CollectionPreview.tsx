import Image from 'next/image'
import Link from 'next/link'

export default function CollectionPreview(item: any, index: number) {
  const { slug, attributes } = item
  const { title, image, description, date, collection } = attributes
  return (
    <li className=' border-b [&:first-child]:border-t  py-10' key={index}>
      <>
        <div className='md:hidden aspect-video relative overflow-hidden flex-grow-0 flex-shrink-0 basis-[200px] mb-2'>
          <Image src={image} width={712} height={650} alt='' />
        </div>
        <div className='flex gap-4'>
          <div className='hidden md:block aspect-square relative overflow-hidden flex-grow-0 flex-shrink-0 basis-[200px]'>
            <Image src={image} width={712} height={650} alt='' />
          </div>
          <div>
            <h2 className='mb-0 font-bold text-3xl text-gray-900 '>{title}</h2>

            <p className='mb-2 text-sm leading-6 font-medium text-gray-500 '>
              <time>{new Date(date).toDateString()}</time>
            </p>
            <p className='hidden md:block text-base mb-3 '>{description}</p>
          </div>
        </div>
        <div className='flex gap-4 md:justify-end'>
          <Link href={`/posts/${slug}`}>
            <a className='flex-1 md:flex-initial   text-center font-bold text-sm px-2 py-1 border border-black rounded hover:bg-black hover:bg-opacity-20'>
              Read post
            </a>
          </Link>
        </div>
      </>
    </li>
  )
}
