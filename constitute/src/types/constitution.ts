// 条文の段落
type Paragraphs = string[]

// 条文
export type Article = {
    title: string
    paragraphs: Paragraphs
    commentaryId?: string
}

// 章
type Section = {
    title: string
    articles: Article[]
}

// 部
type Chapter = {
    title: string
} & (
    | { sections: Section[] }  // 章からなる部
    | { articles: Article[] }  // 直接条文が並ぶ部
)

export type Constitution = {
    preamble: string
    chapters: Chapter[]
}
