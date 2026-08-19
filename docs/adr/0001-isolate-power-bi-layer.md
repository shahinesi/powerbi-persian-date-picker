# ADR 0001 — Isolate the Power BI layer

- **Status:** Accepted
- **Date:** 2026-08-19

## Context

The repository is a fork of `react-multi-date-picker`, but the product goal is a Power BI custom visual. Editing upstream-derived files for every Power BI concern would make future synchronization difficult and attribution boundaries unclear.

## Decision

Keep Power BI-specific source, capabilities, styles, tests, and package metadata under `powerbi/`. Modify upstream-derived source only when a Power BI requirement cannot reasonably be implemented through the isolated layer.

## Consequences

- Upstream integration remains reviewable.
- Product ownership is clearer.
- Some code may wrap rather than directly customize upstream internals.
- Exceptions require explicit architectural justification.
