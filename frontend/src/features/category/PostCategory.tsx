import React from 'react';
import { useGetCategoriesQuery } from "@/api/apiSlice";

import { Typography } from "@mui/material";
interface PostCategoryProps {
    categoryId : string;
    alignCenter: boolean;
}

//used to convert category ID to category name
export const PostCategory = ({ categoryId, alignCenter} : PostCategoryProps) => {
    const { data: categories  } = useGetCategoriesQuery()

    const category = categories?.find((category) => category.children?.some(child => child.ID === categoryId))

    const categoryParent = category?.parent
    const categoryChild = category?.children?.find(child => child.ID === categoryId)
    
    return (
        <Typography
            variant="h6" 
            component="p" 
            fontWeight={'fontWeightBold'} 
            align={alignCenter ? 'center' : 'left'}>
            {categoryParent ? `${categoryParent.Name} > `: 'Unknown Parent Category > '} {categoryChild ? categoryChild.Name : 'Unknown Category'}
        </Typography>
    )
}