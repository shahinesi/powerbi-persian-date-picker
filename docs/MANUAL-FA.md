# راهنمای کامل فارسی — Persian Date Picker for Power BI

این سند برای کسی نوشته شده که حتی اگر تا امروز هیچ Custom Visualای در Power BI نصب نکرده باشد، بتواند از صفر Visual را نصب کند، داده‌اش را درست آماده کند، ستون مناسب را به Date Picker بدهد، نتیجه را تست کند و خطاهای رایج را رفع کند.

---

## فهرست

1. این Visual دقیقاً چه کاری می‌کند؟
2. چه کاری نمی‌کند؟
3. قبل از نصب چه چیزی لازم است؟
4. دانلود و نصب قدم‌به‌قدم
5. اضافه‌کردن Visual به صفحه
6. انتخاب ستون تاریخ درست
7. اتصال Field به Visual
8. اولین تست
9. تبدیل شمسی به میلادی دقیقاً کجا اتفاق می‌افتد؟
10. Date و DateTime چه فرقی دارند؟
11. چرا فیلتر تا شروع روز بعد اعمال می‌شود؟
12. اگر دیتای من Text باشد چه کنم؟
13. اگر دیتای من فقط شمسی باشد چه کنم؟
14. مدل ستاره‌ای و DimDate
15. سناریوی فروش
16. سناریوی سفارش
17. سناریوی چند جدول
18. تعامل با سایر Visualها
19. Bookmark و Filter State
20. Clear filter
21. Power BI Service
22. DirectQuery و Import
23. RLS
24. محدودیت‌های Modal Dialog
25. عیب‌یابی
26. چک‌لیست تحویل به کاربر نهایی
27. سوالات رایج

---

## 1) این Visual دقیقاً چه کاری می‌کند؟

فرض کنید در دیتای شما ستون زیر وجود دارد:

```text
Sales[SaleDate]
```

و مقدار واقعی یکی از رکوردها این است:

```text
2026-08-19
```

کاربر فارسی‌زبان نمی‌خواهد `2026-08-19` را از تقویم Gregorian انتخاب کند. او می‌خواهد در UI ببیند:

```text
۱۴۰۵/۰۵/۲۸
```

Visual انتخاب شمسی را می‌گیرد، آن را به روز Gregorian متناظر تبدیل می‌کند و یک Filter واقعی Power BI روی `Sales[SaleDate]` اعمال می‌کند.

```text
۱۴۰۵/۰۵/۲۸
      ↓
2026-08-19
      ↓
Sales[SaleDate] filtered by Power BI
```

پس این پروژه **یک لایه‌ی ورودی شمسی برای فیلتر تاریخ واقعی Power BI** است.

---

## 2) این Visual چه کاری نمی‌کند؟

این موارد را با هم قاطی نکنید:

### کاری که Visual انجام می‌دهد

- نمایش Calendar شمسی.
- گرفتن انتخاب کاربر.
- تبدیل همان انتخاب به Gregorian.
- اعمال Filter روی ستون مدل.

### کاری که Visual انجام نمی‌دهد

- تبدیل همه‌ی داده‌های دیتاست از شمسی به میلادی.
- تغییر Data Type ستون‌های Power BI.
- ساخت Calendar Table برای مدل شما.
- جایگزین ETL یا Power Query.
- اصلاح Relationshipهای اشتباه مدل.

اگر در مدل فقط یک Text مثل `1405/05/28` دارید، قبل از استفاده از Visual باید آن را به یک ستون واقعی Gregorian `Date`/`DateTime` تبدیل کنید.

---

## 3) قبل از نصب چه چیزی لازم است؟

حداقل نیاز:

- Power BI Desktop.
- فایل `PersianDatePicker.pbiviz`.
- حداقل یک ستون واقعی `Date` یا `DateTime` در مدل.

بهترین حالت مدل:

```text
DimDate[Date]   (Date)
```

یا در مدل ساده:

```text
Sales[SaleDate]   (Date/Time)
```

### چطور Data Type را چک کنم؟

در Power BI:

