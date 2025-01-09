import { useGetCategoriesQuery } from "@/api/apiSlice";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import React from 'react'
import { ListSubheader } from "@mui/material";

export const CategoriesList = () => {
    const [category, setCategories] = React.useState<string>('')

    const { data : categories, error, isLoading, isSuccess } = useGetCategoriesQuery()

    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setCategories(event.target.value)
    }

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {JSON.stringify(error)}</div>
    if (isSuccess) {
        //map over the categories of parent-child and create a list of categories
        return (
            <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel htmlFor="category">Category</InputLabel>

                <Select 
                    id="category" 
                    name="category"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                    required
                >
                    {categories!.map((categoryGroup) => [
                        <ListSubheader key={`header-${categoryGroup.parent.ID}`}>
                            {categoryGroup.parent.Name}
                        </ListSubheader>,
                        categoryGroup.children?.map(child => (
                            <MenuItem 
                                key={child.ID} 
                                value={child.ID}
                            >
                                {child.Name}
                            </MenuItem>
                        ))
                    ])}
            </Select>
            </FormControl>
            </Box>
        )
        }
}