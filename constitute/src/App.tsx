import constitution from './assets/constitution.json'
import type { Constitution } from './types/constitution'
import { buildDocumentStructure } from './utils/structure'
import Article from './components/Article'
import TOC from './components/TOC'

const typedConstitution = constitution as Constitution

const documentStructure = buildDocumentStructure(typedConstitution)

function App() {
  return (
    <div className="vertical-text">
      <h1>日本国憲法案</h1>
      <TOC structure={documentStructure} />
      <div>
        <h2>前文</h2>
        <p>{typedConstitution.preamble}</p>
      </div>
      <div>
        {typedConstitution.chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex}>
            <h2>第{chapterIndex + 1}部: {chapter.title}</h2>
            {'sections' in chapter ? (
              <div>
                {chapter.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h4>第{sectionIndex + 1}章: {section.title}</h4>
                    <ul>
                            {section.articles.map((article, articleIndex) => {
                        const chapterStructure = documentStructure.chapters[chapterIndex]
                        const sectionOffset = 'sections' in chapterStructure
                          ? chapterStructure.sections[sectionIndex].articleOffset
                          : chapterStructure.articleOffset

                        return (
                          <Article
                            key={articleIndex}
                            article={article}
                            number={sectionOffset + articleIndex + 1}
                          />
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul>
                {chapter.articles.map((article, articleIndex) => (
                  <Article
                    key={articleIndex}
                    article={article}
                    number={documentStructure.chapters[chapterIndex].articleOffset + articleIndex + 1}
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
