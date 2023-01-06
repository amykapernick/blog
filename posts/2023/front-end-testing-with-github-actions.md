---
title: Front End Testing with GitHub Actions
date: 2023-01-06
description: Until now, most websites I’ve built that need regular front end tests are hosted on Netlify, so when they introduce Netlify build plugins that made my life much easier, I was able to very easily run a bunch of tests on my website and only publish if it passed. However there are limitations to what tests I can run on there, and I had to decide if I wanted to delve into creating my own build plugin, or create a massively over complicated continuous deployment pipeline with GitHub Actions.
categories: [Testing, Tools, GitHub, Dev]
featured:
  src: feature/capture_6-1-2023_134632_github.com.jpg
---

Until now, most websites I’ve built that need regular front end tests are hosted on Netlify, so when they introduce Netlify build plugins that made my life much easier, I was able to very easily run a bunch of tests on my website and only publish if it passed. However there are limitations to what tests I can run on there, and I had to decide if I wanted to delve into creating my own build plugin, or create a massively over complicated continuous deployment pipeline with GitHub Actions. Any guess what I chose to do 🤣.

## GitHub Actions

For those not familiar with it, [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) have now been around for a couple of years, and allows you to setup workflows and automations that are triggered when things happen on your GitHub repository. It can be used as a continuous integration and continuous delivery (CI/CD) pipeline so you can build, test and deploy your website automatically, or you can automate a variety of other things like creating/modifying issues and pull requests as they happen.

## Creating a GitHub Action

To create a GitHub Action, first of we create a workflow file in `.github/workflows/` in the repo, and create a Yaml file for the workflow/action, eg. `.github/workflows/test.yml`. To start off we’ll create a workflow file that defines the workflow, sets the platform we’ll run it on and checks out the repository code to get started. 

```yaml
# Name of the Workflow
name: Build and Test

# How the workflow is triggered, in this case every time a pull request to the prod branch gets opened, reopened or the code in the PR gets updated
# https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows
on:
  pull_request:
    types: [opened, reopened, synchronize]
    branches: [prod]

# The jobs/tasks that the workflow completes, by default these will all run at the same time
# https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow
jobs:
  # Each job gets a different name, eg. `build`, but the name must be unique
  build:
    # Set the platform that the job will run on, you can choose a number of different options, but running on Linux is the cheapest option
    # https://docs.github.com/en/actions/using-jobs/choosing-the-runner-for-a-job
    runs-on: ubuntu-22.04
    # Each job has a number of steps to complete (these will complete one after another), most of the time your first step will be to checkout the repo code, otherwise you won't have anything to work with
    steps:
      - name: Checkout Repo Code
        uses: actions/checkout@v3
```

Code: .github/workflows/test.yml

Once you have this workflow, commit and push the changes to GitHub, you can find any actions you have under the **Actions** tab in your repo, this is also where the logs will appear when the actions are triggered and run.

![An empty page that says "There are no workflow runs yet"](/img/dev/front-end-testing/github-actions/c6f63b93-64f6-4d88-9b37-9ef8d58ce14c.png "The GitHub Actions tab, before any workflows have been run/triggered")

## Triggering our Actions

In the case of our workflow, it will only run when we create a pull request (PR) to the `prod` branch (if your main branch is named something else, make sure you change it to reflect your branch, eg. `main`). To test that it works, create a new branch, eg. `dev` and make a small change to the code, then [open a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) into your main branch. Once the PR is opened, the action will automatically be triggered and will start running the job that we’ve defined, and show the status of it when it’s completed

![Status section from a GitHub Pull request that says "All checks have passed"](/img/dev/front-end-testing/github-actions/d70a75ee-af45-4f15-a775-6e31e251e788.png "An excerpt from the pull request, where we can see the checks being run against the code, including the GitHub Action workflow we’re building")

An excerpt from the pull request, where we can see the checks being run against the code, including the GitHub Action workflow we’re building

<aside>
Note: You may also notice another test being run on my PR, which is <a href="https://accesslint.com" target=_blank>AccessLint</a>, a free Accessibility Linting tool that runs on every one of my repos, checking for common accessibility issues in my code
</aside>

