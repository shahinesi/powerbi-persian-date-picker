# Design Document

## Problem

Persian Power BI users need a natural Jalali date-selection experience, but Power BI semantic models and filter APIs operate on Gregorian Date/DateTime values. Storing a duplicated Jalali text date is undesirable because it changes model semantics, sorting, relationships, and interoperability.

## Goals

- Present a true Jalali calendar UI.
- Filter an existing Gregorian Date/DateTime model column.
- Include every timestamp belonging to the selected day.
- Behave correctly with bookmarks/filter restoration.
- Keep the visual low-privilege and offline.
- Package as a normal importable PBIVIZ.
- Keep upstream date-picker source maintainable.

## Non-goals for v1

- Replacing the semantic model's date type.
- Filtering text fields containing Persian date strings.
- Server-side conversion services.
- External APIs or telemetry.
- Multi-date/range/month/relative-date modes in the initial visual.
- AppSource certification in the initial release.

## User experience

### Empty state

Without a bound field, the control is disabled and asks the report author to bind a date field.

### Invalid field

If a non-Date/DateTime field is bound, the control communicates that the field type is invalid rather than attempting text parsing.

### Selection

A click opens a Power BI modal dialog containing the Persian calendar. Confirming a date returns a Gregorian day boundary pair to the host visual.

### Clear

The clear action removes this visual's filter property while preserving unrelated report filters.

## Data contract

Input:

- exactly one Power BI category field;
- semantic type: Date or DateTime.

Output side effect:

- one AdvancedFilter against the bound table/column;
- logical operator: `And`;
- condition 1: `GreaterThanOrEqual(startInclusiveIso)`;
- condition 2: `LessThan(endExclusiveIso)`.

## Time semantics

Calendar conversion is performed as calendar arithmetic, then normalized to explicit UTC day boundaries. The product does not infer a user's report timezone from browser locale.

The v1 contract therefore means **the Gregorian calendar day represented by the converted date using UTC boundaries**. Any future tenant-timezone-aware behavior requires a separate ADR because it changes report semantics.

## Filter restoration

Power BI may rerender the visual after bookmarks, page navigation, cross-filtering, or its own filter lifecycle. The visual scans JSON filters only for an advanced filter whose target matches the currently bound table and column, then restores the first condition's start value.

## Error handling

- Missing field → disabled control.
- Wrong data type → disabled control with explicit guidance.
- Modal unavailable → Power BI warning icon/message.
- Modal opening failure → warning icon/message.
- Unparseable existing filter → no selection shown; report remains usable.

## Privacy

No report data is transmitted. The visual does not request network privileges and does not send telemetry.

## Accessibility

The trigger and clear actions are native buttons with accessible labels. The product keeps RTL presentation separate from semantic button behavior. See [`ACCESSIBILITY.md`](ACCESSIBILITY.md).

## Maintainability

Power BI integration is isolated under `powerbi/`; upstream-derived code remains independently syncable. Architectural exceptions require an ADR.
