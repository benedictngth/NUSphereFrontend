export interface Category {
    ID : string
    Name : string
    Description : string
}
export type CategoryUpdate = Pick<Category, 'ID' | 'Name' | 'Description'>
export type NewCategory = Pick<Category, 'Name' | 'Description'>