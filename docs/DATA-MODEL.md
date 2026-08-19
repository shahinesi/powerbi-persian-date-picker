# Data Model & Date Preparation Guide

## Core rule

Persian Date Picker binds to a **real Power BI model column typed as `Date` or `DateTime`**.

The Jalali calendar is an input/presentation layer. The analytical date in the model remains Gregorian.

```text
Jalali user selection
        ↓
Gregorian day boundaries
        ↓
Power BI filter
        ↓
real Date / DateTime column
```

## Supported field examples

```text
DimDate[Date]          : Date
Sales[SaleDate]        : Date
Orders[CreatedAt]      : DateTime
Payments[PaidAt]       : DateTime
```

## Values that are not directly supported

```text
"1405/05/28"     Text
"2026-08-19"     Text
20260819          Whole Number
```

Those values need data preparation first.

## Recommended model: star schema

For non-trivial reports, bind the visual to the date dimension whenever that dimension is the intended filter axis.

```text
                    DimDate
                   [Date]
                      │
          ┌───────────┼────────────┐
          │           │            │
          ▼           ▼            ▼
        Sales       Orders      Payments
```

Advantages:

- one consistent date filter for multiple facts;
- cleaner relationships;
- predictable filter propagation;
- better alignment with standard Power BI time modeling;
- no need for duplicate Jalali filter columns.

## Scenario A — source already contains Date/DateTime

No conversion is required.

Example source/model:

```text
OrderDate = 2026-08-19 13:22:10
Data Type = Date/Time
```

Bind that column directly, or bind the associated `DimDate[Date]` if using a date dimension.

## Scenario B — Gregorian date is stored as text

Example:

```text
"2026-08-19"
```

Use Power Query to convert the column to a real Date/DateTime type:

1. **Transform data**.
2. Select the column.
3. Choose **Data Type → Date** or **Date/Time**.
4. Validate conversion errors and locale.
5. **Close & Apply**.

Avoid leaving analytical dates as Text purely for display formatting.

## Scenario C — source contains only Jalali text

Example:

```text
"1405/05/28"
```

The custom visual is not an ETL converter, so this text column should not be bound directly.

Recommended options in priority order:

1. source application/database exposes a Gregorian date key/date column;
2. data warehouse/ETL converts Jalali to Gregorian during ingestion;
3. Power Query creates a Gregorian Date column using a validated organization-standard conversion function;
4. model uses that Gregorian Date column for relationships and filtering.

Target result:

```text
SourceJalaliText     GregorianDate
1405/05/28           2026-08-19
1405/05/29           2026-08-20
```

Then bind:

```text
GregorianDate → Persian Date Picker
```

### Why the repository does not silently parse Jalali Text model columns

Allowing arbitrary Text fields would blur two different responsibilities:

- **data preparation**: making model data correctly typed;
- **visual interaction**: allowing a user to choose a Jalali date.

Keeping those responsibilities separate avoids ambiguous parsing, locale problems, invalid date strings, relationship problems, and poor model semantics.

## DateTime behavior

For a selected Gregorian day `2026-08-19`, the visual filters:

```text
>= 2026-08-19T00:00:00.000Z
<  2026-08-20T00:00:00.000Z
```

This includes all timestamps throughout the selected day.

Example:

```text
2026-08-19 00:00:00  ✓
2026-08-19 09:15:32  ✓
2026-08-19 23:59:59  ✓
2026-08-20 00:00:00  ✗
```

## Multiple date columns

If a table contains several date concepts:

```text
Orders[CreatedAt]
Orders[PaidAt]
Orders[DeliveredAt]
```

choose the column corresponding to the business question. A single picker cannot infer which business event you intend to filter.

For advanced models, separate role-playing date dimensions or deliberate relationship patterns may be appropriate.

## Date dimension checklist

A production date dimension commonly has:

- a unique `Date` row per day;
- no missing days for the model range;
- a real Date data type;
- correct relationship direction/cardinality;
- business/calendar attributes as needed.

Optional Jalali display attributes can exist for tables and labels, but they are not required by this visual.

## RLS

The picker is not a security boundary. RLS remains defined in the Power BI model. The picker only narrows the data already visible to the user.

## DirectQuery

The visual itself does not fetch source data. It applies a Power BI filter. In DirectQuery models, the filter may generate source queries according to Power BI's normal query plan. Index/date-column design and source performance still matter.

## Validation checklist

Before blaming the visual, verify:

- [ ] field Data Type is Date or DateTime;
- [ ] relationship path is active and correct;
- [ ] visual interactions are enabled where expected;
- [ ] no contradictory page/report filters exist;
- [ ] source/Power Query conversion produced correct Gregorian dates;
- [ ] the same date works when filtered using native Power BI filter controls.
