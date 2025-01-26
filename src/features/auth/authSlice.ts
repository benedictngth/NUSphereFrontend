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

interface RegisterResponse {
    error : string
}

export interface TokenRequest {
    user :string
}

export interface AuthUser  {
    id : string,
    username : string
}

export const apiSliceWithAuth = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login : builder.mutation<LoginResponse,LoginRequest>({
            query : loginResponse => ({
                url : '/users/login',
                method : 'POST',
                body :loginResponse
            }),
            invalidatesTags: ['Auth','User'], 

        }),
        logout :builder.mutation<void, void>({
            query : () => ({
                url: '/users/logout',
                method : 'POST'
            }),
            invalidatesTags : ['Auth', 'User', 'Post'],
        }),
        register : builder.mutation<RegisterResponse,LoginRequest>({
            query : loginRequest => ({
                url : '/users/register',
                method : 'POST',
                body : loginRequest
            }),
            // invalidatesTags : ['Auth','User'],
            transformResponse : (response :RegisterResponse) => {
                // console.log("Register response: ", response.error)
                return response
            },
            invalidatesTags : ['Auth', 'User']
        }),
        //check whether they are auth cookies in browser
        checkAuth: builder.query<string, void>({
            query : () => ({
                url: '/users/auth',
                method : 'GET'
            }),
            providesTags : ['Auth'],
            transformResponse : (response :string) => {
                // console.log("Cookies response: ", response)
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
                // console.log("Current User: ", response)
                return response
            }
        }),
    })
})

export const {
    useLoginMutation, 
    useLogoutMutation, 
    //used to check if user is authenticated
    useCheckAuthQuery,
    //get user details
    useGetCurrentUserQuery,
    useRegisterMutation
} = apiSliceWithAuth

