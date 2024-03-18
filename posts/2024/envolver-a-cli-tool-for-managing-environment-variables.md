---
title: "Envolver: A CLI Tool for Managing Environment Variables"
date: 2024-03-18
external: https://blog.makerx.com.au/envolver-a-cli-tool-for-managing-environment-variables/
categories:
  - Dev
  - Tools
featured:
  src: feature/christin-hume-mfB1B1s4sMc-unsplash.jpg
---
Envolver is a CLI tool that addresses the common challenge of managing changing environment variables in projects, particularly when multiple people work on them intermittently or in different time zones. It simplifies the process of identifying and updating new or altered variables, making it easier to maintain large applications with numerous environment variables.

---

Have you ever picked up a project you haven’t touched in a while and watched all the errors from missing or changed environment variables? Maybe you’re only working part time and a lot has changed on your days off, or maybe you’ve been on a well deserved break and others have continued working on the project while you were gone. When multiple people are working on a project, on their own timeframes and schedules, this sort of thing is bound to happen. Changes happen to keys and variables that are being used, new ones are added and people don’t always know what they need to update so they can get back up and running.

## What's an environment/env variable?

[Environment variables](https://www.dotenv.org/docs/security/env?ref=blog.makerx.com.au) (or env variables for short) are a set of variables often used in projects to avoid adding secret values (like API keys and passwords) to a codebase. These are generally saved in a `.env` file (referred to as a _dot E-N-V_ file), which then lives just on each person's computer and isn't included with the rest of the code base. The format for each file is a list of key-value pairs, and ignores any blank lines or comments.

```
  AZURE_API_KEY=TWZjYWFxRkg3V0BEcGlXSkJ6Mw
  STRIPE_API_KEY=VFdaallXRnhSa2czVjBCRWNHbFhTa0o2TXc9PQ

  # Database settings
  DB_USER=admin
  DB_PASSWORD=sMfcaaqFH7W@DpiWJBz.3
```

Because these `.env` files are specific to a certain environment (eg. a developer's computer), sometimes projects will end up with multiple `.env` files for different environments, eg. `.env.development` or `.env.production` (any `.env.{environment}` is valid), or you may see a `.env.sample` being checked into the code repository. A sample file will typically include a list of all variables, but with blank values, although sometimes less secret values will still be included when there's no concern of people finding and getting access to these values.

```
  # .env.sample
  AZURE_API_KEY=
  STRIPE_API_KEY=

  # Database settings
  DB_USER=admin
  DB_PASSWORD=
```

## Changing environment variables

Throughout the life cycle of a project, the values of will likely be changed for a number of reasons, or as the product gets developed new ones will be added. For example when the database connection is setup, the login details for it will be added and when Stripe gets integrated the API key will be added. Perhaps the test environment that's originally used will be decommissioned for the proper environment at some point as well, and the API keys will need to replaced with the new ones, your `.env` file is a living, breathing document that changes fairly regularly.

Keeping up to date with these changes can be hard enough when you're working on a project full time, but perhaps you're only working on the project a couple of days a week (a lot can happen in the remaining 3 days), or you might go on holidays for a week or two, or perhaps you've been pulled into another project for a bit and you've come back after a few weeks. These time frames might not seem like much, but a lot of the time there's been several changes to the environment variables and things won't work the first time you try and spin up your developer environment when you get back into it (even if you've pulled the most recent code changes).

At MakerX we encounter this issue for a number of different reasons, with team members jumping between projects, working part time or on contracts, working on their own schedules or in different timezones it’s not an uncommon occurrence to see team members asking for the new or updated variables to update on their computer.

While it's not a massive deal to get the most updated variable details, sometimes it can be a bit of a pain to work out what's changed and what you're now missing (especially when working with large applications that could have 50 or more different environment variables to go through). This is all getting a lot easier now though, as we've built [Envolver](https://www.npmjs.com/package/@makerx/envolver), a CLI tool that can check for changes in the environment variables, comparing your local `.env` file to the most recent changes in the code repo.

## Updating variable changes

The first time you run the CLI tool, you'll need to get a summary of what your current environment variable file looks like (whether it's `.env`, `.env.local`, `.env.development` or something else), using the `update` function to generate a summary of the values you've got already.

```bash
  envolver update .env.local
```

This will generate a `vars.json` file, listing all the variables and their values. Depending on the project and your setup, this file could be included as part of the code repo (don't do this if the repo is public as you'll leak secret values), if not, don't forget to add it to your `.gitignore` file.

Once you've got your starting point, you can then compare it to the `.env.sample` file from the repo using the `check` function, by default this will output the changes to the console, but you can choose to output to a json file instead if you want to keep a record of it (make sure to add that to your `.gitignore` file as well).

    envolver check .env.sample --output=json

This summary can then let you know which values have changed (this may not be entirely accurate if your `.env.sample` file doesn't have values but your `.env` file does), and which variables are completely new.

```json
  [
    {
      "name": "CHANGED_VALUE",
      "value": "my_value-new",
      "changed": true
    },
    {
      "name": "API_KEY",
      "value": "",
      "new": true
    }
  ]
```

If you pass in the `-u, --update` flag when checking as well, it will update the `vars.json` file with the new values, so you're comparing against the most up to date information each time. This means the next time you pull more recent code changes, you just have to run the `check` function again.

## Environment Variable Sections

Some teams or developers will have preferred conventions for how they organise a `.env` file, for example you may find that most people will split their variables into different categories and add comments about different sections or variables. This works exactly the same way, but makes things much easier for people to read and work with, especially on large codebases with LOTS of environment variables.

```
  STRIPE_API_KEY=

  ## Azure
  AZURE_API_KEY=
  AZURE_RESOURCE_ID=

  ## Database settings
  # Only need these values if you're making changes to the database setup
  DB_USER=admin
  # If you're working with the db, you'll need to fetch this from 1Password
  DB_PASSWORD=
```

When you're checking variables with Envolver, it recognises these sections and comments and will include updates if they've changed. It will also sort the variables into sections, so if some of them aren't relevant to you, you can ignore any changes to that section.

```json
  [
    {
      "name": "API_KEY",
      "value": "",
      "new": true
    },
    {
      "name": "CMS Settings",
      "comment": "You'll only need these if making content changes\n",
      "variables": [],
      "changed": true
    },
    {
      "name": "Database Settings",
      "comment": null,
      "variables": [
        {
          "name": "DB_PASSWORD",
          "value": "testpassword",
          "comment": "Find this in the 1Password vault for this project",
          "changed": true
        }
      ],
      "changed": true
    }
  ]
```

## Automating Checks

If you're saving your `vars.json` file in the code repo, you can automate updating this file to make it easier to run checks against the most recent versions. Using a GitHub Actions workflow, we can run Envolver to update the file whenever someone makes changes to the production branch (or any branch you like).

```yaml
  name: Update Environment Variables

  on:
    push:
      branches: [prod]

  jobs:
    build:
      runs-on: ubuntu-22.04
      steps:
        - name: Checkout Repo Code
          uses: actions/checkout@v3
        - name: Update Variables
          run: npx envolver update .env.sample
        - name: Commit to repo
          uses: actions/github-script@v6
          with:
            github-token: ${{ secrets.GITHUB_TOKEN }}
            script: |
              github.rest.git.createCommit({
                owner: context.repo.owner,
                repo: context.repo.repo,
                message: "Updated environment variables",
                tree: env.object_tree,
                parents: [env.parent]
              });
```

* * *

Whether you’re working on projects with large teams, switching between multiple projects, working part time or just enjoy taking a holiday every now and then, Envolver is a powerful CLI tool to make it easier for you to get back up and running.