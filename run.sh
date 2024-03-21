#!/bin/bash

# Run React apps
echo "Starting React apps..."

cd ./api/interviewQs/
npm run dev &

cd ../../frontend/
npm run dev 