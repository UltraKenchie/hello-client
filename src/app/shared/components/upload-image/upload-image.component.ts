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

@Component({
    selector: "app-upload-image",
    templateUrl: "./upload-image.component.html",
    styleUrls: ["./upload-image.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UploadImageComponent),
            multi: true
        }
    ]
})
export class UploadImageComponent implements ControlValueAccessor {
    @Input() public label = "";
    @Input() public placeholder = "";

    public value = "";

    @Output() public readonly valueChange = new EventEmitter<string>();

    public get isBuffer(): boolean {
        return this.value?.startsWith("data:image") ?? false;
    }

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

    public addCoverImage(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (target.files === null) {
            return;
        }

        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>): void => {
            this.value = e.target?.result as string;
            this.onChange(this.value);
            this.onTouched();
            this.valueChange.emit(this.value);
            this.cdr.detectChanges();
        };
        reader.readAsDataURL(file);
    }

    public remove(): void {
        this.value = "";
        this.onChange(this.value);
        this.onTouched();
        this.valueChange.emit(this.value);
        this.cdr.detectChanges();
    }
}
