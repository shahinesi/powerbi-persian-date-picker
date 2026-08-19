import powerbi from "powerbi-visuals-api";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { gregorianIsoToPersian, persianSelectionToGregorianDay } from "./dateUtils";

import DialogConstructorOptions = powerbi.extensibility.visual.DialogConstructorOptions;
import IDialogHost = powerbi.extensibility.visual.IDialogHost;

export interface DatePickerDialogInitialState {
    selectedStartIso?: string | null;
}

export interface DatePickerDialogResult {
    startInclusiveIso: string;
    endExclusiveIso: string;
    gregorianDate: string;
    persianDate: string;
}

export class DatePickerDialog {
    public static readonly id = "PersianDatePickerDialog";

    private readonly host: IDialogHost;

    constructor(options: DialogConstructorOptions, initialState: DatePickerDialogInitialState) {
        this.host = options.host;

        const initialValue =
            gregorianIsoToPersian(initialState?.selectedStartIso) ??
            new DateObject({ calendar: persian });

        createRoot(options.element).render(
            <div className="pdp-dialog" dir="rtl">
                <Calendar
                    value={initialValue}
                    onChange={(value: DateObject | null) => this.handleChange(value)}
                    calendar={persian}
                    locale={persianFa}
                    format="YYYY/MM/DD"
                    shadow={false}
                    highlightToday
                />
                <div className="pdp-dialog-hint">
                    تاریخ را انتخاب کنید و سپس «تأیید» را بزنید.
                </div>
            </div>,
        );

        this.handleChange(initialValue);
    }

    private handleChange(value: DateObject | null): void {
        if (!value) {
            return;
        }

        const range = persianSelectionToGregorianDay(value);
        this.host.setResult({
            startInclusiveIso: range.startInclusiveIso,
            endExclusiveIso: range.endExclusiveIso,
            gregorianDate: range.dateOnly,
            persianDate: value.format("YYYY/MM/DD"),
        } satisfies DatePickerDialogResult);
    }
}

declare global {
    var dialogRegistry: Record<string, unknown> | undefined;
}

globalThis.dialogRegistry = globalThis.dialogRegistry ?? {};
globalThis.dialogRegistry[DatePickerDialog.id] = DatePickerDialog;
