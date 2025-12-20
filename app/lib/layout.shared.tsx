import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Link } from 'react-router';
import logo from "../../assets/colored-with-text.svg"

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: "https://github.com/compio-rs/compio",
    nav: {
      title: <Navtitle />,
      transparentMode: "top"
    },
  };
}

function Navtitle() {
  return (
    <Link to='/'>
      <img src={logo} alt='Compio' className='w-20 sm:w-28' />
    </Link>
  )
}
