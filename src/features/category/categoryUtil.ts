export interface Category {
    ID : string
    Name : string
    Description : string
    ParentID : string
    CreatedBy : string
}

export interface ParentChildCategory {
    parent: Category;
    children?: Category[]; // Children are optional
  }

export type CategoryUpdate = Pick<Category, 'ID' | 'Name' | 'Description'>
export type NewCategory = Pick<Category, 'Name' | 'Description' | 'ParentID' | 'CreatedBy'>