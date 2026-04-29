// Base content types
type Paragraphs = string[]

export type Article = {
    title: string
    paragraphs: Paragraphs
}

// Hierarchical structure types
type Section = {
    section: string  // Note: JSON uses "section" instead of "title"
    articles: Article[]
}

type Chapter = {
    title: string
} & (
    | { sections: Section[] }  // Chapter with sections
    | { articles: Article[] }  // Chapter with direct articles
)

export type Constitution = {
    preamble: string
    chapters: Chapter[]
}
