package users

import "time"

type User struct {
	ID           int       `db:"id"`
	Username     string    `db:"username"`
	PasswordHash string    `db:"password_hash"`
	CreatedAt    time.Time `db:"created_at"`
	PublicID     string    `db:"user_public_id"`
}

type UserID struct {
	ID       string `db:"public_id"`
	Username string `db:"username"`
}
