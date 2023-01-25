import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserViewComponent } from "./components/user-view/user-view.component";
import { SharedModule } from "../../shared/shared.module";
import { RouterModule } from "@angular/router";
import { TableModule } from "../../modules/table/table.module";
import { TooltipModule } from "../../modules/tooltip/tooltip.module";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "../../modules/modal/modal.module";

@NgModule({
    declarations: [UserListComponent, UserViewComponent, UserFormComponent, UserEditComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        TableModule,
        TooltipModule,
        RouterModule,
        ModalModule,
        AdminRoutingModule
    ]
})
export class AdminModule {}
