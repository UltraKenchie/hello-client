import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: "app-box",
    template: "<ng-content></ng-content>",
    styleUrls: ["./box.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent {
    @HostBinding("class.flex")
    @Input()
    public flex = false;

    @HostBinding("style.min-width")
    @Input()
    public minWidth = "15rem";

    @HostBinding("style.padding.rem")
    @Input()
    public padding = 2.4;

    @HostBinding("class.background")
    @Input()
    public background = false;
}
