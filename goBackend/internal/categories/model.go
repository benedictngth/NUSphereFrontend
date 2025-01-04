package categories

type CategoryPublic struct {
	//ID is nanoid not primary key
	ID          string `db:"public_id"`
	Name        string `db:"name"`
	Description string `db:"description"`
}

type Category struct {
	//used for db queries for all fields of the table
	ID          string `db:"id"`
	PublicID    string `db:"public_id"`
	Name        string `db:"name"`
	Description string `db:"description"`
}

type NewCategoryRequest struct {
	Name        string `json:"Name" binding:"required"`
	Description string `json:"Description" binding:"required"`
}

type EditCategoryRequest struct {
	ID          string `json:"ID" binding:"required"`
	Name        string `json:"Name" binding:"required"`
	Description string `json:"Description" binding:"required"`
}
