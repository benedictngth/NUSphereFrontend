import React, {useMemo} from "react";
import classnames from 'classnames'


import { useGetPostByCategoryQuery, useGetPostsQuery} from "@/api/apiSlice";


import { Spinner } from "@/components/Spinner";
import { PostExcerpt } from "./PostListExcerpt";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { CategoriesList } from "../category/PostCategoryList";



export const PostsList = () => {
    //state to manage filter
    const [categoryID, setCategoryID] = React.useState<string>("") 
    

    const {
        data :posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch
    } = (categoryID === "" ) ? useGetPostsQuery() : useGetPostByCategoryQuery(categoryID); 

    // const {data : posts} = useGetPostByCategoryQuery(categoryID);

    interface FilterFormFields extends HTMLFormControlsCollection {
        category: HTMLSelectElement
    }

    interface FilterFormElements extends HTMLFormElement {
        readonly elements: FilterFormFields
    }


    const handleFilterSubtmit = (e: React.FormEvent<FilterFormElements>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const categoryID = formData.get('category') as string
        console.log(categoryID)
        setCategoryID(categoryID)


    }
    const handleResetFilter = () => {
        setCategoryID("")
    }


    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice()
        sortedPosts.sort((a,b) => b.CreatedAt.localeCompare(a.CreatedAt))
        return sortedPosts
    }, [posts])

    let content: React.ReactNode

    if (isLoading) {
      content = <Spinner text="Loading Posts..." />
    } else if (isSuccess) {
        if (posts.length === 0) {
            content = <Typography variant="h3">No posts</Typography>
        } else{
            const renderedPosts = sortedPosts.map((post) => (
                <PostExcerpt key={post.ID} post={post} />
            ))
            const containerClassname = classnames('posts-container', {
                disabled:isFetching})
            content = 
            <Grid container spacing = {2} className={containerClassname}>
            <Typography 
            variant="h3" 
            sx={{
                fontWeight: 600,
                marginTop: 2
            }}>
                Posts
            </Typography>


            <Box
            display="flex" 
            flex-direction="column"
            gap={2}
            component={"form"}
            onSubmit={handleFilterSubtmit}
            sx={{
                marginTop: 2
            }}>
                <CategoriesList isEdit = {false} defaultValue=""/>
                <Button
                    sx={{ margin: 1}}
                    type="submit"
                    variant="contained">
                filter
                </Button>

                <Button
                        sx={{ margin: 1}}
                        onClick={handleResetFilter}
                        variant="contained">
                    Reset Filters
                </Button>
            </Box>

            {renderedPosts} 
        </Grid>
                    
        }

    } else if (isSuccess && filter) {
        content = <div>Filter</div>

    } else if (isError) {
      content = <div>{error.toString()}</div>
    }
    
    return (
        <Box sx={{mx: 3}}>
            {content}
        </Box>
    );
}
