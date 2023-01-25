import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { RouterTestingModule } from "@angular/router/testing";
import { IkImageComponent } from "imagekitio-angular";
import { MockComponent, MockDirective } from "ng-mocks";
import { of } from "rxjs";
import { ClientRepository } from "../../../../core/repositories/client.repository";
import { ModalDirective } from "../../../../modules/modal/modal.directive";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { IconComponent } from "../../../../shared/components/icon/icon.component";

import { ClientViewComponent } from "./client-view.component";

describe("ClientViewComponent", () => {
    let component: ClientViewComponent;
    let fixture: ComponentFixture<ClientViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ClientViewComponent,
                MockComponent(IkImageComponent),
                MockComponent(ButtonComponent),
                MockComponent(IconComponent),
                MockDirective(ModalDirective),
                MockComponent(MatProgressSpinner)
            ],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: ClientRepository,
                    useValue: {
                        one: () => of(null)
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ClientViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
