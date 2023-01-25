import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MockComponent } from "ng-mocks";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { IconComponent } from "../../shared/components/icon/icon.component";

import { ModalComponent } from "./modal.component";

describe("ModalComponent", () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ModalComponent,
                MockComponent(ButtonComponent),
                MockComponent(IconComponent)
            ],
            imports: [BrowserAnimationsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
