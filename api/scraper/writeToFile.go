package main

import (
	"encoding/json"
	"log/slog"
	"os"
)

func WriteJobInfoToFile(filename string, jobInfo map[string]interface{}) error {
	mData, err := json.Marshal(jobInfo)
	if err != nil {
		slog.Error("Failed to marshal data: %v", err)
		return err
	}
	os.WriteFile(filename+".json", []byte(mData), 0o644)
	return nil
}
