import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/new" element={<AddCreator />} />
        <Route path="/creator/:id" element={<ViewCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App