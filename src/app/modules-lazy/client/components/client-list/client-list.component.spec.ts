import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MockComponent, MockDirective } from "ng-mocks";
import { RouterTestingModule } from "@angular/router/testing";

import { ClientListComponent } from "./client-list.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { IconComponent } from "../../../../shared/components/icon/icon.component";
import { TableComponent } from "../../../../modules/table/components/table/table.component";
import { TableRowComponent } from "../../../../modules/table/components/table-row/table-row.component";
import { TableColumnComponent } from "../../../../modules/table/components/table-column/table-column.component";
import { TooltipDirective } from "../../../../modules/tooltip/tooltip.directive";
import { BadgeComponent } from "../../../../shared/components/badge/badge.component";
import { of } from "rxjs";
import { ClientRepository } from "../../../../core/repositories/client.repository";
import { IkImageComponent } from "imagekitio-angular";
import { ModalDirective } from "../../../../modules/modal/modal.directive";

describe("ClientListComponent", () => {
    let component: ClientListComponent;
    let fixture: ComponentFixture<ClientListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ClientListComponent,
                MockComponent(ButtonComponent),
                MockComponent(TableComponent),
                MockComponent(TableRowComponent),
                MockComponent(TableColumnComponent),
                MockComponent(IconComponent),
                MockComponent(BadgeComponent),
                MockDirective(TooltipDirective),
                MockComponent(IkImageComponent),
                MockDirective(ModalDirective)
            ],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: ClientRepository,
                    useValue: {
                        list: () => of([])
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ClientListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
