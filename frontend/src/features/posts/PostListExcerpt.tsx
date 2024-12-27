import { Box, styled, Typography } from "@mui/material";
import { Post } from "./postSlice"
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "@/components/TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
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

    <PostItem key={post.id} elevation={3}>
    <Box p={2}>
    <Typography variant="h5" component="div">
        <Link to ={`/posts/${post.id}`}>{post.title}</Link>
    </Typography>
    <PostAuthor userId={post.user} />
    <Typography sx = {{marginTop : 2, marginBottom:5}} variant="body1" component="p">{post.content.substring(0, 100)}</Typography>
    <TimeAgo timestamp={post.date} />
    <ReactionButtons post={post} />
    </Box>
</PostItem>
</Grid>

)}