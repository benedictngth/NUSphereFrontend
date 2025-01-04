import {Link, useParams} from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { useGetPostQuery } from '@/api/apiSlice';
import { Spinner } from '@/components/Spinner';
import { useGetCurrentUserQuery } from '../auth/authSlice';
import { useDeletePostMutation } from '@/api/apiSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { is } from 'date-fns/locale';

export const SinglePostPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const {data : currentUser} = useGetCurrentUserQuery();

    const {data : post, isFetching: isFetchingPost, isSuccess:isFetchPostSuccess} = useGetPostQuery(postId!);
    const [deletePost, {isLoading, isSuccess: isDeleteSuccess}] = useDeletePostMutation();
    const navigate = useNavigate();
    let content :React.ReactNode;

    // console.log("is delete success ", isDeleteSuccess)
    const canEdit = currentUser?.id  ===post?.UserID;
    if (isFetchingPost || isLoading) {
        content = <Spinner text="Loading..." />;
    }
    else if (isFetchPostSuccess && post) {
    content = (
        <section>
            <article className="post">
                <h2>{post.Title}</h2>
                <p className="post-content">{post.Content}</p>
                {/* conditional rendering of edit button */}
                {canEdit && (
                <>
                    <Link to={`/editPost/${post.ID}`} className="button">
                        Edit Post
                    </Link>

                    <Button onClick = {
                        async() => {
                            try {
                                await deletePost(post.ID).unwrap()
                                navigate('/posts')
                            }
                            catch(err){
                                console.error('Failed to delete the post: ', err)
                            }

                        }
                        } disabled={isLoading} variant="contained" color="error">
                        Delete Post
                    </Button>
                </>
                )}
            </article>
        </section>
    )
    }
    return <section>{content}</section>
}