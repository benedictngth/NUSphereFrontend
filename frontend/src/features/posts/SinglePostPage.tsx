import {Link, useParams} from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { useGetPostQuery } from '@/api/apiSlice';
import { selectCurrentUsername } from '@/features/auth/authSlice';
import { Spinner } from '@/components/Spinner';

export const SinglePostPage = () => {
    const { postId } = useParams<{ postId: string }>();

    const currentUsername = useAppSelector(selectCurrentUsername);
    const {data : post, isFetching, isSuccess} = useGetPostQuery(postId!);

    let content :React.ReactNode;

    const canEdit = currentUsername ===post?.user;
    if (isFetching) {
        content = <Spinner text="Loading..." />;
    }else if (isSuccess){
   
    content = (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                {canEdit && (<Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
            )}
            </article>
        </section>
    )
    }
    return <section>{content}</section>
}