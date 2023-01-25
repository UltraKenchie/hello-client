import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription, tap } from "rxjs";
import { RequestLogin } from "../../../core/interfaces/requests/request-login";
import { AuthRepository } from "../../../core/repositories/auth.repository";
import { AuthService } from "../../../core/services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {
    private readonly authRepository: AuthRepository;
    private readonly router: Router;
    private readonly subscriptions: Subscription[] = [];
    public constructor(authRepository: AuthRepository, router: Router) {
        this.authRepository = authRepository;
        this.router = router;
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public onSubmit(request: RequestLogin): void {
        this.subscriptions.push(
            this.authRepository
                .login(request)
                .pipe(
                    tap((data) => {
                        localStorage.setItem(
                            AuthService.AuthTokenStorageName,
                            `${data.body.token}`
                        );
                    })
                )
                .subscribe(() => {
                    this.router.navigate(["/"]);
                })
        );
    }
}