1. Data view یا Model view را باز کنید.
2. ستون تاریخ را انتخاب کنید.
3. از Column tools / Data type نوع آن را ببینید.
4. باید `Date` یا `Date/Time` باشد.

اگر `Text`، `Whole number` یا نوع دیگری است، ابتدا Data Preparation را انجام دهید.

---

## 4) دانلود و نصب قدم‌به‌قدم

### قدم 1 — دانلود

فایل آماده:

https://raw.githubusercontent.com/shahinesi/powerbi-persian-date-picker/main/release/PersianDatePicker.pbiviz

نام فایل:

```text
PersianDatePicker.pbiviz
```

### قدم 2 — Power BI Desktop را باز کنید

گزارش موردنظر را باز کنید یا یک فایل جدید بسازید.

### قدم 3 — Import Visual

در پنل Visualizations:

```text
...
→ Import a visual from a file
```

فایل `PersianDatePicker.pbiviz` را انتخاب کنید.

Power BI ممکن است درباره Custom Visual اخطار استاندارد نشان دهد. فایل این پروژه از release همین repository ساخته می‌شود و CI آن را package می‌کند.

### قدم 4 — Visual را به Canvas اضافه کنید

بعد از Import، آیکن Visual به Visualizations اضافه می‌شود. روی آن کلیک کنید تا روی صفحه قرار گیرد.

---

## 5) اضافه‌کردن Visual به صفحه

Visual در ابتدا چون هیچ فیلدی ندارد، از شما می‌خواهد ستون تاریخ را اختصاص دهید.

مراحل:

1. Visual را انتخاب کنید.
2. از Fields/Data ستون موردنظر را پیدا کنید.
3. ستون را داخل Field مربوط به Date بکشید.

مثال:

```text
Orders[OrderDate]
        ↓
Persian Date Picker / Date
```

---

## 6) انتخاب ستون تاریخ درست

### حالت A — مدل ساده

اگر فقط یک Fact Table دارید:

```text
Sales
 ├─ SaleId
 ├─ CustomerId
 ├─ Amount
 └─ SaleDate  ← انتخاب خوب
```

می‌توانید `Sales[SaleDate]` را بدهید.

### حالت B — مدل حرفه‌ای ستاره‌ای

اگر `DimDate` دارید:

```text
             DimDate
             [Date]
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
     Sales   Orders   Payments
```

بهتر است:

```text
DimDate[Date]
```

را به Date Picker بدهید تا Relationshipهای مدل فیلتر را به Fact Tableها منتقل کنند.

### حالت C — چند ستون تاریخ در یک Fact

مثلاً:

```text
Orders[CreatedAt]
Orders[PaidAt]
Orders[DeliveredAt]
```

باید مشخص کنید Date Picker قرار است کدام مفهوم را فیلتر کند. Visual خودش نمی‌تواند حدس بزند منظور «تاریخ سفارش»، «تاریخ پرداخت» یا «تاریخ تحویل» است.

---

## 7) اتصال Field به Visual

Visual فقط یک ستون Date/DateTime را نیاز دارد.

اگر ستون معتبر باشد:

- Date Picker فعال می‌شود.
- کاربر می‌تواند روی آن کلیک کند.

اگر ستون نامعتبر باشد:

- Visual پیام می‌دهد فیلد باید Date یا DateTime باشد.

این validation عمداً وجود دارد تا یک Text به‌اشتباه به‌عنوان تاریخ استفاده نشود.

---

## 8) اولین تست

برای یک تست قابل فهم:

1. یک Table Visual کنار Date Picker بسازید.
2. داخل Table، ستون Date و یک شناسه مثل OrderId را قرار دهید.
3. Date Picker را به همان تاریخ یا DimDate مرتبط وصل کنید.
4. یک تاریخ شمسی انتخاب کنید.
5. بررسی کنید Table فقط رکوردهای همان روز را نشان دهد.

مثال انتخاب:

```text
۱۴۰۵/۰۵/۲۸
```

روز متناظر:

```text
2026-08-19
```

---

## 9) تبدیل شمسی به میلادی دقیقاً کجا اتفاق می‌افتد؟

