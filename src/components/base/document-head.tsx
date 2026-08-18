import { useEffect } from 'react'

const defaultTitle = 'Compio | Completion-based async I/O for Rust'
const defaultDescription =
  'Compio is a completion-based asynchronous runtime for Rust.'

export default function DocumentHead({
  title,
  description = defaultDescription,
}: {
  title?: string
  description?: string
}) {
  useEffect(() => {
    document.title = title ? `${title} | Compio` : defaultTitle

    const descriptionElement = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    if (descriptionElement) descriptionElement.content = description
  }, [title, description])

  return null
}
