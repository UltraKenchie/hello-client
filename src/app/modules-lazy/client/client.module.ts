import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ClientRoutingModule } from "./client-routing.module";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { ClientViewComponent } from "./components/client-view/client-view.component";
import { SharedModule } from "../../shared/shared.module";
import { TableModule } from "../../modules/table/table.module";
import { TooltipModule } from "../../modules/tooltip/tooltip.module";
import { RouterModule } from "@angular/router";
import { ClientEditComponent } from "./components/client-edit/client-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ClientFormComponent } from "./components/client-form/client-form.component";
import { ModalModule } from "../../modules/modal/modal.module";

@NgModule({
    declarations: [
        ClientListComponent,
        ClientViewComponent,
        ClientEditComponent,
        ClientFormComponent
    ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule,
        TooltipModule,
        ModalModule,
        TableModule
    ]
})
export class ClientModule {}
