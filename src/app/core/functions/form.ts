import { FormGroup } from "@angular/forms";

export function formDistinct(form: FormGroup): { [key: string]: string | number | boolean } {
    const changed: { [key: string]: string | number | boolean } = {};
    for (const key in form.controls) {
        if (Object.prototype.hasOwnProperty.call(form.controls, key)) {
            const element = form.controls[key];
            if (element.dirty) {
                changed[key] = element.value;
            }
        }
    }
    return changed;
}
