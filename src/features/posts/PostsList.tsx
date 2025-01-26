import React, {useMemo} from "react";
import { useGetPostByCategoryQuery, useGetPostsQuery} from "@/api/apiSlice";

import { Spinner } from "@/components/Spinner";
import { PostExcerpt } from "./PostListExcerpt";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { CategoriesList } from "../category/PostCategoryList";



export const PostsList = () => {
    //state to manage filter
    //cateogoryID empty string by default + default state
    const [categoryID, setCategoryID] = React.useState<string>("") 
    

    const {
        data :posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        // refetch
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
        setCategoryID(categoryID)


    }
    //set categoryID to empty string to default to all posts query
    const handleResetFilter = () => {
        setCategoryID("")
    }


    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice()
        sortedPosts.sort((a,b) => b.CreatedAt.localeCompare(a.CreatedAt))
        return sortedPosts
    }, [posts])

    let content: React.ReactNode

    //loads content based on the state of the filter
    if (isLoading) {
      content = <Spinner text="Loading Posts..." />
    } else if (isSuccess) {
        if (posts.length === 0) {
            content = <Box><Typography variant="h4">No posts found! Add a reset button!</Typography> <Button
            sx={{ margin: 1}}
            onClick={handleResetFilter}
            variant="contained">
        Reset Filters
    </Button> </Box>
            
        } else{
            const renderedPosts = sortedPosts.map((post) => (
                <PostExcerpt key={post.ID} post={post} isFetching = {isFetching}/>
            ))
            content = 
            //grey out the posts while fetching idk how to do this
            <Grid container spacing = {2}>
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
            flex-direction="row"
            gap={2}
            component={"form"}
            onSubmit={handleFilterSubtmit}
            sx={{
                marginTop: 2,
                opacity: isFetching ? 0.5 : 1,
                pointerEvents: isLoading ? 'none' : 'auto',
            }}>
                <CategoriesList isEdit = {false} defaultValue=""/>
                <Button
                    sx={{ margin: 1}}
                    type="submit"
                    variant="contained"
                    disabled={isFetching}
                    > 
                    
                filter
                </Button>

                <Button
                        sx={{ margin: 1}}
                        onClick={handleResetFilter}
                        variant="contained">
                    Reset Filters
                </Button>
            </Box>
            {/* pass a prop to the postExcerpt to grey out the post */}
            {renderedPosts} 
        </Grid>
                    
        }
    } 
    else if (isError) {
      content = <div>{error.toString()}</div>
    }
    
    return (
        <Box sx={{mx: 3}}>
            {content}
        </Box>
    );
}
