#!/bin/bash

COMMAND="netlify deploy --build --site ${NETLIFY_SITE_ID} --auth ${NETLIFY_AUTH_TOKEN} --json"

OUTPUT=$($COMMAND)

NETLIFY_URL=$(jq -r '.deploy_url' <<<"${OUTPUT}")
NETLIFY_LOGS=$(jq -r '.logs' <<<"${OUTPUT}")
DEPLOY_ID=$(jq -r '.deploy_id' <<<"${OUTPUT}")
SITE_NAME=$(jq -r '.site_name' <<<"${OUTPUT}")

echo "NETLIFY_URL=${NETLIFY_URL}" >> $GITHUB_OUTPUT