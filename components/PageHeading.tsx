import { ReactNode } from 'react'

interface PageHeadingProps {
  children?: ReactNode
  title: string
}
const PageHeading = (props: PageHeadingProps) => {
  const { children, title } = props
  return (
    <div className='container max-w-3xl my-10 px-3 md:px-6'>
      <h1 className='font-serif text-center md:text-left font-bold text-5xl mb-10'>
        {title}
      </h1>
      {children}
    </div>
  )
}
export default PageHeading
