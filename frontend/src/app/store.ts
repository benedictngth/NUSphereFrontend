import {configureStore, Action, ThunkAction} from '@reduxjs/toolkit';

import { apiSlice } from '@/api/apiSlice';
import postReducer from '@/features/posts/postSlice';
// import usersReducer from '@/features/users/usersSlice';
import authReducer from '@/features/auth/authSlice';
import {listenerMiddleware} from '@/app/listernerMiddleware';

interface CounterState {
    value: number;
}


export const store = configureStore({
    reducer: {
        posts: postReducer,
        // users : usersReducer,
        auth : authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware)
    .concat(apiSlice.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = typeof store;
//infer the types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 
//export reusable type for handwritten thunk functions
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
