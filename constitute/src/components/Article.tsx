import type { Article as ArticleType } from '../types/constitution'
import { formatJapaneseNumeral } from '../utils/japaneseNumber'

type ArticleProps = {
  article: ArticleType
  number: number
}

export default function Article({ article, number }: ArticleProps) {
  const [firstParagraph, ...restParagraphs] = article.paragraphs

  return (
    <li>
      <p className="text-sm">（{article.title}）</p>
      <p>
        <strong>第{formatJapaneseNumeral(number)}条</strong> {firstParagraph}
      </p>
      {restParagraphs.map((paragraph, paraIndex) => (
        <p key={paraIndex}>
          {paragraph}
        </p>
      ))}
    </li>
  )
}
