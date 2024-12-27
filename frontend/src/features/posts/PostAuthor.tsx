import { useAppSelector } from "@/app/hooks";
import { selectUserById } from "../users/usersSlice";
import { Typography } from "@mui/material";
interface PostAuthorProps {
    userId : string;
}

export const PostAuthor = ({ userId } : PostAuthorProps) => {
    const author = useAppSelector(state => selectUserById(state, userId));
    return <Typography variant="body2" component="span">by {author ? author.name : 'Unknown author'}</Typography>;
}