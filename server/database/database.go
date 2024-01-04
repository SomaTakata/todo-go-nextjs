// database/database.go
package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDb() {
	neonURL := os.Getenv("NEON_URL")
	if neonURL == "" {
		log.Fatal("Environment variable NEON_URL is required")
	}

	var err error
	DB, err = sql.Open("postgres", neonURL)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	fmt.Println("Connected to Neon database")
}
