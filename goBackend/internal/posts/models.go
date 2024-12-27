package posts

import "time"

type Post struct {
	//ID is nanoid not primary key
	ID        string    `db:"post_public_id"`
	Title     string    `db:"title"`
	Content   string    `db:"content"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
	UserID    string    `db:"user_public_id"`
}

type NewPost struct {
	Title   string `json:"title" binding:"required"`
	Content string `json:"content" binding:"required"`
	UserID  string `json:"user_id" binding:"required"`
}

type EditPost struct {
	ID      string `json:"id" binding:"required"`
	Title   string `json:"title" binding:"required"`
	Content string `json:"content" binding:"required"`
}
