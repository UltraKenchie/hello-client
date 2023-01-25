import { Overlay, OverlayPositionBuilder, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import {
    ChangeDetectorRef,
    ComponentRef,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef
} from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { getConnectedPositions, OverlayPositions } from "./overlay-positions";
import { TooltipComponent } from "./tooltip.component";

@Directive({
    selector: "[appTooltip]"
})
export class TooltipDirective implements OnInit, OnDestroy {
    @Input("appTooltip") public text = "";
    @Input("appTooltipDisabled") public disabled = false;
    @Input("appTooltipTemplate") public template?: TemplateRef<unknown>;
    @Input("appTooltipTemplateContext") public templateContext: { [key: string]: string };
    @Input("appTooltipPosition") public position: OverlayPositions = "top";
    @Input("appTooltipShow") public show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    @Input("appTooltipType") public type: "boolean" | "click" | "hover" = "hover";
    @Input("appTooltipUseStyles") public useStyles = true;

    // eslint-disable-next-line @angular-eslint/no-output-rename
    @Output("appTooltipOnTemplateDisplay")
    public readonly display: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

    private overlayRef?: OverlayRef;
    private showSubscription: Subscription = Subscription.EMPTY;
    private opened = false;
    private readonly overlayPositionBuilder: OverlayPositionBuilder;
    private readonly elRef: ElementRef<HTMLElement>;
    private readonly overlay: Overlay;
    private readonly cdr: ChangeDetectorRef;

    public constructor(
        elRef: ElementRef<HTMLElement>,
        overlay: Overlay,
        overlayPositionBuilder: OverlayPositionBuilder,
        cdr: ChangeDetectorRef
    ) {
        this.elRef = elRef;
        this.overlay = overlay;
        this.overlayPositionBuilder = overlayPositionBuilder;
        this.cdr = cdr;
    }

    public ngOnInit(): void {
        if (this.type === "click") {
            this.elRef.nativeElement.addEventListener("click", this.onMouseClick.bind(this));
            return;
        }
        if (this.type === "boolean") {
            this.showSubscription = this.show.subscribe((res: boolean) => {
                if (res) {
                    if (!this.opened) {
                        this.opened = true;
                        this.onMouseOver();
                    }
                } else {
                    if (this.opened) {
                        this.hide();
                        this.opened = false;
                    }
                }
            });
            return;
        }

        this.elRef.nativeElement.addEventListener("mouseenter", this.onMouseOver.bind(this));
        this.elRef.nativeElement.addEventListener("mouseleave", this.onMouseOut.bind(this));
    }

    public ngOnDestroy(): void {
        switch (this.type) {
            case "click":
                this.elRef.nativeElement.removeEventListener("click", this.onMouseClick.bind(this));
                break;
            case "hover":
                this.elRef.nativeElement.removeEventListener(
                    "mouseenter",
                    this.onMouseOver.bind(this)
                );
                this.elRef.nativeElement.removeEventListener(
                    "mouseleave",
                    this.onMouseOut.bind(this)
                );
                break;
            case "boolean":
                this.showSubscription.unsubscribe();
                break;
        }

        this.hide();
    }

    public onMouseOver(): void {
        if (!this.disabled) {
            if (!this.overlayRef) {
                this.create(this.elRef, this.position);
            }
            if (this.text) {
                this.showText(this.text);
            } else if (this.template) {
                this.showTemplate(this.template);
            }
            this.cdr.detectChanges();
        }
    }

    private onMouseOut(): void {
        this.hide();
    }

    private onMouseClick(): void {
        if (this.opened) {
            return;
        }

        window.document.addEventListener("click", this.clickOutside.bind(this));
        this.opened = true;

        this.onMouseOver();
    }

    private clickOutside(e: MouseEvent): void {
        if (!this.opened || this.elRef.nativeElement.contains(e.target as Node)) {
            return;
        }
        this.hide();
        this.opened = false;
        window.document.removeEventListener("click", this.clickOutside.bind(this));
    }

    private create(elementRef: ElementRef, position: OverlayPositions): void {
        // timeout??
        const positionStrategy = this.overlayPositionBuilder
            .flexibleConnectedTo(elementRef)
            .withPositions(getConnectedPositions(position));

        this.overlayRef = this.overlay.create({
            scrollStrategy: this.overlay.scrollStrategies.close(),
            positionStrategy
        });
        this.cdr.detectChanges();
    }

    private showText(text: string): void {
        if (text && this.overlayRef) {
            const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(
                new ComponentPortal(TooltipComponent)
            );
            tooltipRef.instance.text = text;
            tooltipRef.instance.useStyles = this.useStyles;
        }
    }

    private showTemplate(template: TemplateRef<unknown>): void {
        if (this.overlayRef) {
            const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(
                new ComponentPortal(TooltipComponent)
            );
            tooltipRef.instance.template = template;
            tooltipRef.instance.templateContext = this.templateContext;
            tooltipRef.instance.useStyles = this.useStyles;
            this.display.emit(tooltipRef.instance.elementRef.nativeElement);
        }
    }

    private hide(): void {
        this.overlayRef?.detach();
        this.cdr.detectChanges();
    }
}
