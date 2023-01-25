import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../../../../core/interfaces/user";
import { AuthRepository } from "../../../../core/repositories/auth.repository";

@Component({
    selector: "app-user-view",
    templateUrl: "./user-view.component.html",
    styleUrls: ["./user-view.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewComponent implements OnInit, OnDestroy {
    public user: User;

    public showDeleteModal = false;
    public loading = false;

    private userId: string | null;

    private readonly subscriptions: Subscription[] = [];
    private readonly cdr: ChangeDetectorRef;
    private readonly authRepository: AuthRepository;
    private readonly route: ActivatedRoute;
    private readonly router: Router;
    public constructor(
        cdr: ChangeDetectorRef,
        router: Router,
        route: ActivatedRoute,
        authRepository: AuthRepository
    ) {
        this.cdr = cdr;
        this.router = router;
        this.route = route;
        this.authRepository = authRepository;
    }

    public ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get("id");

        if (this.userId === null) {
            this.router.navigate(["/admin"]);
            return;
        }

        this.toggleDeleteModal(false);

        this.loading = true;
        this.cdr.detectChanges();

        this.subscriptions.push(
            this.authRepository.one(this.userId).subscribe({
                next: (response) => {
                    this.user = response.body;
                    this.cdr.detectChanges();
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

    public toggleDeleteModal(value: boolean): void {
        this.showDeleteModal = value;
        this.cdr.detectChanges();
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
                complete: () => {
                    this.loading = false;
                    this.cdr.detectChanges();
                }
            })
        );
    }
}
