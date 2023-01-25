import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { formDistinct } from "../../../../core/functions/form";
import { Client } from "../../../../core/interfaces/client";
import { ClientForm } from "../../../../core/interfaces/forms/client-form";
import { RequestClientForm } from "../../../../core/interfaces/requests/request-client-form";
import { SelectOption } from "../../../../core/interfaces/select-option";
import { User } from "../../../../core/interfaces/user";

@Component({
    selector: "app-client-form",
    templateUrl: "./client-form.component.html",
    styleUrls: ["./client-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientFormComponent {
    @Input()
    public set users(users: User[]) {
        this.userOptions = users.map((user) => {
            return {
                value: user.id,
                label: user.name
            };
        });
        this.cdr.detectChanges();
    }

    public userOptions: SelectOption[] = [];

    @Input()
    public set client(client: Client | null) {
        this._client = client;
        this.setForm(client);
        this.cdr.detectChanges();
    }
    public get client(): Client | null {
        return this._client;
    }

    @Input() public loading = false;

    public clientForm = new FormGroup<ClientForm>({
        organizationName: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required]
        }),
        organizationImage: new FormControl("", {
            nonNullable: true
        }),
        contactName: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
        contactImage: new FormControl("", {
            nonNullable: true
        }),
        contactEmail: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required, Validators.email]
        }),
        contactPhoneNumber: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required]
        }),
        website: new FormControl("", {
            nonNullable: true
        }),
        assigned: new FormControl(null),
        status: new FormControl(true, { nonNullable: true, validators: [Validators.required] })
    });

    public showDeleteModal = false;

    private _client: Client | null = null;

    @Output() public readonly submit$ = new EventEmitter<RequestClientForm>();
    @Output() public readonly cancel$ = new EventEmitter<void>();
    @Output() public readonly delete$ = new EventEmitter<void>();

    private readonly cdr: ChangeDetectorRef;
    public constructor(cdr: ChangeDetectorRef) {
        this.cdr = cdr;
    }

    public onSubmit(): void {
        if (this.clientForm.invalid || this.loading) {
            return;
        }

        // if update then submit only the changes
        if (this.client) {
            const dirtyValues = formDistinct(this.clientForm);

            this.submit$.next(dirtyValues as unknown as RequestClientForm);
            return;
        }

        this.submit$.next({
            organizationName: this.clientForm.value.organizationName,
            organizationImage: this.clientForm.value.organizationImage,
            contactName: this.clientForm.value.contactName,
            contactImage: this.clientForm.value.contactImage,
            contactEmail: this.clientForm.value.contactEmail,
            contactPhoneNumber: this.clientForm.value.contactPhoneNumber,
            website: this.clientForm.value.website,
            assigned: this.clientForm.value.assigned,
            status: this.clientForm.value.status
        });
    }

    public onCancel(): void {
        this.cancel$.next();
    }

    public onDelete(): void {
        this.toggleDeleteModal(false);
        this.delete$.next();
    }

    public toggleDeleteModal(value: boolean): void {
        this.showDeleteModal = value;
        this.cdr.detectChanges();
    }

    private setForm(client?: Client | null): void {
        if (!client) {
            return;
        }

        this.clientForm.setValue({
            organizationName: client.organizationName,
            organizationImage: client.organizationImage?.path ?? "",
            contactName: client.contactName,
            contactEmail: client.contactEmail,
            contactImage: client.contactImage?.path ?? "",
            contactPhoneNumber: client.contactPhoneNumber,
            website: client.website,
            assigned: client.assigned?.id ?? null,
            status: client.status
        });
    }
}
