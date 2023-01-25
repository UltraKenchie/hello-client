import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent } from "ng-mocks";
import { of } from "rxjs";
import { AuthRepository } from "../../../../core/repositories/auth.repository";
import { UserFormComponent } from "../user-form/user-form.component";

import { UserEditComponent } from "./user-edit.component";

describe("UserEditComponent", () => {
    let component: UserEditComponent;
    let fixture: ComponentFixture<UserEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserEditComponent, MockComponent(UserFormComponent)],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: AuthRepository,
                    useValue: {
                        create: () => of(null),
                        delete: () => of(null)
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
