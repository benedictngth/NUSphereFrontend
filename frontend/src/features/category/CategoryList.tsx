import { useGetCategoriesQuery } from "@/api/apiSlice";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import React from 'react'

export const CategoriesList = () => {
    const [category, setCategories] = React.useState<string>('')

    const { data : categories, error, isLoading } = useGetCategoriesQuery()

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {JSON.stringify(error)}</div>

    const categoryList = categories!.map(category => (
        <MenuItem key={category.ID} value = {category.ID}>
            {category.Name}
        </MenuItem>
    ))

    const handleChange = (event: SelectChangeEvent) => {
        setCategories(event.target.value as string)
    }

    return (
        <Box sx={{minWidth: 120}}>
        <FormControl fullWidth>
            <InputLabel htmlFor="category">Category</InputLabel>

        <Select 
        id = "category" 
        name="category"
        value = {category}
        label="Category"
        onChange={handleChange}
        required>
            {categoryList}
        </Select>
        </FormControl>
        </Box>
    )
}