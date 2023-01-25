import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Pagination } from "../interfaces/pagination";
import { ResponseMeta } from "../../../core/interfaces/responses/response";
import { SortData } from "../interfaces/table";
import { SortTypes } from "../types/sort-type";

@Injectable()
export class TableService {
    public tableChange$ = new Subject<void>();
    public sort$ = new BehaviorSubject<SortData>({});
    public meta$ = new BehaviorSubject<ResponseMeta | null>(null);
    public pagination$ = new BehaviorSubject<Pagination>({});

    public setSort(sortBy: string, sortType: SortTypes): void {
        this.sort$.next({
            sortBy,
            sortType
        });
        this.pagination$.next({ ...this.pagination$.value, page: 1 });
        this.tableChange$.next();
    }

    public setPagination(pagination: Pagination): void {
        this.pagination$.next(pagination);
        this.tableChange$.next();
    }

    public setMeta(meta: ResponseMeta): void {
        this.meta$.next(meta);
    }
}
