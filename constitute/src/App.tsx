import constitution from './assets/constitution.json'
import type { Constitution } from './types/constitution'
import { buildDocumentStructure } from './utils/structure'
import { formatJapaneseNumeral } from './utils/japaneseNumber'
import { Link, Route, Routes } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Article from './components/Article'
import TOC from './components/TOC'
import Header from './components/Header'
import CommentaryPanel from './routes/commentary/page'

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
    <>
      <Header structure={documentStructure} />
      <div className="page-shell scroll-smooth">
        <div className="vertical-text vertical-columns">
          <h1 className="text-3xl font-bold w-full flex items-center justify-center md:w-auto md:my-[5ic] md:px-[2ic]">日本国憲法案</h1>
          <p className="text-right">令和六年五月十二日<br/>最終更新　令和七年八月十一日</p>
          <h2>目次</h2>
          <TOC structure={documentStructure} />
          <div>
            <h2 id="preamble" className="target:animate-[highlight-fade_3s_ease-out]"><Link to="/commentary/preamble">前文 <span className="text-xs font-sans font-normal bg-slate-200 text-slate-800 px-2 py-1 rounded">解説</span></Link></h2>
            <p className="indent-[1ic] hover:bg-gray-100 rounded transition-colors">
              {typedConstitution.preamble}
            </p>
          </div>
          <div>
            {typedConstitution.chapters.map((chapter, chapterIndex) => (
              <div key={chapterIndex}>
                <h2 id={`chapter-${chapterIndex + 1}`} className="target:animate-[highlight-fade_3s_ease-out]">
                  第{formatJapaneseNumeral(chapterIndex + 1)}部 {chapter.title}
                </h2>
                {'sections' in chapter ? (
                  <div>
                    {chapter.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <h3 id={`chapter-${chapterIndex + 1}-section-${sectionIndex + 1}`} className="target:animate-[highlight-fade_3s_ease-out]">
                          第{formatJapaneseNumeral(sectionIndex + 1)}章 {section.title}
                        </h3>
                        <ul>
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
                  <ul>
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
      </div>

      <Routes>
        <Route path="/commentary/:commentaryId" element={<CommentaryPanel />} />
      </Routes>
      <SpeedInsights />
    </>
  )
}

export default App
