import { createSlice,PayloadAction,createEntityAdapter,EntityState } from "@reduxjs/toolkit";
// import {client} from "@/api/client";
import { nanoid } from "nanoid";
import {sub} from "date-fns";

import type { RootState } from "@/app/store";
import { AppStartListening } from "@/app/listernerMiddleware";
import { createAppAsyncThunk } from "@/app/withTypes";

import { userLoggedOut } from "@/features/auth/authSlice";
import { apiSlice } from "@/api/apiSlice";

//string, "payload creator" with a Promise containing data / rejected Promise
// export const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async () => {
//     const response = await client.get<Post[]>('/fakeApi/posts')
//     return response.data
//   },
// {condition(arg,thunkApi) {
//     const postsStatus = selectPostsStatus(thunkApi.getState())
//     if (postsStatus !== 'idle'){
//         return false
//     }
// }})

// export const addNewPost = createAppAsyncThunk(
//     'posts/addNewPost',
//     //payload creator received partial post object
//     async (initialPost : NewPost) => {
//         const response = await client.post<Post>('/fakeApi/posts', initialPost)
//         return response.data
// })

interface Reactions {
    thumbsUp: number
    tada: number
    heart: number
    rocket: number
    eyes: number
}
export type ReactionName = keyof Reactions

//user here refers to userID
export interface Post {
    ID :string;
    Title: string;
    Content: string;
    CreatedAt :string,
    UpdatedAt :string,
    UserID : string;
    // reactions : Reactions
}

interface PostsState extends EntityState<Post,string> {
    status : 'idle' | 'pending' | 'succeeded' | 'failed';
    error : string | null;
}
//entityAdapter is a normalized state management based on id with ids and entitites properties for posts object
// const postsAdapter = createEntityAdapter<Post>({
//     sortComparer : (a,b) =>b.date.localeCompare(a.date)
// })

// const initialState : PostsState = postsAdapter.getInitialState({
//     status:'idle',  
//     error: null
// })


//create type alias based on Post interface
export type PostUpdate = Pick<Post, 'ID' | 'Title' | 'Content'>
export type NewPost = Pick<Post, 'Title' | 'Content' | 'UserID'>

const initialReactions: Reactions = {
    thumbsUp: 0,
    tada: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
  }



export const addPostsListeners = (startAppListening: AppStartListening) => {
    startAppListening({
      matcher :apiSlice.endpoints.addNewPost.matchFulfilled,
      effect: async (action, listenerApi) => {
        const { toast } = await import('react-tiny-toast')
  
        const toastId = toast.show('New post added!', {
          variant: 'success',
          position: 'bottom-right',
          pause: true
        })
  
        await listenerApi.delay(5000)
        toast.remove(toastId)
      }
    })
  }

