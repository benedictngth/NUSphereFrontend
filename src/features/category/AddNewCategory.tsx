import React from 'react'
import { Box, InputLabel, MenuItem, Select, Typography, SelectChangeEvent, FormControl, TextField, Button } from '@mui/material'
import { useGetCategoriesQuery , useAddCategoryMutation} from "@/api/apiSlice"
import { Spinner } from '@/components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../auth/authSlice'

interface AddCategoryFormFields extends HTMLFormControlsCollection {
    category: HTMLSelectElement
    categoryName: HTMLInputElement
    description: HTMLInputElement
}
interface AddCategoryFormElements extends HTMLFormElement {
    readonly elements: AddCategoryFormFields
}

export const AddNewCategory = () => {
    const {data : category, error, isLoading, isSuccess} = useGetCategoriesQuery()
    const {data : user} = useGetCurrentUserQuery()
    const [categoryName, setCategoryName] = React.useState<string>('')
    const [addCategory, {isLoading: isAddingCategory}] = useAddCategoryMutation()

    const navigate = useNavigate()

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCategoryName(event.target.value)
    }
    const onFormSubmit = async (e:React.FormEvent<AddCategoryFormElements>) => {
        e.preventDefault()
        const form =e.currentTarget
        const formData = new FormData(e.currentTarget)
        const ParentID = formData.get('category') as string
        const Name = formData.get('categoryName') as string
        const Description = formData.get('description') as string

        try {
            if (!user?.id) {
                throw new Error('User must be logged in to create a category')
            }
            await addCategory({Name, ParentID, Description, CreatedBy: user.id}).unwrap()
            navigate('/posts')

        } catch (err) {
            console.error('Failed to add category: ', err)
        }
        form.reset()
    }
    if (isLoading) return <Spinner text="loading categories"/>

    if (isSuccess) {
        const CategoryParentList = category!.map(category => (
            <MenuItem key={category.parent.ID} value = {category.parent.ID}>
                {category.parent.Name}
            </MenuItem>
        ))
        return (
        <Box sx={{marginTop: 2, mx:2}}>
            <Typography variant='h3' component='h2'>Add New Category</Typography>

            <Box 
            component="form" 
            marginTop={2}
            onSubmit={onFormSubmit}
            >
                <FormControl fullWidth>
                    <InputLabel htmlFor="category">Parent Category</InputLabel>
                    <Select 
                        id="category"
                        name="category"
                        label="Parent Category"
                        value = {categoryName}
                        onChange = {handleSelectChange}
                        sx={{marginBottom: 2}}
                        required
                    >
                        {CategoryParentList}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    id="categoryName"
                    name="categoryName"
                    label="New Sub Category Name"
                    sx={{marginBottom: 2}}
                    required
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    maxRows={4}
                    sx={{marginBottom: 2}}
                    required
                />
                <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                sx={{marginTop: 2}}>
                    Add Category
                </Button>
            </Box>
        </Box>
        )
    }
}