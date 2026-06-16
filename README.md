# oc-agent-demo-target

A tiny, dependency-free library used as a **target repo** for OpenComputer
background-agent demos — the kind of repo an agent opens PRs against.

`src/duration.js` parses durations like `"1h30m"` into milliseconds. Tests run
with Node's built-in runner:

    npm test

Conventions: keep it dependency-free; add a test for any behavior you change.

## Input validation

`parseDuration` requires the *entire* input to be a sequence of valid
`<number><unit>` parts (units: `s`, `m`, `h`). It throws a `RangeError` on
invalid input — e.g. `"1hello"`, `"1.5h"`, or `"5s garbage"` — rather than
silently parsing only the part it recognizes. A non-string or empty input
throws a `TypeError`.
