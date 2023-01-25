import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RequestUserForm } from "../../../../core/interfaces/requests/request-user-form";
import { User } from "../../../../core/interfaces/user";
import { AuthRepository } from "../../../../core/repositories/auth.repository";

@Component({
    selector: "app-user-edit",
    templateUrl: "./user-edit.component.html",
    styleUrls: ["./user-edit.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit, OnDestroy {
    public user: User | null;
    public userId: string | null;

    public loading = false;

    private readonly subscriptions: Subscription[] = [];
    private readonly route: ActivatedRoute;
    private readonly router: Router;
    private readonly authRepository: AuthRepository;
    private readonly cdr: ChangeDetectorRef;
    public constructor(
        route: ActivatedRoute,
        router: Router,
        cdr: ChangeDetectorRef,
        authRepository: AuthRepository
    ) {
        this.route = route;
        this.router = router;
        this.cdr = cdr;
        this.authRepository = authRepository;
    }

    public ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get("id");

        if (this.userId === null) {
            return;
        }

        this.loading = true;
        this.cdr.detectChanges();
        this.subscriptions.push(
            this.authRepository.one(this.userId).subscribe({
                next: (response) => {
                    this.user = response.body;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.loading = false;
                    this.cdr.detectChanges();
                    this.router.navigate(["/admin"]);
                },
                complete: () => {
                    this.loading = false;
                    this.cdr.detectChanges();
                }
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public onSubmit(request: RequestUserForm): void {
        this.loading = true;
        this.cdr.detectChanges();
        if (this.userId === null) {
            this.subscriptions.push(
                this.authRepository.create(request).subscribe({
                    next: (response) => {
                        this.router.navigate([`/admin/${response.body.id}`]);
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
            return;
        }

        this.subscriptions.push(
            this.authRepository.update(this.userId, request).subscribe({
                next: (response) => {
                    this.router.navigate([`/admin/${response.body.id}`]);
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

    public onCancel(): void {
        this.router.navigate(["/admin"]);
    }

    public onDelete(): void {
        if (this.userId === null || this.loading) {
            return;
        }

        this.loading = true;
        this.cdr.detectChanges();
        this.subscriptions.push(
            this.authRepository.delete(this.userId).subscribe({
                next: () => {
                    this.router.navigate(["/admin"]);
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
