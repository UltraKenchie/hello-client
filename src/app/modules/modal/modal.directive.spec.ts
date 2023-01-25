import { Overlay, OverlayModule } from "@angular/cdk/overlay";
import { TemplateRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { MockProvider } from "ng-mocks";
import { WindowRefService } from "../../core/services/window-ref.service";
import { ModalDirective } from "./modal.directive";

describe("ModalDirective", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [OverlayModule],
            providers: [MockProvider(TemplateRef), MockProvider(WindowRefService)],
            teardown: { destroyAfterEach: true }
        }).compileComponents();
    });

    it("should create an instance", () => {
        const overlay: Overlay = TestBed.inject(Overlay);
        const templateRef: TemplateRef<unknown> = TestBed.inject(TemplateRef);
        const windowRef: WindowRefService = TestBed.inject(WindowRefService);
        const directive = new ModalDirective(templateRef, overlay, windowRef);
        expect(directive).toBeTruthy();
    });
});
