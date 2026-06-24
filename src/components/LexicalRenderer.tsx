/**
 * Minimal Lexical JSON renderer — handles paragraphs, headings, lists,
 * bold text, and links. Sufficient for legal / static CMS content.
 */

type LexicalNode = {
  type: string
  tag?: string
  format?: number | string
  text?: string
  url?: string
  listType?: 'bullet' | 'number'
  children?: LexicalNode[]
}

function renderNode(node: LexicalNode, key: string | number): React.ReactNode {
  switch (node.type) {
    case 'paragraph': {
      const children = node.children?.map((c, i) => renderNode(c, i)) ?? null
      return <p key={key}>{children}</p>
    }
    case 'heading': {
      const tag = node.tag ?? 'h2'
      const children = node.children?.map((c, i) => renderNode(c, i)) ?? null
      const Tag = tag as keyof JSX.IntrinsicElements
      return <Tag key={key}>{children}</Tag>
    }
    case 'list': {
      const items = node.children?.map((c, i) => renderNode(c, i)) ?? null
      if (node.listType === 'number') return <ol key={key}>{items}</ol>
      return <ul key={key}>{items}</ul>
    }
    case 'listitem': {
      const children = node.children?.map((c, i) => renderNode(c, i)) ?? null
      return <li key={key}>{children}</li>
    }
    case 'link': {
      const children = node.children?.map((c, i) => renderNode(c, i)) ?? null
      return (
        <a key={key} href={node.url ?? '#'} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    case 'text': {
      const text = node.text ?? ''
      // format is a bitmask: 1 = bold, 2 = italic, 4 = strikethrough, 8 = underline
      const fmt = typeof node.format === 'number' ? node.format : 0
      let el: React.ReactNode = text
      if (fmt & 1) el = <strong key={`${key}-b`}>{el}</strong>
      if (fmt & 2) el = <em key={`${key}-i`}>{el}</em>
      if (fmt & 4) el = <s key={`${key}-s`}>{el}</s>
      if (fmt & 8) el = <u key={`${key}-u`}>{el}</u>
      return <span key={key}>{el}</span>
    }
    default:
      return null
  }
}

export function LexicalRenderer({ content }: { content: any }) {
  if (!content?.root?.children) return null
  return (
    <>
      {content.root.children.map((node: LexicalNode, i: number) => renderNode(node, i))}
    </>
  )
}
