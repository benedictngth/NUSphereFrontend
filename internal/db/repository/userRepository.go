package pg

import (
	"context"
	"fmt"

	"goBackend/internal/models"

	"github.com/jackc/pgx/v5"
)

type UserRepository interface {
	CreateUser(ctx context.Context, user models.User) error
	GetUserByUsername(ctx context.Context, username string) (models.User, error)
}

func (pg *Postgres) CreateUser(ctx context.Context, user models.User) error {
	query := `INSERT INTO users (username, email, password_hash) VALUES (@userName, @userEmail, @userPasswordHash)`
	args := pgx.NamedArgs{
		"userName":         user.Username,
		"userEmail":        user.Email,
		"userPasswordHash": user.PasswordHash,
	}
	_, err := pg.db.Exec(ctx, query, args)
	if err != nil {
		return fmt.Errorf("unable to insert row: %w", err)
	}

	return nil
}

func (pg *Postgres) GetUserByUsername(ctx context.Context, username string) (models.User, error) {
	query := "SELECT * FROM users WHERE username = $1"
	rows, err := pg.db.Query(ctx, query, username)
	if err != nil {
		return models.User{}, fmt.Errorf("unable to query users: %w", err)
	}
	defer rows.Close()

	return pgx.CollectOneRow(rows, pgx.RowToStructByName[models.User])
}
