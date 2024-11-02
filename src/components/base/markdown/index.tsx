import cx from 'classix'
import classes from './index.module.css'

export default function Markdown({
  content,
}: {
  path: string
  content: Markdown
}) {
  return (
    <div className={cx('font-sans', classes.markdownBody)}>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted content */}
      <p dangerouslySetInnerHTML={{ __html: content.html }} />
    </div>
  )
}
