import powerbi from "powerbi-visuals-api";
import { AdvancedFilter, FilterAction, IAdvancedFilter, IFilterColumnTarget } from "powerbi-models";
import { DatePickerDialog, DatePickerDialogResult } from "./DatePickerDialog";
import { gregorianIsoToPersian } from "./dateUtils";
import "../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import DialogAction = powerbi.DialogAction;
import VisualDialogPositionType = powerbi.VisualDialogPositionType;

const FILTER_OBJECT_NAME = "general";
const FILTER_PROPERTY_NAME = "filter";

export class Visual implements IVisual {
    private readonly host: IVisualHost;
    private readonly element: HTMLElement;
    private readonly pickerButton: HTMLButtonElement;
    private readonly pickerText: HTMLSpanElement;
    private readonly clearButton: HTMLButtonElement;
    private target: IFilterColumnTarget | null = null;
    private selectedStartIso: string | null = null;
    private isApplyingFilter = false;

    constructor(options: VisualConstructorOptions) {
        this.host = options.host;
        this.element = options.element;

        this.element.classList.add("pdp-visual");
        this.element.setAttribute("dir", "rtl");

        this.pickerButton = document.createElement("button");
        this.pickerButton.type = "button";
        this.pickerButton.className = "pdp-trigger";
        this.pickerButton.setAttribute("aria-label", "انتخاب تاریخ شمسی");
        this.pickerButton.addEventListener("click", () => this.openDatePicker());

        const icon = document.createElement("span");
        icon.className = "pdp-calendar-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.innerHTML =
            '<svg viewBox="0 0 24 24" width="18" height="18" focusable="false"><path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm12 8H5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9ZM6 6a1 1 0 0 0-1 1v1h14V7a1 1 0 0 0-1-1H6Z" fill="currentColor"/></svg>';

        this.pickerText = document.createElement("span");
        this.pickerText.className = "pdp-trigger-text";

        this.clearButton = document.createElement("button");
        this.clearButton.type = "button";
        this.clearButton.className = "pdp-clear";
        this.clearButton.textContent = "×";
        this.clearButton.title = "پاک کردن تاریخ";
        this.clearButton.setAttribute("aria-label", "پاک کردن تاریخ");
        this.clearButton.addEventListener("click", (event) => {
            event.stopPropagation();
            this.clearFilter();
        });

        this.pickerButton.append(icon, this.pickerText);
        this.element.append(this.pickerButton, this.clearButton);
        this.render();
    }

    public update(options: VisualUpdateOptions): void {
        const category = options.dataViews?.[0]?.categorical?.categories?.[0];
        this.target = category ? this.createFilterTarget(category) : null;

        if (!this.isApplyingFilter) {
            this.selectedStartIso = this.restoreStartIsoFromFilters(options.jsonFilters);
        }

        this.isApplyingFilter = false;
        this.render();
    }

    private render(): void {
        const hasTarget = this.target !== null;
        const persianValue = gregorianIsoToPersian(this.selectedStartIso);

        this.pickerButton.disabled = !hasTarget;
        this.pickerText.textContent = !hasTarget
            ? "ابتدا فیلد تاریخ را انتخاب کنید"
            : persianValue
              ? persianValue.format("YYYY/MM/DD")
              : "انتخاب تاریخ";

        this.clearButton.hidden = !hasTarget || !this.selectedStartIso;
    }

    private openDatePicker(): void {
        if (!this.target) {
            return;
        }

        if (!this.host.hostCapabilities?.allowModalDialog) {
            this.host.displayWarningIcon?.(
                "تقویم شمسی در این محیط قابل باز شدن نیست.",
                "Power BI Modal Dialog در این محیط پشتیبانی نمی‌شود. این محدودیت معمولاً در Embedded، Publish to web یا Dashboard وجود دارد.",
            );
            return;
        }

        const dialogOptions = {
            title: "انتخاب تاریخ شمسی",
            size: { width: 360, height: 430 },
            position: {
                type: VisualDialogPositionType.RelativeToVisual,
                left: 0,
                top: 48,
            },
            actionButtons: [DialogAction.OK, DialogAction.Cancel],
        };

        void this.host
            .openModalDialog(
                DatePickerDialog.id,
                dialogOptions,
                { selectedStartIso: this.selectedStartIso },
            )
            .then((result) => {
                if (result.actionId !== DialogAction.OK || !result.resultState) {
                    return;
                }

                this.applyDialogResult(result.resultState as DatePickerDialogResult);
            })
            .catch(() => {
                this.host.displayWarningIcon?.(
                    "باز کردن تقویم ناموفق بود.",
                    "پنجره انتخاب تاریخ توسط Power BI باز نشد. صفحه را تازه‌سازی کنید و مطمئن شوید Dialogهای Custom Visual مسدود نشده‌اند.",
                );
            });
    }

    private applyDialogResult(result: DatePickerDialogResult): void {
        if (!this.target) {
            return;
        }

        const filter: IAdvancedFilter = new AdvancedFilter(
            this.target,
            "And",
            {
                operator: "GreaterThanOrEqual",
                value: result.startInclusiveIso,
            },
            {
                operator: "LessThan",
                value: result.endExclusiveIso,
            },
        );

        this.selectedStartIso = result.startInclusiveIso;
        this.isApplyingFilter = true;

        this.host.applyJsonFilter(
            filter,
            FILTER_OBJECT_NAME,
            FILTER_PROPERTY_NAME,
            FilterAction.merge,
        );

        this.render();
    }

    private clearFilter(): void {
        this.selectedStartIso = null;
        this.isApplyingFilter = true;

        this.host.applyJsonFilter(
            null,
            FILTER_OBJECT_NAME,
            FILTER_PROPERTY_NAME,
            FilterAction.remove,
        );

        this.render();
    }

    private restoreStartIsoFromFilters(filters: powerbi.IFilter[] | undefined): string | null {
        const advanced = filters?.find((filter) =>
            Array.isArray((filter as IAdvancedFilter).conditions),
        ) as IAdvancedFilter | undefined;

        const firstCondition = advanced?.conditions?.[0];
        return firstCondition && typeof firstCondition.value === "string"
            ? firstCondition.value
            : null;
    }

    private createFilterTarget(category: DataViewCategoryColumn): IFilterColumnTarget | null {
        const queryName = category.source.queryName;
        if (!queryName) {
            return null;
        }

        let table = "";
        let column = "";

        if (queryName.startsWith("'")) {
            const separator = queryName.indexOf("'.");
            if (separator > 1) {
                table = queryName.slice(1, separator);
                column = queryName.slice(separator + 2);
            }
        }

        if (!table) {
            const dotIndex = queryName.indexOf(".");
            if (dotIndex > 0) {
                table = queryName.slice(0, dotIndex);
                column = queryName.slice(dotIndex + 1);
            }
        }

        if (!table) {
            const bracketIndex = queryName.indexOf("[");
            if (bracketIndex > 0 && queryName.endsWith("]")) {
                table = queryName.slice(0, bracketIndex);
                column = queryName.slice(bracketIndex + 1, -1);
            }
        }

        table = table.replace(/^'|'$/g, "").trim();
        column = column.replace(/^\[|\]$/g, "").replace(/^'|'$/g, "").trim();

        if (!table || !column) {
            return null;
        }

        return { table, column };
    }
}
