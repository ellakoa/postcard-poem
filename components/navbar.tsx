import * as settings from '../content/settings.json'
import Image from 'next/image'
import Link from 'next/link'
import Card from './Card'
import ModalNav from './ModalNav'

export default function Navbar() {
  const { name, image, width, height } = settings
  return (
    <Card
      roughBottom={true}
      className='md:sticky z-10 top-0 left-0 w-full px-3 md:px-6'
    >
      <nav className='flex items-center justify-center md:justify-between flex-wrap py-3 container mx-auto'>
        {/* <!--Logo etc--> */}
        <div className='flex items-center'>
          <Link
            href='/'
            className='text-gray-500 font-bold text-lg flex gap-4 items-end relative max-w-[150px] md:max-w-[200px]'
            title='Postcard Poems'
          >
            <span className='sr-only'>Home</span>
            <Image
              className='hidden md:block max-w-[200px]'
              src={image}
              width={Math.floor(parseInt(width, 10))}
              height={Math.floor(parseInt(height, 10))}
              alt=''
            />
          </Link>
        </div>

        <ModalNav />
      </nav>
    </Card>
  )
}
