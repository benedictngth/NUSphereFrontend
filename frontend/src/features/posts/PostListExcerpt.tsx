import React from 'react';
import { Box, styled, Typography } from "@mui/material";
import { Post } from "./postUtils"
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { PostCategory } from "../category/PostCategory";
import { TimeAgo } from "@/components/TimeAgo";
// import { ReactionButtons } from "./ReactionButtons";
import {Grid2 as Grid} from "@mui/material";

import { useGetNumCommentsByPostIDQuery } from "@/api/apiSlice";

interface PostExcerptProps {
    post : Post
}

//custom MUI Paper component
const PostItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
  }));


export function PostExcerpt({ post } :PostExcerptProps) {
    const {data: numComments, isLoading} = useGetNumCommentsByPostIDQuery(post.ID)

    return (
    <Grid size={12}>

    <PostItem key={post.ID} elevation={3}>
    <Box p={2}>
    <PostCategory categoryId={post.CategoryID} alignCenter={false} />

    <Typography variant="h5" component="div">
        <Link to ={`/posts/${post.ID}`}>{post.Title}</Link>
    </Typography>
    <PostAuthor userId={post.UserID} />

    <Typography sx = {{marginTop : 2, marginBottom:5}} variant="body1" component="p">
        {post.Content.length >100 ?  `${post.Content.substring(0, 100)}...` : post.Content}
    </Typography>
    <Box sx={{display: 'flex', direction:'column', justifyContent:'space-between', alignItems:'center'}}>
       
        <TimeAgo timestamp={post.CreatedAt} />
        <Box flexGrow={1}></Box>
        <Typography 
            sx={{mr:5}}
            variant="body1" 
            component="span"
        >   {isLoading ? "Loading..." : `${numComments ?? 0} ${(numComments ?? 0) <= 1 ? "comment" : "comments"}`}
            
        </Typography>
    </Box>
    {/* <ReactionButtons post={post} /> */}
    </Box>
</PostItem>
</Grid>

)}