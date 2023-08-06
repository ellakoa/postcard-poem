import Link from 'next/link'
import { ReactNode } from 'react'

interface StampCtaProps {
  href: string
  className?: string
  children?: ReactNode
  onClick?: any
  color?: 'indigo' | 'red' | 'green' | 'black'
}
const StampCta = (props: StampCtaProps) => {
  const { children, className, color, href, onClick } = props
  return (
    <Link
      href={href}
      onClick={onClick}
      className={` stamp  ${className} ${
        color === 'red'
          ? 'text-red-800'
          : color === 'green'
          ? 'text-green-900'
          : color === 'indigo'
          ? 'text-indigo-900'
          : ''
      }`}
    >
      {children}
    </Link>
  )
}
StampCta.defaultProps = {
  children: <></>,
  className: '',
  href: '',
  onClick: () => {},
}
export default StampCta
