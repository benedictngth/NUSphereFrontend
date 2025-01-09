import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import {addNewPost} from '@/features/posts/postSlice'
import { useAddNewPostMutation } from '@/api/apiSlice'
import { Button, TextField, Input, Typography, Box, FormControl, InputLabel, FormHelperText } from '@mui/material'

import { useGetCurrentUserQuery } from '../auth/authSlice'
import { CategoriesList } from '../category/AddPostCategoryList'

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
  category: HTMLSelectElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

    
export const AddPostForm = () => {
    const navigate = useNavigate()
    //trigger function, object with metadata about the request
    const [addNewPost, {isLoading}] = useAddNewPostMutation()
    // to be replaced with the current user ID
    const {data : currentUser} = useGetCurrentUserQuery()
    // console.log(currentUser?.id)
    const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
        // Prevent server submission
        e.preventDefault()

      const formData = new FormData(e.currentTarget)

      console.log('Form data:', formData)

        const Title = formData.get('postTitle') as string
        const Content = formData.get('postContent') as string
        const CategoryID = formData.get('category') as string

        const form = e.currentTarget 

        try {
            if (!currentUser?.id) {
                throw new Error('User must be logged in to create a post');
            }
            // await return result/error of the promise returned by addNewPost
            await addNewPost({Title, Content, UserID: currentUser.id, CategoryID }).unwrap()
            form.reset()
            navigate('/posts')

        } catch (err) {
            console.error('Failed to save the post: ', err)
            form.reset()
        }
    }
  

  return (
    <Box sx={{mx: 3, mt: 2}}>
      <Typography variant='h4' component='h2' sx={{fontWeight:600}}>Add New Post</Typography>

      <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{display: 'flex', flexDirection: 'column', gap: 2, mr: 2, ml: 2}}>

        <FormControl variant='standard'>
          <InputLabel sx={{ml:1}}htmlFor="postTitle">Post Title</InputLabel>
          <Input 
          id="postTitle" 
          name = "postTitle"
          required />
          <FormHelperText>Enter the title of your post</FormHelperText>
        </FormControl>

        <FormControl variant='standard'>
          <CategoriesList />
        </FormControl>

        <TextField
          fullWidth
          id="postContent"
          name="postContent"
          label="Post Content"
          sx={{marginBottom: 2}}
          multiline
          maxRows={4}
          defaultValue="Content Here!"
          required
        />

        <Button 
        type = "submit" 
        variant = "contained" 
        disabled={isLoading}>
          Save Post
        </Button>
      </Box>
    </Box>
  )
}