# Persian Date Picker for Power BI

A focused Power BI custom visual that shows a compact **Persian (Jalali) date picker** while applying a real **Gregorian Date/DateTime filter** to the selected Power BI field.

## User experience

1. Import `PersianDatePicker.pbiviz` into Power BI.
2. Add **Persian Date Picker** to the report canvas.
3. Drag one Gregorian `Date` or `DateTime` column into the **Date** field well.
4. Click the compact picker.
5. Choose a date in the Persian calendar and click **OK**.
6. The visual applies a Gregorian filter to the underlying field.
7. Use `×` to clear the filter.

Example:

- UI: `۱۴۰۵/۰۵/۲۸`
- Gregorian day: `2026-08-19`
- Applied filter: `>= 2026-08-19T00:00:00.000Z` and `< 2026-08-20T00:00:00.000Z`

Using an exclusive next-day boundary makes the picker work for both `Date` and `DateTime` columns and avoids local-time-zone shifts.

## Why a Power BI dialog?

Power BI custom visuals are rendered inside a bounded sandbox. A normal web date-picker popup can be clipped by the visual's rectangle. This visual uses Power BI's supported Modal Dialog API so the report can keep a small date-picker control while showing the full Jalali calendar when the user clicks it.

Power BI does not support Custom Visual modal dialogs in some environments (including Embedded analytics, Publish to web, and Dashboards). Power BI Desktop and normal report viewing in the Power BI service are the primary supported targets for this visual.

## Development

Requires Node.js 20.19+.

```bash
cd powerbi
npm install
npm run verify
```

The `.pbiviz` package is emitted to `powerbi/dist/`.

## Architecture

- `react-multi-date-picker` / `Calendar` renders the Persian calendar UI.
- `react-date-object` converts the selected Jalali date to Gregorian.
- `powerbi-models.AdvancedFilter` applies the Gregorian filter.
- Power BI `jsonFilters` restores bookmark/filter state back into the compact picker.
- Power BI Modal Dialog API avoids popup clipping.

## Security/privacy

The visual requests **no Power BI privileges**:
- no web access
- no local storage
- no file export
- no AAD authentication

Date conversion happens locally inside the Power BI visual sandbox.
