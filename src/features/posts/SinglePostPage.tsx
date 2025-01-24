import React from 'react';
import {useParams} from 'react-router-dom';
import { useEditCommentMutation, useGetCommentsByPostIDQuery, useGetNumCommentsByPostIDQuery, useGetPostQuery } from '@/api/apiSlice';
import { Spinner } from '@/components/Spinner';
import { useGetCurrentUserQuery } from '../auth/authSlice';
import { useDeletePostMutation, useDeleteCommentMutation} from '@/api/apiSlice';
import { Box } from '@mui/material';
import { SinglePostComment } from '../comments/SinglePostComments';

import { PostContent } from './SinglePostContent';

export const SinglePostPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const {data : currentUser} = useGetCurrentUserQuery();

    const {data : post, isLoading: isLoadingPost, isFetching: isFetchingPost, isSuccess:isFetchPostSuccess} = useGetPostQuery(postId!)

    const [deletePost, {isLoading}] = useDeletePostMutation()

    const [deleteComment, {isLoading: isDeleteCommentLoading, isSuccess: isCommentDeleteSuccess}] = useDeleteCommentMutation()

    const [editComment, {isLoading:isEditCommentLoading}] = useEditCommentMutation()

    let postContent :React.ReactNode;
    let commentContent : React.ReactNode;

    //skip the query if post is not loaded => 'waits for the posts query to finish'
    console.log("post: "+ post)
    const {data: comments, isLoading: isLoadingComments, isFetching: isFetchingComments, isSuccess: isFetchCommentsSuccess} = useGetCommentsByPostIDQuery(post?.ID ?? '', {skip: !post?.ID});
    const {data: numComments, isLoading:isLoadingNumComments} = useGetNumCommentsByPostIDQuery(post?.ID ??  '', {skip: !post?.ID});
    console.log("Comments: "+comments)

    const canEdit = currentUser?.id  ===post?.UserID;

    if (isLoadingPost || isLoading) {
        postContent = <Spinner text="Loading..." />;

    } 
    else if (isFetchingPost) {
        postContent = <Spinner text="Fetching Post..." />;
    }
    else if (isFetchPostSuccess && post) {
        postContent = <PostContent canEdit = {canEdit} post = {post} deletePost={deletePost}/>
    }

    if (isLoadingComments || isFetchingComments || isDeleteCommentLoading || isEditCommentLoading || isLoadingNumComments) {
        commentContent = <Spinner text="Loading Comments..." />;
    }
    else if (isFetchCommentsSuccess && comments && post) {
        // console.log(comments)
        commentContent = (
            <SinglePostComment editComment = {editComment} deleteComment = {deleteComment} comments={comments} postID = {post.ID} numComments={numComments}/>
        );
    }
    
    return (
    <Box sx= {{mx: 3, mt: 2}}>{postContent}{commentContent}</Box>
)
}