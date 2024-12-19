package pg

import (
	"context"
	"fmt"
	"sync"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Postgres struct {
	db *pgxpool.Pool
}

var (
	pgInstance *Postgres
	pgOnce     sync.Once
)

func NewPG(ctx context.Context, connString string) (*Postgres, error) {
	//pgOnce.Do maintains single pattern with one connection pool
	pgOnce.Do(func() {
		var err error
		db, err := pgxpool.New(ctx, connString)
		if err != nil {
			fmt.Printf("unable to create connection pool: %v\n", err)
		}
		pgInstance = &Postgres{db: db}
	})

	return pgInstance, nil
}

func (pg *Postgres) Ping(ctx context.Context) {
	if err := pg.db.Ping(ctx); err != nil {
		fmt.Printf("unable to ping database: %v\n", err)
	}
}

func (pg *Postgres) Close() {
	pg.db.Close()
}
