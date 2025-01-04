import { useGetCategoriesQuery } from "@/api/apiSlice";

interface CategoryEditProps {
    defaultValue : string
}

export const CategoriesEdit = ({defaultValue} : CategoryEditProps) => {
    const { data : categories, error, isLoading } = useGetCategoriesQuery()

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {JSON.stringify(error)}</div>

    const categoryList = categories!.map(category => (
        defaultValue === category.ID ? 
        (
            <option key={category.ID} value={category.ID} selected>
                {category.Name}
            </option>
        ) : (
            <option key={category.ID} value={category.ID}>
                {category.Name}
            </option>
        )
    ))

    return (
        <select id = "category" required>
            {categoryList}
        </select>
    )
}

