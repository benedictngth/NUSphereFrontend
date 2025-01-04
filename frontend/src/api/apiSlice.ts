import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import type { Post, NewPost, PostUpdate, DeletePost} from '@/features/posts/postUtils';
export type {Post};

//define single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        credentials: 'include'
    }),
    tagTypes: ['Post', 'Auth', 'User'],
    endpoints : builder => ({
        getPosts :builder.query<Post[],void>({
            query: () => '/posts',
            providesTags: (result = [], error, arg)=> [
                'Post', 
                //results argument comes from success API response data
                //create array of tags for each post id to be invalidated
                ...result.map(({ID}) => ({type: 'Post', ID}) as const)
            ]
        }),
        getPost : builder.query<Post, string>({
            query :postId => `/posts/${postId}`,
            providesTags: (result, error, arg) => [{type: 'Post', ID: arg}]
        }),
        addNewPost : builder.mutation<Post, NewPost>({
            query : initialPost => ({
                url : '/posts/create',
                method : 'POST',
                body : initialPost
            }),
            invalidatesTags : ['Post'] //forces refetch of getPosts query after mutation

        }),
        editPost : builder.mutation<Post, PostUpdate>({
            query : post => ({
                url : `/posts/edit/${post.ID}`,
                method : 'PUT',
                body : post
            }),
            //invalidates cache (ID) for the single post that was edited
            invalidatesTags : (result, error, arg) => [{type:'Post', ID: arg.ID}]
        }),
        deletePost : builder.mutation<DeletePost, string>({
            query : postId => ({
                url : `/posts/delete/${postId}`,
                method : 'DELETE'
            }),
            invalidatesTags : ['Post']
        }),


})
})
//hook naming use____Query/ use____Mutation
export const {
    useGetPostsQuery, 
    useGetPostQuery,
    useAddNewPostMutation, 
    useEditPostMutation,
    useDeletePostMutation
} = apiSlice;


