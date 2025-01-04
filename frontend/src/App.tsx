import { BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate 
} from 'react-router-dom'
import {ToastContainer} from 'react-tiny-toast'

import { useAppSelector } from './app/hooks'

import {ProtectedRoute} from '@/components/ProtectedRoute'

import { Navbar } from './components/Navbar'
import {LoginPage} from './features/auth/LoginPage'
import {RegisterPage} from './features/auth/RegisterPage'
import {PostsMainPage} from './features/posts/PostsMainPage'
import {SinglePostPage} from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'



function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element = {<RegisterPage />} />
          <Route 
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/posts" />} />
                    <Route path="/posts" element={<PostsMainPage />} />
                    {/* params of :postId */}
                    <Route path="/posts/:postId" element={<SinglePostPage />} />
                    <Route path="/editPost/:postId" element={<EditPostForm />} />
                  </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
