package categories

import (
	"context"
	"fmt"
	"goBackend/internal/common"

	"github.com/jackc/pgx/v5"
)

type CategoriesRepository interface {
	CreateCategory(ctx context.Context, category CategoryPublic) error
	GetCategories(ctx context.Context) ([]CategoryPublic, error)
	GetCategoryByPublicID(ctx context.Context, publicID string) (CategoryPublic, error)
	DeleteCategoryByPublicID(ctx context.Context, publicID string) error
}

func CreateCategory(pg *common.Postgres, ctx context.Context, category CategoryPublic) error {
	query := `INSERT INTO categories (name, description, public_id) VALUES (@name, @description, @publicID)`
	args := pgx.NamedArgs{
		"name":        category.Name,
		"description": category.Description,
		"publicID":    category.ID,
	}

	_, dbErr := pg.DB.Exec(ctx, query, args)
	if dbErr != nil {
		return fmt.Errorf("unable to insert row: %w", dbErr)
	}
	return nil
}

func GetCategories(pg *common.Postgres, ctx context.Context) ([]CategoryPublic, error) {
	query := "SELECT public_id, name, description FROM categories"
	rows, err := pg.DB.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("unable to query categories: %w", err)
	}
	defer rows.Close()

	return pgx.CollectRows(rows, pgx.RowToStructByName[CategoryPublic])
}

func GetCategoryByPublicID(pg *common.Postgres, ctx context.Context, publicID string) (Category, error) {
	query := "SELECT * FROM categories WHERE categories.public_id = $1"
	row, err := pg.DB.Query(ctx, query, publicID)
	if err != nil {
		return Category{}, fmt.Errorf("unable to get category: %w", err)
	}
	defer row.Close()

	return pgx.CollectOneRow(row, pgx.RowToStructByName[Category])
}

func DeleteCategoryByPublicID(pg *common.Postgres, ctx context.Context, publicID string) error {
	query := "DELETE FROM categories WHERE public_id = $1"
	_, err := pg.DB.Exec(ctx, query, publicID)
	if err != nil {
		return fmt.Errorf("unable to delete category: %w", err)
	}
	return nil
}
