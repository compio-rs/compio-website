import summary from 'content/docs/summary'
import Container from './container'
import ContentFooter from './content-footer'
import ContentList from './content-list'

export interface ContentLayoutProps {
  children: React.ReactNode
  path: string
}

export default function ContentLayout({ children, path }: ContentLayoutProps) {
  return (
    <Container className='flex bg-white gap-12 lg:gap-24 xl:gap-36'>
      <aside className='relative min-w-48 lg:min-w-64'>
        <ContentList list={summary} className='sticky top-[82px]' />
      </aside>
      <div className='max-w-screen-md flex-1'>
        {children}
        <ContentFooter path={path} />
      </div>
    </Container>
  )
}