جریان داخلی:

```text
Click Date Picker
     ↓
Jalali calendar opens
     ↓
User chooses 1405/05/28
     ↓
DateObject converts selection
     ↓
Gregorian date = 2026-08-19
     ↓
start = 2026-08-19T00:00:00.000Z
end   = 2026-08-20T00:00:00.000Z
     ↓
Power BI AdvancedFilter
```

تبدیل روی **انتخاب** انجام می‌شود، نه روی تک‌تک ردیف‌های دیتاست.

به همین دلیل Visual لازم نیست میلیون‌ها رکورد را تبدیل کند.

---

## 10) Date و DateTime چه فرقی دارند؟

### Date

```text
2026-08-19
```

### DateTime

```text
2026-08-19 00:05:20
2026-08-19 11:40:00
2026-08-19 23:59:59
```

اگر فقط شرط زیر را اعمال کنیم:

```text
DateTime = 2026-08-19 00:00:00
```

رکورد ساعت 11:40 حذف می‌شود.

برای همین Visual از بازه استفاده می‌کند.

---

## 11) چرا فیلتر تا شروع روز بعد اعمال می‌شود؟

برای روز `2026-08-19`:

```text
>= 2026-08-19T00:00:00.000Z
<  2026-08-20T00:00:00.000Z
```

این الگو تمام timestampهای روز را می‌گیرد و مشکل `23:59:59.999...` را ندارد.

این همان مفهوم half-open interval است:

```text
[start, next-day)
```

---

## 12) اگر دیتای من Text باشد چه کنم؟

مثال:

```text
"2026-08-19"
```

اگر Power BI آن را Text تشخیص داده:

1. وارد **Transform data** شوید.
2. ستون را انتخاب کنید.
3. Data Type را به `Date` یا `Date/Time` تبدیل کنید.
4. خطاهای conversion را بررسی کنید.
5. Close & Apply.
6. ستون جدید را به Date Picker بدهید.

بهتر است تبدیل در Power Query یا Source انجام شود تا مدل Data Type صحیح داشته باشد.

---

## 13) اگر دیتای من فقط تاریخ شمسی باشد چه کنم؟

مثال Source:

```text
1405/05/28
```

و هیچ تاریخ Gregorian واقعی ندارید.

Date Picker این ستون Text را مستقیم مصرف نمی‌کند. شما به یک مرحله Data Preparation نیاز دارید:

```text
Jalali text/source value
        ↓
ETL / Source / Power Query conversion
        ↓
Gregorian Date column
        ↓
Power BI model
        ↓
Persian Date Picker
```

### پیشنهاد ترتیب انتخاب راهکار

1. **بهترین:** Source System یا Database یک Gregorian Date واقعی ارائه دهد.
2. **بعدی:** ETL/Data Warehouse هنگام ingest ستون Gregorian تولید کند.
3. **بعدی:** Power Query یک ستون Gregorian تولید کند.
4. از نگهداری تنها Text شمسی به‌عنوان تاریخ تحلیلی اصلی خودداری کنید.

چرا؟ چون Relationship، sort، time intelligence و filter semantics با Date واقعی بسیار مطمئن‌تر هستند.

جزئیات بیشتر: [DATA-MODEL.md](DATA-MODEL.md)

---

## 14) مدل ستاره‌ای و DimDate

برای گزارش‌های جدی، ساختار توصیه‌شده:

```text
                 DimDate
        ┌─────────────────────┐
        │ Date                │
        │ Year                │
        │ Month               │
        │ ...                 │
        └──────────┬──────────┘
                   │
          1        │        *
                   ▼
             FactSales
```

Date Picker را به:

```text
DimDate[Date]
```

وصل کنید.

Visual نیاز ندارد ستون شمسی داخل DimDate داشته باشید، هرچند برای Label/Table می‌توانید ستون‌های شمسی کمکی داشته باشید.

---

## 15) سناریوی فروش

مدل:

```text
Sales[SaleDate]
Sales[Amount]
```

کاربر `۱۴۰۵/۰۵/۲۸` را انتخاب می‌کند.

