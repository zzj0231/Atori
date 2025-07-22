import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkPrism from 'remark-prism'

interface Props {
  content: string
}

export async function PostContent({ content }: Props) {
  const processedContent = await remark()
    .use(html)
    .use(remarkGfm)
    // .use(remarkPrism)
    .process(content)

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:scroll-mt-20"
      dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
    />
  )
}
