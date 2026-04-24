#!/usr/bin/env bash
set -euo pipefail

# ---------------------------------------------------------------------------
# Configuration — override via environment variables or edit defaults below
# ---------------------------------------------------------------------------
S3_BUCKET="pitbulls2026.teamdeng.me"          # e.g. my-pitbulls-site
AWS_REGION="${AWS_REGION:-us-east-2}"
DIST_DIR="${DIST_DIR:-dist}"
CLOUDFRONT_DIST_ID="${CLOUDFRONT_DIST_ID:-}"   # optional — leave empty to skip

# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------
if [[ -z "$S3_BUCKET" ]]; then
  echo "Error: S3_BUCKET environment variable is not set." >&2
  echo "Usage: S3_BUCKET=my-bucket [CLOUDFRONT_DIST_ID=EXXX] $0" >&2
  exit 1
fi

if ! command -v aws &>/dev/null; then
  echo "Error: AWS CLI is not installed. Install it from https://aws.amazon.com/cli/" >&2
  exit 1
fi

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Error: '$DIST_DIR' directory not found. Run 'npm run build' first." >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# Sync
# ---------------------------------------------------------------------------
echo "Syncing '$DIST_DIR/' → s3://$S3_BUCKET ..."

# Upload everything except HTML files first (long cache)
aws s3 sync "$DIST_DIR" "s3://$S3_BUCKET" \
  --region "$AWS_REGION" \
  --exclude "*.html" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# Upload HTML files with no-cache so browsers always fetch the latest
aws s3 sync "$DIST_DIR" "s3://$S3_BUCKET" \
  --region "$AWS_REGION" \
  --exclude "*" \
  --include "*.html" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --delete

echo "Upload complete."

# ---------------------------------------------------------------------------
# CloudFront invalidation (optional)
# ---------------------------------------------------------------------------
if [[ -n "$CLOUDFRONT_DIST_ID" ]]; then
  echo "Invalidating CloudFront distribution $CLOUDFRONT_DIST_ID ..."
  aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DIST_ID" \
    --paths "/*"
  echo "Invalidation submitted."
fi

echo "Done."
