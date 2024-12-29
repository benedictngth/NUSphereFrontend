import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
// import {postUpdated, selectPostById} from './postSlice'
import { useGetPostQuery,useEditPostMutation } from '@/api/apiSlice'

interface EditPostFormFields extends HTMLFormControlsCollection{
    postTitle: HTMLInputElement
    postContent: HTMLTextAreaElement
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
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    //event handler upon submitting the form
    const onSavePostClicked = async(e: React.FormEvent<AddPostFormElements>) => {
        e.preventDefault()
        const {elements} = e.currentTarget
        const Title = elements.postTitle.value
        const Content = elements.postContent.value


        if (Title && Content && postId) {
            try {
                await(updatePost({ID:post.ID, Title, Content})).unwrap()
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
            <section>
            <h2>Edit Post</h2>
            <form onSubmit={onSavePostClicked}>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                type="text"
                id="postTitle"
                name="postTitle"
                defaultValue={post.Title}
                required
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                id="postContent"
                name="postContent"
                defaultValue={post.Content}
                required
                />
        
                <button>Save Post</button>
            </form>
            </section>
        )

}