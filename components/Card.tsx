import { ReactNode } from 'react'

interface CardProps {
  children?: ReactNode
  className?: string
  bottomOnly?: boolean
}
const Card = (props: CardProps) => {
  const { children, className, bottomOnly } = props
  return (
    <div
      className={`bg-[url('/img/svg/white-paper-texture.svg')] shadow-2xl rounded-sm ${className} ${
        bottomOnly ? 'rough-bottom' : 'rough-edge'
      }`}
    >
      {children}
    </div>
  )
}
Card.defaultProps = {
  children: <></>,
  className: '',
  bottomOnly: false,
}
export default Card
