# Troubleshooting

## "ابتدا فیلد تاریخ را انتخاب کنید"

No compatible field is bound. Add one Date/DateTime model column to the visual.

## "فیلد باید Date یا DateTime باشد"

The bound field is not semantically typed as Date/DateTime. Change the model column data type rather than formatting a text field to look like a date.

## Calendar does not open

The current host may not permit Power BI modal dialogs. Check whether you are using Desktop/report view versus a constrained embedded/dashboard/publish context. The visual should show a Power BI warning when modal support is unavailable.

## The wrong records are included for a DateTime field

Confirm the semantic meaning of timestamps in the model. v1 uses explicit UTC day boundaries after calendar conversion. If your dataset encodes local wall-clock timestamps as UTC or has custom timezone semantics, document that model behavior before changing the visual.

## Bookmark does not restore the shown date

Verify the bookmark contains the visual/filter state and that the visual is still bound to the same model table/column. The visual only restores advanced filters whose target matches the current bound field.

## Import is blocked

Your Power BI tenant may restrict custom visuals. Ask your administrator about custom visual policies or organizational visual distribution.

## PBIVIZ build fails locally

From `powerbi/` run:

```bash
rm -rf node_modules dist .tmp
npm install
npm run typecheck
npm test
npm run package
```

Then compare Node/tool versions with CI and inspect the first failing `pbiviz` validation message.

## Security warning or audit failure

Do not bypass the production audit gate simply to obtain a green build. Identify whether the vulnerability is in production or development-only dependencies, upgrade safely, package again, and document any accepted residual risk.
