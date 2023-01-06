#!/bin/bash

# First we'll check if the p(roduction) flag has been set, and get the value of it if it has
# https://pubs.opengroup.org/onlinepubs/9699919799/utilities/getopts.html
while getopts p: flag
do
    case "${flag}" in
        p) prod=${OPTARG};;
    esac
done

COMMAND="netlify deploy --build --site ${NETLIFY_SITE_ID} --auth ${NETLIFY_AUTH_TOKEN} --json"

# If the primary flag has been set, we'll append the --prod flag to the command, this tells Netlify to publish the built site
if [ "$prod" = "true" ]; then
    COMMAND="$COMMAND --prod"
fi

OUTPUT=$($COMMAND)

NETLIFY_URL=$(jq -r '.deploy_url' <<<"${OUTPUT}")
NETLIFY_LOGS=$(jq -r '.logs' <<<"${OUTPUT}")
DEPLOY_ID=$(jq -r '.deploy_id' <<<"${OUTPUT}")
SITE_NAME=$(jq -r '.site_name' <<<"${OUTPUT}")

echo "NETLIFY_URL=${NETLIFY_URL}" >> $GITHUB_OUTPUT