# oc-agent-demo-target

A tiny, dependency-free library — `src/duration.js` parses durations like
`"1h30m"` into milliseconds — used as a **target repo** for OpenComputer
background agents: a place to watch an agent resolve a real issue and open a PR.

## Get an issue resolved

This repo has the OpenComputer GitHub App installed and an agent watching it.
To see it work:

1. **Open an issue** describing a small change — e.g. *"Add a weeks unit (`w`) to
   parseDuration."*
2. **Add the `agent` label.**
3. In a minute or two the agent checks the repo out in a sandbox, makes the
   change, runs `npm test`, and opens a **draft PR** linked to your issue —
   review and merge.

## The agents

The agents are defined as code — a little `opencomputer.toml` + a prompt — in the
demo collection: **[diggerhq/oc-agent-demos](https://github.com/diggerhq/oc-agent-demos)**.
That's where to see how this one (`issue-fixer`) is built, or to make your own
and point it at your repos.

## Run the library locally

```bash
npm test        # node --test, no dependencies
```
