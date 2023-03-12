import Image from 'next/image'
import Link from 'next/link'
import Card from './Card'
import StampCta from './StampCta'
import StampCtaRow from './StampCtaRow'

export default function Preview(item: any, index: number) {
  const { slug, attributes } = item
  const {
    title,
    image,
    description,
    date,
    collection,
    showStampInPreview,
    stamp,
  } = attributes
  return (
    <li key={index}>
      <Card className='p-3'>
        {showStampInPreview ? (
          <div className='ml-auto max-w-[200px] md:hidden aspect-video relative overflow-hidden flex-grow-0 flex-shrink-0 basis-[200px] mb-2'>
            <Image
              src={stamp}
              alt=''
              objectFit={'contain'}
              layout='fill'
              objectPosition={'right'}
            />
          </div>
        ) : (
          <div className='md:hidden aspect-video relative overflow-hidden flex-grow-0 flex-shrink-0 basis-[200px] mb-2'>
            <Image src={image} alt='' objectFit={'cover'} layout='fill' />
          </div>
        )}

        <div className='flex gap-4'>
          <div className='hidden md:block aspect-square relative overflow-hidden flex-grow-0 flex-shrink-0 basis-[200px] max-h-[200px]'>
            <Image
              src={showStampInPreview ? stamp : image}
              alt=''
              objectFit={showStampInPreview ? 'contain' : 'cover'}
              objectPosition={'top'}
              layout='fill'
            />
          </div>
          <div>
            <h2 className='mb-0 font-bold text-xl md:text-3xl text-gray-900'>
              {title}
            </h2>

            <p className='mb-2 text-sm leading-6 font-medium text-gray-500 '>
              <time>{new Date(date).toDateString()}</time>
            </p>
            <p className='hidden md:block text-base mb-3 '>{description}</p>
          </div>
        </div>
        <StampCtaRow
          ctaClassName='text-sm'
          items={[
            { url: `/collections/${collection}`, text: 'Visit collection' },
            { url: `/posts/${slug}`, text: 'Read post' },
          ]}
        />
      </Card>
    </li>
  )
}
