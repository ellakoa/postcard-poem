import Image from 'next/image'
import Card from './Card'

interface PostCardProps {
  poem: any
  address: any
  alignPoemLeft: boolean
  className: string
  stamp: string
  alt: string
  image: string
  aspect: string
  width: number
  height: number
  children: any
  stampWidth: number
  stampHeight: number
  video?: string
  removePostcardPadding?: boolean
}
const Postcard = (props: PostCardProps) => {
  const {
    poem,
    address,
    alignPoemLeft,
    className,
    stamp,
    alt,
    image,
    aspect,
    width,
    height,
    children,
    stampWidth,
    stampHeight,
    video,
    removePostcardPadding,
  } = props
  const addressLines = address
    .split(/\n/g)
    .filter((string: string) => string.length)

  return (
    <div className={`gap-10 lg:my-5 flex flex-col items-center ${className}`}>
      <Card
        className={` inline-block w-full ${
          aspect === 'landscape' ? '' : 'max-w-md'
        } ${removePostcardPadding ? '' : 'md:p-4'}`}
      >
        {video ? (
          <iframe
            width='100%'
            height='550'
            src={`https://player.vimeo.com/video/${video}?controls=0&sidedock=0&title=0`}
            frameBorder='0'
            allowFullScreen={true}
          ></iframe>
        ) : (
          <Image
            width={width}
            height={height}
            className={`border-2 border-black ${
              aspect === 'landscape' ? 'aspect-[8/5]' : 'aspect-[5/8]'
            }`}
            src={image}
            sizes='(min-width: 768px) 1080px, (min-width: 640px) 768px, 640px'
            alt={alt}
          />
        )}
      </Card>
      <Card
        className={`md:p-4 grid md:grid-cols-[4fr_3fr] w-full gap-4 max-w-full`}
      >
        <div
          className={`ink font-sans py-10 px-5 md:py-5 items-center flex ${
            alignPoemLeft ? '' : 'text-center'
          } justify-center md:text-2xl flex-col whitespace-pre-wrap border-t md:border-t-0 md:border-r`}
          dangerouslySetInnerHTML={{ __html: poem }}
        />
        <div className='font-serif row-start-1 md:row-start-auto flex flex-col justify-between p-5 gap-4'>
          <div className='inline-block w-[200px] md:w-[250px] relative self-end'>
            <Image
              width={stampWidth}
              height={stampHeight}
              className=''
              src={stamp}
              alt=''
            />
          </div>
          <div className='ink mx-auto md:mt-auto'>
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
      </Card>
      {children}
    </div>
  )
}
Postcard.defaultProps = {
  alignPoemLeft: false,
  className: '',
  removePostcardPadding: false,
}
export default Postcard
