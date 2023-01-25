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
import { ClientRepository } from "../../../../core/repositories/client.repository";

@Component({
    selector: "app-client-view",
    templateUrl: "./client-view.component.html",
    styleUrls: ["./client-view.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientViewComponent implements OnInit, OnDestroy {
    public client: Client;

    private clientId: string | null;

    public showDeleteModal = false;
    public loading = false;

    private readonly subscriptions: Subscription[] = [];
    private readonly cdr: ChangeDetectorRef;
    private readonly clientRepository: ClientRepository;
    private readonly route: ActivatedRoute;
    private readonly router: Router;
    public constructor(
        cdr: ChangeDetectorRef,
        router: Router,
        route: ActivatedRoute,
        clientRepository: ClientRepository
    ) {
        this.cdr = cdr;
        this.router = router;
        this.route = route;
        this.clientRepository = clientRepository;
    }

    public ngOnInit(): void {
        this.clientId = this.route.snapshot.paramMap.get("id");

        if (this.clientId === null) {
            this.router.navigate(["/clients"]);
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
        if (this.clientId === null || this.loading) {
            return;
        }

        this.toggleDeleteModal(false);

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
