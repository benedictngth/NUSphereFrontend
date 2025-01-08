import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from './store'
import { useAppDispatch } from './hooks'

import { addPostsListeners } from '@/features/posts/postUtils'
import { addLoginListerner } from '@/features/auth/authSlice'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()

export type AppStartListening = typeof startAppListening

export const addAppListener = addListener.withTypes<RootState, AppDispatch>()
export type AppAddListener = typeof addAppListener

addPostsListeners(startAppListening)
addLoginListerner(startAppListening)
