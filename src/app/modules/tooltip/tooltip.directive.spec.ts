import { Overlay, OverlayPositionBuilder } from "@angular/cdk/overlay";
import { ChangeDetectorRef, Component, ElementRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TooltipDirective } from "./tooltip.directive";

@Component({
    template: "<p [appTooltip]='5'>Testing Directives is awesome!</p>"
})
class TestComponent {}

export class MockElementRef<T> extends ElementRef<T> {
    public override nativeElement: T;
    public constructor(nativeElement: T) {
        super(nativeElement);
    }
}

describe("TooltipDirective", () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: TooltipDirective;
    const mockElementRef: MockElementRef<HTMLElement> = {
        nativeElement: {
            addEventListener: () => {},
            removeEventListener: () => {},
            contains: (): boolean => {
                return false;
            }
        }
    } as unknown as ElementRef;

    const mockOverlay: Overlay = {
        scrollStrategies: {
            close: () => {
                return "close";
            },
            create: () => {}
        }
    } as unknown as Overlay;

    const mockOverlayPositionBuilder = {
        flexibleConnectedTo: () => {
            return {
                withPositions: (): string => {
                    return "new positions strategy";
                }
            };
        }
    } as unknown as OverlayPositionBuilder;

    const mockChangeDetectorRef = {
        detectChanges: () => {}
    } as unknown as ChangeDetectorRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, TooltipDirective],
            providers: [{ provide: ElementRef, useValue: mockElementRef }, Overlay],
            teardown: { destroyAfterEach: true }
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        directive = new TooltipDirective(
            mockElementRef,
            mockOverlay,
            mockOverlayPositionBuilder,
            mockChangeDetectorRef
        );
    });

    it("should create an instance", () => {
        expect(directive).toBeDefined();
    });
});
