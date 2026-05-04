import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Article from '../../components/Article'

export default function CommentaryPanel() {
  const { commentaryId } = useParams<{ commentaryId: string }>()
  const navigate = useNavigate()
  const [markdown, setMarkdown] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const errorMessage = '指定されたURIは、いかなる解説文にも対応しない。'

  useEffect(() => {
    if (!commentaryId) return

    fetch(`/docs/commentary/${commentaryId}.md`)
      .then(response => {
        if (!response.ok) {
          throw new Error(errorMessage)
        }
        return response.text()
      })
      .then(text => {
        if (text.trim().startsWith('<!DOCTYPE') || text.includes('<html')) {
          throw new Error(errorMessage)
        }
        setMarkdown(text)
        setError(null)
      })
      .catch(err => {
        setError(err.message)
        setMarkdown('')
      })
  }, [commentaryId])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto"
      onClick={() => navigate('/')}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-auto" />
      <div
        className="relative z-10 w-full max-w-4xl rounded-[2rem] bg-white p-8 shadow-2xl ring-1 ring-black/10 pointer-events-auto max-h-[80vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        {error ? (
          <div className="w-full flex items-center justify-center h-64 list-none [writing-mode:vertical-rl]">
            <Article article={{
              title: 'ページの不存在',
              paragraphs: [error],
            }} number={404} />
          </div>
        ) : (
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
