import { Link } from "react-router-dom"

export default function CommentaryBadge({ commentaryId }: { commentaryId: string }) {
    return (
        <Link to={`/commentary/${commentaryId}`}>
            <span className="text-xs font-sans font-normal bg-slate-200 text-slate-800 px-2 py-1 rounded">解説</span>
        </Link>
    )
}