import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { RouterTestingModule } from "@angular/router/testing";
import { IkImageComponent } from "imagekitio-angular";
import { MockComponent, MockDirective } from "ng-mocks";
import { of } from "rxjs";
import { AuthRepository } from "../../../../core/repositories/auth.repository";
import { ModalDirective } from "../../../../modules/modal/modal.directive";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { IconComponent } from "../../../../shared/components/icon/icon.component";

import { UserViewComponent } from "./user-view.component";

describe("UserViewComponent", () => {
    let component: UserViewComponent;
    let fixture: ComponentFixture<UserViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                UserViewComponent,
                MockComponent(IkImageComponent),
                MockComponent(ButtonComponent),
                MockComponent(IconComponent),
                MockComponent(MatProgressSpinner),
                MockDirective(ModalDirective)
            ],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: AuthRepository,
                    useValue: {
                        one: () => of(null)
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
