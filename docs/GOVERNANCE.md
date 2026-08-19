# Governance

## Maintainer model

The repository owner/maintainer has final responsibility for scope, security, releases, and architectural direction.

## Decision classes

### Routine changes

Bug fixes, docs, tests, styling, and refactors that preserve architecture can be decided in normal PR review.

### Architectural changes

Changes to filter semantics, date/timezone semantics, Power BI privileges, state ownership, upstream isolation, distribution, or major dependencies require an ADR.

### Security-sensitive changes

Network access, authentication, storage, export, telemetry, HTML execution, or new data exposure requires threat-model review and explicit maintainer approval.

## Merge policy

A change should be merged only when required automated gates are green and review concerns are resolved. The maintainer may require manual Power BI acceptance testing for behavior changes.

## Documentation ownership

Docs are part of the product. A behavior-changing PR is incomplete when README/user/design docs describe old behavior.

## Upstream stewardship

The project must preserve upstream attribution and avoid unnecessary edits to upstream-derived source. See [`UPSTREAM.md`](UPSTREAM.md).
