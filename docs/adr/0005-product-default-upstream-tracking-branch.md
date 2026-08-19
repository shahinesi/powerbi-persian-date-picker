# ADR 0005 — Product default branch with separate upstream tracking

- **Status:** Accepted (updated)
- **Date:** 2026-08-19

## Context

The repository must remain a fork for attribution/upstream history, while its landing page and releases should represent the Power BI product rather than the upstream React package.

The repository also needs a minimal long-lived branch model that does not mix product history with a clean upstream mirror.

## Decision

Use exactly two intended long-lived branches:

```text
master         product/default branch
upstream-sync  clean upstream tracking branch
```

`upstream-sync` tracks the parent repository's default branch. Upstream changes are reviewed and deliberately integrated into `master`; they are not blindly synchronized into the product branch.

Temporary feature/docs/fix/integration branches may exist while work is active, but should be deleted after merge.

## Consequences

- GitHub landing page uses `master` and shows the Power BI product README.
- Fork relationship and upstream attribution remain visible.
- `upstream-sync` can be reset to the upstream branch without contaminating product history.
- Upstream updates become explicit product changes with review and CI.
- `master` must never be assumed to be a mirror of the parent.
- Long-lived branch clutter is avoided.
