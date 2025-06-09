#!/bin/bash
export $(grep -v '^#' .env | xargs)
uvicorn main:app --host $AGENT_IP --port $AGENT_PORT