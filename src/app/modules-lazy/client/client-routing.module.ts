import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientEditComponent } from "./components/client-edit/client-edit.component";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { ClientViewComponent } from "./components/client-view/client-view.component";

const routes: Routes = [
    {
        path: "",
        component: ClientListComponent
    },
    {
        path: "add",
        component: ClientEditComponent
    },
    {
        path: ":id/edit",
        component: ClientEditComponent
    },
    {
        path: ":id",
        component: ClientViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {}
