import { Link } from "react-router-dom";
import React, {useEffect, useMemo} from "react";
import classnames from 'classnames'


import { useGetPostsQuery,Post } from "@/api/apiSlice";


import { Spinner } from "@/components/Spinner";
import { PostExcerpt } from "./PostListExcerpt";
import { Box, Grid2 as Grid, Typography } from "@mui/material";



export const PostsList = () => {
    const {
        data :posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetPostsQuery()


    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice()
        sortedPosts.sort((a,b) => b.CreatedAt.localeCompare(a.CreatedAt))
        return sortedPosts
    }, [posts])

    let content: React.ReactNode

    if (isLoading) {
      content = <Spinner text="Loading Posts..." />
    } else if (isSuccess) {
        const renderedPosts = sortedPosts.map((post) => (
            <PostExcerpt key={post.ID} post={post} />
        ))
    
    const containerClassname = classnames('posts-container', {
        disabled:isFetching})
    content = 
            <Grid container spacing = {2} className={containerClassname}
            >
            <Typography 
            variant="h3" 
            sx={{
                fontWeight: 600,
                marginTop: 2
            }}>
                Posts
            </Typography>
            {renderedPosts}
        </Grid>

    } else if (isError) {
      content = <div>{error.toString()}</div>
    }
    
    return (
        <Box sx={{mx: 3}}>
            {content}
        </Box>
    );
}
