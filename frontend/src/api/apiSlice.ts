import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import type { Post, NewPost, PostUpdate} from '@/features/posts/postSlice';
import type { User } from '@/features/users/usersSlice';
export type {Post};

//define single API slice object
export const apiSlice = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    tagTypes: ['Post'],
    endpoints : builder => ({
        getPosts :builder.query<Post[],void>({
            query: () => '/posts',
            providesTags: (result = [], error, arg)=> [
                'Post', 
                //results argument comes from success API response data
                //create array of tags for each post id to be invalidated
                ...result.map(({id}) => ({type: 'Post', id}) as const)
            ]
        }),
        getPost : builder.query<Post, string>({
            query :postId => `/posts/${postId}`,
            providesTags: (result, error, arg) => [{type: 'Post', id: arg}]
        }),
        addNewPost : builder.mutation<Post, NewPost>({
            query : initialPost => ({
                //url will be /fakeApi/posts
                url : '/posts',
                method : 'POST',
                body : initialPost
            }),
            invalidatesTags : ['Post'] //forces refetch of getPosts query after mutation

        }),
        editPost : builder.mutation<Post, PostUpdate>({
            query : post => ({
                url : `/posts/${post.id}`,
                method : 'PATCH',
                body : post
            }),
            invalidatesTags : (result, error, arg) => [{type:'Post', id: arg.id}]
        }),
        getUsers : builder.query<User[], void>({
            query :() => '/users',
        })


})
})
//hook naming use____Query/ use____Mutation
export const {
    useGetPostsQuery, 
    useGetPostQuery,
    useAddNewPostMutation, 
    useEditPostMutation,
    useGetUsersQuery,
} = apiSlice;


