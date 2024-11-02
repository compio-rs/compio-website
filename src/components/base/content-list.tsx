import cx from 'classix'
import { NavLink } from 'react-router-dom'
import type { Page, Section } from '../../../content/docs/summary'

function isPage(section: Section): section is Page {
  return typeof section[0] === 'string'
}

function isSubSect(section: Section): section is [Page, Section[]] {
  return (
    section.length === 2 &&
    typeof section[0] !== 'string' &&
    Array.isArray(section[1])
  )
}

function Triage({
  section,
  level,
  className,
}: { section: Section; level: number; className?: string }) {
  if (isPage(section)) {
    return <Item level={level + 1} page={section} />
  }

  if (isSubSect(section)) {
    return (
      <Sect
        level={level + 1}
        sections={section[1]}
        title={section[0]}
        className={className}
      />
    )
  }

  return <Sect level={level + 1} sections={section} className={className} />
}

function Sect({
  sections,
  title,
  level,
  className,
}: { sections: Section[]; title?: Page; level: number; className?: string }) {
  return (
    <>
      {title && <Item level={level} page={title} />}
      <section
        className={cx(
          className,
          level === 2 && 'border-l border-zinc-200 pl-3 mb-1',
        )}
      >
        {sections.map(section => (
          <Triage level={level} section={section} key={String(section[0])} />
        ))}
      </section>
    </>
  )
}

function Item({
  page: [name, path],
  level,
  className: clsName,
}: { page: Page; className?: string; level: number }) {
  const className = cx(
    clsName,
    'block py-1 leading-6',
    level === 1 && 'font-bold',
    level > 1 && 'text-zinc-600',
  )

  if (path) {
    return (
      <NavLink
        className={({ isActive }) =>
          cx(
            className,
            'hover:text-blue-900 transition-colors relative',
            isActive && '!text-blue-900 font-bold',
            isActive &&
              level === 3 &&
              cx(
                'before:h-[60%] before:w-[2px]',
                'before:absolute before:-left-3 before:top-[20%]',
                'before:bg-blue-900 ',
              ),
          )
        }
        to={path}
      >
        {name}
      </NavLink>
    )
  }

  const Heading = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  return <Heading className={className}>{name}</Heading>
}

export default function ContentList({
  className,
  list,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { list: Section[] }) {
  return (
    <div
      className={cx(
        className,
        'p-2 pr-6 text-sm font-medium max-h-[80lvh] overflow-y-auto scroll-smooth',
      )}
      {...rest}
    >
      {list.map(section => (
        <Triage
          key={String(section[0])}
          section={section}
          level={0}
          className='pb-4 mb-2 border-b'
        />
      ))}
    </div>
  )
}
