import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from './store'

import { addPostsListeners } from '@/features/posts/postUtils'
import { addLoginErrorListerner, addLoginSuccessListerner, addRegisterErrorListerner } from '@/features/auth/authUtils'
import { addCategoryListener } from '@/features/category/categoryUtil'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening = listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()

export type AppStartListening = typeof startAppListening

export const addAppListener = addListener.withTypes<RootState, AppDispatch>()
export type AppAddListener = typeof addAppListener

addPostsListeners(startAppListening)
addLoginErrorListerner(startAppListening)
addLoginSuccessListerner(startAppListening)
addRegisterErrorListerner(startAppListening)
addCategoryListener(startAppListening)
