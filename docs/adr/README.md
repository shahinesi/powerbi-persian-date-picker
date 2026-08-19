# Architecture Decision Records

ADRs capture decisions that should remain understandable after the original implementation context is gone.

| ADR | Status | Decision |
|---|---|---|
| [0001](0001-isolate-power-bi-layer.md) | Accepted | Isolate Power BI integration from upstream source |
| [0002](0002-use-power-bi-modal-dialog.md) | Accepted | Use Power BI Modal Dialog API for calendar UX |
| [0003](0003-half-open-utc-day-filter.md) | Accepted | Filter whole days with half-open UTC boundaries |
| [0004](0004-power-bi-filter-state-is-authoritative.md) | Accepted | Treat Power BI filter state as authoritative |
| [0005](0005-product-default-upstream-tracking-branch.md) | Accepted | Product default branch plus separate upstream tracking branch |

## ADR lifecycle

Statuses: Proposed, Accepted, Superseded, Rejected.

Do not rewrite the rationale of an accepted ADR to hide a changed decision. Add a new ADR and mark the old one superseded.
