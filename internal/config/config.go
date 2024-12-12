package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

type Config struct {
	DataBaseURL string
	// JWTSecret   string
	Port string
}

func LoadConfig() Config {

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading environment variables")
	}

	dataBaseURL := os.Getenv("DATABASE_URL")

	port := os.Getenv("PORT")

	return Config{
		DataBaseURL: dataBaseURL,
		Port:        port,
	}

}
