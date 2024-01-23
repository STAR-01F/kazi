package main

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"
	"time"

	"cloud.google.com/go/firestore"
	"github.com/google/uuid"
)

type F struct {
	Client *firestore.Client
}

type Job struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Company     string `json:"company"`
	CreatedAt   string `json:"createdAt"`
	UpdatedAt   string `json:"updatedAt"`
	Status      string `json:"status"`
}

func (f *F) CreateJob(w http.ResponseWriter, r *http.Request) {
	body := r.Body
	defer body.Close()

	var jobData Job

	err := json.NewDecoder(body).Decode(&jobData)
	if err != nil {
		slog.Error("Failed to decode request body: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	uuid := uuid.New().String()
	jobData.ID = uuid
	jobData.CreatedAt = time.Now().Format(time.RFC3339)
	jobData.UpdatedAt = time.Now().Format(time.RFC3339)

	job, err := f.Client.Collection("jobPostings").Doc(uuid).Set(context.Background(), jobData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	slog.Info("Created", "job", job)
	json.NewEncoder(w).Encode(job)
}

func (f *F) GetJobs(w http.ResponseWriter, r *http.Request) {
	slog.Info("GetJobs")
	if id := r.URL.Query().Get("jobid"); id != "" {
		job, err := f.Client.Collection("jobPostings").Doc(id).Get(context.Background())
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Decode the job data
		var jobData Job
		err = job.DataTo(&jobData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Encode the job data to JSON and send it as the response
		json.NewEncoder(w).Encode(jobData)
		return
	}
	jobs, err := f.Client.Collection("jobPostings").Documents(context.Background()).GetAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var jobList []Job
	for _, job := range jobs {
		var jobData Job
		err := job.DataTo(&jobData)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		jobList = append(jobList, jobData)
	}
	json.NewEncoder(w).Encode(jobList)
}

func (f *F) UpdateJob(w http.ResponseWriter, r *http.Request) {
	slog.Info("UpdateJob")

	// Get the job ID from the request URL parameters
	jobID := r.URL.Query().Get("jobid")
	if jobID == "" {
		http.Error(w, "Job ID is required", http.StatusBadRequest)
		return
	}

	// Decode the JSON payload from the request body
	var updateData map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&updateData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Validate and get the status from the update data
	status, ok := updateData["status"].(string)
	if !ok || (status != "applied" && status != "rejected" && status != "saved") {
		http.Error(w, "Invalid or missing 'status' field in the request body", http.StatusBadRequest)
		return
	}

	// Update the job status in Firestore
	_, err = f.Client.Collection("jobPostings").Doc(jobID).Update(context.Background(), []firestore.Update{
		{Path: "Status", Value: status},
		{Path: "UpdatedAt", Value: time.Now().Format(time.RFC3339)},
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with success message
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Job status updated successfully"))
}

func (f *F) DeleteJob(w http.ResponseWriter, r *http.Request) {
	slog.Info("DeleteJob")

	jobID := r.URL.Query().Get("jobid")
	if jobID == "" {
		http.Error(w, "Job ID is required", http.StatusBadRequest)
		return
	}
	job, err := f.Client.Collection("jobPostings").Doc(jobID).Delete(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(job)
}
