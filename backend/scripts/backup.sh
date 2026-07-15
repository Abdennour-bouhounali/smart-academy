#!/bin/bash
# Backup Script for SMART Store PostgreSQL Database
# Run via CRON (e.g., daily at 2 AM)

BACKUP_DIR="/var/backups/smart_store"
DB_NAME="smart_store"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_backup_$DATE.sql"

mkdir -p "$BACKUP_DIR"

# Ensure pg_dump is available and execute backup
pg_dump -U postgres -d "$DB_NAME" -F p -f "$BACKUP_FILE"

# Compress the backup
gzip "$BACKUP_FILE"

# Keep only the last 7 days of backups
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +7 -exec rm {} \;

echo "Backup completed successfully at $DATE"
