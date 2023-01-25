import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { IkImageComponent } from "imagekitio-angular";
import { MockComponent, MockDirective } from "ng-mocks";
import { of } from "rxjs";
import { AuthRepository } from "../../../../core/repositories/auth.repository";
import { ModalDirective } from "../../../../modules/modal/modal.directive";
import { TableColumnComponent } from "../../../../modules/table/components/table-column/table-column.component";
import { TableRowComponent } from "../../../../modules/table/components/table-row/table-row.component";
import { TableComponent } from "../../../../modules/table/components/table/table.component";
import { TooltipDirective } from "../../../../modules/tooltip/tooltip.directive";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { IconComponent } from "../../../../shared/components/icon/icon.component";

import { UserListComponent } from "./user-list.component";

describe("UserListComponent", () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                UserListComponent,
                MockComponent(ButtonComponent),
                MockComponent(IconComponent),
                MockComponent(TableComponent),
                MockComponent(TableRowComponent),
                MockComponent(TableColumnComponent),
                MockComponent(IkImageComponent),
                MockDirective(TooltipDirective),
                MockDirective(ModalDirective)
            ],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: AuthRepository,
                    useValue: {
                        list: () => of([]),
                        delete: () => of(null)
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
