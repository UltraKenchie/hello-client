import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";
import { ResponseJwt } from "../interfaces/responses/response-jwt";
import { Role } from "../types/role";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    public static readonly AuthTokenStorageName = "auth_token";

    private readonly router: Router;
    public constructor(router: Router) {
        this.router = router;
    }

    public getRole(): Role | null {
        const auth = localStorage.getItem(AuthService.AuthTokenStorageName);
        if (auth === null) {
            return null;
        }

        const decoded: ResponseJwt = jwtDecode(auth);
        return decoded.role;
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem(AuthService.AuthTokenStorageName) !== null;
    }

    public logout(): void {
        localStorage.removeItem(AuthService.AuthTokenStorageName);
        this.router.navigate(["/login"]);
    }
}
