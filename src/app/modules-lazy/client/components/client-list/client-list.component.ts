import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Client } from "../../../../core/interfaces/client";
import { RequestPagination } from "../../../../core/interfaces/requests/request-pagination";
import { ResponseMeta } from "../../../../core/interfaces/responses/response";
import { ClientRepository } from "../../../../core/repositories/client.repository";

@Component({
    selector: "app-client-list",
    templateUrl: "./client-list.component.html",
    styleUrls: ["./client-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientListComponent implements OnInit, OnDestroy {
    public clients: Client[] = [];
    public meta?: ResponseMeta;

    public showDeleteModal = false;
    private deleteClientId: string;

    public loading = false;

    private pagination?: RequestPagination;

    private readonly subscriptions: Subscription[] = [];
    private readonly cdr: ChangeDetectorRef;
    private readonly clientRepository: ClientRepository;
    private router: Router;
    public constructor(cdr: ChangeDetectorRef, router: Router, clientRepository: ClientRepository) {
        this.cdr = cdr;
        this.router = router;
        this.clientRepository = clientRepository;
    }

    public ngOnInit(): void {
        this.fetchClients();
    }

    public changePagination(pagination: RequestPagination): void {
        this.pagination = pagination;
        this.fetchClients();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public onDelete(): void {
        if (!this.deleteClientId || this.loading) {
            return;
        }

        this.loading = true;
        this.cdr.detectChanges();

        this.toggleDeleteModal(false);

        this.subscriptions.push(
            this.clientRepository.delete(this.deleteClientId).subscribe(() => {
                this.fetchClients();
            })
        );
    }

    public toggleDeleteModal(value: boolean, id = ""): void {
        if (id) {
            this.deleteClientId = id;
        }

        this.showDeleteModal = value;
        this.cdr.detectChanges();
    }

    private fetchClients(): void {
        this.loading = true;
        this.cdr.detectChanges();

        this.subscriptions.push(
            this.clientRepository.list(this.pagination).subscribe({
                next: (response) => {
                    this.clients = response.body;
                    this.meta = response.meta;
                    this.cdr.detectChanges();
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
