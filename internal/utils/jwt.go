package utils

import (
	"github.com/golang-jwt/jwt/v5"
	"time"
)

func GenerateJWT(userID int, secret string) (string, error) {
	claim := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
