package main

import (
	"context"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

func initializeFirebase(projectId, credentials string) (*firebase.App, error) {
	opt := option.WithCredentialsFile(credentials)
	config := &firebase.Config{ProjectID: projectId}
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		return nil, err
	}
	return app, nil
}

func getDatabaseClient(app *firebase.App) (*firestore.Client, error) {
	client, err := app.Firestore(context.Background())
	if err != nil {
		return nil, err
	}
	return client, nil
}
