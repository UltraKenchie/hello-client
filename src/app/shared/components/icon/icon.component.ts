import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: "app-icon",
    templateUrl: "./icon.component.html",
    styleUrls: ["./icon.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
    @HostBinding("style.margin-right.rem")
    @Input()
    public marginRight = 0;

    @Input() public iconName = "";
    @Input() public size = 2.4;
}
