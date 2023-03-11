import Link from 'next/link'
import StampCta from './StampCta'

interface BreadcrumbLink {
  url: string
  label: string
}
interface breadcrumbsProps {
  links: BreadcrumbLink[]
}
const Breadcrumbs = (props: breadcrumbsProps) => {
  const { links } = props
  return (
    <ul className='flex gap-4 flex-wrap py-4'>
      {links.map(({ url, label }: BreadcrumbLink, index) => (
        <li key={index} className=''>
          <StampCta href={url}>
            <a className=''>{label}</a>
          </StampCta>
        </li>
      ))}
    </ul>
  )
}
export default Breadcrumbs
