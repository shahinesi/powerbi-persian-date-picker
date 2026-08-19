# Usage

## Report author setup

1. Add the visual to the page.
2. Bind one model column to the Date field well.
3. Ensure the column data type is Date or Date/Time.
4. Size the trigger compactly; the calendar itself opens in a modal.

## End-user interaction

- Click the trigger.
- Navigate the Persian calendar.
- Select a Jalali day.
- Confirm the selection.
- The report is filtered to the corresponding Gregorian day.
- Use the clear button to remove the visual's filter.

## Example

Selecting:

```text
1405/05/28
```

maps to the Gregorian calendar day:

```text
2026-08-19
```

and the visual filters using:

```text
>= 2026-08-19T00:00:00.000Z
<  2026-08-20T00:00:00.000Z
```

## Why not a Persian text column?

Text dates are poor semantic date keys: sorting can be wrong, time intelligence is harder, relationships become awkward, and native Power BI date behavior is lost. This visual intentionally keeps the model's Gregorian date semantics intact.

## Bookmarks

The visual treats Power BI's filter state as authoritative. When a bookmark restores a matching advanced filter for the bound field, the trigger displays the corresponding Jalali selection.

## Multiple visuals

Each visual instance applies a filter to its own configured `general.filter` property and bound target. As with any slicer/filter design, report authors should test interactions when several visuals filter the same column.

## DateTime fields

The visual does not filter with strict equality. It filters a full day interval so timestamps throughout the selected day are included.

## Unsupported input

The visual intentionally rejects:

- numeric surrogate date keys;
- text date strings;
- measures;
- arbitrary Persian date strings stored as text.

Model those as a real Date/DateTime column before binding them.
