import cx from 'classix'
import DocumentHead from '../document-head'
import './index.css'

export default function Markdown({
  content,
  className,
  ...rest
}: {
  content: Markdown
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>) {
  return (
    <>
      <DocumentHead title={content.title} />
      <article
        className={cx(
          'min-h-[65lvh] block overflow-x-hidden min-w-0',
          'markdown-body',
          className,
        )}
        /* biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted content */
        dangerouslySetInnerHTML={{ __html: content.html }}
        {...rest}
      />
    </>
  )
}
