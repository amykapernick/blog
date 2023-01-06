#!/bin/bash

# Here we'll set the command to run, this is using the Netlify CLI using the deploy command. We'll pass in the environment variables for the site and auth token, and have set the output to come through as JSON
# https://cli.netlify.com/commands/deploy
COMMAND="netlify deploy --build --site ${NETLIFY_SITE_ID} --auth ${NETLIFY_AUTH_TOKEN} --json"

# Next we'll run the command, and save the output in another variable so we can access it
OUTPUT=$($COMMAND)

# To parse the output from Netlify, the jq package allows us to fetch the different properties and save them as individual variables.
# https://stedolan.github.io/jq/
NETLIFY_URL=$(jq -r '.deploy_url' <<<"${OUTPUT}")
NETLIFY_LOGS=$(jq -r '.logs' <<<"${OUTPUT}")
DEPLOY_ID=$(jq -r '.deploy_id' <<<"${OUTPUT}")
SITE_NAME=$(jq -r '.site_name' <<<"${OUTPUT}")

# Lastly we'll save the Netlify preview URL as an output parameter for the workflow step, so we can access it in future steps, eg. to add it as a comment on our PR
# https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-output-parameter
echo "NETLIFY_URL=${NETLIFY_URL}" >> $GITHUB_OUTPUT