Power BI تمام فروش‌های `2026-08-19` را فیلتر می‌کند.

کارت فروش، Table مشتریان و Chartهایی که Interaction فعال دارند، باید Filter Context مربوطه را دریافت کنند.

---

## 16) سناریوی سفارش

اگر سفارش‌ها Timestamp دارند:

```text
OrderId   OrderDate
1001      2026-08-19 01:12:00
1002      2026-08-19 14:40:00
1003      2026-08-20 00:02:00
```

انتخاب `۱۴۰۵/۰۵/۲۸` باید 1001 و 1002 را نگه دارد و 1003 را حذف کند.

همین رفتار یکی از دلایل استفاده از `[start, next-day)` است.

---

## 17) سناریوی چند جدول

اگر Date Picker به `DimDate[Date]` وصل باشد و Relationshipها فعال باشند:

```text
DimDate[Date]
   ├─→ Sales
   ├─→ Payments
   └─→ Orders
```

یک انتخاب می‌تواند تمام Visualهای وابسته به همان Filter Context را هماهنگ کند.

اگر یک جدول فیلتر نمی‌شود، ابتدا Relationship و Edit interactions را بررسی کنید؛ مشکل لزوماً Date Picker نیست.

---

## 18) تعامل با سایر Visualها

اگر یک Chart با انتخاب تاریخ تغییر نمی‌کند:

- Relationship مدل را بررسی کنید.
- بررسی کنید Chart از همان مدل/مسیر فیلتر استفاده کند.
- در Power BI از **Edit interactions** مطمئن شوید تعامل غیرفعال نشده باشد.
- Filter Pane را بررسی کنید تا Filter متناقض دیگری وجود نداشته باشد.

---

## 19) Bookmark و Filter State

Visual انتخاب را فقط در یک state داخلی جدا نگه نمی‌دارد؛ هنگام update، فیلتر Power BI را بررسی می‌کند تا UI با Filter State هماهنگ باشد.

این موضوع برای Bookmark مهم است.

تست پیشنهادی:

1. یک تاریخ انتخاب کنید.
2. Bookmark بسازید.
3. تاریخ دیگری انتخاب کنید.
4. Bookmark اول را Restore کنید.
5. بررسی کنید هم گزارش و هم مقدار نمایش‌داده‌شده در Date Picker به وضعیت Bookmark برگردد.

---

## 20) Clear filter

بعد از انتخاب تاریخ، Clear را بزنید.

انتظار:

- فیلتر Date Picker حذف شود.
- انتخاب UI پاک شود.
- Visualهای گزارش به حالت بدون آن فیلتر برگردند، مگر فیلترهای دیگری فعال باشند.

---

## 21) Power BI Service

بعد از Publish گزارش به Service، Custom Visual همراه گزارش بسته‌بندی می‌شود. بااین‌حال Tenant policyهای سازمان ممکن است Custom Visualها یا برخی قابلیت‌ها را محدود کنند.

اگر در Desktop کار می‌کند ولی در Service نه:

- Tenant settings را بررسی کنید.
- سیاست Custom Visual سازمان را بررسی کنید.
- Browser console/Power BI warning را بررسی کنید.
- محدودیت Modal Dialog را در محیط موردنظر بررسی کنید.

---

## 22) DirectQuery و Import

Visual روی Filter API کار می‌کند و خودش دیتاست را fetch یا cache نمی‌کند.

در DirectQuery، انتخاب تاریخ می‌تواند باعث Query جدید مطابق مدل و Filter Context شود. Performance اصلی به Data Model، Source، indexها و Query Folding بستگی دارد.

در Import، فیلتر روی مدل Import شده اعمال می‌شود.

---

## 23) RLS

Date Picker امنیت RLS را دور نمی‌زند. فیلتر انتخابی کاربر در محدوده داده‌ای اعمال می‌شود که Power BI طبق RLS در اختیار او قرار می‌دهد.

Date Picker نباید به‌عنوان Security Boundary در نظر گرفته شود؛ Security باید در Model/RLS تعریف شود.

