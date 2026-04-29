import type { ConstitutionStructure } from '../types/structure'

type TOCProps = {
  structure: ConstitutionStructure
}

export default function TOC({ structure }: TOCProps) {
  return (
    <nav>
      <h2>目次</h2>
      <ul>
        {structure.chapters.map((chapter, chapterIndex) => (
          <li key={chapterIndex}>
            <strong>第{chapterIndex + 1}部: {chapter.title}</strong>
            {'sections' in chapter ? (
              <ul>
                {chapter.sections.map((section, sectionIndex) => (
                  <li key={sectionIndex}>
                    第{sectionIndex + 1}章: {section.title}（第{section.articleOffset + 1}条〜）
                  </li>
                ))}
              </ul>
            ) : (
              <span>（第{chapter.articleOffset + 1}条〜）</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
