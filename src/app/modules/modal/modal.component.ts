import { trigger, transition, style, animate } from "@angular/animations";
import {
    Component,
    ChangeDetectionStrategy,
    Input,
    TemplateRef,
    ChangeDetectorRef,
    Output,
    EventEmitter
} from "@angular/core";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger("modal", [
            transition(":enter", [style({ opacity: 0 }), animate(300, style({ opacity: 1 }))]),
            transition(":leave", [animate(300, style({ opacity: 0 }))])
        ])
    ]
})
export class ModalComponent {
    @Input()
    public set title(value: string) {
        this._title = value;
        this.cdr.detectChanges();
    }

    public get title(): string {
        return this._title;
    }

    @Input()
    public set template(value: TemplateRef<unknown>) {
        this._template = value;
        this.cdr.detectChanges();
    }

    public get template(): TemplateRef<unknown> {
        return this._template;
    }

    @Input()
    public set showClose(value: boolean) {
        this._showClose = value;
        this.cdr.detectChanges();
    }

    public get showClose(): boolean {
        return this._showClose;
    }

    @Output() public readonly closed = new EventEmitter<void>();

    private _title: string;
    private _showClose: boolean;
    private _template: TemplateRef<unknown>;

    private readonly cdr: ChangeDetectorRef;
    public constructor(cdr: ChangeDetectorRef) {
        this.cdr = cdr;
    }
}