---

## 24) محدودیت‌های Modal Dialog

تقویم در Modal Dialog رسمی Power BI باز می‌شود تا popup داخل viewport کوچک Visual بریده نشود.

برخی محیط‌ها ممکن است Modal Dialog Custom Visual را پشتیبانی نکنند یا محدود کنند. Visual در صورت نبود capability مربوطه باید Warning نشان دهد.

اگر Calendar باز نمی‌شود:

1. Power BI Desktop را به‌روز کنید.
2. Visual را در Report canvas معمولی تست کنید.
3. محیط Embedded/Publish-to-web/Dashboard خود را از نظر capability بررسی کنید.
4. Warning نمایش‌داده‌شده توسط Visual را بخوانید.

---

## 25) عیب‌یابی سریع

### Date Picker غیرفعال است

احتمالاً هیچ Field معتبر اختصاص نداده‌اید.

### پیام «فیلد باید Date یا DateTime باشد»

ستون Text/Number است. Data Type را اصلاح کنید.

### تاریخ انتخاب می‌شود ولی Chart تغییر نمی‌کند

Relationship، Edit interactions و Filter Context را بررسی کنید.

### فقط رکوردهای ساعت 00:00 نمایش داده می‌شوند

اگر از نسخه رسمی فعلی استفاده می‌کنید نباید چنین باشد؛ Visual از بازه روز کامل استفاده می‌کند. نسخه فایل `.pbiviz` را از release فعلی دوباره نصب کنید.

### Calendar باز نمی‌شود

Modal Dialog capability یا محیط اجرا را بررسی کنید.

### انتخاب Bookmark درست Restore نمی‌شود

اطمینان حاصل کنید Bookmark شامل Data state است و Filterهای دیگر روی همان ستون با انتخاب موردنظر تضاد ندارند.

---

## 26) چک‌لیست تحویل به کاربر نهایی

قبل از تحویل گزارش:

- [ ] Visual از release رسمی repository نصب شده.
- [ ] Field از نوع Date/DateTime است.
- [ ] انتخاب یک تاریخ شمسی با جدول تست تطبیق داده شده.
- [ ] رکوردهای دارای ساعت تست شده‌اند.
- [ ] Clear filter تست شده.
- [ ] Bookmark تست شده، اگر گزارش Bookmark دارد.
- [ ] Edit interactions بررسی شده.
- [ ] Power BI Service تست شده، اگر گزارش Publish می‌شود.
- [ ] RLS با یک User Role واقعی تست شده، اگر RLS دارید.
- [ ] DirectQuery performance تست شده، اگر DirectQuery دارید.

---

## 27) سوالات رایج

### آیا خروجی Visual میلادی است؟

از دید مدل، بله: انتخاب کاربر به Gregorian day boundaries تبدیل و به‌عنوان Filter روی ستون Gregorian اعمال می‌شود. Visual یک «output column» جدید تولید نمی‌کند.

### آیا ستون شمسی لازم است؟

خیر.

### آیا Text شمسی را مستقیم می‌گیرد؟

خیر. Field باید Date/DateTime واقعی باشد.

### آیا چند تاریخ یا Range دارد؟

نسخه فعلی محصول روی Single Day متمرکز است. Range در Roadmap قابل توسعه است.

### آیا داده به اینترنت ارسال می‌شود؟

Visual privilege مربوط به Web/AAD/Storage درخواست نمی‌کند و تبدیل تاریخ داخل runtime انجام می‌شود.

### آیا upstream را تغییر داده‌اید؟

Power BI layer جدا نگه داشته شده تا upstream sync مدیریت‌پذیر بماند.

---

## ادامه مطالعه

- [Data Model Guide](DATA-MODEL.md)
- [Installation](INSTALLATION.md)
- [Usage](USAGE.md)
- [Architecture](ARCHITECTURE.md)
- [Design](DESIGN.md)
- [Troubleshooting](TROUBLESHOOTING.md)
- [FAQ](FAQ.md)
- [Website Manual](https://shahinesi.github.io/powerbi-persian-date-picker/docs.html)
