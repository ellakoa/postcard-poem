import Link from 'next/link'
import { ReactNode } from 'react'

interface StampCtaProps {
  href: string
  className?: string
  children?: ReactNode
  onClick?: any
}
const StampCta = (props: StampCtaProps) => {
  const { children, className, href, onClick } = props
  return (
    <Link href={href} onClick={onClick}>
      <a className={`font-stamp stamp no-underline ${className}`}>{children}</a>
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
