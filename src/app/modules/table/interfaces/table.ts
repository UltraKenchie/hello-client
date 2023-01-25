import { SortTypes } from "../types/sort-type";
import { Pagination } from "./pagination";

export interface SortData {
    sortBy?: string;
    sortType?: SortTypes;
}

export interface TableChange {
    pagination?: Pagination;
    sort?: SortData;
}
