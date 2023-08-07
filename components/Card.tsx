import { ReactNode } from 'react'

interface CardProps {
  children?: ReactNode
  className?: string
  roughBottom?: boolean
  roughTop?: boolean
}
const Card = (props: CardProps) => {
  const { children, className, roughBottom, roughTop } = props
  return (
    <div
      className={`h-full bg-[url('/img/static/white.png')] bg-repeat shadow-2xl rounded-sm ${className} ${
        roughBottom ? 'rough-bottom' : roughTop ? 'rough-top' : 'rough-edge'
      }`}
    >
      {children}
    </div>
  )
}
Card.defaultProps = {
  children: <></>,
  className: '',
  roughBottom: false,
  roughTop: false,
}
export default Card
