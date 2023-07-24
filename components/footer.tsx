import * as attributes from '../content/settings.json'
import Card from './Card'

export default function Footer() {
  const { name, author } = attributes
  return (
    <footer className='w-full'>
      <Card roughTop={true} className='text-center py-4'>
        <small className=''>
          <span>{`Copyright © ${name} 2022. Made with ❤ by ${author}`}</span>
        </small>
      </Card>
    </footer>
  )
}
