import type { Article as ArticleType } from '../types/constitution'

type ArticleProps = {
  article: ArticleType
  number?: number
}

export default function Article({ article, number }: ArticleProps) {
  return (
    <li>
      <strong>
        {article.title}
        {number !== undefined ? ` 第${number}条` : ''}
      </strong>
      <ul>
        {article.paragraphs.map((paragraph, paraIndex) => (
          <li key={paraIndex}>{paragraph}</li>
        ))}
      </ul>
    </li>
  )
}
