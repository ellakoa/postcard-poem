import Link from 'next/link'

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
          <Link href={url}>
            <a className='hover:underline cursor-pointer'>{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default Breadcrumbs
