// Document structure types for table of contents and numbering
export type SectionStructure = {
    title: string
    articleOffset: number
    articleCount: number
}

export type ChapterStructure = {
    title: string
    articleOffset: number
    articleCount: number
} & (
    | { sections: SectionStructure[] }
    | { articles: true }
)

export type ConstitutionStructure = {
    chapters: ChapterStructure[]
}