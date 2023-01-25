export interface RequestPagination {
    search?: string;
    page?: number;
    size?: number;
    sort?: { [key: string]: string };
}
