import { AppStartListening } from "@/app/listernerMiddleware";
import { apiSlice } from "@/api/apiSlice";


interface Reactions {
    thumbsUp: number
    tada: number
    heart: number
    rocket: number
    eyes: number
}
export type ReactionName = keyof Reactions


//user interface for each individual post
export interface Post {
    ID :string;
    Title: string;
    Content: string;
    CreatedAt :string,
    UpdatedAt :string,
    UserID : string;
    CategoryID : string;
}


//create type alias based on Post interface
export type PostUpdate = Pick<Post, 'ID' | 'Title' | 'Content' | 'CategoryID'>
export type NewPost = Pick<Post, 'Title' | 'Content' | 'UserID' | 'CategoryID'>
export type DeletePost = Pick<Post, 'ID'>


//side effect listener (react toast)for adding new post
export const addPostsListeners = (startAppListening: AppStartListening) => {
    startAppListening({
      matcher :apiSlice.endpoints.addNewPost.matchFulfilled,
      effect: async (action, listenerApi) => {
        const { toast } = await import('react-tiny-toast')
  
        const toastId = toast.show('New post added!', {
          variant: 'success',
          position: 'top-right',
          pause: true
        })
  
        await listenerApi.delay(5000)
        toast.remove(toastId)
      }
    })
  }
  

