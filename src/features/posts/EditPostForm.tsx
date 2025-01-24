import React from 'react'
import {useNavigate, useParams } from 'react-router-dom'


// import {postUpdated, selectPostById} from './postSlice'
import { useGetPostQuery,useEditPostMutation } from '@/api/apiSlice'

import { CategoriesList } from '../category/PostCategoryList'
import Box from '@mui/material/Box'
import { Button, FormControl, InputLabel, TextField } from '@mui/material'
import { Input } from '@mui/material'
interface EditPostFormFields extends HTMLFormControlsCollection{
    postTitle: HTMLInputElement
    postContent: HTMLTextAreaElement
    category: HTMLSelectElement
}
interface AddPostFormElements extends HTMLFormElement {
    readonly elements: EditPostFormFields
}

export const EditPostForm = () => {
    //extract the postID from the URL and post from store
    const {postId} = useParams<{postId:string}>()
    console.log(postId)
    const {data : post} = useGetPostQuery(postId!)
    const [updatePost, {isLoading}] = useEditPostMutation();
    

    const navigate = useNavigate()

    if (!post) {
        return (
            <Box sx={{mt: 2, mx: 3}}>
                <h2>Post not found!</h2>
            </Box>
        )
    }
    //event handler upon submitting the form
    const onSavePostClicked = async(e: React.FormEvent<AddPostFormElements>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const Title = formData.get('postTitle') as string
        const Content = formData.get('postContent') as string
        const CategoryID = formData.get('category') as string


        if (Title && Content && postId) {
            try {
                await(updatePost({ID:post.ID, Title, Content, CategoryID})).unwrap()
                console.log("Post updated")
                navigate(`/posts/${postId}`)
            }
            catch (err) {
                console.error('Failed to save the post: ', err)
                // reflect the error in the UI somehow later
            }


        }
    }
        return (
            <Box sx={{mt: 2, mx: 3}}>
            <h2>Edit Post</h2>
            <Box 
            component="form" 
            onSubmit={onSavePostClicked} 
            display={'flex'} 
            flexDirection={'column'} 
            sx={{ '& > *': { mb: 3 } }}>
                <FormControl>
                <InputLabel htmlFor="postTitle">Post Title:</InputLabel>
                <Input
                type="text"
                id="postTitle"
                name="postTitle"
                defaultValue={post.Title}
                required
                />
                </FormControl>
                <CategoriesList isEdit = {true} defaultValue={post.CategoryID} />

                <FormControl>
                <TextField
                fullWidth
                id="postContent"
                name="postContent"
                label="Post Content"
                sx={{marginBottom: 2}}
                multiline
                maxRows={4}
                defaultValue={post.Content}
                required
                />
                </FormControl>
                <Button 
                type="submit"
                variant="contained"
                disabled={isLoading}
                >
                    Save Post
                </Button>
            </Box>
            </Box>
        )

}