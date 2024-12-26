package users

import (
	"context"
	"errors"
	"log"

	"goBackend/internal/common"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

// define the AuthService interface with the methods that the service will implement
type AuthService interface {
	Register(ctx context.Context, username, password string) (User, error)
	Login(ctx context.Context, username, password string) (string, error)
}

type authService struct {
	jwtSecret string
}

func NewAuthService(jwtSecret string) *authService {
	return &authService{jwtSecret: jwtSecret}
}

//implement the AuthService interface methods and calls respective repository methods

func (s *authService) Register(ctx context.Context, username, password string) (User, error) {
	hash, err := common.HashPassword(password)
	if err != nil {
		return User{}, err
	}
	nanoid, err := gonanoid.New()
	if err != nil {
		return User{}, err
	}

	user := User{
		Username:     username,
		PasswordHash: hash,
		PublicID:     nanoid,
	}

	return user, CreateUser(common.GetDB(), ctx, user)
}

func (s *authService) Login(ctx context.Context, username, password string) (string, error) {
	user, err := GetUserByUsername(common.GetDB(), ctx, username)

	if err != nil {
		log.Printf("login error: %v", err)
		return "", errors.New("invalid username")
	}

	if !common.CheckPasswordHash(password, user.PasswordHash) {
		return "", errors.New("invalid password")
	}

	token, err := common.GenerateJWT(user.PublicID, user.Username, s.jwtSecret)
	if err != nil {
		log.Printf("unable to generate token")
		return "", err
	}
	return token, nil

}
