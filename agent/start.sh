#!/bin/bash
export $(grep -v '^#' .env | xargs)
uvicorn main:app --host 0.0.0.0 --port $AGENT_PORT