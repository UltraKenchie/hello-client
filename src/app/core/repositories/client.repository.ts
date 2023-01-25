import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../interfaces/client";
import { Response } from "../interfaces/responses/response";
import { RequestClientForm } from "../interfaces/requests/request-client-form";
import { RequestPagination } from "../interfaces/requests/request-pagination";
import { ApiService } from "../services/api.service";
import { createPagination } from "../functions/table";

@Injectable({
    providedIn: "root"
})
export class ClientRepository {
    private readonly apiService: ApiService;
    public constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    public one(id: string): Observable<Response<Client>> {
        return this.apiService.securedGet(`client/${id}`);
    }

    public list(pagination?: RequestPagination): Observable<Response<Client[]>> {
        return this.apiService.securedGet("client", {
            params: { ...createPagination(pagination) }
        });
    }

    public create(request: RequestClientForm): Observable<Response<Client>> {
        return this.apiService.securedPost("client", request);
    }

    public update(id: string, request: RequestClientForm): Observable<Response<Client>> {
        return this.apiService.securedPut(`client/${id}`, request);
    }

    public delete(id: string): Observable<Response<Client>> {
        return this.apiService.securedDelete(`client/${id}`);
    }
}
