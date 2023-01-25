import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BoxComponent } from "../../../shared/components/box/box.component";
import { MockComponent } from "ng-mocks";

import { LoginComponent } from "./login.component";
import { LoginFormComponent } from "../login-form/login-form.component";
import { AuthRepository } from "../../../core/repositories/auth.repository";
import { of } from "rxjs";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                MockComponent(BoxComponent),
                MockComponent(LoginFormComponent),
                MockComponent(MatProgressSpinner)
            ],
            providers: [
                {
                    provide: AuthRepository,
                    useValue: {
                        login: () => of(null)
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
