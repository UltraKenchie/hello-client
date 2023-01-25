import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output
} from "@angular/core";
import { HTMLButtonTypes } from "../../../core/types/html-button-types";

@Component({
    selector: "app-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    @HostBinding("class")
    @Input()
    public variant: "primary" | "danger" | "outline" | "none" = "primary";

    @HostBinding("style.width")
    @HostBinding("style.height")
    @Input()
    public size = "auto";

    @HostBinding("class.hoverable")
    @Input()
    public hoverable = true;

    @HostBinding("class.disabled")
    @Input()
    public disabled = false;

    @Input() public padding = "0.4rem 0.8rem";

    @HostBinding("style.border-radius")
    @Input()
    public borderRadius = "0.4rem";

    @Input() public type: HTMLButtonTypes = "button";

    @HostBinding("style.justify-content")
    @Input()
    public align: "left" | "center" | "right" = "left";

    @Input() public isActionButton = false;

    @Output() public readonly clicked = new EventEmitter();

    public click(): void {
        if (this.disabled) {
            return;
        }

        this.clicked.emit();
    }
}
