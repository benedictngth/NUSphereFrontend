package common

import (
	"context"
	"fmt"
	"sync"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Postgres struct {
	DB *pgxpool.Pool
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
		pgInstance = &Postgres{DB: db}
	})

	return pgInstance, nil
}

func (pg *Postgres) Ping(ctx context.Context) {
	if err := pg.DB.Ping(ctx); err != nil {
		fmt.Printf("unable to ping database: %v\n", err)
	}
}

func (pg *Postgres) Close() {
	pg.DB.Close()
}

func GetDB() *Postgres {
	return pgInstance
}
