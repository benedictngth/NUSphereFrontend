import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit'


import type { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'

import { selectCurrentUsername } from '@/features/auth/authSlice'
import { apiSlice } from '@/api/apiSlice'

export interface User {
  ID: string
  Username: string
}
// const usersAdapter = createEntityAdapter<User>()
// const initialState = usersAdapter.getInitialState()

//string, "payload creator" with a Promise containing data / rejected Promise
// export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
//     const response = await client.get<User[]>('/fakeApi/users')
//     return response.data
// })


// const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
//   },
// })

// export default usersSlice.reducer

// export const {
//   // selectAll: selectAllUsers,
//   // selectById: selectUserById,
// } = usersAdapter.getSelectors((state: RootState) => state.users)

//return user object
// export const selectCurrentUser = (state: RootState) => {
//     const currentUserName = selectCurrentUsername(state)
//     if (!currentUserName) {return}
//     return selectUserById(state, currentUserName)
// }

const emptyUsers: User[] = [];

//ABOVE: old userSlice code 
export const apiSliceWithUsers = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users'
    })
  })
})

export const { useGetUsersQuery } = apiSliceWithUsers

//selector for the right cache entry for users
export const selectUsersResult = apiSliceWithUsers.endpoints.getUsers.select() 


export const selectAllUsers = createSelector(
  selectUsersResult,
  //usersResult is the result of the getUsers query from the API cache
  usersResult => usersResult?.data ?? emptyUsers

)

export const selectUserById = createSelector(
  selectAllUsers,
  (state: RootState, userId: string) => userId,
  (usersResult,userId) => usersResult.find(user => user.ID === userId)
)

export const selectCurrentUser = (state:RootState) => {
  const currentUserName = selectCurrentUsername(state)
  if (currentUserName) {
    return selectUserById(state, currentUserName)
  }
}

