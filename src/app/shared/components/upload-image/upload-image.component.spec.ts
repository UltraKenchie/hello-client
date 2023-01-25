import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IkImageComponent } from "imagekitio-angular";
import { MockComponent, MockDirective } from "ng-mocks";
import { TooltipDirective } from "../../../modules/tooltip/tooltip.directive";
import { ButtonComponent } from "../button/button.component";
import { IconComponent } from "../icon/icon.component";

import { UploadImageComponent } from "./upload-image.component";

describe("UploadImageComponent", () => {
    let component: UploadImageComponent;
    let fixture: ComponentFixture<UploadImageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                UploadImageComponent,
                MockComponent(IkImageComponent),
                MockComponent(ButtonComponent),
                MockComponent(IconComponent),
                MockDirective(TooltipDirective)
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UploadImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
