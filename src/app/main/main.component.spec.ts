import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MockComponent } from "ng-mocks";
import { IconComponent } from "../shared/components/icon/icon.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavigationComponent } from "./components/navigation/navigation.component";

import { MainComponent } from "./main.component";

describe("MainComponent", () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                MainComponent,
                MockComponent(HeaderComponent),
                MockComponent(NavigationComponent),
                MockComponent(IconComponent)
            ],
            imports: [RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
