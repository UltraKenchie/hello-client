import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MockComponent, MockDirective } from "ng-mocks";
import { ModalDirective } from "../../../../modules/modal/modal.directive";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { IconComponent } from "../../../../shared/components/icon/icon.component";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { SelectComponent } from "../../../../shared/components/select/select.component";
import { UploadImageComponent } from "../../../../shared/components/upload-image/upload-image.component";

import { ClientFormComponent } from "./client-form.component";

describe("ClientFormComponent", () => {
    let component: ClientFormComponent;
    let fixture: ComponentFixture<ClientFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ClientFormComponent,
                MockComponent(InputComponent),
                MockComponent(SelectComponent),
                MockComponent(ButtonComponent),
                MockComponent(IconComponent),
                MockComponent(UploadImageComponent),
                MockDirective(ModalDirective),
                MockComponent(MatProgressSpinner)
            ],
            imports: [ReactiveFormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ClientFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
