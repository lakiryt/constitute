import constitution from './assets/constitution.json'
import type { Constitution } from './types/constitution'
import { buildDocumentStructure } from './utils/structure'
import { Route, Routes } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import Main from './components/Main'
import CommentaryPanel from './routes/commentary/page'

const typedConstitution = constitution as Constitution
const documentStructure = buildDocumentStructure(typedConstitution)

function App() {
  return (
    <>
      <Header structure={documentStructure} />
      <Main constitution={typedConstitution} structure={documentStructure} />
      <Routes>
        <Route path="/commentary/:commentaryId" element={<CommentaryPanel />} />
      </Routes>
      <SpeedInsights />
      <Analytics />
    </>
  )
}

export default App
