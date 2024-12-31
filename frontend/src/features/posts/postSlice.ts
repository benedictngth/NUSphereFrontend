import { createSlice,PayloadAction,createEntityAdapter,EntityState } from "@reduxjs/toolkit";
// import {client} from "@/api/client";
import { nanoid } from "nanoid";
import {sub} from "date-fns";

import type { RootState } from "@/app/store";
import { AppStartListening } from "@/app/listernerMiddleware";
import { createAppAsyncThunk } from "@/app/withTypes";

import { userLoggedOut } from "@/features/auth/authSlice";
import { apiSlice } from "@/api/apiSlice";


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

