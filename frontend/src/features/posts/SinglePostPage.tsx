import {Link, useParams} from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { useGetPostQuery } from '@/api/apiSlice';
import { selectCurrentUser } from '../users/usersSlice';
import { Spinner } from '@/components/Spinner';

export const SinglePostPage = () => {
    const { postId } = useParams<{ postId: string }>();

    const currentUser = useAppSelector(selectCurrentUser);
    const {data : post, isFetching, isSuccess} = useGetPostQuery(postId!);

    let content :React.ReactNode;

    const canEdit = currentUser?.ID  ===post?.UserID;
    if (isFetching) {
        content = <Spinner text="Loading..." />;
    }else if (isSuccess){
   
    content = (
        <section>
            <article className="post">
                <h2>{post.Title}</h2>
                <p className="post-content">{post.Content}</p>
                {canEdit && (<Link to={`/editPost/${post.ID}`} className="button">
                    Edit Post
                </Link>
            )}
            </article>
        </section>
    )
    }
    return <section>{content}</section>
}