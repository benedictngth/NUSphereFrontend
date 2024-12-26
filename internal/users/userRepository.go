package users

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"

	// "github.com/jackc/pgx/v5/pgxpool"
	"goBackend/internal/common"
)

// User represents a user in the system
type UserRepository interface {
	CreateUser(ctx context.Context, user User) error
	GetUserByUsername(ctx context.Context, username string) (User, error)
}

// inserts a new user into the database with SQL query and given user Struct
func CreateUser(pg *common.Postgres, ctx context.Context, user User) error {
	query := `INSERT INTO users (username, password_hash, user_public_id) VALUES (@userName, @userPasswordHash, @publicID)`
	args := pgx.NamedArgs{
		"userName":         user.Username,
		"userPasswordHash": user.PasswordHash,
		"publicID":         user.PublicID,
	}
	_, err := pg.DB.Exec(ctx, query, args)
	if err != nil {
		return fmt.Errorf("unable to insert row: %w", err)
	}
	return nil
}

// return a user by username with the username
func GetUserByUsername(pg *common.Postgres, ctx context.Context, username string) (User, error) {
	query := "SELECT * FROM users WHERE username = $1"
	rows, err := pg.DB.Query(ctx, query, username)
	if err != nil {
		return User{}, fmt.Errorf("unable to query users: %w", err)
	}
	defer rows.Close()

	return pgx.CollectOneRow(rows, pgx.RowToStructByName[User])
}
func GetUsers(pg *common.Postgres, ctx context.Context) ([]UserID, error) {
	query := "SELECT public_id, username FROM users"
	rows, err := pg.DB.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("unable to query users: %w", err)
	}
	defer rows.Close()
	//returns rows in a slice of User structs
	return pgx.CollectRows(rows, pgx.RowToStructByName[UserID])
}
