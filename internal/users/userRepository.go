package users

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v5"
	// "github.com/jackc/pgx/v5/pgxpool"
	"goBackend/internal/common"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user User) error
	GetUserByUsername(ctx context.Context, username string) (User, error)
}

func CreateUser(pg *common.Postgres, ctx context.Context, user User) error {
	query := `INSERT INTO users (username, email, password_hash) VALUES (@userName, @userEmail, @userPasswordHash)`
	args := pgx.NamedArgs{
		"userName":         user.Username,
		"userEmail":        user.Email,
		"userPasswordHash": user.PasswordHash,
	}
	_, err := pg.DB.Exec(ctx, query, args)
	if err != nil {
		return fmt.Errorf("unable to insert row: %w", err)
	}
	return nil
}

func GetUserByUsername(pg *common.Postgres, ctx context.Context, username string) (User, error) {
	query := "SELECT * FROM users WHERE username = $1"
	rows, err := pg.DB.Query(ctx, query, username)
	if err != nil {
		return User{}, fmt.Errorf("unable to query users: %w", err)
	}
	defer rows.Close()

	return pgx.CollectOneRow(rows, pgx.RowToStructByName[User])
}
