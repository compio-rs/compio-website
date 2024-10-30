import logo from '@/../assets/colored-with-text.svg'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className='container mx-auto py-4 px-4'>
      <div className='flex items-baseline'>
        <Link to='/'>
          <img src={logo} alt='Compio' className='w-20 sm:w-28' />
        </Link>
      </div>
    </nav>
  )
}
