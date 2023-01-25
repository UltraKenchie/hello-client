import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from "@angular/core";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SelectOption } from "../../../core/interfaces/select-option";

@Component({
    selector: "app-select",
    templateUrl: "./select.component.html",
    styleUrls: ["./select.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent implements ControlValueAccessor {
    @Input()
    public set options(value: SelectOption[]) {
        this._options = value;
        this.cdr.detectChanges();
    }
    public get options(): SelectOption[] {
        return this._options;
    }

    @Input() public label = "";
    @Input() public defaultSelectable = false;

    @Input() public value: string | number = "";

    @Output() public readonly valueChange = new EventEmitter<string | number>();

    public readonly inputControl = new FormControl();

    private _options: SelectOption[] = [];

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

    public onChangeSelect(event: Event): void {
        const value = (event?.target as HTMLSelectElement)?.value;
        if (this.value !== value) {
            this.value = value;
            this.onChange(value);
            this.onTouched();
            this.valueChange.emit(this.value);
        }
    }
}
