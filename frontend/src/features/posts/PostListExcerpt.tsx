import { Box, styled, Typography } from "@mui/material";
import { Post } from "./postSlice"
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "@/components/TimeAgo";
// import { ReactionButtons } from "./ReactionButtons";
import {Grid2 as Grid} from "@mui/material";
interface PostExcerptProps {
    post : Post
}

//custom MUI Paper component
const PostItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    // height:60,
  }));


export function PostExcerpt({ post } :PostExcerptProps) {
    return (
    <Grid size={12}>

    <PostItem key={post.ID} elevation={3}>
    <Box p={2}>
    <Typography variant="h5" component="div">
        <Link to ={`/posts/${post.ID}`}>{post.Title}</Link>
    </Typography>
    <PostAuthor userId={post.UserID} />
    <Typography sx = {{marginTop : 2, marginBottom:5}} variant="body1" component="p">{post.Content.substring(0, 100)}</Typography>
    <TimeAgo timestamp={post.CreatedAt} />
    {/* <ReactionButtons post={post} /> */}
    </Box>
</PostItem>
</Grid>

)}