package users

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/golang-jwt/jwt/v5/request"
)

// strip 'TOKEN' prefix from token string if exists
func stripBearerPrefixFromTokenString(tok string) (string, error) {
	if len(tok) > 5 && strings.ToUpper(tok[0:6]) == "TOKEN " {
		return tok[6:], nil
	}
	return tok, nil
}

// extract JWT token from Authorization header
var AuthorisationHeaderExtractor = &request.PostExtractionFilter{
	Extractor: request.HeaderExtractor{"authorization"},
	Filter:    stripBearerPrefixFromTokenString,
}

var MyAuth2Extractor = &request.MultiExtractor{
	AuthorisationHeaderExtractor,
	request.ArgumentExtractor{"access_token"},
}

func UpdateContextUserModel(c *gin.Context, my_user_id uint) {
	var myUserModel User
	c.Set("user_id", my_user_id)
	c.Set("user_model", myUserModel)
}

func AuthMiddleware(secret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := request.ParseFromRequest(c.Request, MyAuth2Extractor, func(token *jwt.Token) (interface{}, error) {
			b := ([]byte(secret))
			return b, nil
		})
		if err != nil {
			fmt.Println(err)
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		fmt.Println(token)
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			userID := uint(claims["user_id"].(float64))
			UpdateContextUserModel(c, userID)
		}

	}
}
