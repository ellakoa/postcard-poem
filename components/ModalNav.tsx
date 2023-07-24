'use client'
import * as navigation from '../content/navigation.json'
import { Dispatch, SetStateAction, useState } from 'react'
import StampCtaRow from './StampCtaRow'

interface ModalNavProps {}
const ModalNav = (props: ModalNavProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {' '}
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
        <StampCtaRow
          rotateButtons={true}
          items={navigation.items}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </>
  )
}

export default ModalNav
