import {Link, useParams} from 'react-router-dom';
import { useGetPostQuery } from '@/api/apiSlice';
import { Spinner } from '@/components/Spinner';
import { useGetCurrentUserQuery } from '../auth/authSlice';
import { useDeletePostMutation, useGetCategoriesQuery } from '@/api/apiSlice';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { PostCategory } from '../category/PostCategory';

export const SinglePostPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const {data : currentUser} = useGetCurrentUserQuery();

    const {data : post, isFetching: isFetchingPost, isSuccess:isFetchPostSuccess} = useGetPostQuery(postId!);
    const [deletePost, {isLoading, isSuccess: isDeleteSuccess}] = useDeletePostMutation();
    const {data:categories} = useGetCategoriesQuery();
    const navigate = useNavigate();
    let content :React.ReactNode;

    // console.log("is delete success ", isDeleteSuccess)
    const canEdit = currentUser?.id  ===post?.UserID;
    if (isFetchingPost || isLoading) {
        content = <Spinner text="Loading..." />;
    }
    else if (isFetchPostSuccess && post) {
    content = (
        <Box sx= {{mx: 3, mt: 2}}>
            <Grid 
            sx = {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            container spacing={2}>
                <Grid size={12}>
    
                    <PostCategory postId={post.CategoryID} alignCenter={true}/>

                    <Typography 
                    variant='h3'
                    sx={{fontWeight: 600, 
                        textAlign: 'center', 
                        justifyContent: 'center'}}
                    >{post.Title}
                    </Typography>
                </Grid>

                <Grid size={12}>
                    <Typography 
                    variant='body1'
                    component='p'
                    sx={{
                        textAlign: 'center', 
                        justifyContent: 'center'}}
                    >{post.Content}
                    </Typography>
                </Grid>

                {/* conditional rendering of edit button */}
                {canEdit ? (
                <Grid container size={12}>
                    <Button
                    variant='contained'
                    onClick={() => navigate(`/editPost/${post.ID}`)}
                    >
                        Edit Post
                    </Button>

                    <Button 
                        onClick = {
                            async() => {
                                try {
                                    await deletePost(post.ID).unwrap()
                                    navigate('/posts')
                                }
                                catch(err){
                                    console.error('Failed to delete the post: ', err)
                                }

                            }
                        } 
                        disabled={isLoading} variant="contained" color="error">
                        Delete Post
                    </Button>

                </Grid>
                ) : (
                    <Button variant='contained' onClick={() => navigate('/posts')}>
                        Back to Posts
                    </Button>
                )}
            </Grid>
        </Box>
    )
    }
    return <section>{content}</section>
}