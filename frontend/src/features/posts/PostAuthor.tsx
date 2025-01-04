import { useAppSelector } from "@/app/hooks";
// import { selectUserById } from "../users/usersSlice";
import { Typography } from "@mui/material";
interface PostAuthorProps {
    userId : string;
}
import { useGetUsersQuery } from "../users/usersSlice";

export const PostAuthor = ({ userId } : PostAuthorProps) => {
    const { data: authors } = useGetUsersQuery()

    const author = authors?.find((author) => author.ID === userId)
    return <Typography variant="body2" component="p">by {author ? author.Username : 'Unknown author'}</Typography>;
}