// Server side plugin to transform markdown files into HTML code exported as string

import type { Plugin } from 'vite'
import { render } from './render'

const definePlugin = <A>(p: Plugin<A>) => p

export function markdownToHtml() {
  return definePlugin({
    name: 'markdown-to-html',
    async transform(code, id) {
      if (!id.endsWith('md')) return
      const md = await render(code)
      return `export default {
        html: ${JSON.stringify(md.html)},
        title: ${JSON.stringify(md.title)}
      }`
    },
  })
}
