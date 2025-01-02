import { createSlice, createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit'


import type { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'

import { apiSlice } from '@/api/apiSlice'
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt'

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
    }),
  })
})

export const { useGetUsersQuery } = apiSliceWithUsers


