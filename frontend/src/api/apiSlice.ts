import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { Post, NewPost, PostUpdate, DeletePost } from '@/features/posts/postUtils'

import { Category } from '@/features/category/categoryUtil'
import type { Comment, NewComment, EditComment } from '@/features/comments/commentUtils'
export type { Post }

//define single API slice object
export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
  }),
  tagTypes: ['Post', 'Auth', 'User', 'Category', 'Comment', 'NumComment'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: (result = [], error, arg) => [
        'Post',
        //results argument comes from success API response data
        //create array of tags for each post id to be invalidated
        ...result.map(({ ID }) => ({ type: 'Post', ID }) as const),
      ],
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', ID: arg }],
    }),
    addNewPost: builder.mutation<Post, NewPost>({
      query: (initialPost) => ({
        url: '/posts/create',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'], //forces refetch of getPosts query after mutation
    }),
    editPost: builder.mutation<Post, PostUpdate>({
      query: (post) => ({
        url: `/posts/edit/${post.ID}`,
        method: 'PUT',
        body: post,
      }),
      //invalidates cache (ID) for the single post that was edited
      invalidatesTags: (result, error, arg) => [{ type: 'Post', ID: arg.ID }],
    }),
    deletePost: builder.mutation<DeletePost, string>({
      query: (postId) => ({
        url: `/posts/delete/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      // transformResponse: (response: Category[]) => {
      //     console.log(response)
      //     return response.map(category => ({
      //         ...category,
      //         ID: category.ID.toString()
      //     }))
      // },
      providesTags: ['Category'],
    }),

    addCategory: builder.mutation<void, Category>({
      query: (category) => ({
        url: '/categories/create',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Category'],
    }),

    getCommentsByPostID: builder.query<Comment[], string>({
      query: (postID) => `/comments?postID=${postID}`,
      providesTags: (result) =>
        result
          ? //if there are comments, invalidate cache for all comments associated with the post
            [...result.map(({ ID }) => ({ type: 'Comment' as const, ID })), { type: 'Comment' as const, id: 'LIST' }]
          : [{ type: 'Comment' as const, id: 'LIST' }],
    }),

    getNumCommentsByPostID: builder.query<number, string>({
      query: (postID) => `/comments?postID=${postID}`,
      transformResponse: (response: Comment[]) => response.length,
      providesTags: ['NumComment'],
    }),

    //Currently not used
    getComment: builder.query<Comment, string>({
      query: (commentId) => `/comments/${commentId}`,
    }),

    addComment: builder.mutation<Comment, NewComment>({
      query: (newComment) => ({
        url: '/comments/create',
        method: 'POST',
        body: newComment,
      }),
      //invalidates cache for all comments associated with the post
      invalidatesTags: [{ type: 'Comment', id: 'LIST' }, 'NumComment'],
    }),

    editComment: builder.mutation<Comment, EditComment>({
      query: (comment) => ({
        url: `/comments/edit/${comment.ID}`,
        method: 'PUT',
        body: comment,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Comment', ID: arg.ID }],
    }),

    deleteComment: builder.mutation<string, string>({
      query: (commentId) => ({
        url: `/comments/delete/${commentId}`,
        method: 'DELETE',
        body: commentId,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
})
//hook naming use____Query/ use____Mutation
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useGetCommentsByPostIDQuery,
  useGetNumCommentsByPostIDQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation
} = apiSlice
