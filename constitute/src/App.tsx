import constitution from './assets/constitution.json'
import type { Constitution } from './types/constitution'
import { buildDocumentStructure } from './utils/structure'
import { formatJapaneseNumeral } from './utils/japaneseNumber'
import Article from './components/Article'
import TOC from './components/TOC'

const typedConstitution = constitution as Constitution

const documentStructure = buildDocumentStructure(typedConstitution)

function App() {
  const getArticleNumber = (
    chapterIndex: number,
    articleIndex: number,
    sectionIndex?: number
  ) => {
    const chapterStructure = documentStructure.chapters[chapterIndex]

    if (sectionIndex !== undefined && 'sections' in chapterStructure) {
      return chapterStructure.sections[sectionIndex].articleOffset + articleIndex + 1
    }

    return chapterStructure.articleOffset + articleIndex + 1
  }

  return (
    <div className="vertical-text">
      <h1 className="text-2xl font-bold my-[5ic]">日本国憲法案</h1>
      <TOC structure={documentStructure} />
      <div>
        <h2>前文</h2>
        <p>{typedConstitution.preamble}</p>
      </div>
      <div>
        {typedConstitution.chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex}>
            <h2>第{formatJapaneseNumeral(chapterIndex + 1)}部 {chapter.title}</h2>
            {'sections' in chapter ? (
              <div>
                {chapter.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h4>第{formatJapaneseNumeral(sectionIndex + 1)}章 {section.title}</h4>
                    <ul className="article-list">
                      {section.articles.map((article, articleIndex) => (
                        <Article
                          key={articleIndex}
                          article={article}
                          number={getArticleNumber(chapterIndex, articleIndex, sectionIndex)}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="article-list">
                {chapter.articles.map((article, articleIndex) => (
                  <Article
                    key={articleIndex}
                    article={article}
                    number={getArticleNumber(chapterIndex, articleIndex)}
                  />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
