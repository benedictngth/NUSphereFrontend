import { Link } from "react-router-dom";
import React, {useEffect, useMemo} from "react";
import classnames from 'classnames'


import { useGetPostsQuery,Post } from "@/api/apiSlice";


import { Spinner } from "@/components/Spinner";
import { PostExcerpt } from "./PostListExcerpt";
import { Grid2 as Grid } from "@mui/material";



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
        sortedPosts.sort((a,b) => b.date.localeCompare(a.date))
        return sortedPosts
    }, [posts])

    let content: React.ReactNode

    if (isLoading) {
      content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        const renderedPosts = sortedPosts.map((post) => (
            <PostExcerpt key={post.id} post={post} />
        ))
    const containerClassname = classnames('posts-container', {
        disabled:isFetching})
    content = <Grid container spacing = {2} className={containerClassname}>{renderedPosts}</Grid>
    } else if (isError) {
      content = <div>{error.toString()}</div>
    }

    return (
        <section className="post-list">
            <h2>Posts</h2>
            {/* <button onClick = {refetch}>Refresh</button>S */}
            {content}
        </section>
    );
}
