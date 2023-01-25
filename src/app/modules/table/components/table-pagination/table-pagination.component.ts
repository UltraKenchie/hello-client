import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from "@angular/core";
import { Subscription } from "rxjs";
import { ResponseMeta } from "../../../../core/interfaces/responses/response";
import { SelectOption } from "../../../../core/interfaces/select-option";
import { TableService } from "../../services/table.service";

@Component({
    selector: "app-table-pagination",
    templateUrl: "./table-pagination.component.html",
    styleUrls: ["./table-pagination.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePaginationComponent implements OnInit, OnDestroy {
    public meta: ResponseMeta | null = null;

    public readonly showItems: SelectOption[] = [
        {
            label: "5",
            value: 5
        },
        {
            label: "10",
            value: 10
        },
        {
            label: "15",
            value: 15
        },
        {
            label: "20",
            value: 20
        },
        {
            label: "25",
            value: 25
        }
    ];

    private readonly subscriptions: Subscription[] = [];
    private readonly tableService: TableService;
    private readonly cdr: ChangeDetectorRef;
    public constructor(tableService: TableService, cdr: ChangeDetectorRef) {
        this.tableService = tableService;
        this.cdr = cdr;
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.tableService.meta$.subscribe((meta) => {
                this.meta = meta;
                this.cdr.detectChanges();
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public prev(): void {
        if (!this.meta || this.meta.currentPage - 1 <= 0) {
            return;
        }

        this.meta.currentPage -= 1;

        this.tableService.setPagination({
            page: this.meta.currentPage,
            size: this.meta.perPage
        });
    }

    public next(): void {
        if (!this.meta || this.meta.currentPage + 1 > this.meta.totalPages) {
            return;
        }

        this.meta.currentPage += 1;

        this.tableService.setPagination({
            page: this.meta.currentPage,
            size: this.meta.perPage
        });
    }

    public changeSize(value: number | string): void {
        if (!this.meta) {
            return;
        }

        this.meta.perPage = +value;

        this.tableService.setPagination({
            page: 1,
            size: this.meta.perPage
        });
    }
}
