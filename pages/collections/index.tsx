import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { join } from 'path'
import Meta from '../../components/meta'
import * as attributes from '../../content/navigation.json'
import Card from '../../components/Card'
import PageHeading from '../../components/PageHeading'
const POSTS_PATH = join(process.cwd(), 'content/posts')

interface CollectionsProps {
  paths: any
  page?: number
  collection?: string
}
export default function Collections(props: CollectionsProps) {
  const { collections } = attributes
  const CollectionLink = ({ text, image }: { text: string; image: string }) => (
    <Link href={`/collections/${text}`}>
      <Card className='flex gap-2 flex-col p-3 relative'>
        <span className='self-end'>
          <Image
            src={image}
            alt=''
            objectFit={'contain'}
            width={160}
            height={140}
            layout={'fixed'}
            objectPosition={'top right'}
          />
        </span>
        <span className='block'>{text}</span>
      </Card>
    </Link>
  )
  if (!collections) {
    return <p>No collections found!</p>
  }
  return (
    <>
      <Head>
        <Meta />
      </Head>
      <PageHeading title='Collections' />
      <div className='container max-w-3xl my-10 px-3 md:px-6'>
        <ul className='grid xs:grid-cols-2 gap-4 sm:grid-cols-3'>
          {collections.map(CollectionLink)}
        </ul>
      </div>
    </>
  )
}
