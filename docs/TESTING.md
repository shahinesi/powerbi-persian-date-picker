# Testing Strategy

## Objectives

Testing focuses on the failure modes most dangerous for a date slicer:

- wrong Jalali/Gregorian mapping;
- off-by-one-day boundaries;
- DateTime records being excluded;
- Power BI API/type drift;
- invalid capabilities/package metadata;
- dependency vulnerabilities;
- static security defects.

## Automated gates

### TypeScript

```bash
npm run typecheck
```

Catches API/type mismatches before packaging.

### Date conversion tests

```bash
npm test
```

The deterministic test suite locks known mappings including:

```text
1405/05/28 ↔ 2026-08-19
```

and validates the next-day exclusive UTC boundary.

### Production dependency audit

```bash
npm run audit:prod
```

The CI gate fails for high/critical production dependency vulnerabilities.

### PBIVIZ packaging

```bash
npm run package
```

This invokes `pbiviz package`, which includes lint/capabilities validation and proves that a distributable visual can be generated.

### CodeQL

GitHub CodeQL v4 scans JavaScript/TypeScript changes.

## Manual acceptance testing

Before a behavior-changing release, verify in Power BI Desktop:

1. Visual imports successfully.
2. No field → disabled guidance.
3. Text field → invalid-field guidance.
4. Date field → calendar opens and selected day filters correctly.
5. DateTime field → morning/noon/evening timestamps all remain for selected day.
6. Clear removes only this filter.
7. Bookmark restores the visible Jalali selection.
8. Resizing does not break the trigger.
9. Keyboard focus reaches trigger and clear control.
10. RTL text and calendar remain readable.

## Test data

Use synthetic dates near:

- Nowruz/year boundaries;
- leap-year-sensitive dates;
- month ends;
- Gregorian year boundaries;
- times immediately before midnight and at midnight.

Do not use confidential production data for CI or bug reproduction.
