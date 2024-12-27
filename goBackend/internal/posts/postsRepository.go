package posts

import (
	"context"
	"fmt"

	"log"

	"github.com/jackc/pgx/v5"

	// "github.com/jackc/pgx/v5/pgxpool"
	"goBackend/internal/common"
)

type PostRepository interface {
	CreatePost(ctx context.Context, post Post) error
	GetPosts(ctx context.Context) ([]Post, error)
	GetPostByPublicID(ctx context.Context, publicID string) (Post, error)
	EditPostByPublicID(ctx context.Context, publicID string, post Post) error
}

func CreatePost(pg *common.Postgres, ctx context.Context, post Post) error {
	query := `INSERT INTO posts (title, content, post_public_id, user_public_id) 
	VALUES (@title, @content, @postPublicID, @userPublicID)`
	args := pgx.NamedArgs{
		"title":        post.Title,
		"content":      post.Content,
		"postPublicID": post.ID,
		"userPublicID": post.UserID,
	}
	_, err := pg.DB.Exec(ctx, query, args)
	if err != nil {
		return fmt.Errorf("unable to insert row: %w", err)
	}
	return nil
}

func GetPosts(pg *common.Postgres, ctx context.Context) ([]Post, error) {
	query := "SELECT post_public_id, title, content, created_at, updated_at, user_public_id FROM posts"
	rows, err := pg.DB.Query(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("unable to query posts: %w", err)
	}
	defer rows.Close()

	return pgx.CollectRows(rows, pgx.RowToStructByName[Post])
}

func GetPostByPublicID(pg *common.Postgres, ctx context.Context, publicID string) (Post, error) {
	log.Print(publicID)
	query := "SELECT post_public_id, title, content, created_at, updated_at, user_public_id FROM posts WHERE post_public_id = $1"
	rows, err := pg.DB.Query(ctx, query, publicID)
	if err != nil {
		return Post{}, fmt.Errorf("unable to query posts: %w", err)
	}
	defer rows.Close()

	return pgx.CollectOneRow(rows, pgx.RowToStructByName[Post])
}

func EditPostByPublicID(pg *common.Postgres, ctx context.Context, publicID string, post Post) error {
	query := `UPDATE posts SET title = @title, content = @content WHERE post_public_id = @postPublicID`
	args := pgx.NamedArgs{
		"title":        post.Title,
		"content":      post.Content,
		"postPublicID": publicID,
	}
	_, err := pg.DB.Exec(ctx, query, args)
	if err != nil {
		return fmt.Errorf("unable to update row: %w", err)
	}
	return nil
}
