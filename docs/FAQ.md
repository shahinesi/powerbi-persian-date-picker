# FAQ

## Does my Power BI model need a Persian date column?

No. The intended design is to bind a real Gregorian Date/DateTime column and let the visual provide Jalali input.

## Does it filter DateTime correctly?

It filters from the selected day's UTC start inclusive to the next day's UTC start exclusive, so timestamps throughout the day match.

## Can I bind a text column like `1405/05/28`?

No. Text dates are intentionally rejected.

## Does it call an API to convert dates?

No. Conversion happens locally inside the visual bundle.

## Does it send my report data anywhere?

The visual does not request web-access privileges or implement telemetry/network transmission.

## Why is the repository still marked as a fork?

Because the calendar implementation comes from `react-multi-date-picker`, and preserving the fork relationship makes attribution and upstream history clear. The default `master` branch is still fully product-specific.

## Can I use GitHub “Sync fork”?

For this project, use the documented `upstream-sync` branch strategy rather than blindly syncing the product branch. See [`UPSTREAM.md`](UPSTREAM.md).

## Why does the calendar not open in Embedded/Publish to web/Dashboard?

The current UI uses Power BI's Modal Dialog API. Microsoft documents those host scenarios as unsupported for visual dialogs. The visual checks `allowModalDialog` at runtime.

## Is the PBIVIZ ready to import?

Yes. The canonical file is `release/PersianDatePicker.pbiviz`, produced by CI.
