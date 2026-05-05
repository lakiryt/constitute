import type { Constitution } from '../types/constitution'
import type { ConstitutionStructure } from '../types/structure'

const scanl = (counts: number[]): number[] =>
  counts.reduce<number[]>(
    (offsets, count) => [...offsets, offsets[offsets.length - 1] + count],
    [0]
  )

const getCounts = (constitution: Constitution): number[] =>
  constitution.chapters.flatMap((chapter) =>
    'sections' in chapter
      ? chapter.sections.map((section) => section.articles.length)
      : [chapter.articles.length]
  )

export const buildDocumentStructure = (
  constitution: Constitution
): ConstitutionStructure => {
  const counts = getCounts(constitution)
  const offsets = scanl(counts)
  let offsetIndex = 0

  return {
    chapters: constitution.chapters.map((chapter) => {
      if ('sections' in chapter) {
        const sections = chapter.sections.map((section) => {
          const entry = {
            title: section.title,
            articleOffset: offsets[offsetIndex],
            articleCount: section.articles.length,
          }
          offsetIndex += 1
          return entry
        })

        return {
          title: chapter.title,
          articleOffset: sections[0]?.articleOffset ?? 0,
          articleCount: sections.reduce((sum, section) => sum + section.articleCount, 0),
          sections,
        }
      }

      const entry = {
        title: chapter.title,
        articleOffset: offsets[offsetIndex],
        articleCount: chapter.articles.length,
        articles: true as const,
      }
      offsetIndex += 1
      return entry
    }),
  }
}

export const getArticleNumber =
(structure: ConstitutionStructure) =>
(
  chapterIndex: number,
  articleIndex: number,
  sectionIndex?: number
) => {
  const chapterStructure = structure.chapters[chapterIndex]

  if (sectionIndex !== undefined && 'sections' in chapterStructure) {
    return chapterStructure.sections[sectionIndex].articleOffset + articleIndex + 1
  }

  return chapterStructure.articleOffset + articleIndex + 1
}