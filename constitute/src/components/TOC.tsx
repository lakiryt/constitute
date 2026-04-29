import type { ConstitutionStructure } from '../types/structure'
import { formatJapaneseNumeral } from '../utils/japaneseNumber'

type TOCProps = {
  structure: ConstitutionStructure
}

export default function TOC({ structure }: TOCProps) {
  return (
    <nav className="vertical-text">
      <h2>目次</h2>
      <ul className="pt-[1ic]">
        {structure.chapters.map((chapter, chapterIndex) => {
          const chapterId = `chapter-${chapterIndex + 1}`
          return (
            <li key={chapterIndex}>
              <span>第{formatJapaneseNumeral(chapterIndex + 1)}部　</span>
              <a
                href={`#${chapterId}`}
                className="underline text-decoration-gray-600 hover:text-gray-800 focus:text-gray-800"
              >
                {chapter.title}
              </a>
              {'sections' in chapter ? (
                <ul className="pt-[3ic] -indent-[2ic]">
                  {chapter.sections.map((section, sectionIndex) => {
                    const sectionId = `${chapterId}-section-${sectionIndex + 1}`
                    return (
                      <li key={sectionIndex}>
                        <span>第{formatJapaneseNumeral(sectionIndex + 1)}章</span>
                        <a
                          href={`#${sectionId}`}
                          className="underline text-decoration-gray-600 hover:text-gray-800 focus:text-gray-800"
                        >{section.title}
                        </a>
                        （{formatJapaneseNumeral(section.articleOffset + 1)}条〜{formatJapaneseNumeral(section.articleOffset + section.articleCount)}条）
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <span>（{formatJapaneseNumeral(chapter.articleOffset + 1)}条〜{formatJapaneseNumeral(chapter.articleOffset + chapter.articleCount)}条）</span>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
