import { flatten } from '@/util/section'
import { Icon } from '@iconify/react'
import cx from 'classix'
import summary from 'content/docs/summary'
import { Link } from 'react-router-dom'

export default function ContentFooter({ path }: { path: string }) {
  const all = flatten(summary).filter(([, p]) => p)
  const index = all.findIndex(([, p]) => path.endsWith(p as string))
  console.log(index, 'of', all)
  const prev = index === 0 ? null : all[index - 1]
  const next = index === all.length - 1 ? null : all[index + 1]

  return (
    <footer
      className={cx(
        'flex justify-between gap-4 mt-24',
        '*:flex *:flex-1 *:items-center *:gap-2 *:px-8 *:py-4 *:rounded',
        '*:transition-colors *:border-neutral-200 hover:*:border-blue-900 hover:*:text-blue-950',
        '*:text-neutral-600',
      )}
    >
      {prev ? (
        <Link to={prev[1] as string} className='border'>
          <Icon icon='formkit:arrowleft' fontSize={10} />
          {prev[0]}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link to={next[1] as string} className='flex-row-reverse border'>
          <Icon icon='formkit:arrowright' fontSize={10} />
          {next[0]}
        </Link>
      ) : (
        <div />
      )}
    </footer>
  )
}
