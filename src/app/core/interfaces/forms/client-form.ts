import { FormControl } from "@angular/forms";

export interface ClientForm {
    organizationName: FormControl<string>;
    organizationImage: FormControl<string>;
    contactName: FormControl<string>;
    contactImage: FormControl<string>;
    contactEmail: FormControl<string>;
    contactPhoneNumber: FormControl<string>;
    website: FormControl<string>;
    assigned: FormControl<string | null>;
    status: FormControl<boolean>;
}
