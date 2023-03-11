import Link from 'next/link'
import { ReactNode } from 'react'

interface StampCtaProps {
  href: string
  className?: string
  children?: ReactNode
}
const StampCta = (props: StampCtaProps) => {
  const { children, className, href } = props
  return (
    <Link href={href}>
      <a className={`stamp no-underline ${className}`}>{children}</a>
    </Link>
  )
}
StampCta.defaultProps = {
  children: <></>,
  className: '',
  href: '',
}
export default StampCta
