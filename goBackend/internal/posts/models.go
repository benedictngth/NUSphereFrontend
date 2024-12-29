package posts

import "time"

type Post struct {
	//ID is nanoid not primary key
	ID        string    `db:"posts.public_id"`
	Title     string    `db:"title"`
	Content   string    `db:"content"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
	UserID    string    `db:"users.public_id"`
}

type NewPostRequest struct {
	Title   string `json:"Title" binding:"required"`
	Content string `json:"Content" binding:"required"`
	UserID  string `json:"UserID" binding:"required"`
}

type EditPostRequest struct {
	ID      string `json:"ID" binding:"required"`
	Title   string `json:"Title" binding:"required"`
	Content string `json:"Content" binding:"required"`
}
