import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard {
    private readonly authService: AuthService;
    private readonly router: Router;
    public constructor(authService: AuthService, router: Router) {
        this.authService = authService;
        this.router = router;
    }

    public canActivateChild(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _childRoute: ActivatedRouteSnapshot,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(["/login"]);
        return false;
    }
}
