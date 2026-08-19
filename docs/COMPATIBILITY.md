# Compatibility

## Power BI hosts

The visual depends on the Power BI Visuals Modal Dialog API and checks `hostCapabilities.allowModalDialog` at runtime.

| Host / scenario | Status | Notes |
|---|---|---|
| Power BI Desktop report canvas | Supported | Primary development and acceptance target |
| Power BI Service report view | Supported when custom visuals and modal dialogs are allowed | User/session policy can block custom visual dialogs |
| Embedded analytics | Not supported by current dialog-based UX | Microsoft documents Power BI visual dialogs as unsupported |
| Publish to web | Not supported by current dialog-based UX | Microsoft documents Power BI visual dialogs as unsupported |
| Dashboard tiles | Not supported by current dialog-based UX | Microsoft documents Power BI visual dialogs as unsupported |

The source of truth is the runtime `allowModalDialog` capability rather than hard-coded host detection.

Microsoft reference: https://learn.microsoft.com/power-bi/developer/visuals/create-display-dialog-box

## Model field compatibility

Supported:

- Date columns;
- DateTime columns.

Intentionally unsupported:

- text date strings;
- Persian date strings stored as text;
- numeric date keys;
- measures;
- unrelated categorical fields.

## Browser/platform notes

Power BI Desktop and Service own the rendering environment. The visual does not depend on browser local storage, remote network access, or browser locale for its filter semantics.

## API version

The PBIVIZ declares Power BI Visuals API `5.11.1`. Upgrades must be validated through typecheck, package validation, manual import, and an ADR when API behavior changes materially.
