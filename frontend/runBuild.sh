#!/bin/bash

# Run build command
npm run build > build.log 2>&1

# Check if any errors occurred
if grep -q 'error' build.log; then
  echo "in 1"
  echo "Build failed with errors"
  cat build.log
  exit 1
else
  echo "Build successful"
  cat build.log
  exit 0
fi