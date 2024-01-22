package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

func initializeFirebase() (*firebase.App, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	projectId := os.Getenv("PROJECT_ID")
	credentials := os.Getenv("CREDENTIALS")

	opt := option.WithCredentialsFile(credentials)
	config := &firebase.Config{ProjectID: projectId}
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		log.Fatalf("Error initializing Firebase app: %v", err)
		return nil, err
	}
	return app, nil
}

func getDatabaseClient(app *firebase.App) (*firestore.Client, error) {
	client, err := app.Firestore(context.Background())
	if err != nil {
		log.Fatalf("Error getting Firestore client: %v", err)
		return nil, err
	}
	return client, nil
}

func saveJobPosting(client *firestore.Client, jobID string, jobData map[string]interface{}) error {
	_, err := client.Collection("jobPostings").Doc(jobID).Set(context.Background(), jobData)
	if err != nil {
		log.Printf("Error saving job posting: %v", err)
		return err
	}
	return nil
}

func main() {
	// Initialize Firebase
	firebaseApp, err := initializeFirebase()
	if err != nil {
		log.Fatalf("Failed to initialize Firebase: %v", err)
	}

	// Get Firestore client
	firestoreClient, err := getDatabaseClient(firebaseApp)
	if err != nil {
		log.Fatalf("Failed to get Firestore client: %v", err)
	}

	// Example job data
	jobID := "uniqueJobID"
	jobData := map[string]interface{}{
		"title":       "Software Engineer",
		"description": "Exciting software engineering position...",
		// Other job details...
	}

	// Save job posting to Firebase
	err = saveJobPosting(firestoreClient, jobID, jobData)
	if err != nil {
		log.Printf("Failed to save job posting: %v", err)
	}

	fmt.Println("Job posting saved successfully!")
}
