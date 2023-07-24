import Image from 'next/image'
import Card from './Card'
import StampCta from './StampCta'

export default function CollectionPreview(item: any, index: number) {
  const { slug, data } = item
  if (!data) return <></>
  const { title, image, description, date, collection } = data
  return (
    <li className='' key={index}>
      <Card className='md:p-4'>
        <div className='md:hidden aspect-video relative overflow-hidden flex-grow-0 flex-shrink-0 basis-[200px] mb-2'>
          <Image src={image} width={712} height={650} alt='' />
        </div>
        <div className='p-3 md:p-0'>
          <div className='flex gap-4'>
            <div className='hidden md:block aspect-square relative overflow-hidden flex-grow-0 flex-shrink-0 basis-[200px]'>
              <Image src={image} width={712} height={650} alt='' />
            </div>
            <div className=''>
              <h2 className='mb-0 font-bold text-xl md:text-3xl text-gray-900 '>
                {title}
              </h2>

              <p className='mb-2 text-sm leading-6 font-medium text-gray-500 '>
                <time>{new Date(date).toDateString()}</time>
              </p>
              <p className='hidden md:block text-base mb-3 '>{description}</p>
            </div>
          </div>
          <div className='flex gap-4 md:justify-end'>
            <StampCta
              href={`/posts/${slug}`}
              className={'flex-1 md:flex-initial'}
              color={
                index % 3 === 0 ? 'red' : index % 2 === 0 ? 'green' : 'indigo'
              }
            >
              Read post
            </StampCta>
          </div>
        </div>
      </Card>
    </li>
  )
}
