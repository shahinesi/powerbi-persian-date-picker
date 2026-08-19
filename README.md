<div align="center">

# Persian Date Picker for Power BI

**A production-ready Jalali (Persian) date slicer for Power BI that filters real Gregorian `Date` / `DateTime` columns.**

[فارسی](#راهنمای-سریع-فارسی) · [Installation](#installation) · [Documentation](#documentation) · [Architecture](docs/ARCHITECTURE.md) · [Download PBIVIZ](https://raw.githubusercontent.com/shahinesi/powerbi-persian-date-picker/master/release/PersianDatePicker.pbiviz) · [Website](https://shahinesi.github.io/powerbi-persian-date-picker/)

[![Power BI Visual](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/powerbi-visual.yml/badge.svg)](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/powerbi-visual.yml)
[![CodeQL](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/codeql-analysis.yml)
[![Pages](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/pages.yml/badge.svg)](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

## Why this project exists

Power BI stores and filters dates using Gregorian date values, while many Persian-speaking users expect to choose dates in the Jalali calendar. This visual bridges those two worlds without requiring the report model to store a second Persian date column.

The user sees and selects a Persian date such as `1405/05/28`; the visual converts it to the corresponding Gregorian day and applies a native Power BI filter against the bound `Date` or `DateTime` field.

```text
User selects Jalali date
        ↓
1405/05/28
        ↓
Gregorian conversion
        ↓
2026-08-19T00:00:00.000Z
        ↓
Power BI AdvancedFilter
        ↓
>= start of day AND < start of next day
```

That half-open interval avoids the common `DateTime` bug where only midnight values match.

## Features

- Persian/Jalali calendar UI with RTL layout.
- Works with real Power BI `Date` and `DateTime` fields.
- Native Power BI `AdvancedFilter`; no fake text filtering.
- Timezone-safe whole-day filtering using `[start, next-day)` UTC boundaries.
- Restores the selected value from Power BI filter/bookmark state.
- Clear-filter control.
- Runtime validation that rejects non-date fields.
- Uses the Power BI Modal Dialog API so the calendar is not clipped by the visual viewport.
- No web-access, AAD, storage, export, or other Power BI privileges.
- CI verifies TypeScript, date conversion, production dependency audit, PBIVIZ packaging, and CodeQL.
- A ready-to-import `.pbiviz` is published to `release/PersianDatePicker.pbiviz`.

## Installation

### Option A — Download the ready-to-use visual

Download:

**[PersianDatePicker.pbiviz](https://raw.githubusercontent.com/shahinesi/powerbi-persian-date-picker/master/release/PersianDatePicker.pbiviz)**

Then in Power BI Desktop:

1. Open your report.
2. In **Visualizations**, select **...** → **Import a visual from a file**.
3. Choose `PersianDatePicker.pbiviz`.
4. Add **Persian Date Picker** to the report canvas.
5. Drag exactly one model column whose data type is **Date** or **Date/Time** into the visual's **Date** field well.
6. Click the visual and choose a Jalali date.

For deployment, tenant settings, Desktop/Service notes, and troubleshooting, see [Installation](docs/INSTALLATION.md).

### Option B — Build from source

```bash
git clone https://github.com/shahinesi/powerbi-persian-date-picker.git
cd powerbi-persian-date-picker/powerbi
npm install
npm run typecheck
npm test
npm run audit:prod
npm run package
```

The packaged visual is written under `powerbi/dist/`.

## Usage contract

The bound field must be a Power BI model column typed as **Date** or **DateTime**. Text columns containing strings such as `1405/05/28` are intentionally not accepted.

For a selected day, the visual applies:

```text
column >= 2026-08-19T00:00:00.000Z
AND
column <  2026-08-20T00:00:00.000Z
```

This safely includes every timestamp in the selected Gregorian day.

## Architecture at a glance

The upstream React date-picker source is intentionally left intact. Power BI-specific integration lives under `powerbi/`.

```text
react-multi-date-picker source (upstream-compatible)
                    │
                    ▼
            powerbi/DatePickerDialog
                    │
                    ▼
 Jalali DateObject → Gregorian UTC boundaries
                    │
                    ▼
        Power BI IVisualHost.applyJsonFilter
```

See [Architecture](docs/ARCHITECTURE.md), [Design](docs/DESIGN.md), and the [Architecture Decision Records](docs/adr/README.md).

## Quality and security gates

Every product change is expected to pass:

| Gate | Purpose |
|---|---|
| TypeScript `tsc --noEmit` | Compile-time API/type validation |
| Date conversion tests | Locks Jalali ↔ Gregorian and UTC boundary behavior |
| `npm audit --omit=dev --audit-level=high` | Blocks high/critical production dependency vulnerabilities |
| `pbiviz package` | Validates Power BI capabilities, linting, bundle and packaging |
| CodeQL v4 | Static security analysis for JavaScript/TypeScript |

More details: [Testing](docs/TESTING.md) and [Quality Gates](docs/QUALITY-GATES.md).

## Documentation

| Document | Purpose |
|---|---|
| [Documentation Index](docs/README.md) | Complete map of project docs |
| [Installation](docs/INSTALLATION.md) | Install, import and deployment |
| [Usage](docs/USAGE.md) | User behavior and data requirements |
| [Architecture](docs/ARCHITECTURE.md) | Components and runtime flow |
| [Design](docs/DESIGN.md) | Product and technical design |
| [ADRs](docs/adr/README.md) | Architecture decisions and rationale |
| [Development](docs/DEVELOPMENT.md) | Local development workflow |
| [Testing](docs/TESTING.md) | Test strategy and CI |
| [Security](SECURITY.md) | Vulnerability reporting policy |
| [Threat Model](docs/THREAT-MODEL.md) | Security boundaries and abuse cases |
| [Accessibility](docs/ACCESSIBILITY.md) | Keyboard/RTL/accessibility requirements |
| [Compatibility](docs/COMPATIBILITY.md) | Supported Power BI environments |
| [Releasing](docs/RELEASING.md) | Packaging and release process |
| [Upstream Strategy](docs/UPSTREAM.md) | Keeping the fork healthy |
| [Governance](docs/GOVERNANCE.md) | Maintenance and decision process |
| [Roadmap](docs/ROADMAP.md) | Planned product direction |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Common problems |
| [License & Attribution](docs/LICENSES.md) | MIT and upstream attribution |

## Upstream relationship

This repository is a fork of [`shahabyazdi/react-multi-date-picker`](https://github.com/shahabyazdi/react-multi-date-picker). The upstream project remains the source of the reusable React calendar implementation.

This fork adds a distinct Power BI product layer, documentation, CI/release automation, and site. To avoid damaging upstream synchronization:

- `master` is the product/default branch for this repository.
- `upstream-sync` is reserved as a clean tracking branch for the upstream `master` history.
- Upstream changes are first reviewed on `upstream-sync`, then deliberately integrated into `master` through a product PR.

See [Upstream Strategy](docs/UPSTREAM.md).

## راهنمای سریع فارسی

این Visual برای این ساخته شده که کاربر داخل Power BI **تاریخ شمسی انتخاب کند** ولی فیلتر واقعی روی ستون میلادی `Date/DateTime` مدل اعمال شود.

**نصب:** فایل [`PersianDatePicker.pbiviz`](https://raw.githubusercontent.com/shahinesi/powerbi-persian-date-picker/master/release/PersianDatePicker.pbiviz) را دانلود کن → داخل Power BI از **Import a visual from a file** واردش کن → یک ستون واقعی Date/DateTime به Visual بده → تاریخ شمسی را انتخاب کن.

مثلاً انتخاب `۱۴۰۵/۰۵/۲۸` در UI، پشت صحنه روز Gregorian متناظر را روی مدل فیلتر می‌کند. لازم نیست در مدل یک ستون تاریخ شمسی جدا بسازی.

## Contributing

Contributions are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md), read the [design constraints](docs/DESIGN.md), and keep Power BI-specific changes inside `powerbi/` whenever possible.

## Security

Please do **not** open a public issue for a suspected vulnerability. Follow [SECURITY.md](SECURITY.md).

## License and attribution

The repository is distributed under the existing [MIT License](LICENSE). The original `react-multi-date-picker` code is authored by Shahab Yazdi and contributors; this fork preserves that license and attribution. Power BI integration and project-specific additions are maintained in this fork. See [NOTICE.md](NOTICE.md) and [License & Attribution](docs/LICENSES.md).
