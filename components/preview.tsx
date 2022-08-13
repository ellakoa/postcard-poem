import Image from 'next/image'
import Link from 'next/link'

export default function Preview(item: any, index: number) {
  const { slug, attributes } = item
  const { title, image, description, date } = attributes
  return (
    <li
      className='flex gap-4 py-10 border-b [&:first-child]:border-t'
      key={index}
    >
      <div className='hidden md:block aspect-square relative overflow-hidden flex-grow-0 flex-shrink-0 basis-[200px]'>
        <Image src={image} width={712} height={650} alt='' />
      </div>
      <div>
        <h2 className='mb-0 font-bold text-3xl text-gray-900'>{title}</h2>
        <p className='mb-2 text-sm leading-6 font-medium text-gray-500'>
          <time>{new Date(date).toDateString()}</time>
        </p>
        <p className='hidden md:block text-base mb-3'>{description}</p>
        <Link href={`/posts/${slug}`}>
          <a className='text-indigo-500 font-bold text-lg hover:underline'>
            Read more
          </a>
        </Link>
      </div>
    </li>
  )
}
