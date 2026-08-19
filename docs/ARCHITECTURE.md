# Architecture

## Context

Persian Date Picker is a Power BI custom visual that accepts user input in the Jalali calendar while filtering a Gregorian model column.

The core design rule is:

> **Jalali is an interaction format; Gregorian Date/DateTime remains the model truth.**

## Repository boundaries

```text
/
├── src/, styles/, test/, website/   # upstream react-multi-date-picker source
├── powerbi/                         # Power BI product layer
│   ├── src/visual.ts                # IVisual integration and filter lifecycle
│   ├── src/DatePickerDialog.tsx     # modal Jalali picker
│   ├── src/dateUtils.ts             # calendar conversion/boundaries
│   ├── capabilities.json            # Power BI data roles and filter capability
│   └── style/                       # visual/dialog styling
├── release/                         # published PBIVIZ artifact
├── docs/                            # product/engineering documentation
└── site/                            # GitHub Pages static site
```

Power BI-specific behavior should remain under `powerbi/` unless a documented ADR justifies changing upstream-derived source.

## Runtime components

### Main visual (`visual.ts`)

Responsibilities:

- receives Power BI `VisualUpdateOptions`;
- validates that the category field is Date/DateTime;
- derives the filter target from Power BI's query name;
- renders the compact trigger/clear UI;
- opens the modal dialog;
- converts dialog results into a native Power BI `AdvancedFilter`;
- restores selection from the filter state supplied by Power BI;
- clears the filter through the host API.

### Modal dialog (`DatePickerDialog.tsx`)

Responsibilities:

- renders the Jalali calendar;
- initializes itself from an existing Gregorian selected day;
- returns Gregorian UTC start/end boundaries to the visual;
- keeps the calendar outside the visual viewport so it is not clipped.

### Date utilities (`dateUtils.ts`)

Responsibilities:

- convert between Gregorian ISO timestamps and Persian `DateObject` values;
- produce deterministic UTC boundaries for the selected Gregorian calendar day;
- isolate calendar arithmetic from Power BI host behavior.

## Filter model

A selected day is represented as a half-open interval:

```text
[startInclusive, endExclusive)
```

Example:

```text
>= 2026-08-19T00:00:00.000Z
<  2026-08-20T00:00:00.000Z
```

This handles both Date and DateTime columns and avoids equality-at-midnight defects.

## State model

The Power BI filter state is authoritative. Local visual state is only a rendering/cache convenience.

```text
Power BI filter/bookmark state
          ↓ update()
restore selected day
          ↓
render trigger
          ↓ user selection
applyJsonFilter()
          ↓
Power BI owns resulting filter state
```

The visual deliberately matches restored filters to its own target table/column before displaying a selected date.

## Security boundary

The visual runs inside the Power BI custom visual sandbox. It does not require web access, authentication, storage, export, or other privileges. See [`THREAT-MODEL.md`](THREAT-MODEL.md).

## Upstream boundary

The repository remains a GitHub fork to preserve attribution and an explicit upstream relationship. `master` is the product branch. `upstream-sync` tracks the parent repository and is used as an integration source, not as the user-facing branch. See [`UPSTREAM.md`](UPSTREAM.md).
