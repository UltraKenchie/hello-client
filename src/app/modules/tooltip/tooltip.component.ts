import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    TemplateRef
} from "@angular/core";

@Component({
    selector: "app-tooltip",
    templateUrl: "./tooltip.component.html",
    styleUrls: ["./tooltip.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {
    public get template(): TemplateRef<unknown> {
        return this._template;
    }
    public set template(value: TemplateRef<unknown>) {
        this._template = value;
        this.cdr.detectChanges();
    }

    public get templateContext(): { [key: string]: string } {
        return this._templateContext;
    }
    public set templateContext(value: { [key: string]: string }) {
        this._templateContext = value;
        this.cdr.detectChanges();
    }

    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
        this.cdr.detectChanges();
    }

    public get useStyles(): boolean {
        return this._useStyles;
    }
    public set useStyles(value: boolean) {
        this._useStyles = value;
        this.cdr.detectChanges();
    }

    public get elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    private _template: TemplateRef<unknown>;
    private _templateContext: { [key: string]: string };
    private _text = "";
    private _useStyles = true;
    private readonly _elementRef: ElementRef<HTMLElement>;
    private readonly cdr: ChangeDetectorRef;

    public constructor(cdr: ChangeDetectorRef, elRef: ElementRef<HTMLElement>) {
        this._elementRef = elRef;
        this.cdr = cdr;
    }
}
