import { useGetCategoriesQuery } from "@/api/apiSlice";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

interface CategoryEditProps {
    defaultValue : string
}



export const PostCategoryEdit = ({defaultValue} : CategoryEditProps) => {
    const [category, setCategory] = React.useState<string>(defaultValue)
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string)
    }

    const { data : categories, error, isLoading } = useGetCategoriesQuery()

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {JSON.stringify(error)}</div>

    const categoryList = categories!.map(category => (
        <MenuItem key={category.ID} value={category.ID}>
            {category.Name}
        </MenuItem>
    ))

    return (
        <Select 
        id = "category" 
        name = "category"
        value = {category}
        label= "Category"
        onChange={handleChange}
        required>
            {categoryList}
        </Select>
    )
}

