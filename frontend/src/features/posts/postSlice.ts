import { createSlice,PayloadAction,createEntityAdapter,EntityState } from "@reduxjs/toolkit";
import {client} from "@/api/client";
import { nanoid } from "nanoid";
import {sub} from "date-fns";

import type { RootState } from "@/app/store";
import { AppStartListening } from "@/app/listernerMiddleware";
import { createAppAsyncThunk } from "@/app/withTypes";

import { userLoggedOut } from "@/features/auth/authSlice";
import { apiSlice } from "@/api/apiSlice";

//string, "payload creator" with a Promise containing data / rejected Promise
export const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')
    return response.data
  },
{condition(arg,thunkApi) {
    const postsStatus = selectPostsStatus(thunkApi.getState())
    if (postsStatus !== 'idle'){
        return false
    }
}})

export const addNewPost = createAppAsyncThunk(
    'posts/addNewPost',
    //payload creator received partial post object
    async (initialPost : NewPost) => {
        const response = await client.post<Post>('/fakeApi/posts', initialPost)
        return response.data
})

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
    id :string;
    title: string;
    content: string;
    date :string,
    user : string;
    reactions : Reactions
}

interface PostsState extends EntityState<Post,string> {
    status : 'idle' | 'pending' | 'succeeded' | 'failed';
    error : string | null;
}
//entityAdapter is a normalized state management based on id with ids and entitites properties for posts object
const postsAdapter = createEntityAdapter<Post>({
    sortComparer : (a,b) =>b.date.localeCompare(a.date)
})

const initialState : PostsState = postsAdapter.getInitialState({
    status:'idle',  
    error: null
})


//create type alias based on Post interface
export type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>
export type NewPost = Pick<Post, 'title' | 'content' | 'user'>

const initialReactions: Reactions = {
    thumbsUp: 0,
    tada: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
  }


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    //action creators removed 
    reducers: {
        //action types & action creators - postAdded
        // postAdded : {
        //     reducer(state, action:PayloadAction<Post>) {
        //     state.posts.push(action.payload) // 'mutation' due to immer
        //     },
        //     //'callback function' used during dispatch function and creates payload object in state management instead
        //     prepare(title: string, content: string, userId : string) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 content,
        //                 date: new Date().toISOString(),
        //                 user : userId,
        //                 reactions : initialReactions
        //             }
        //         }
        //     },

        // },
        //action creators - postUpdated with action type name posts/postUpdated used internally in the slice
        postUpdated(state, action:PayloadAction<PostUpdate>) {      
            //destructuring action.payload
            const { id, title, content } = action.payload 
            //direct look up based on id
            const existingPost = state.entities[id] 
            //updates an existingPost if it exists
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
                }
        },
        reactionAdded(
            state, 
            action: PayloadAction<{postId: string, reaction: ReactionName}>) 
            {
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
    }
    },
    extraReducers: (builder) =>{
        //handle actions outside of slice
        builder //state is the slice state
        .addCase(userLoggedOut, () => {
            return initialState
        })
        .addCase(fetchPosts.pending, (state,action) => {
            state.status = 'pending'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array built-in reducer function to EntityAdapter
            postsAdapter.setAll(state, action.payload)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message ?? 'unknown error'
        })
        //entityAdapter function to add a new post to the state
        .addCase(addNewPost.fulfilled, postsAdapter.addOne)
    },
})
export const {postUpdated, reactionAdded} = postsSlice.actions; //action creator function placed is dispatch functions returning type alias 
export default postsSlice.reducer

export const {
    selectAll :selectAllPosts,
    selectById :selectPostById,
    selectIds : selectPostIds
} = postsAdapter.getSelectors((state: RootState) => state.posts as PostsState) //selector function to get all posts

export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error

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

