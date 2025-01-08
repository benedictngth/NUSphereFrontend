import React from 'react';
import type { Comment } from './commentUtils'
import { CommentItem } from './CommentItem'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AddComment } from './AddComment'
import { useDeleteCommentMutation } from '@/api/apiSlice'
import { useEditCommentMutation } from '@/api/apiSlice';

export type DeleteCommentTrigger = ReturnType<typeof useDeleteCommentMutation>[0];

export type EditCommentTrigger = ReturnType<typeof useEditCommentMutation>[0];

interface CommentProps {
    comments : Comment[]
    postID : string
    deleteComment : DeleteCommentTrigger
    editComment: EditCommentTrigger
}
export function SinglePostComment({ comments, postID, deleteComment, editComment} : CommentProps) {
    return (
        <Box>
        <Typography variant='h5' sx={{ fontWeight: 600, marginTop: 2 }}>Comments</Typography>

        <Grid 
        container spacing={2}>
            {comments.map(comment => <CommentItem key={comment.ID} comment={comment} deleteComment = {deleteComment} editComment={editComment}/>)}
        </Grid>

        <AddComment postID={postID} />
        
        </Box>
    )
}