package main

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

func handleScrape(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		body := r.Body
		defer body.Close()
		decoder := json.NewDecoder(body)
		var data map[string]string
		err := decoder.Decode(&data)
		if err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}
		slog.Info("Scraping URL: %s", "url", data["url"])
		url := data["url"]
		jobInfo, err := scrape(url)
		if err != nil {
			slog.Error("Failed to scrape URL: %v", err)
			http.Error(w, "Failed to scrape URL", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(jobInfo)
		return
	}
	w.WriteHeader(http.StatusMethodNotAllowed)
}
