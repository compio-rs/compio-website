import cx from 'classix'
import summary from 'content/docs/summary'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import Container from './container'
import ContentFooter from './content-footer'
import ContentList from './content-list'
import MenuToggle from './menu-toggle'
import Sidebar from './sidebar'

export interface ContentLayoutProps {
  children: React.ReactNode
  path: string
}

export default function ContentLayout({ children, path }: ContentLayoutProps) {
  const contentListCtrl = useState(false)
  const isSmall = useMediaQuery('(max-width: 1024px)') // <lg

  return (
    <Container
      className={cx(
        'bg-white relative',
        'flex gap-12 lg:gap-24 xl:gap-36',
        'max-lg:flex-col max-lg:items-center'
      )}
    >
      <Sidebar expand={!isSmall} control={contentListCtrl}>
        <ContentList
          list={summary}
          className="lg:sticky lg:top-[82px] max-h-[calc(100svh-82px)]"
        />
      </Sidebar>
      <div className="flex-1">
        {isSmall && (
          <div className="w-full h-16 border-t border-b flex items-center justify-between mb-4">
            <MenuToggle control={contentListCtrl} />
          </div>
        )}
        <div className="max-w-screen-md mx-auto">
          {children}
          <ContentFooter path={path} />
        </div>
      </div>
    </Container>
  )
}
