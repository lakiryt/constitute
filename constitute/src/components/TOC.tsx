import type { ConstitutionStructure } from '../types/structure'
import { formatJapaneseNumeral } from '../utils/japaneseNumber'

type TOCProps = {
  structure: ConstitutionStructure
}

export default function TOC({ structure }: TOCProps) {
  return (
    <nav>
      <h2>目次</h2>
      <ul className="pt-[1ic]">
        {structure.chapters.map((chapter, chapterIndex) => (
          <li key={chapterIndex}>
            第{formatJapaneseNumeral(chapterIndex + 1)}部 {chapter.title}
            {'sections' in chapter ? (
              <ul className="pt-[3ic] -indent-[2ic]">
                {chapter.sections.map((section, sectionIndex) => (
                  <li key={sectionIndex}>
                    第{formatJapaneseNumeral(sectionIndex + 1)}章 {section.title}（{formatJapaneseNumeral(section.articleOffset + 1)}条〜{formatJapaneseNumeral(section.articleOffset + section.articleCount)}条）
                  </li>
                ))}
              </ul>
            ) : (
              <span>（{formatJapaneseNumeral(chapter.articleOffset + 1)}条〜{formatJapaneseNumeral(chapter.articleOffset + chapter.articleCount)}条）</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
