import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class NoAuthGuard implements CanActivate {
    private readonly authService: AuthService;
    private readonly router: Router;
    public constructor(authService: AuthService, router: Router) {
        this.authService = authService;
        this.router = router;
    }

    public canActivate(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _route: ActivatedRouteSnapshot,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(["/"]);
        return false;
    }
}
