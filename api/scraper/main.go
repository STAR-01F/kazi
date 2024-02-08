package main

import (
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Println("allowedOrigin", allowedOrigin)

	mux := http.NewServeMux()

	s := &http.Server{
		Addr:           ":" + port,
		Handler:        mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	corMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			if r.Method == "OPTIONS" {
				slog.Info("Responding to CORS preflight request")
				w.WriteHeader(http.StatusOK)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
	mux.Handle("/scrape", corMiddleware(http.HandlerFunc(handleScrape)))

	slog.Info("Starting server on port %s", "port", port)
	if err := s.ListenAndServe(); err != nil {
		slog.Error("Failed to start server: %v", err)
	}
}
