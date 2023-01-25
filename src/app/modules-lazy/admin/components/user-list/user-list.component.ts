import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RequestPagination } from "../../../../core/interfaces/requests/request-pagination";
import { ResponseMeta } from "../../../../core/interfaces/responses/response";
import { User } from "../../../../core/interfaces/user";
import { AuthRepository } from "../../../../core/repositories/auth.repository";

@Component({
    selector: "app-user-list",
    templateUrl: "./user-list.component.html",
    styleUrls: ["./user-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnDestroy {
    public users: User[] = [];
    public meta?: ResponseMeta;

    public showDeleteModal = false;
    public loading = false;

    private deleteUserId: string;
    private pagination?: RequestPagination;

    private readonly subscriptions: Subscription[] = [];
    private readonly cdr: ChangeDetectorRef;
    private readonly authRepository: AuthRepository;
    private router: Router;
    public constructor(cdr: ChangeDetectorRef, router: Router, authRepository: AuthRepository) {
        this.cdr = cdr;
        this.router = router;
        this.authRepository = authRepository;
    }

    public ngOnInit(): void {
        this.fetchUsers();
    }

    public changePagination(pagination: RequestPagination): void {
        this.pagination = pagination;
        this.fetchUsers();
    }

    public onDelete(): void {
        if (!this.deleteUserId || this.loading) {
            return;
        }

        this.toggleDeleteModal(false);

        this.loading = true;
        this.cdr.detectChanges();

        this.subscriptions.push(
            this.authRepository.delete(this.deleteUserId).subscribe({
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

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public toggleDeleteModal(value: boolean, id = ""): void {
        if (id) {
            this.deleteUserId = id;
        }

        this.showDeleteModal = value;
        this.cdr.detectChanges();
    }

    private fetchUsers(): void {
        this.loading = true;
        this.cdr.detectChanges();
        this.subscriptions.push(
            this.authRepository.list(this.pagination).subscribe({
                next: (response) => {
                    this.users = response.body;
                    this.meta = response.meta;
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
