import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MockComponent, MockDirective } from "ng-mocks";
import { ModalDirective } from "../../../../modules/modal/modal.directive";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { IconComponent } from "../../../../shared/components/icon/icon.component";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { UploadImageComponent } from "../../../../shared/components/upload-image/upload-image.component";

import { UserFormComponent } from "./user-form.component";

describe("UserFormComponent", () => {
    let component: UserFormComponent;
    let fixture: ComponentFixture<UserFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                UserFormComponent,
                MockComponent(InputComponent),
                MockComponent(IconComponent),
                MockComponent(ButtonComponent),
                MockComponent(UploadImageComponent),
                MockDirective(ModalDirective),
                MockComponent(MatProgressSpinner)
            ],
            imports: [ReactiveFormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(UserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
