#!/bin/bash

echo "Closing connections..."

lsof -t -i:5173 | xargs kill &
lsof -t -i:3000 | xargs kill