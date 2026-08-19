# ADR 0002 — Use the Power BI Modal Dialog API

- **Status:** Accepted
- **Date:** 2026-08-19

## Context

A date picker needs more space than a compact slicer visual. Rendering a normal popover inside the custom visual risks clipping at the visual viewport boundary.

## Decision

Open the Jalali calendar through Power BI's `openModalDialog` API after an explicit user action and guard it with `hostCapabilities.allowModalDialog`.

## Consequences

- Calendar is not clipped by the visual container.
- Power BI owns modal framing/action buttons.
- Embedded analytics, Publish to web, and dashboards are not supported by this UX according to Microsoft documentation.
- A future non-modal fallback would require a new design decision.
