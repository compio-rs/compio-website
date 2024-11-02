import summary from 'content/docs/summary'
import Container from './container'
import ContentList from './content-list'

export interface ContentLayoutProps {
  children: React.ReactNode
}

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <Container className='flex bg-white gap-12'>
      <aside className='relative'>
        <ContentList list={summary} className='sticky top-6' />
      </aside>
      <div className='max-w-screen-sm'>{children}</div>
    </Container>
  )
}
