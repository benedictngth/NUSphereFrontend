import { BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate 
} from 'react-router-dom'
import {ToastContainer} from 'react-tiny-toast'

import { useAppSelector } from './app/hooks'
import { selectCurrentUsername } from './features/auth/authSlice'

import { Navbar } from './components/Navbar'
import {LoginPage} from './features/auth/LoginPage'
import {PostsList} from './features/posts/PostsList'
import {AddPostForm} from './features/posts/AddPostForm'
import {PostsMainPage} from './features/posts/PostsMainPage'
import {SinglePostPage} from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'

const ProtectedRoute = ({children} : {children : React.ReactNode}) => {
  const username = useAppSelector(selectCurrentUsername)
  if(!username){
      return <Navigate to = "/login" />
  }
  return <>{children}</>
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<PostsMainPage />} />
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
