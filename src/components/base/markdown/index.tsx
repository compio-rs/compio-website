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
    <article
      className={cx(
        'font-sans min-h-[65lvh] max-w-full block overflow-x-hidden min-w-0',
        'markdown-body',
        className
      )}
      /* biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted content */
      dangerouslySetInnerHTML={{ __html: content.html }}
      {...rest}
    />
  )
}
