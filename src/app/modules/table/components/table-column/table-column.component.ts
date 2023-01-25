import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Renderer2
} from "@angular/core";
import { Subscription } from "rxjs";
import { SortTypes as SortType } from "../../types/sort-type";
import { TableService } from "../../services/table.service";

@Component({
    selector: "app-table-column",
    templateUrl: "./table-column.component.html",
    styleUrls: ["./table-column.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnComponent implements OnInit, OnDestroy, AfterContentInit {
    @Input() public width?: string;
    @Input() public minWidth?: string;

    @HostBinding("class.sortable")
    @Input()
    public sortable = false;

    @Input() public sortBy = "";
    @Input() public sortType: SortType = "none";

    @HostBinding("class.header")
    public header = false;

    private readonly subscriptions: Subscription[] = [];

    private readonly elRef: ElementRef;
    private readonly renderer: Renderer2;
    private readonly tableService: TableService;
    private readonly cdr: ChangeDetectorRef;
    public constructor(
        elRef: ElementRef,
        renderer: Renderer2,
        cdr: ChangeDetectorRef,
        tableService: TableService
    ) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.cdr = cdr;
        this.tableService = tableService;
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.tableService.sort$.subscribe((sortData) => {
                if (!!this.sortBy && sortData?.sortBy !== this.sortBy) {
                    this.sortType = "none";
                    this.cdr.detectChanges();
                }
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public ngAfterContentInit(): void {
        this.setWidth(this.width, this.minWidth);
    }

    public setWidth(width?: string, minWidth?: string): void {
        this.width = width;
        this.minWidth = minWidth;
        this.renderer.setStyle(this.elRef.nativeElement, "min-width", `${this.minWidth}`);
        this.renderer.setStyle(this.elRef.nativeElement, "width", `${this.width}`);
        this.cdr.detectChanges();
    }

    public setHeader(header: boolean): void {
        this.header = header;
        this.cdr.detectChanges();
    }

    @HostListener("click")
    public onSort(): void {
        if (!this.sortable || !this.sortBy) {
            return;
        }

        switch (this.sortType) {
            case "none":
                this.sortType = "desc";
                break;
            case "desc":
                this.sortType = "asc";
                break;
            case "asc":
                this.sortType = "none";
                break;
            default:
                this.sortType = "none";
                break;
        }

        this.tableService.setSort(this.sortBy, this.sortType);

        this.cdr.detectChanges();
    }
}
