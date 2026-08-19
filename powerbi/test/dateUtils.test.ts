import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import {
    gregorianIsoToPersian,
    persianSelectionToGregorianDay,
} from "../src/dateUtils";

function assertEqual<T>(actual: T, expected: T, message: string): void {
    if (actual !== expected) {
        throw new Error(`${message}: expected ${String(expected)}, received ${String(actual)}`);
    }
}

const selected = new DateObject({
    calendar: persian,
    year: 1405,
    month: 5,
    day: 28,
});

const range = persianSelectionToGregorianDay(selected);

assertEqual(range.dateOnly, "2026-08-19", "Jalali to Gregorian date conversion");
assertEqual(
    range.startInclusiveIso,
    "2026-08-19T00:00:00.000Z",
    "Gregorian filter start boundary",
);
assertEqual(
    range.endExclusiveIso,
    "2026-08-20T00:00:00.000Z",
    "Gregorian filter exclusive end boundary",
);

const roundTrip = gregorianIsoToPersian(range.startInclusiveIso);
assertEqual(roundTrip?.format("YYYY/MM/DD"), "1405/05/28", "Gregorian to Jalali round trip");

const invalid = gregorianIsoToPersian("not-a-date");
assertEqual(invalid, null, "Invalid Gregorian input must fail closed");

console.log("dateUtils conversion tests passed");
