import { createSlice, createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit'


import type { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'

import { selectCurrentUsername } from '@/features/auth/authSlice'
import { apiSlice } from '@/api/apiSlice'
import { c } from 'node_modules/vite/dist/node/types.d-aGj9QkWt'

export interface User {
  id: string
  Username: string
}

interface ApiUser {
  ID : string,
  Username: string
}

const usersAdapter = createEntityAdapter<User>()
const initialState = usersAdapter.getInitialState()


const emptyUsers: User[] = [];

export const apiSliceWithUsers = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<EntityState<User, string>, void>({
      query: () => '/users',
      transformResponse: (response: ApiUser[]) => {
        const transformedUsers = response.map((user: ApiUser) => ({ id: user.ID, Username: user.Username })) 
        return usersAdapter.setAll(initialState, transformedUsers)
  }})
  })
})

export const { useGetUsersQuery } = apiSliceWithUsers

//selector for the right cache entry for users
export const selectUsersResult = apiSliceWithUsers.endpoints.getUsers.select() 


const selectUsersData = createSelector(
  selectUsersResult,
  //usersResult is the result of the getUsers query from the API cache
  usersResult => usersResult?.data ? usersResult.data : initialState
)

export const selectCurrentUser = (state:RootState) => {
  const currentUserName = selectCurrentUsername(state)
  if (currentUserName) {
    return selectUserById(state, currentUserName)
  }
}

export const {selectAll : selectAllUsers, selectById : selectUserById} = usersAdapter.getSelectors(selectUsersData)

