#!/bin/bash

while getopts p: flag
do
    case "${flag}" in
        p) prod=${OPTARG};;
    esac
done

netlify -v

netlify status

echo '$NETLIFY_SITE_ID'

echo "${NETLIFY_SITE_ID}"

COMMAND='netlify deploy --debug --build --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --json --message "Deploying from GitHub Actions"'

if [ "$prod" = "true" ]; then
    COMMAND="$COMMAND --prod"
fi

OUTPUT=$($COMMAND)

NETLIFY_URL=$(jq -r '.deploy_url' <<<"${OUTPUT}")
NETLIFY_LOGS=$(jq -r '.logs' <<<"${OUTPUT}")
DEPLOY_ID=$(jq -r '.deploy_id' <<<"${OUTPUT}")
SITE_NAME=$(jq -r '.site_name' <<<"${OUTPUT}")

echo $NETLIFY_URL

echo "NETLIFY_URL=${NETLIFY_URL}" >> $GITHUB_OUTPUT