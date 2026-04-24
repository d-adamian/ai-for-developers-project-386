#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "Starting Prism mock server on port 4010..."
prism mock ../typespec-dist/openapi.json --port 4010