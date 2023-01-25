import { OverlayRef, Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import {
    ComponentRef,
    Directive,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    TemplateRef
} from "@angular/core";
import { Subscription } from "rxjs";
import { WindowRefService } from "../../core/services/window-ref.service";
import { ModalComponent } from "./modal.component";

@Directive({
    selector: "[appModal]"
})
export class ModalDirective implements OnDestroy {
    @Input("appModal")
    public get open(): boolean {
        return this._open;
    }

    public set open(value: boolean) {
        this._open = value;
        if (this._open) {
            this.show();
        } else {
            this.hide();
        }
    }

    @Input("appModalCloseOnBackdrop") public closeOnBackdrop = true;
    @Input("appModalTitle") public title = "";
    @Input("appModalShowClose") public showClose = true;

    @Output() public readonly appModalChange = new EventEmitter<boolean>();

    private _open = false;
    private overlayRef?: OverlayRef;

    private readonly subscriptions: Subscription[] = [];
    private readonly overlay: Overlay;
    private readonly templateRef?: TemplateRef<unknown>;
    private readonly windowRefService: WindowRefService;
    public constructor(
        templateRef: TemplateRef<unknown>,
        overlay: Overlay,
        windowRefService: WindowRefService
    ) {
        this.templateRef = templateRef;
        this.windowRefService = windowRefService;
        this.overlay = overlay;
    }

    public show(): void {
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            backdropClass: "cdk-overlay-dark-backdrop",
            panelClass: "g-modal",
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.block()
        });

        this.subscriptions.push(
            this.overlayRef.backdropClick().subscribe(() => {
                if (this.closeOnBackdrop) {
                    this.appModalChange.emit(false);
                    this.overlayRef?.dispose();
                }
            })
        );

        if (this.templateRef) {
            const modalRef: ComponentRef<ModalComponent> = this.overlayRef.attach(
                new ComponentPortal(ModalComponent)
            );
            modalRef.instance.template = this.templateRef;
            modalRef.instance.title = this.title;
            modalRef.instance.showClose = this.showClose;
            this.windowRefService.modals++;
            document.body.style.overflowY = "hidden";
            this.subscriptions.push(
                modalRef.instance.closed.subscribe(() => {
                    this.appModalChange.emit(false);
                    this.windowRefService.modals--;
                    if (this.windowRefService.modals === 0) {
                        document.body.style.overflowY = "unset";
                    }
                    this.overlayRef?.dispose();
                })
            );
        }
    }

    public hide(): void {
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
    }

    public ngOnDestroy(): void {
        this.hide();
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
