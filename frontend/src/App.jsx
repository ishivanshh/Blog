import { useState } from 'react'
import { BrowserRouter , Routes , Route , Link} from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Signup from './pages/Signup'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
