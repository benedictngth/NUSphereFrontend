import { apiSlice } from '@/api/apiSlice'

// interface AuthState {
//     username :string | null
//     // isAuthenticated :boolean
// }

interface LoginResponse {
    username :string
}

interface LoginRequest {
    username :string
    password :string

}

export interface TokenRequest {
    token :string
}

export interface AuthUser  {
    id : string,
    username : string
}

const apiSliceWithAuth = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login : builder.mutation<LoginResponse,LoginRequest>({
            query : loginResponse => ({
                url : '/users/login',
                method : 'POST',
                body :loginResponse
            }),
            invalidatesTags: ['Auth','User'],
            transformResponse : (response :LoginResponse) => {
                console.log(response)
                return response
            }
        }),
        logout :builder.mutation<void, void>({
            query : () => ({
                url: '/users/logout',
                method : 'POST'
            }),
            invalidatesTags : ['Auth', 'User'],
        }),
        //check whether they are auth cookies in browser
        checkAuth: builder.query<string, void>({
            query : () => ({
                url: '/users/cookie',
                method : 'GET'
            }),
            providesTags : ['Auth'],
            transformResponse : (response :string) => {
                console.log(response)
                return response
            }
        }),
        getCurrentUser : builder.query<AuthUser, void>({
            query : () => ({
                url : '/users/authUser',
                method : 'GET'
            }),
            providesTags : ['User'],
            transformResponse : (response :AuthUser) => {
                console.log(response)
                return response
            }
        }),
    })
})

export const {
    useLoginMutation, 
    useLogoutMutation, 
    useCheckAuthQuery,
    useGetCurrentUserQuery
} = apiSliceWithAuth