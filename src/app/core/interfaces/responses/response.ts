export interface ResponseMeta {
    perPage: number;
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export interface Response<T> {
    body: T;
    message: string;
    status: number;
    meta?: ResponseMeta;
}

export interface ResponseBody {
    id: string;
    createdAt: string;
    updatedAt: string;
}
