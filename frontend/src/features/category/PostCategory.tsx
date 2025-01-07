import { useGetCategoriesQuery } from "@/api/apiSlice";

import { Typography } from "@mui/material";
interface PostCategoryProps {
    postId : string;
    alignCenter: boolean;
}

export const PostCategory = ({ postId, alignCenter} : PostCategoryProps) => {
    const { data: categories  } = useGetCategoriesQuery()

    const category = categories?.find((category) => category.ID === postId)
    return (
    <Typography 
    variant="h6" 
    component="p" 
    fontWeight={'fontWeightBold'} 
    align={alignCenter ? 'center' : 'left'}>

        {category ? category.Name : 'Unknown Category'}
    </Typography>)

}