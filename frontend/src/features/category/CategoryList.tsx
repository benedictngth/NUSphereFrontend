import { useGetCategoriesQuery } from "@/api/apiSlice";

export const CategoriesList = () => {
    const { data : categories, error, isLoading } = useGetCategoriesQuery()

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {JSON.stringify(error)}</div>

    const categoryList = categories!.map(category => (
        <option key={category.ID} value = {category.ID}>
            {category.Name}
        </option>
    ))

    return (
        <select id = "category" required>
            {categoryList}
        </select>
    )
}