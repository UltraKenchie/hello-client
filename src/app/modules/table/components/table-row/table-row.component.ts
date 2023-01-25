import {
    AfterContentChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    HostBinding,
    Input,
    QueryList
} from "@angular/core";
import { TableColumnComponent } from "../table-column/table-column.component";

@Component({
    selector: "app-table-row",
    templateUrl: "./table-row.component.html",
    styleUrls: ["./table-row.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent implements AfterContentChecked {
    @HostBinding("class.header")
    @Input()
    public header = false;

    @ContentChildren(TableColumnComponent)
    public columns?: QueryList<TableColumnComponent>;

    private readonly cdr: ChangeDetectorRef;
    public constructor(cdr: ChangeDetectorRef) {
        this.cdr = cdr;
    }

    public ngAfterContentChecked(): void {
        this.setColumns();
    }

    public setColumns(columnWidths?: string[], columnMinWidths?: string[]): void {
        this.columns?.forEach((col, index) => {
            col.setHeader(this.header);
            col.setWidth(
                col.width || columnWidths?.[index],
                col.minWidth || columnMinWidths?.[index]
            );
        });
        this.cdr.detectChanges();
    }
}
