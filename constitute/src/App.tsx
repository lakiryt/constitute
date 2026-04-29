import constitution from './assets/constitution.json'
import type { Constitution } from './types/constitution'

const typedConstitution = constitution as Constitution

function App() {
  return (
    <div>
      <h1>日本国憲法案</h1>
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
                    <h4>第{sectionIndex + 1}章: {section.section}</h4>
                    <ul>
                      {section.articles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <strong>（{article.title}）第{articleIndex + 1}条</strong>
                          <ul>
                            {article.paragraphs.map((paragraph, paraIndex) => (
                              <li key={paraIndex}>{paragraph}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul>
                {chapter.articles.map((article, articleIndex) => (
                  <li key={articleIndex}>
                    <strong>（{article.title}）第{articleIndex + 1}条</strong>
                    <ul>
                      {article.paragraphs.map((paragraph, paraIndex) => (
                        <li key={paraIndex}>{paragraph}</li>
                      ))}
                    </ul>
                  </li>
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
