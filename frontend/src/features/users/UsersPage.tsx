import {Link, useParams} from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import type {TypedUseQueryStateResult} from '@reduxjs/toolkit/query/react';

import { useGetPostsQuery, Post } from '@/api/apiSlice';
import { useAppSelector } from '@/app/hooks';
import { selectUserById } from './usersSlice';

type GetPostSelectFromResultArg = TypedUseQueryStateResult<Post[], any, any>

const selectpostsForUser = createSelector(
    //input selector
    (res: GetPostSelectFromResultArg) => res.data,
    (res:GetPostSelectFromResultArg, userId: string) => userId,
    //output selector selects posts for a specific userId
    //first argument is the result of the first input selector : res.data
    //second argument is the second argument of the output selector: userId
    (data,userId) => data?.filter((post) => post.UserID === userId)
)

export const UserPage = () => {
    const {userId} = useParams<{userId:string}>();

    const user = useAppSelector(state => selectUserById(state, userId!)); 

    //filtering posts by user with memoized selector
    const {postsForUser} = useGetPostsQuery(undefined, {
        selectFromResult: result => ({
            ...result, 
            postsForUser:selectpostsForUser(result, userId!)
        })
    })
}
