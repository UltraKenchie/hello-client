import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
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
    public loading = false;

    private readonly authRepository: AuthRepository;
    private readonly router: Router;
    private readonly subscriptions: Subscription[] = [];
    private readonly cdr: ChangeDetectorRef;
    public constructor(authRepository: AuthRepository, router: Router, cdr: ChangeDetectorRef) {
        this.authRepository = authRepository;
        this.router = router;
        this.cdr = cdr;
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public onSubmit(request: RequestLogin): void {
        this.loading = true;
        this.cdr.detectChanges();
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
                .subscribe({
                    next: () => {
                        this.router.navigate(["/"]);
                    },
                    error: () => {
                        this.loading = false;
                        this.cdr.detectChanges();
                    },
                    complete: () => {
                        this.loading = false;
                        this.cdr.detectChanges();
                    }
                })
        );
    }
}
