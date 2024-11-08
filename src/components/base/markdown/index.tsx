import cx from 'classix'
import './index.css'

export default function Markdown({
  content,
  className,
  ...rest
}: {
  content: Markdown
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>) {
  return (
    <div
      className={cx('font-sans min-h-[65lvh]', 'markdown-body', className)}
      {...rest}
    >
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted content */}
      <p dangerouslySetInnerHTML={{ __html: content.html }} />
    </div>
  )
}
