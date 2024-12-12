package main

import (
	"fmt"
	"goBackend/internal/config"
)

func main() {
	cfg := config.LoadConfig()
	fmt.Println(cfg)
}
