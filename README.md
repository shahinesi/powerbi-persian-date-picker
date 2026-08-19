<div align="center">

# Persian Date Picker for Power BI

**انتخاب تاریخ شمسی برای کاربر؛ فیلتر واقعی Gregorian روی مدل Power BI.**

[راهنمای سریع فارسی](#راهنمای-سریع-فارسی) · [راهنمای کامل فارسی](docs/MANUAL-FA.md) · [Installation](docs/INSTALLATION.md) · [Data Model](docs/DATA-MODEL.md) · [Architecture](docs/ARCHITECTURE.md) · [Download PBIVIZ](https://raw.githubusercontent.com/shahinesi/powerbi-persian-date-picker/master/release/PersianDatePicker.pbiviz) · [Website](https://shahinesi.github.io/powerbi-persian-date-picker/)

[![Power BI Visual](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/powerbi-visual.yml/badge.svg?branch=master)](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/powerbi-visual.yml)
[![CodeQL](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/codeql-analysis.yml)
[![Pages](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/pages.yml/badge.svg?branch=master)](https://github.com/shahinesi/powerbi-persian-date-picker/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

## چرا این پروژه ساخته شده؟

Power BI تاریخ را به‌صورت واقعی با نوع `Date` یا `DateTime` و بر مبنای تقویم Gregorian نگه می‌دارد. در مقابل، بسیاری از کاربران فارسی‌زبان انتظار دارند تاریخ را در UI به‌صورت شمسی/Jalali انتخاب کنند.

این Visual بین این دو نیاز پل می‌زند:

```text
کاربر: ۱۴۰۵/۰۵/۲۸ را انتخاب می‌کند
                 ↓
Date Picker شمسی
                 ↓
تبدیل انتخاب به روز Gregorian متناظر
                 ↓
2026-08-19T00:00:00.000Z
                 ↓
Power BI AdvancedFilter
                 ↓
فیلتر روی ستون واقعی Date / DateTime مدل
```

**نکته‌ی کلیدی:** این Visual داده‌های ذخیره‌شده‌ی مدل را از شمسی به میلادی تبدیل نمی‌کند. ستون مدل باید یک `Date` یا `DateTime` واقعی باشد. چیزی که تبدیل می‌شود **انتخاب شمسی کاربر** است تا روی همان ستون واقعی مدل فیلتر شود.

## ویژگی‌ها

- UI تقویم شمسی/Jalali با RTL و اعداد فارسی.
- اتصال مستقیم به ستون واقعی `Date` یا `DateTime` در Power BI.
- استفاده از `AdvancedFilter` خود Power BI؛ بدون فیلتر متنی یا workaround جعلی.
- فیلتر امن برای `DateTime` با بازه‌ی نیمه‌باز `[start, next-day)`.
- بازیابی انتخاب از Filter State و Bookmark.
- دکمه پاک‌کردن فیلتر.
- اعتبارسنجی نوع فیلد؛ فیلدهای Text/Number رد می‌شوند.
- استفاده از Power BI Modal Dialog برای جلوگیری از بریده‌شدن Calendar داخل Visual.
- بدون Web Access، Storage، AAD یا ارسال داده به سرویس خارجی.
- Build، TypeScript، Date conversion test، production audit، PBIVIZ packaging و CodeQL در CI.
- فایل آماده‌ی نصب در `release/PersianDatePicker.pbiviz`.

---

# راهنمای سریع فارسی

## ۱. چه دیتایی لازم دارم؟

Visual باید به **یک ستون واقعی تاریخ** وصل شود. این ستون می‌تواند مثلاً یکی از این‌ها باشد:

- `Orders[OrderDate]`
- `Sales[InvoiceDate]`
- `Customers[RegisterDate]`
- `Contracts[StartDate]`

و Data Type آن در Power BI باید یکی از این دو باشد:

```text
Date
Date/Time
```

اگر ستون شما Text است—even اگر مقدارش شبیه `2026-08-19` یا `1405/05/28` باشد—اول باید در Power Query / Data Source آن را به تاریخ واقعی تبدیل کنید. راهنمای این سناریو در [Data Model Guide](docs/DATA-MODEL.md) آمده است.

## ۲. نصب Visual

فایل آماده را دانلود کنید:

**[Download PersianDatePicker.pbiviz](https://raw.githubusercontent.com/shahinesi/powerbi-persian-date-picker/master/release/PersianDatePicker.pbiviz)**

سپس در Power BI Desktop:

1. گزارش را باز کنید.
2. در پنل **Visualizations** روی `...` بزنید.
3. **Import a visual from a file** را انتخاب کنید.
4. فایل `PersianDatePicker.pbiviz` را انتخاب کنید.
5. Visual جدید را به صفحه گزارش اضافه کنید.

## ۳. اتصال داده به Date Picker

بعد از اضافه‌شدن Visual:

1. Visual را انتخاب کنید.
2. از پنل Data/Fields، ستون تاریخ موردنظر را پیدا کنید.
3. ستون را Drag کنید و داخل Field مربوط به **Date** در Visual بیندازید.
4. اگر فیلد از نوع Date/DateTime باشد، Date Picker فعال می‌شود.
5. اگر فیلد Text یا نوع نامعتبر باشد، Visual پیام خطا نشان می‌دهد.

مثال:

```text
Sales[SaleDate]  →  Persian Date Picker / Date
```

## ۴. کاربر چطور استفاده می‌کند؟

کاربر روی Date Picker کلیک می‌کند و مثلاً این تاریخ را انتخاب می‌کند:

```text
۱۴۰۵/۰۵/۲۸
```

Visual آن روز را به Gregorian تبدیل می‌کند:

```text
2026-08-19
```

و برای اینکه تمام رکوردهای همان روز—even رکوردهایی که ساعت دارند—درست فیلتر شوند، فیلتر به این شکل اعمال می‌شود:

```text
DateColumn >= 2026-08-19T00:00:00.000Z
AND
DateColumn <  2026-08-20T00:00:00.000Z
```

به همین دلیل اگر داده‌ی شما `2026-08-19 18:42:15` باشد نیز داخل نتیجه قرار می‌گیرد.

## ۵. آیا باید ستون تاریخ شمسی در مدل بسازم؟

**خیر.** اگر مدل شما یک ستون Gregorian واقعی دارد، همان ستون کافی است.

پیشنهاد معماری:

```text
Database / Power Query / Model
        ↓
Gregorian Date / DateTime  ← حقیقت داده
        ↓
Persian Date Picker        ← فقط UI شمسی
        ↓
Native Power BI Filter
```

این روش باعث می‌شود Relationship، Time Intelligence، DirectQuery، Filter Context و سایر قابلیت‌های Power BI روی تاریخ واقعی باقی بمانند.

## ۶. اگر دیتای من فقط تاریخ شمسی Text دارد چه؟

مثلاً اگر منبع شما فقط این مقدار را دارد:

```text
1405/05/28
```

و Data Type ستون `Text` است، آن ستون مستقیماً قابل استفاده نیست. ابتدا باید در لایه‌ی ETL/Data Source/Power Query یک ستون Gregorian واقعی بسازید و Data Type آن را `Date` یا `DateTime` قرار دهید.

راهنمای انتخاب مسیر مناسب و مثال‌های آماده‌سازی داده در [docs/DATA-MODEL.md](docs/DATA-MODEL.md) آمده است.

## ۷. اگر چند جدول تاریخ دارند چه؟

Date Picker را به ستونی متصل کنید که در مدل شما باید Filter Context را هدایت کند. در مدل ستاره‌ای معمولاً بهترین انتخاب ستون تاریخ در `DimDate` است:

```text
DimDate[Date]
    │
    ├── Sales[SaleDate]
    ├── Orders[OrderDate]
    └── Payments[PaymentDate]
```

اگر Relationshipهای مدل درست باشند، فیلتر یک تاریخ از `DimDate[Date]` به Fact Tableهای مرتبط منتقل می‌شود.

## ۸. پاک‌کردن انتخاب

بعد از انتخاب تاریخ، کنترل Clear در Visual نمایش داده می‌شود. با Clear، فیلتر مربوط به همین Date Picker حذف می‌شود و انتخاب UI نیز پاک می‌شود.

## ۹. Bookmark و بازکردن مجدد گزارش

Visual فیلتر خودش را از Power BI Filter State می‌خواند. بنابراین در سناریوهای Bookmark/restore، انتخاب نمایش‌داده‌شده باید با فیلتر ذخیره‌شده هماهنگ بماند.

## ۱۰. راهنمای کامل

اگر اولین بار است Custom Visual نصب می‌کنید یا می‌خواهید تمام سناریوها را ببینید:

- **[راهنمای کامل فارسی از صفر تا صد](docs/MANUAL-FA.md)**
- **[راهنمای مدل داده](docs/DATA-MODEL.md)**
- **[Installation](docs/INSTALLATION.md)**
- **[Usage](docs/USAGE.md)**
- **[Troubleshooting](docs/TROUBLESHOOTING.md)**
- **[FAQ](docs/FAQ.md)**
- **[Website Documentation](https://shahinesi.github.io/powerbi-persian-date-picker/docs.html)**

---

## Installation — English

### Download ready-to-use PBIVIZ

**[PersianDatePicker.pbiviz](https://raw.githubusercontent.com/shahinesi/powerbi-persian-date-picker/master/release/PersianDatePicker.pbiviz)**

In Power BI Desktop:

1. Open the report.
2. In **Visualizations**, choose `...` → **Import a visual from a file**.
3. Select `PersianDatePicker.pbiviz`.
4. Add the visual to the canvas.
5. Bind exactly one real `Date` or `DateTime` model column.
6. Click the picker and choose a Jalali date.

### Build from source

```bash
git clone https://github.com/shahinesi/powerbi-persian-date-picker.git
cd powerbi-persian-date-picker/powerbi
npm install
npm run typecheck
npm test
npm run audit:prod
npm run package
```

The generated `.pbiviz` is written under `powerbi/dist/`.

## Data contract

Accepted model field types:

```text
Date
DateTime
```

Not accepted directly:

```text
Text: "1405/05/28"
Text: "2026-08-19"
Number: 20260819
```

For a selected Jalali day, the visual converts the selection to a Gregorian day and applies a half-open interval:

```text
column >= startOfSelectedGregorianDay
AND
column < startOfNextGregorianDay
```

See [Data Model Guide](docs/DATA-MODEL.md) for preparation patterns.

## Architecture

Power BI-specific code is isolated under `powerbi/`; upstream React date-picker source remains separated so upstream synchronization stays manageable.

```text
react-multi-date-picker source
           │
           ▼
Power BI DatePickerDialog
           │
           ▼
Jalali DateObject
           │ conversion
           ▼
Gregorian UTC day boundaries
           │
           ▼
IVisualHost.applyJsonFilter
           │
           ▼
Power BI model Date/DateTime column
```

Architecture details: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## Documentation

| Topic | Document |
|---|---|
| Complete Persian manual | [docs/MANUAL-FA.md](docs/MANUAL-FA.md) |
| Installation | [docs/INSTALLATION.md](docs/INSTALLATION.md) |
| Data preparation/modeling | [docs/DATA-MODEL.md](docs/DATA-MODEL.md) |
| Usage | [docs/USAGE.md](docs/USAGE.md) |
| Architecture | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Design | [docs/DESIGN.md](docs/DESIGN.md) |
| Development | [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) |
| Testing | [docs/TESTING.md](docs/TESTING.md) |
| Compatibility | [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md) |
| Troubleshooting | [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) |
| Threat model | [docs/THREAT-MODEL.md](docs/THREAT-MODEL.md) |
| Accessibility | [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) |
| Quality gates | [docs/QUALITY-GATES.md](docs/QUALITY-GATES.md) |
| Release process | [docs/RELEASING.md](docs/RELEASING.md) |
| Upstream synchronization | [docs/UPSTREAM.md](docs/UPSTREAM.md) |
| ADRs | [docs/adr/](docs/adr/) |

## Security and privacy

The visual requests no Power BI web, AAD, storage, export, or external-service privileges. Date conversion is performed inside the visual runtime; the selected date is used to construct a Power BI filter.

See [SECURITY.md](SECURITY.md) and [docs/THREAT-MODEL.md](docs/THREAT-MODEL.md).

## Quality gates

The CI pipeline validates:

```text
TypeScript typecheck
→ date conversion tests
→ production dependency audit
→ PBIVIZ package validation
→ CodeQL
→ artifact publication
```

The downloadable file under `release/` is produced by the repository pipeline.

## Branch strategy

The intended long-term repository structure is deliberately minimal:

```text
master         → product branch / default branch
upstream-sync  → clean tracking branch for shahabyazdi/react-multi-date-picker
```

Do not use GitHub's **Sync fork** blindly against `master`. Update `upstream-sync` first, review upstream changes, then integrate deliberately into `master`.

See [docs/UPSTREAM.md](docs/UPSTREAM.md).

## Upstream and attribution

This repository is a fork of [`shahabyazdi/react-multi-date-picker`](https://github.com/shahabyazdi/react-multi-date-picker). The upstream source remains under its MIT license and original attribution. Fork-specific Power BI integration, documentation and automation are maintained separately.

See [NOTICE.md](NOTICE.md), [LICENSE](LICENSE), and [docs/LICENSES.md](docs/LICENSES.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Architectural changes should add or update an ADR under `docs/adr/`.

## Status

Current product scope: **single Jalali day selection → native Gregorian Date/DateTime filtering in Power BI**.

Potential future features such as range mode, format-pane customization, AppSource certification, organizational deployment guidance and additional accessibility work are tracked in [docs/ROADMAP.md](docs/ROADMAP.md).