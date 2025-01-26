

import { apiSlice } from '@/api/apiSlice'

export interface User {
  ID: string
  Username: string
}


export const apiSliceWithUsers = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
//       transformResponse: (response: ApiUser[]) => {
//         const transformedUsers = response.map((user: ApiUser) => ({ id: user.ID, Username: user.Username })) 

//         return usersAdapter.setAll(initialState, transformedUsers)
//       }
      providesTags: ['User'],
    }),
  })
})

export const { useGetUsersQuery } = apiSliceWithUsers


