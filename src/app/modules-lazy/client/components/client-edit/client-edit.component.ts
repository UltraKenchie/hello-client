import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Client } from "../../../../core/interfaces/client";
import { RequestClientForm } from "../../../../core/interfaces/requests/request-client-form";
import { User } from "../../../../core/interfaces/user";
import { AuthRepository } from "../../../../core/repositories/auth.repository";
import { ClientRepository } from "../../../../core/repositories/client.repository";

@Component({
    selector: "app-client-edit",
    templateUrl: "./client-edit.component.html",
    styleUrls: ["./client-edit.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientEditComponent implements OnInit, OnDestroy {
    public client: Client | null;
    public clientId: string | null;

    public users: User[] = [];

    public loading = false;

    private readonly subscriptions: Subscription[] = [];
    private readonly route: ActivatedRoute;
    private readonly router: Router;
    private readonly cdr: ChangeDetectorRef;
    private readonly clientRepository: ClientRepository;
    private readonly authRepository: AuthRepository;
    public constructor(
        route: ActivatedRoute,
        router: Router,
        cdr: ChangeDetectorRef,
        clientRepository: ClientRepository,
        authRepository: AuthRepository
    ) {
        this.route = route;
        this.router = router;
        this.cdr = cdr;
        this.authRepository = authRepository;
        this.clientRepository = clientRepository;
    }

    public ngOnInit(): void {
        this.clientId = this.route.snapshot.paramMap.get("id");

        this.subscriptions.push(
            this.authRepository.list().subscribe((response) => {
                this.users = response.body;
                this.cdr.detectChanges();
            })
        );

        if (this.clientId === null) {
            return;
        }

        this.loading = true;
        this.cdr.detectChanges();

        this.subscriptions.push(
            this.clientRepository.one(this.clientId).subscribe({
                next: (response) => {
                    this.client = response.body;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.router.navigate(["/clients"]);
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

    public onSubmit(request: RequestClientForm): void {
        this.loading = true;
        this.cdr.detectChanges();

        if (this.clientId === null) {
            this.subscriptions.push(
                this.clientRepository.create(request).subscribe({
                    next: (response) => {
                        this.router.navigate([`/clients/${response.body.id}`]);
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
            this.clientRepository.update(this.clientId, request).subscribe({
                next: (response) => {
                    this.router.navigate([`/clients/${response.body.id}`]);
                },
                complete: () => {
                    this.loading = false;
                    this.cdr.detectChanges();
                }
            })
        );
    }

    public onCancel(): void {
        this.router.navigate(["/clients"]);
    }

    public onDelete(): void {
        if (this.clientId === null || this.loading) {
            return;
        }

        this.loading = true;
        this.cdr.detectChanges();

        this.subscriptions.push(
            this.clientRepository.delete(this.clientId).subscribe({
                next: () => {
                    this.router.navigate(["/clients"]);
                },
                complete: () => {
                    this.loading = false;
                    this.cdr.detectChanges();
                }
            })
        );
    }
}
