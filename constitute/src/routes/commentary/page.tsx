import { useNavigate, useParams } from 'react-router-dom'

export default function CommentaryPanel() {
  const { commentaryId } = useParams<{ commentaryId: string }>()
  const navigate = useNavigate()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto"
      onClick={() => navigate('/')}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-auto" />
      <div
        className="relative z-10 w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl ring-1 ring-black/10 pointer-events-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Commentary Panel</h2>
        <p className="text-base">
          Received commentary id: <span className="font-mono text-slate-700">{commentaryId}</span>
        </p>
      </div>
    </div>
  )
}
