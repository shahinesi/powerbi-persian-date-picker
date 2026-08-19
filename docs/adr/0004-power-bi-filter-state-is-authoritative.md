# ADR 0004 — Power BI filter state is authoritative

- **Status:** Accepted
- **Date:** 2026-08-19

## Context

Bookmarks, page navigation, and the Power BI host can restore or modify filter state independently of a visual's local React/DOM state.

## Decision

Treat the JSON filters supplied by Power BI as the source of truth. Local selected-date state exists only to render the current control and bridge user interaction. Restore only an advanced filter whose target matches the bound table and column.

## Consequences

- Bookmarks can restore the displayed Jalali date.
- Unrelated advanced filters are not displayed as this visual's selection.
- State logic remains coupled to Power BI's filter lifecycle rather than browser storage.
