import { useState } from 'react'
import { BrowserRouter , Routes , Route , Link} from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import MyBlogs from './pages/MyBlog'
import Signup from './pages/Signup'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback"
import Explore from "./pages/Explore"
import WriteBlog from "./pages/WriteBlog"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* unprotected routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />


        {/* protected routes */}
        <Route element={<ProtectedRoutes/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/MyBlog" element={<MyBlogs/>} />
        <Route path="/writeblog" element={<WriteBlog/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/explore" element={<Explore/>} />
        </Route>

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
