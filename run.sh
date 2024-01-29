#!/bin/bash

# Run React apps
echo "Starting React apps..."
cd ./api/keywords/
npm run dev &

cd ../../frontend/
npm run dev &

# Run your GoLang application
echo "Starting GoLang app..."
cd ../api/jobs/
go run .

wait