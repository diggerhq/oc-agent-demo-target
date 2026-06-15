# oc-agent-demo-target

A tiny, dependency-free library used as a **target repo** for OpenComputer
background-agent demos — the kind of repo an agent opens PRs against.

`src/duration.js` parses durations like `"1h30m"` into milliseconds. Tests run
with Node's built-in runner:

    npm test

Conventions: keep it dependency-free; add a test for any behavior you change.
