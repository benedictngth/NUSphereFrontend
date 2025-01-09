/* eslint-disable react/react-in-jsx-scope */
import Grid from "@mui/material/Grid2";
import { PostCategory } from "../category/PostCategory";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import type {Post } from "./postUtils";
import { useDeletePostMutation } from "@/api/apiSlice";


//get the return type of the useDeletePostMutation hook
type DeletePostTrigger = ReturnType<typeof useDeletePostMutation>[0];

interface PostContentProps {
    post: Post;
    canEdit: boolean;
    deletePost : DeletePostTrigger;
}

export const PostContent = ({post, canEdit, deletePost}:PostContentProps) => {
    const navigate = useNavigate();
    return (
                <Grid
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                container spacing={2}>
                <Grid size={12}>

                    <PostCategory categoryId={post.CategoryID} alignCenter={true} />

                    <Typography
                        variant='h3'
                        sx={{
                            fontWeight: 600,
                            textAlign: 'center',
                            justifyContent: 'center'
                        }}
                    >{post.Title}
                    </Typography>
                </Grid>

                <Grid size={12}>
                    <Typography
                        variant='body1'
                        component='p'
                        sx={{
                            textAlign: 'center',
                            justifyContent: 'center'
                        }}
                    >{post.Content}
                    </Typography>
                </Grid>

                {/* conditional rendering of edit button */}
                {canEdit ? (
                    <Grid container size={12}>
                        <Button variant='contained' onClick={() => navigate('/posts')}>
                            Back to Posts
                        </Button>

                        <Button
                            variant='contained'
                            onClick={() => navigate(`/editPost/${post.ID}`)}
                        >
                            Edit Post
                        </Button>

                        <Button
                            onClick={
                                async () => {
                                    try {
                                        await deletePost(post.ID).unwrap();
                                        navigate('/posts');
                                    }
                                    catch (err) {
                                        console.error('Failed to delete the post: ', err);
                                    }

                                } } 
                                variant="contained" color="error">
                            Delete Post
                        </Button>

                    </Grid>
                ) :
                    <Button variant='contained' onClick={() => navigate('/posts')}>
                        Back to Posts
                    </Button>}
            </Grid>
    )
}