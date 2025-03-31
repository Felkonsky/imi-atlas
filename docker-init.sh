#!/bin/bash

if [ ! -f "instance/medienatlas.db" ]; then
    echo "Database not found. Initializing..."
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    python seed4franzi.py
fi

echo "Starting the application..."
exec python run.py
