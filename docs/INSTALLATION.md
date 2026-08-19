# Installation and Deployment

## Requirements

- Power BI Desktop or a Power BI environment that allows importing organizational/custom visuals.
- Permission under your tenant policy to use a custom visual from file.
- A model column with data type **Date** or **Date/Time**.

## Install the packaged visual

1. Download [`PersianDatePicker.pbiviz`](https://raw.githubusercontent.com/shahinesi/powerbi-persian-date-picker/master/release/PersianDatePicker.pbiviz).
2. Open the target report in Power BI Desktop.
3. In the **Visualizations** pane, open the **...** menu.
4. Choose **Import a visual from a file**.
5. Select `PersianDatePicker.pbiviz` and accept the custom visual notice if shown.
6. Place **Persian Date Picker** on the report canvas.
7. Bind one model Date/DateTime column to the **Date** role.

## First validation

Use a small synthetic table first:

| Date | Value |
|---|---:|
| 2026-08-18 | 10 |
| 2026-08-19 | 20 |
| 2026-08-20 | 30 |

Select Jalali `1405/05/28`. The report should keep the Gregorian day `2026-08-19`.

For a DateTime field, include several timestamps during that day and verify all are included.

## Power BI Service

When publishing a report, custom visual availability depends on tenant/admin policy and the destination workspace. If the visual is blocked, ask the Power BI administrator to permit custom visuals or distribute the visual through the organization's approved mechanism.

## Modal dialog requirement

The current UX uses Power BI's Modal Dialog API so the calendar can open outside the visual's small viewport. Some Power BI host contexts may not allow modal dialogs. In such contexts, the visual displays a warning instead of silently failing.

See [`COMPATIBILITY.md`](COMPATIBILITY.md).

## Build from source

```bash
git clone https://github.com/shahinesi/powerbi-persian-date-picker.git
cd powerbi-persian-date-picker/powerbi
npm install
npm run typecheck
npm test
npm run audit:prod
npm run package
```

The PBIVIZ is generated under `powerbi/dist/`.

## Updating the visual

Download the latest `release/PersianDatePicker.pbiviz` and import the new version into the report. Preserve a backup of important reports before replacing any custom visual in production.

## Integrity

For controlled enterprise deployment, pin distribution to a specific repository commit/release artifact and record the file checksum in your deployment process.
