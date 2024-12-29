// import { useAppDispatch } from "@/app/hooks";

// import type {Post, ReactionName} from './postSlice'
// import { reactionAdded } from "./postSlice";
// import React from "react";

// import { Button } from "@mui/material";
// import { Box } from "@mui/material";

// //object type for the emoji
// const reactionEmoji :Record<ReactionName, string> = {
//     thumbsUp: '👍',
//     tada: '🎉',
//     heart: '❤️',
//     rocket: '🚀',
//     eyes: '👀'
// }

// interface ReactionButtonsProps{
//     post : Post
// }
// // Helper function to check if a string is a valid ReactionName
// function isReactionName(value: string): value is ReactionName {
//     return ['thumbsUp', 'tada', 'heart', 'rocket', 'eyes'].includes(value);
// }


// export const ReactionButtons= ({post} : ReactionButtonsProps) => {
//     const dispatch = useAppDispatch()
//     const reactionButtons = Object.entries(reactionEmoji).map(
//     ([stringName, emoji]) => {
//         const reaction = stringName as ReactionName
//         return (
//             <Button
//                 variant = "contained"
//                 // color = "secondary"
//                 key={reaction}
//                 onClick={() => {
//                     dispatch(reactionAdded({postId: post.id, reaction}))
//                 }}>
//                 {emoji} {post.reactions[reaction]}
//             </Button>
//         )
//         }
//     )
//     return <Box sx = {{paddingTop : 2 }} display="flex" gap={1}>{reactionButtons}</Box>
// }

