import { ReactNode } from 'react'
import StampCta from './StampCta'

interface StampCtaRowProps {
  items: { url: string; text: string }[]
  onClick?: any
  ctaClassName?: string
  rotateButtons?: boolean
}
const StampCtaRow = (props: StampCtaRowProps) => {
  const { ctaClassName, items, onClick, rotateButtons } = props
  return (
    <table className='mx-auto ink pt-6 md:pt-0 md:flex justify-end flex-1 items-center'>
      <tbody className='px-1 rounded-md  overflow-visible'>
        <tr className={`rounded-md flex flex-col xs:block gap-2`}>
          {items.map(({ url, text }: any, index: number) => (
            <td
              key={index}
              className={`text-center ${
                rotateButtons
                  ? 'rotate-[3deg] sm:rotate-[5deg]  [&:nth-child(even)]:-rotate-[3deg] sm:[&:nth-child(even)]:-rotate-[5deg] scale-[1.2] translate-z-0 py-1 px-4 md:border-[1px] border-dashed'
                  : ''
              } ink `}
            >
              <StampCta
                className={`inline-block ${ctaClassName}`}
                color={
                  index === 0
                    ? 'red'
                    : index === 1
                    ? 'green'
                    : index === 2
                    ? 'indigo'
                    : 'black'
                }
                onClick={onClick}
                href={url}
              >
                {text}
              </StampCta>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}
StampCtaRow.defaultProps = {
  onClick: () => {},
  rotateButtons: false,
}
export default StampCtaRow
