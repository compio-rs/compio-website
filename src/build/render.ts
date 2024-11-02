import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { type Plugin, unified } from 'unified'
import { EXIT, type Test, visit } from 'unist-util-visit'

type Tree = {
  type: 'element'
  tagName: string
  children: { value: string }[]
}

const extractTitle: Plugin<never[], Tree> = () => (tree, file) => {
  // Traverse the tree to find the first heading with depth 1, i.e. <h1>
  visit<Tree, Test>(tree, 'element', node => {
    if (node.tagName !== 'h1') return
    file.data.title = node.children[0].value
    return EXIT
  })
}

export async function render(code: string): Promise<Markdown> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeShiki, {
      theme: 'one-light',
    })
    .use(rehypeStringify)
    .use(extractTitle)
    .process(code)

  return {
    title: file.data.title as string | undefined,
    html: String(file),
  }
}
