import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginForm } from "../../../core/interfaces/forms/login-form";
import { RequestLogin } from "../../../core/interfaces/requests/request-login";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    @Output() public readonly submit$ = new EventEmitter<RequestLogin>();

    public loginForm = new FormGroup<LoginForm>({
        email: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required, Validators.email]
        }),
        password: new FormControl("", { nonNullable: true, validators: [Validators.required] })
    });

    public onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.submit$.next({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        });
    }
}
