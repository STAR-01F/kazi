package main

import (
	"log/slog"
	"net/http"
	"os"
	"time"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()

	s := &http.Server{
		Addr:           ":" + port,
		Handler:        mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	mux.HandleFunc("/scrape", handleScrape)

	slog.Info("Starting server on port %s", "port", port)
	if err := s.ListenAndServe(); err != nil {
		slog.Error("Failed to start server: %v", err)
	}
}
