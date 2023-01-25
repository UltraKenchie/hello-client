import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "../../../environments/environment";

interface APIOptions {
    params?:
        | HttpParams
        | {
              [param: string]: ReadonlyArray<boolean | number | string> | boolean | number | string;
          };
    headers?:
        | HttpHeaders
        | {
              [header: string]: string[] | string;
          };
}

@Injectable({
    providedIn: "root"
})
export class ApiService {
    private readonly http: HttpClient;
    public constructor(http: HttpClient) {
        this.http = http;
    }

    public get<T>(resourceUrl: string, options?: APIOptions): Observable<T> {
        return this.http.get<T>(`${environment.api}/${resourceUrl}`, {
            params: options?.params,
            headers: options?.headers
        });
    }

    public securedGet<T>(resourceUrl: string, options?: APIOptions): Observable<T> {
        const token = localStorage.getItem(AuthService.AuthTokenStorageName) ?? "";
        const headers: HttpHeaders = new HttpHeaders({
            ...options?.headers,
            authorization: `Bearer ${token}`
        });
        return this.get(resourceUrl, { params: options?.params, headers: headers });
    }

    public post<T>(resourceUrl: string, body: unknown, options?: APIOptions): Observable<T> {
        const headers: HttpHeaders = new HttpHeaders({ "content-type": "application/json" });
        return this.http.post<T>(`${environment.api}/${resourceUrl}`, body, {
            headers: options?.headers ? options.headers : headers,
            params: options?.params
        });
    }

    public securedPost<T>(resourceUrl: string, body: unknown, options?: APIOptions): Observable<T> {
        const token = localStorage.getItem(AuthService.AuthTokenStorageName) ?? "";
        const headers: HttpHeaders = new HttpHeaders({
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        });
        return this.post(resourceUrl, body, {
            params: options?.params,
            headers: options?.headers ? options.headers : headers
        });
    }

    public put<T>(resourceUrl: string, body: unknown, options?: APIOptions): Observable<T> {
        const headers: HttpHeaders = new HttpHeaders({
            "content-type": "application/json"
        });
        return this.http.put<T>(`${environment.api}/${resourceUrl}`, body, {
            headers: options?.headers ? options.headers : headers,
            params: options?.params
        });
    }

    public securedPut<T>(resourceUrl: string, body: unknown, options?: APIOptions): Observable<T> {
        const token = localStorage.getItem(AuthService.AuthTokenStorageName) ?? "";
        const headers: HttpHeaders = new HttpHeaders({
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        });
        return this.put(resourceUrl, body, {
            params: options?.params,
            headers: options?.headers ? options.headers : headers
        });
    }

    public delete<T>(resourceUrl: string, options?: APIOptions): Observable<T> {
        const headers: HttpHeaders = new HttpHeaders({
            "content-type": "application/json"
        });
        return this.http.delete<T>(`${environment.api}/${resourceUrl}`, {
            headers: options?.headers ? options.headers : headers,
            params: options?.params
        });
    }

    public securedDelete<T>(resourceUrl: string, options?: APIOptions): Observable<T> {
        const token = localStorage.getItem(AuthService.AuthTokenStorageName) ?? "";
        const headers: HttpHeaders = new HttpHeaders({
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        });
        return this.delete(resourceUrl, {
            params: options?.params,
            headers: options?.headers ? options.headers : headers
        });
    }
}
