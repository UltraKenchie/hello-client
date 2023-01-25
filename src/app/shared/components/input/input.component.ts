import { ChangeDetectorRef, Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { HTMLInputTypes } from "../../../core/types/html-input-types";

@Component({
    selector: "app-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor {
    @Input() public label = "";
    @Input() public placeholder = "";
    @Input() public type: HTMLInputTypes = "text";

    public value = "";

    public readonly inputControl = new FormControl();

    private readonly cdr: ChangeDetectorRef;
    public constructor(cdr: ChangeDetectorRef) {
        this.cdr = cdr;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onChange: (value: unknown) => void = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public onTouched: () => void = () => {};

    public writeValue(value: string): void {
        this.value = value;
        this.inputControl.setValue(value);
        this.cdr.detectChanges();
    }

    public registerOnChange(fn: (value: unknown) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.inputControl.disable() : this.inputControl.enable();
    }

    public onKey(event: Event): void {
        const value = (event?.target as HTMLInputElement)?.value;
        if (this.value !== value) {
            this.value = value;
            this.onChange(value);
            this.onTouched();
        }
    }
}
