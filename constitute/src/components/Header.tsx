import TOC from './TOC'
import type { ConstitutionStructure } from '../types/structure'
import { useEffect, useState } from 'react'

export default function Header({ structure }: { structure: ConstitutionStructure }) {
  const [visible, setVisible] = useState(false)
  const [showTOC, setShowTOC] = useState(false)

  // スクロール位置を監視して、ヘッダーの表示/非表示を切り替える
  useEffect(() => {
    const shell = document.querySelector('.page-shell')
    if (!shell) return
    function onScroll() {
      setVisible((shell as HTMLElement).scrollTop > 320)
    }
    shell.addEventListener('scroll', onScroll)
    return () => shell.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed left-1/2 top-3 transform -translate-x-1/2 transition-all duration-500 z-50 flex items-center pointer-events-auto
          ${visible ? 'translate-y-0' : '-translate-y-32'}
          bg-white shadow-lg rounded-full px-8 py-2 w-[min(90vw,900px)] h-16`}
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
      >
        <img src="/favicon.svg" alt="favicon" className="h-8 w-8 ml-4" />
        <div className="flex-1" />
        <button
          className="flex items-center gap-2 text-gray-700 font-semibold px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
          style={{ background: 'none', border: 'none', outline: 'none', cursor: 'pointer' }}
          onClick={() => setShowTOC((v) => !v)}
        >
          <span className="text-lg">目次</span>
        </button>
      </header>
      {visible && showTOC && (
        <div className="[writing-mode:vertical-rl] font-serif fixed left-1/2 top-20 transform -translate-x-1/2 z-40 bg-white/95 rounded-2xl shadow-xl px-8 py-6 w-[min(90vw,900px)] max-h-[60vh] overflow-y-auto border border-gray-200">
          <TOC structure={structure} />
        </div>
      )}
    </>
  )
}
