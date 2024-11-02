interface Markdown {
  html: string
  title?: string
}

interface Page {
  title: string
  path: string
}

declare module '*.md' {
  export default Markdown
}

declare module 'virtual:content/list' {
  const list: Page[]
  export default list
}
