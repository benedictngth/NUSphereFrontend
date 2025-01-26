import React from 'react';
import type { Comment } from './commentUtils'
import { TimeAgo } from '@/components/TimeAgo'

import { useGetUsersQuery } from '../users/usersSlice'
import { Spinner } from '@/components/Spinner'
import styled from '@mui/material/styles/styled'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import {IconButton, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import {  } from '@/api/apiSlice'
import type { DeleteCommentTrigger, EditCommentTrigger } from './SinglePostComments'
import { useGetCurrentUserQuery } from '../auth/authSlice';

interface CommentItemProps {
  comment: Comment
  deleteComment: DeleteCommentTrigger
  editComment: EditCommentTrigger
}

export const CommentItem = ({ comment, deleteComment, editComment}: CommentItemProps) => {
  const PostItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
  }));


  const {data:users, isSuccess} = useGetUsersQuery()
  const {data:currentUser} = useGetCurrentUserQuery()
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const [commentContent, setCommentContent] = React.useState<string>(comment.Content)

  const cursorRef = React.useRef<number | null>(null);

  const handleDeleteComment = async () => {
    // console.log('delete comment')
    try{
      await deleteComment(comment.ID).unwrap()
    }
    catch{
      console.error('Failed to delete the comment')
    }
  }

  const handleEditComment = async() => {
    // console.log("edit comment", isEditing)
    if (!isEditing) {
      setIsEditing(true)
    }
    else {
      try {
        await editComment({ID:comment.ID, Content: commentContent}).unwrap()
        setIsEditing(false)
      }
      catch {
        console.error('Failed to edit the comment')
    }
  }
}

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    // Restore cursor position
    const input = event.target;
    if (cursorRef.current !== null) {
        input.setSelectionRange(cursorRef.current, cursorRef.current);
    }
    };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Save cursor position
    const input = event.target;
    cursorRef.current = input.selectionStart;
    setCommentContent(input.value);
  }

  if (isSuccess) {
    const user = users.find(user => user.ID === comment.UserID)
    //checks if the current user is the owner of the comment
    const canModify = currentUser?.id === comment.UserID

    return (
      <Grid size={{ xs: 6, md: 8, xl: 12 }}>
        <PostItem key={comment.ID} elevation={3} sx={{ wordBreak: 'break-word'}}>
          <Grid 
          container display={'grid'}  
          direction={'column'}
          px={2} pt={1}>

            <Box mb = {2}>
              <Typography 
              variant='body1' 
              component="span" 
              sx={{fontWeight:600}}>
                {user?.Username}&nbsp;•&nbsp;
              </Typography>
              <TimeAgo timestamp={comment.CreatedAt} />
            </Box>

            {isEditing ? 
            (
              <TextField
                  fullWidth
                  autoFocus={isEditing}
                  value={commentContent}
                  onFocus={handleFocus}
                  onChange={handleChange}
                  sx={{ display: isEditing ? 'block' : 'none' }}
              />
            ) 
            :(
              <Typography
                  textAlign="justify"
                  variant="body1"
                  component="p"

                  sx={{ 
                    display: isEditing ? 'none' : 'block',
                    mb: canModify ? 0 : 2,}}
              >
                  {commentContent}
              </Typography>
            )}
            {/* conditional rendering upon whether the user is the owner of the comment */}
            {canModify && (
              <Box
              sx={{ justifySelf: 'flex-end' }}>
              {isEditing ? (
                <>
                <IconButton
                color="primary"
                aria-label="cancel edit"
                onClick={() => setIsEditing(false)}
                >
                  <ClearIcon/> 
                </IconButton>

                <IconButton
                color="primary"
                aria-label="save edit"
                onClick={handleEditComment}
                >
                  <DoneIcon/>
                </IconButton>
                </>
              ) : 
              (<IconButton 
              color="primary"
              aria-label='edit comment'
              onClick = {handleEditComment}>

              <ModeEditIcon/>
              </IconButton>)
            }

              <IconButton 
                color="primary"
                aria-label='delete comment'
                onClick={handleDeleteComment}
              >
                <DeleteIcon/>
              </IconButton>
            </Box>
            )}
            
          </Grid>

        </PostItem>
      </Grid>
    )
  }
  else {
    return (
      <Spinner text="Loading comment..." />
    )
  }
}