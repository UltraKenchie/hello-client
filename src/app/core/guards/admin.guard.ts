import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: "root"
})
export class AdminGuard implements CanActivateChild {
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
        const role = this.authService.getRole();
        if (role === "admin") {
            return true;
        }

        this.router.navigate(["/"]);
        return false;
    }
}
