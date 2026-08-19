# Contributing

Thanks for improving Persian Date Picker for Power BI.

## Scope

This repository contains two related layers:

1. the upstream `react-multi-date-picker` source; and
2. the Power BI product layer under `powerbi/`.

For Power BI features and fixes, prefer changing `powerbi/` rather than modifying upstream files. Changes to upstream-derived source need a clear reason because they increase synchronization cost.

## Before opening a PR

1. Create a focused branch from `master`.
2. Keep one concern per PR.
3. Update documentation when behavior, architecture, compatibility, or installation changes.
4. Add or update tests for date conversion and boundary behavior.
5. Run the local quality gates:

```bash
cd powerbi
npm install
npm run typecheck
npm test
npm run audit:prod
npm run package
```

6. Verify no secrets, credentials, customer data, `.pbix` files, or proprietary report data are committed.

## Pull request expectations

A good PR explains:

- the user problem;
- the chosen approach;
- alternatives considered for architectural changes;
- Power BI runtime implications;
- date/timezone implications;
- security/accessibility implications;
- test evidence;
- any documentation changes.

Architecturally significant changes should add or update an ADR under `docs/adr/`.

## Coding principles

- Treat Power BI model dates as Gregorian truth.
- Keep the Jalali calendar a presentation/input concern.
- Use half-open date ranges (`>= start`, `< next day`) for whole-day DateTime filtering.
- Do not request Power BI privileges unless a documented feature genuinely needs them.
- Avoid network calls in the visual.
- Avoid `innerHTML` and dynamic code execution.
- Preserve bookmark/filter restoration behavior.
- Validate model field types at runtime.
- Keep upstream integration isolated.

## Commit and PR style

Use clear conventional-style subjects where practical, for example:

- `feat: add range selection`
- `fix: restore bookmark filter for quoted table names`
- `docs: document tenant deployment`
- `ci: harden Pages deployment`

## Upstream changes

Do not use **Sync fork** blindly against the product branch. Follow [`docs/UPSTREAM.md`](docs/UPSTREAM.md), where `upstream-sync` is the tracking branch and `master` is the product branch.

## Conduct

Participation is governed by [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
