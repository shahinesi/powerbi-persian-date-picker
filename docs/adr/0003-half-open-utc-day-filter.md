# ADR 0003 — Filter a selected day with half-open UTC boundaries

- **Status:** Accepted
- **Date:** 2026-08-19

## Context

Filtering a DateTime column with equality to midnight excludes timestamps later in the day. Inclusive end-of-day timestamps are fragile because precision differs across systems.

## Decision

Convert the selected Jalali calendar day to its Gregorian day and apply:

```text
>= start-of-day UTC
<  start-of-next-day UTC
```

## Consequences

- Date and DateTime fields share one filter strategy.
- Timestamp precision does not affect the upper boundary.
- UTC semantics are explicit and testable.
- Tenant/local-timezone semantics are not inferred; changing that contract requires a new ADR.
