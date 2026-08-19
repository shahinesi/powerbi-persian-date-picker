import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";

export interface GregorianDayRange {
    startInclusiveIso: string;
    endExclusiveIso: string;
    dateOnly: string;
}

export function persianSelectionToGregorianDay(value: DateObject): GregorianDayRange {
    const clone = new DateObject(value);
    clone.convert(gregorian);

    const year = clone.year;
    const month = clone.month.number;
    const day = clone.day;

    const start = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const end = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0, 0));

    return {
        startInclusiveIso: start.toISOString(),
        endExclusiveIso: end.toISOString(),
        dateOnly: `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    };
}

export function gregorianIsoToPersian(iso: string | null | undefined): DateObject | null {
    if (!iso) {
        return null;
    }

    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
        return null;
    }

    const value = new DateObject({
        calendar: gregorian,
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
    });

    value.convert(persian);
    return value;
}
