import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent } from "ng-mocks";
import { of } from "rxjs";
import { AuthRepository } from "../../../../core/repositories/auth.repository";
import { ClientRepository } from "../../../../core/repositories/client.repository";
import { ClientFormComponent } from "../client-form/client-form.component";

import { ClientEditComponent } from "./client-edit.component";

describe("ClientEditComponent", () => {
    let component: ClientEditComponent;
    let fixture: ComponentFixture<ClientEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClientEditComponent, MockComponent(ClientFormComponent)],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: ClientRepository,
                    useValue: {
                        one: () => of(null)
                    }
                },
                {
                    provide: AuthRepository,
                    useValue: {
                        list: () => of([])
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ClientEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
