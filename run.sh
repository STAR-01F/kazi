#!/bin/bash

# Run React apps
echo "Starting React apps..."

cd ./api/feedback
npm run dev &

cd ../../frontend/
npm run dev 