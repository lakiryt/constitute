import type { Article as ArticleType } from '../types/constitution'
import { formatJapaneseNumeral } from '../utils/japaneseNumber'
import { formatEncircledNumber } from '../utils/encircledNumber'

type ArticleProps = {
  article: ArticleType
  number: number
}

export default function Article({ article, number }: ArticleProps) {
  const [firstParagraph, ...restParagraphs] = article.paragraphs
  const areParagraphsNumbered = article.paragraphs.length > 1

  return (
    <li className="my-[1ic]">
      <p className="text-sm break-after-avoid">〔{article.title}〕</p>
      <p className="pt-[1ic] -indent-[1ic]">
        <strong>第{formatJapaneseNumeral(number)}条</strong>{areParagraphsNumbered && formatEncircledNumber(1) + '　'}{firstParagraph}
      </p>
      {restParagraphs.map((paragraph, paraIndex) => (
        <p key={paraIndex} className="pt-[1ic] -indent-[1ic]">
          {formatEncircledNumber(paraIndex + 2)}　{paragraph}
        </p>
      ))}
    </li>
  )
}
