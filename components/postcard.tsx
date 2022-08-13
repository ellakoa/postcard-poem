import Image from 'next/image'

export default function Postcard({
  poem,
  address,
  stamp,
  alt,
  image,
  aspect,
  width,
  height,
  children,
  stampWidth,
  stampHeight,
}: {
  poem: any
  address: any
  stamp: string
  alt: string
  image: string
  aspect: string
  width: number
  height: number
  children: any
  stampWidth: number
  stampHeight: number
}) {
  const addressLines = address
    .split(/\n/g)
    .filter((string: string) => string.length)
  return (
    <div className='md:mx-auto gap-10 my-5 flex flex-col items-center'>
      <div
        className={`md:p-4 bg-white shadow-2xl rounded-sm inline-block w-full ${
          aspect === 'landscape' ? '' : 'max-w-md'
        }`}
      >
        <Image
          layout='responsive'
          className={`border-2 border-black ${
            aspect === 'landscape' ? 'aspect-[8/5]' : 'aspect-[5/8]'
          }`}
          src={image}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
      <div
        className={`shadow-2xl rounded-sm md:p-4 grid bg-white md:grid-cols-[4fr_3fr] w-full gap-4 max-w-full`}
      >
        <div
          className={`font-sans py-10 px-5 md:py-5 text-center flex items-center justify-center md:text-2xl flex-col whitespace-pre-wrap border-t md:border-t-0 md:border-r`}
          dangerouslySetInnerHTML={{ __html: poem }}
        />
        <div className='font-serif row-start-1 md:row-start-auto flex flex-col justify-between p-5 gap-4'>
          <div className='justify-end h-40 w-full relative'>
            <Image
              className=''
              src={stamp}
              alt=''
              layout='fill'
              width={stampWidth}
              height={stampHeight}
              objectFit='contain'
              objectPosition={'right'}
            />
          </div>
          <div className='mt-auto'>
            <ul className='text-2xl md:text-3xl space-y-4 pb-16'>
              {addressLines?.map((line: string, index: number) => (
                <li
                  key={index}
                  className='border-b [&:first-child]:md:text-5xl'
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
