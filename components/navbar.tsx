import { useState } from 'react'
import * as navigation from '../content/navigation.yaml'
import * as settings from '../content/settings.yaml'
import Image from 'next/image'
import Link from 'next/link'
import Card from './Card'
import StampCta from './StampCta'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { name, image, width, height } = settings
  return (
    <Card
      bottomOnly={true}
      className='md:sticky z-10 top-0 left-0 w-full px-3 md:px-6'
    >
      <nav className='flex items-center justify-center md:justify-between flex-wrap py-3 container mx-auto'>
        {/* <!--Logo etc--> */}
        <div className='flex items-center'>
          <Link href='/'>
            <a
              className='text-gray-500 font-bold text-lg flex gap-4 items-end relative max-w-[150px] md:max-w-[200px]'
              title='Postcard Poems'
            >
              <span className='sr-only'>Home</span>
              <Image
                className='hidden md:block max-w-[200px]'
                src={image}
                width={width}
                height={height}
                layout='intrinsic'
                alt=''
              />
            </a>
          </Link>
        </div>

        {/* <!--Toggle button (hidden on large screens)--> */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type='button'
          className={`ml-auto block md:hidden px-2 text-primary-500 hover:text-primary-500 focus:outline-none focus:text-primary-500 ${
            isOpen && 'transition transform-180'
          }`}
          aria-label='Menu'
        >
          <svg
            className='h-6 w-6 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path
              className={isOpen ? '' : 'hidden'}
              fillRule='evenodd'
              clipRule='evenodd'
              d='M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z'
            />
            <path
              className={isOpen ? 'hidden' : ''}
              fillRule='evenodd'
              d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
            />
          </svg>
        </button>

        {/* <!--Menu--> */}
        <div
          className={`w-full flex-grow md:flex md:items-center md:w-auto text-center ${
            isOpen ? 'blockshadow-3xl' : 'hidden'
          }`}
        >
          {navigation.items && (
            <ul className='pt-6 md:pt-0 list-reset md:flex justify-end flex-1 items-center'>
              {navigation.items.map(({ url, text }: any, index: number) => (
                <li key={index} className='nav__item mb-3 md:mb-0 md:mr-3'>
                  <StampCta
                    className='text-xl inline-block'
                    onClick={() => setIsOpen(false)}
                    href={url}
                  >
                    {text}
                  </StampCta>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </Card>
  )
}
