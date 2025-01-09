import React from 'react';
import { BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate 
} from 'react-router-dom'
import {ToastContainer} from 'react-tiny-toast'

import {ProtectedRoute} from '@/components/ProtectedRoute'

import { Navbar } from './components/navBar/Navbar'
import {LoginPage} from './features/auth/LoginPage'
import {RegisterPage} from './features/auth/RegisterPage'
import {PostsMainPage} from './features/posts/PostsMainPage'
import {SinglePostPage} from './features/posts/SinglePostPage'
import { EditPostForm } from './features/posts/EditPostForm'
import { AddPostForm } from './features/posts/AddPostForm'
import Footer from './components/Footer'
import Box from '@mui/material/Box'
import { AddNewCategory } from './features/category/AddNewCategory';




function App() {
  return (
    <Router>
      <Box 
        className="App"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
      }}
      >
      <Navbar />
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
                    <Route path="/newPost" element={<AddPostForm />} />
                    <Route path="/editPost/:postId" element={<EditPostForm />} />
                    <Route path="/newCategory" element={<AddNewCategory />} />
                  </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Box>
      <ToastContainer />
    </Router>
  )
}

export default App
