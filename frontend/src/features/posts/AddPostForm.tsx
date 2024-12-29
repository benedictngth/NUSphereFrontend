import React , {useState} from 'react'
import {nanoid} from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
// import {addNewPost} from '@/features/posts/postSlice'
import { selectAllUsers } from '../users/usersSlice'
import { selectCurrentUsername } from '../auth/authSlice'
import { useAddNewPostMutation } from '@/api/apiSlice'
import { Input, TextField, Button} from '@mui/material'

// TS types for the input fields
// See: https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}
interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

    
export const AddPostForm = () => {
    //trigger function, object with metadata about the request
    const [addNewPost, {isLoading}] = useAddNewPostMutation()
    const dispatch = useAppDispatch()
    const UserID = useAppSelector(selectCurrentUsername)!
    // console.log(userID)
    const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
        // Prevent server submission
        e.preventDefault()

        const { elements } = e.currentTarget
        const Title = elements.postTitle.value
        const Content = elements.postContent.value

        const form = e.currentTarget 

        try { 
            //await return result/error of the promise returned by addNewPost
            await addNewPost({Title, Content, UserID}).unwrap()
            form.reset()
        } catch (err) {
            console.error('Failed to save the post: ', err)
            form.reset()
        }
    }
  

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <Input type="text" id="postTitle" defaultValue="" required />

        <label htmlFor="postContent">Content:</label>
        <TextField
        sx={{marginBottom: 2}}
          fullWidth
          id="postContent"
          name="postContent"
          defaultValue="Content Here!"
          required
        />

        <Button type = "submit" variant = "contained" disabled={isLoading}>Save Post</Button>
      </form>
    </section>
  )
}