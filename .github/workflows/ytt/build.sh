#!/bin/bash

# Ensure we perform these actions from where the SCRIPT is, not where we're executing from
SCRIPT_DIR="$(dirname "$(realpath "$0")")"

cd "$SCRIPT_DIR"

ytt --strict -f schema.yml -f values.yaml -f build-ytt.yml > ../build.yml
