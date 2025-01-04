import { useGetCategoriesQuery } from "@/api/apiSlice";

import { Typography } from "@mui/material";
interface PostCategoryProps {
    postId : string;
}

export const PostCategory = ({ postId } : PostCategoryProps) => {
    const { data: categories  } = useGetCategoriesQuery()

    const category = categories?.find((category) => category.ID === postId)
    return <Typography variant="h6" component="p" fontWeight={'fontWeightBold'} > {category ? category.Name : 'Unknown Category'}</Typography>;
}