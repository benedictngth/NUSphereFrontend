package services

import (
	"context"
	"errors"
	"fmt"
	"goBackend/internal/models"
	"log"

	pg "goBackend/internal/db/repository"
	"goBackend/internal/utils"
)

type AuthService interface {
	Register(ctx context.Context, username, email, password string) (models.User, error)
	Login(ctx context.Context, username, password string) (string, error)
}

type authService struct {
	postgres  pg.Postgres
	jwtSecret string
}

func NewAuthService(repo pg.Postgres, jwtSecret string) *authService {
	return &authService{postgres: repo, jwtSecret: jwtSecret}
}

func (s *authService) Register(ctx context.Context, username, email, password string) (models.User, error) {
	hash, err := utils.HashPassword(password)
	if err != nil {
		return models.User{}, err
	}

	user := models.User{
		Username:     username,
		Email:        email,
		PasswordHash: hash,
	}

	return user, s.postgres.CreateUser(ctx, user)
}

func (s *authService) Login(ctx context.Context, username, password string) (string, error) {
	user, err := s.postgres.GetUserByUsername(ctx, username)
	fmt.Println(user.ID)
	if err != nil {
		return "", errors.New("invalid username")
	}

	if !utils.CheckPasswordHash(password, user.PasswordHash) {
		return "", errors.New("invalid password")
	}

	token, err := utils.GenerateJWT(user.ID, s.jwtSecret)
	if err != nil {
		log.Printf("unable to generate token")
		return "", err
	}

	return token, nil

}
