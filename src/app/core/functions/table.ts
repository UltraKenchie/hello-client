import { Pagination } from "../../modules/table/interfaces/pagination";
import { RequestPagination } from "../interfaces/requests/request-pagination";
import { flatten } from "./array";

export function createPagination(pagination?: RequestPagination): Pagination {
    return {
        search: pagination?.search ?? "",
        page: pagination?.page ?? 1,
        size: pagination?.size ?? 5,
        sort: pagination?.sort
            ? flatten<string>(
                  Object.keys(pagination?.sort).map(
                      (key) => `${key}:${pagination.sort?.[key] ?? ""}`
                  )
              ).join(",")
            : ""
    };
}
