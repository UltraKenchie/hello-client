import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockComponent, MockProvider } from "ng-mocks";
import { of } from "rxjs";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { SelectComponent } from "../../../../shared/components/select/select.component";
import { TableService } from "../../services/table.service";

import { TablePaginationComponent } from "./table-pagination.component";

describe("TablePaginationComponent", () => {
    let component: TablePaginationComponent;
    let fixture: ComponentFixture<TablePaginationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TablePaginationComponent,
                MockComponent(ButtonComponent),
                MockComponent(SelectComponent)
            ],
            providers: [
                {
                    provide: TableService,
                    useValue: {
                        meta$: of(null)
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TablePaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
