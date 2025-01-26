import React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { useAddCommentMutation } from "@/api/apiSlice";

import { useState } from "react";

import { useGetCurrentUserQuery } from "../auth/authSlice";


interface AddCommentProps {
    postID : string
}

export const AddComment = ({postID} : AddCommentProps) => {
    const [commentButton, setCommentButton] = useState<boolean>(false);
    const [textField, settextField] = useState<string>('');
    const [addComment] = useAddCommentMutation();
    const {data: user} = useGetCurrentUserQuery();

    //handles state of comment textfield
    const onClickTextField = () => {
        //alows only comment button to be displayed when textfield is clicked the first time
        if (!commentButton){
            setCommentButton(!commentButton);
        }
        
    }
    const onCancel = () => {  
        if (commentButton){
            setCommentButton(!commentButton);
            settextField('');
        }
    }

    //handles form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log("submitting comment")
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const Content = formData.get('Content') as string;
        if (!user?.id) {
            console.error('User not logged in');
        }
        else {
            try {
                await addComment({UserID : user.id, PostID : postID, Content}).unwrap();
                settextField('');
            } catch (error) {
                console.error(error)
                settextField('');
            }
        }
    }
    return (
        <Box 
        component="form" 
        onSubmit = {handleSubmit} 
        // sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
        pt={2}
        pb={2}
        >
            <TextField 
            fullWidth
            name = "Content"
            label = "Add New Comment" 
            value = {textField}
            onChange = {(e) => settextField(e.target.value)}
            onClick={onClickTextField}/>

            {commentButton && (
                <Box 
                mt = {2} 
                sx={{display: 'flex', justifyContent: 'flex-start', gap: 2}}>
                    <Button 
                    type= "submit" 
                    variant="contained"
                    color="primary">Add Comment</Button>
                    <Button onClick = {onCancel} variant="contained" color="error">Cancel</Button>
                </Box>
                )}

        </Box>
    )
}
