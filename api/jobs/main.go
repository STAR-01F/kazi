package main

import (
	"context"
	"log"
	"log/slog"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	projectId := os.Getenv("PROJECT_ID")
	credentials := os.Getenv("CREDENTIALS")
	allowOrigins := os.Getenv("ALLOW_ORIGINS")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Initialize Firebase
	firebaseApp, err := initializeFirebase(projectId, credentials)
	if err != nil {
		slog.Error("Failed to initialize Firebase: %v", err)
	}

	// Get Firestore client
	firestoreClient, err := getDatabaseClient(firebaseApp)
	if err != nil {
		slog.Error("Failed to get Firestore client: %v", err)
	}

	f := &F{Client: firestoreClient}

	// Create server mux
	mux := http.NewServeMux()

	s := &http.Server{
		Addr:           ":" + port,
		Handler:        mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	cors := func(h http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Set CORS headers
			w.Header().Set("Access-Control-Allow-Origin", allowOrigins)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Access-Control-Max-Age", strconv.Itoa(60*60*2))

			h.ServeHTTP(w, r)
		})
	}

	setupRoutes(mux, cors, f)

	defer func() {
		if err := s.Shutdown(context.Background()); err != nil {
			slog.Error("Failed to shutdown server: %v", err)
		}
		if err := firestoreClient.Close(); err != nil {
			slog.Error("Failed to close Firestore client: %v", err)
		}
		if err := recover(); err != nil {
			slog.Error("Panic: %v", err)
		}
	}()

	slog.Info("Starting server on port %s", "port", port)
	if err := s.ListenAndServe(); err != nil {
		slog.Error("Failed to start server: %v", err)
	}
}

func setupRoutes(mux *http.ServeMux, cors func(h http.Handler) http.Handler, f *F) {
	// Define the handler for the /jobs route
	jobsHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			f.GetAllJob(w, r)
		case http.MethodPost:
			f.CreateJob(w, r)
		case http.MethodPut:
			f.UpdateJob(w, r)
		case http.MethodDelete:
			f.DeleteJob(w, r)
		case http.MethodOptions:
			w.WriteHeader(http.StatusOK)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	// Apply the cors middleware to the /jobs handler
	mux.Handle("/api/v1/jobs", cors(jobsHandler))
}
