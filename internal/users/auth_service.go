package users

import (
	"context"
	"errors"
	"log"

	"goBackend/internal/common"
)

// define the methods for userRegister handlers
type AuthService interface {
	Register(ctx context.Context, username, email, password string) (User, error)
	Login(ctx context.Context, username, password string) (string, error)
}

type authService struct {
	repo      common.Postgres
	jwtSecret string
}

func NewAuthService(repo common.Postgres, jwtSecret string) *authService {
	return &authService{repo: repo, jwtSecret: jwtSecret}
}

func (s *authService) Register(ctx context.Context, username, email, password string) (User, error) {
	hash, err := common.HashPassword(password)
	if err != nil {
		return User{}, err
	}

	user := User{
		Username:     username,
		Email:        email,
		PasswordHash: hash,
	}

	return user, CreateUser(common.GetDB(), ctx, user)
}

func (s *authService) Login(ctx context.Context, username, password string) (string, error) {
	user, err := GetUserByUsername(common.GetDB(), ctx, username)

	if err != nil {
		return "", errors.New("invalid username")
	}

	if !common.CheckPasswordHash(password, user.PasswordHash) {
		return "", errors.New("invalid password")
	}

	token, err := common.GenerateJWT(user.ID, s.jwtSecret)
	if err != nil {
		log.Printf("unable to generate token")
		return "", err
	}

	return token, nil

}
