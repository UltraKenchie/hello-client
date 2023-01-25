import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockComponent } from "ng-mocks";
import { of } from "rxjs";
import { IconComponent } from "../../../../shared/components/icon/icon.component";
import { TableService } from "../../services/table.service";

import { TableColumnComponent } from "./table-column.component";

describe("TableColumnComponent", () => {
    let component: TableColumnComponent;
    let fixture: ComponentFixture<TableColumnComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableColumnComponent, MockComponent(IconComponent)],
            providers: [
                {
                    provide: TableService,
                    useValue: {
                        sort$: of(null)
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TableColumnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
