import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { createPagination } from "../functions/table";
import { RequestLogin } from "../interfaces/requests/request-login";
import { RequestPagination } from "../interfaces/requests/request-pagination";
import { RequestUserForm } from "../interfaces/requests/request-user-form";
import { Response } from "../interfaces/responses/response";
import { ResponseToken } from "../interfaces/responses/response-token";
import { User } from "../interfaces/user";
import { ApiService } from "../services/api.service";

@Injectable({
    providedIn: "root"
})
export class AuthRepository {
    private readonly apiService: ApiService;
    public constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    public login(request: RequestLogin): Observable<Response<ResponseToken>> {
        return this.apiService.post(`user/login`, request);
    }

    public one(id: string): Observable<Response<User>> {
        return this.apiService.securedGet(`user/${id}`);
    }

    public list(pagination?: RequestPagination): Observable<Response<User[]>> {
        return this.apiService.securedGet("user", {
            params: { ...createPagination(pagination) }
        });
    }

    public create(request: RequestUserForm): Observable<Response<User>> {
        return this.apiService.securedPost("user", request);
    }

    public update(id: string, request: RequestUserForm): Observable<Response<User>> {
        return this.apiService.securedPut(`user/${id}`, request);
    }

    public delete(id: string): Observable<Response<User>> {
        return this.apiService.securedDelete(`user/${id}`);
    }
}
