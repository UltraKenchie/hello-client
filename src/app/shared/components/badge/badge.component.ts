import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: "app-badge",
    template: "<ng-content></ng-content>",
    styleUrls: ["./badge.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
    @HostBinding("class")
    @Input()
    public type: "primary" | "secondary" = "primary";
}
