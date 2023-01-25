import { TemplateRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TooltipComponent } from "./tooltip.component";

describe("TooltipComponent", () => {
    let component: TooltipComponent;
    let fixture: ComponentFixture<TooltipComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TooltipComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TooltipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should set template", () => {
        const spyDetectChanges = spyOn((component as any).cdr, "detectChanges").and.callFake(
            () => {}
        );
        component.template = {} as unknown as TemplateRef<any>;
        expect(spyDetectChanges).toHaveBeenCalled();
    });

    it("should set text", () => {
        const spyDetectChanges = spyOn((component as any).cdr, "detectChanges").and.callFake(
            () => {}
        );
        expect(component.text).toBe("");
        component.text = "new text";
        expect(spyDetectChanges).toHaveBeenCalled();
        expect(component.text).toBe("new text");
    });

    it("should use styles", () => {
        const spyDetectChanges = spyOn((component as any).cdr, "detectChanges").and.callFake(
            () => {}
        );
        expect(component.useStyles).toBeTruthy();
        component.useStyles = false;
        expect(spyDetectChanges).toHaveBeenCalled();
        expect(component.text).toBeFalsy();
    });
});