So far all we’re doing now is checking out our code, so this should all pass. The good news is the action should also be triggered when the code in the PR updates, so we can continue to make changes to the workflow, push them to the same branch we’ve created (not the main branch), and it’ll run the newest changes to the workflow, without having to keep merging the changes in each time we make updates.

![The GitHub Actions tab showing one "Build and Test" workflow and one current workflow run](/img/dev/front-end-testing/github-actions/5b6d7f13-0c9e-4088-9f97-36d00ea22d4e.png "The Github Actions tab showing workflow runs, and listing all the different workflows that are part of the repo")

The Github Actions tab showing workflow runs, and listing all the different workflows that are part of the repo

We can also view the actions being run under the **Actions** tab in the repo, here we can view the full history of all of our workflows (when we create more) and the status of the different workflow runs.

## Action Steps

At the moment we’ve just checked the code in our repo out, next we need to go through and run the build and test steps. Each step has a number of different properties (we’ll get into more of them later), but for the most part they’ll have [a name](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsname) so you can identify the step that’s running, and the [`uses` property](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsuses) defines what actions package will be used to run the step. Depending on the package being used, we may also pass in some configuration under the [`with` property](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepswith), which allows defining values for the package to use.

```yaml
# Name of the action (this is for us to identify it when it runs)
- name: Setup Node
  # The GitHub Action package that we're using in this step, most of the time this is how we'll be defining what a step does
  uses: actions/setup-node@v3
  # Some actions will also require values/config to be passed in, so these are set under the `with` property
  with:
    # Eg. for the setup node package, it can take a value of which node version you want to use
    # https://github.com/actions/setup-node#supported-version-syntax
    node-version: 16
```

We’ve already checked out the repo code, so next we’ll add a step to setup node to use, and install the packages in the `package.json` file of my repo. As well as using packages with the `uses` property, we can also run commands on the action runner (similar to how we would in our terminal), so using the [`run` property](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun), we can set it to run `npm install` and install all the node modules in the`package.json` file of our repo. 

```yaml
name: Build and Test

on:
  pull_request:
    types: [opened, reopened, synchronize]
    branches: [prod]

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout Repo Code
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Install Node Modules
        # We don't need a actions package to install node modules, instead we can run a command directly in the runner and install them the same way we would in our terminal
        run: npm install
```

Code: .github/workflows/test.yml

If we access the workflow run via either the **Actions** tab, or by clicking the **Details** link for the test in the PR, we can view the steps being run, and the outputs to the console (if there are any). There are a couple of extra steps as well for GitHub to setup the environment, and clean up after everything is completed.

![Workflow status showing the different steps where Checkout Repo Code and Setup Node are completed, Install Node Modules is currently in progress and Post Setup Node and Post Checkout Repo Code is still not started yet](/img/dev/front-end-testing/github-actions/ded15de3-6bcc-48d5-adb4-ae4df05fbeb1.png)

## Building and Deploying on Netlify

As we discussed at the start of this post, Netlify does provide an easy build and deploy process, but they also have a CLI so we can do it on GitHub Actions instead. We’ll go through a couple of sections in more detail further on.

```yaml
- name: Install Node Modules
  run: npm install

- name: Deploy to Netlify
  # If we add an ID to our step, it can be referred to elsewhere in our workflow, this ID must be unique
  # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsid
  id: build_site
  # For this step we also need to use some environment variables, which we're pulling in from GitHub Secrets
  # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsenv
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
  # This step will run a command in the terminal, which runs a custom script we'll create to build and deploy the site
  run: ./_actions/netlify_deploy.sh

  # Once the site is build, we're going to use the GitHub Script package to add a comment to our PR, so that we know everything has built and so we can easily find the preview URL if we want to check something
  # https://github.com/actions/github-script
- uses: actions/github-script@v6
  with:
    script: |
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: 'The build works! You can view the deploy preview at ${{steps.build_site.outputs.NETLIFY_URL}}'
      })
```

The secret environment variables will need to be added to GitHub for this to work, this can be done under **Settings** → **Secrets** → **Actions** and clicking **New repository secret**. 

