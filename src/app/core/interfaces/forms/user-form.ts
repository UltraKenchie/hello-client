import { FormControl } from "@angular/forms";

export interface UserForm {
    email: FormControl<string>;
    name: FormControl<string>;
    password: FormControl<string>;
    avatar: FormControl<string>;
}
