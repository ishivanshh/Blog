import { useState } from 'react'
import { BrowserRouter , Routes , Route , Link} from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