![Repo settings page for Actions Secrets that lists one secret for NETLIFY_SITE_ID](/img/dev/front-end-testing/github-actions/21124335-5654-417a-bda6-220f367f008a.png)

You’ll need to add two secret values, one for `NETLIFY_SITE_ID`, which you can find in **Site Settings** → **General** → **Site details** in Netlify, either your **Site name** or **Site ID** should do, but the ID is likely safer as it can’t be changed.

![Site Settings page in Netlify showing where to find the Site name and Site ID for the settings](/img/dev/front-end-testing/github-actions/f6f98345-1c68-4cfe-afe4-5c3b7bbc8a2b.png)

Your `NETLIFY_AUTH_TOKEN` can be generated from [your user profile](https://app.netlify.com/user/applications), it’s good practice to have a new token for each use so you can easily delete it if it gets compromised. Click **New access token** to generate a new token, and remember that you can’t view it again after.

![Screenshot of the Personal access tokens section of the personal settings page showing the New access token button](/img/dev/front-end-testing/github-actions/4e28132d-4ac8-4d70-931d-71a2cae92328.png)

If you’ve already got automatic builds setup for your Netlify site, you’ll also want to unlink your repo from your Netlify settings (**Site settings** → **Build & deploy** → **Continuous Deployment** → **Repository**), otherwise you’ll end up building the site twice and might have inconsistencies with what’s being built.

![Screenshot of the Netlify Build and Deploy settings page, showing the Unlink button to remove the linked repository](/img/dev/front-end-testing/github-actions/4c54b467-557b-43bd-a81a-3d37ccf0a5ee.png)

Once the environment variables have been set, lets have a look at the script we’re going to use to build and deploy to Netlify. Create a new file called `_actions/netlify_deploy.sh`. 

```shell
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
```

Code: _actions/netlify_deploy.sh

We’ll also have to install the Netlify CLI to be able to use on GitHub Actions, so run `npm install -d netlify-cli` to install it as a development dependency.

So that Netlify knows how to build the site, I’ve setup [file based configuration](https://docs.netlify.com/configure-builds/file-based-configuration/) with a `netlify.toml` file, but you can also add extra [deploy flags to the command](https://cli.netlify.com/commands/deploy) in the script to define the options there.

```toml
[build]
  base = "."
  publish = "dist"
  command = "npm run build"
```

Code: netlify.toml

Quickly looking again at the GitHub script step, here we’re referencing the outputted variable from the end of our deploy script, where we saved the Netlify preview URL in a variable to access later. This will then be included as part of the comment on the PR.

```yaml
- uses: actions/github-script@v6
  with:
    script: |
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: 'The build works! You can view the deploy preview at ${{steps.build_site.outputs.NETLIFY_URL}}'
      })
```

If we push the code changes again and wait for the site to build, this time a comment is added to the PR, which includes the preview URL, a live and functioning version of the website 🥳.

![Screenshot from the pull request showing the bot comment that includes the deploy preview URL](/img/dev/front-end-testing/github-actions/8af5bac2-78e6-419a-8b3a-21302b1c018b.png)

## Testing the site

Now that the site is built and has a live URL, we can start running tests on it. To add tests, I could keep adding more steps to the `build` job, but instead I’m going to add another `test` job to use. For now we’re just going to run a [visual regression test using Percy](https://docs.percy.io/docs/cli-snapshot#percy-snapshot), and will look deeper at front end testing in a future blog post (for now you can look at the [other testing posts](https://www.notion.so/1e110ee3047246eab0e27482f095681d))

```yaml
name: Build and Test

on:
  pull_request:
    types: [opened, reopened, synchronize]
    branches: [prod]

jobs:
  build:
    runs-on: ubuntu-22.04
    # Because the testing job is different, we need to out the Netlify URL so we can access it in another job
    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idoutputs
    outputs:
      deploy_url: ${{steps.build_site.outputs.NETLIFY_URL}}
    steps:
      # Previous build steps here

  # Creating a new job for the tests to run in
  test:
    # Because the website has to have built first, we're defining a dependency on the `needs` property, that the test job needs to have the build job complete first
    # https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idneeds
    needs: build
    runs-on: ubuntu-22.04
    steps:
      # Jobs run in their own separate environments, so we need to checkout the repo code again so we can run tests that are defined in the repo
      - name: Checkout Repo Code
        uses: actions/checkout@v3

      - name: Percy Test
        env:
          # To authenticate, Percy will look for the PERCY_TOKEN env variable, so we can pass the secret through as an environment variable similarly to in the Netlify script previously
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
        # We'll pass the deploy URL in as an output of the build job
        # https://docs.github.com/en/actions/learn-github-actions/contexts#needs-context
        run: npx @percy/cli snapshot snapshots.yml --base-url ${{ needs.build.outputs.deploy_url }}
```

Code: .github/workflows/test.yml

We just need to add one small change to run the visual regression tests, which is create a [`snapshots.yml](https://docs.percy.io/docs/cli-snapshot#snapshot-lists)` file for it to use. For now we’re just running tests against the homepage, but more pages can be added here or if you have one [snapshots can be run against a sitemap](https://docs.percy.io/docs/cli-snapshot#sitemap-url) instead.

```yaml
snapshots:
  - url: /
    name: Homepage
```

Code: snapshots.yml

When we push this change to our PR, we should now have two separate jobs appearing in the actions workflow, and can see that the test job is dependant on the build job so won’t start until it’s successfully completed.

![Screenshot of the workflow run showing the build job currently in progress, with the test job linked to but after it not yet started](/img/dev/front-end-testing/github-actions/b4608e40-03e1-4937-b706-a802b8b14e53.png)

Once the tests are successfully completed, you’ll be able to view the results in your Percy project dashboard, and can view the snapshots that were taken.

![Screenshot of the Pa11y dashboard showing one screenshot run has been completed and is currently unreviewed](/img/dev/front-end-testing/github-actions/87458cf5-df45-45ef-8dc4-4b729d838713.png)

When looking at the pull request, it’s also completed all the checks (and they’ve passed), which means the code is ready to be merged into the main branch!

![Screenshot of the checks section of the pull request showing that all checks have passed and the Merge pull reuqest button can be clicked](/img/dev/front-end-testing/github-actions/52e0f1d6-0747-4633-ba08-19369177e1ec.png)

## Deploying and Publishing

Once the build and test pipeline has been setup, we’ll now have this running automatically on all pull requests to the main production branch of the repo, so in theory no code can get merged in without being tested (you may want to setup some [branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule) to make sure).

We can now safely build and deploy any code merged into the main branch feeling confident in the knowledge that the code is ready to go, so lets setup a new workflow for that in `.github/workflows/publish.yml`. This will be a lot like the previous build job we completed in the testing workflow, but this time we’re going to pass in a flag to the Netlify script so that we can publish a production version of the website.

```yaml
name: Build and Publish on Netlify

on:
  push:
    branches: [prod]

jobs:
  build:
    runs-on: ubuntu-22.04

    steps:
      - name: Checkout Repo Code
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16.x

      - name: Install Node Packages
        run: npm install

      - name: Deploy to Netlify
        id: build_site
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
	
        run: ./_actions/netlify_deploy.sh --p true
```

Code: .github/workflows/publish.yml

Next we’ll make a small tweak to the `_actions/netlify_deploy.sh` script, to check for the production flag and run a production build if it’s been set.

```shell
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
```

Code: _actions/netlify_deploy.sh

Once we push these changes and our testing pipeline runs, the pull request should be ready to approve and merge into the main production branch! Under the **Actions** tab, our new **Build and Publish on Netlify** workflow will now be running, and once completed our site deployed and live on Netlify!

![Screenshot of the actions workflow runs showing a previous successful run for the Build and Test workflow and a currently completing run for the Build and Publish run as part of the pull request merge](/img/dev/front-end-testing/github-actions/ac005cba-d9cf-490d-82c9-591f1a3fd8a6.png)

---

Whilst more complicated that the previous setup, this workflow gives so much more functionality and enables us to easily run more powerful and extensive front end tests on our website before code is even merged in.

Now you don’t need to worry about breaking things, GitHub Actions will test all that for you and make sure you know *before* it goes live.