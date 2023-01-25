import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList
} from "@angular/core";
import { delay, Subscription } from "rxjs";
import { flatten } from "../../../../core/functions/array";
import { RequestPagination } from "../../../../core/interfaces/requests/request-pagination";
import { ResponseMeta } from "../../../../core/interfaces/responses/response";
import { TableService } from "../../services/table.service";
import { TableRowComponent } from "../table-row/table-row.component";

@Component({
    selector: "app-table",
    templateUrl: "./table.component.html",
    styleUrls: ["./table.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TableService]
})
export class TableComponent implements OnInit, OnDestroy, AfterContentInit {
    @Input()
    public set meta(value: ResponseMeta | undefined) {
        if (value === undefined) {
            return;
        }
        this.tableService.setMeta(value);
        this._meta = value;
    }
    public get meta(): ResponseMeta | undefined {
        return this._meta;
    }

    @Input() public loading = false;

    @Output() public readonly changeData$ = new EventEmitter<RequestPagination>();

    @ContentChildren(TableRowComponent)
    public rows!: QueryList<TableRowComponent>;

    public haveItems = false;

    private _meta: ResponseMeta;

    private readonly cdr: ChangeDetectorRef;
    private readonly tableService: TableService;
    private readonly subscriptions: Subscription[] = [];
    public constructor(cdr: ChangeDetectorRef, tableService: TableService) {
        this.cdr = cdr;
        this.tableService = tableService;
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.tableService.tableChange$.subscribe(() => {
                const sortValue = this.tableService.sort$.value;

                this.changeData$.next({
                    ...this.tableService.pagination$.value,
                    sort:
                        sortValue.sortBy && !!sortValue.sortType && sortValue.sortType !== "none"
                            ? {
                                  [sortValue.sortBy]: sortValue.sortType as string
                              }
                            : {}
                });
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public ngAfterContentInit(): void {
        if (this.rows?.length) {
            this.setRows();

            this.rows.changes.pipe(delay(0)).subscribe(() => {
                this.setRows();
            });
        }
    }

    private setRows(): void {
        this.haveItems = this.rows.some((row) => !row.header) ?? false;
        const headerWidths: string[] = flatten(
            this.rows
                .filter((row) => row.header)
                .map((row) => row.columns?.map((column) => column.width) ?? [])
        );

        const headerMinWidths: string[] = flatten(
            this.rows
                .filter((row) => row.header)
                .map((row) => row.columns?.map((column) => column.minWidth) ?? [])
        );

        this.rows.forEach((row) => row.setColumns(headerWidths, headerMinWidths));
        this.cdr.markForCheck();
    }
}
