import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { formDistinct } from "../../../../core/functions/form";
import { UserForm } from "../../../../core/interfaces/forms/user-form";
import { RequestUserForm } from "../../../../core/interfaces/requests/request-user-form";
import { User } from "../../../../core/interfaces/user";

@Component({
    selector: "app-user-form",
    templateUrl: "./user-form.component.html",
    styleUrls: ["./user-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
    @Input()
    public set user(user: User | null) {
        this._user = user;
        this.setForm(user);
        this.cdr.detectChanges();
    }
    public get user(): User | null {
        return this._user;
    }

    @Input() public loading = false;

    public userForm = new FormGroup<UserForm>({
        email: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required, Validators.email]
        }),
        name: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required]
        }),
        password: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required]
        }),
        avatar: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required]
        })
    });

    public showDeleteModal = false;

    private _user: User | null = null;

    @Output() public readonly submit$ = new EventEmitter<RequestUserForm>();
    @Output() public readonly cancel$ = new EventEmitter<void>();
    @Output() public readonly delete$ = new EventEmitter<void>();

    private readonly cdr: ChangeDetectorRef;
    public constructor(cdr: ChangeDetectorRef) {
        this.cdr = cdr;
    }

    public onSubmit(): void {
        if (this.userForm.invalid || this.loading) {
            return;
        }

        // if update then submit only the changes
        if (this.user) {
            const dirtyValues = formDistinct(this.userForm);

            this.submit$.next(dirtyValues as unknown as RequestUserForm);
            return;
        }

        this.submit$.next({
            email: this.userForm.value.email,
            name: this.userForm.value.name,
            password: this.userForm.value.password,
            avatar: this.userForm.value.avatar
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

    private setForm(user?: User | null): void {
        if (!user) {
            return;
        }

        this.userForm = new FormGroup<UserForm>({
            email: new FormControl(user.email, {
                nonNullable: true,
                validators: [Validators.required, Validators.email]
            }),
            name: new FormControl(user.name, {
                nonNullable: true,
                validators: [Validators.required]
            }),
            password: new FormControl("", {
                nonNullable: true
            }),
            avatar: new FormControl(user.avatar?.path ?? "", {
                nonNullable: true
            })
        });

        this.cdr.detectChanges();
    }
}
