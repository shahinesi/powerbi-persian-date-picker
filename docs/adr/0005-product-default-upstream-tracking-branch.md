# ADR 0005 — Product default branch with separate upstream tracking

- **Status:** Accepted
- **Date:** 2026-08-19

## Context

The repository must remain a fork for attribution/upstream history, while its landing page and releases should represent the Power BI product rather than the upstream React package.

## Decision

Use `master` as the product/default branch and `upstream-sync` as a clean tracking branch for upstream `master`. Integrate upstream changes deliberately from `upstream-sync` into a temporary product PR.

## Consequences

- GitHub landing page shows the product README.
- Fork relationship remains visible and healthy.
- Upstream updates are explicit product changes rather than blind synchronization.
- `master` cannot be assumed to be a mirror of the parent.
