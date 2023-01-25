import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserViewComponent } from "./components/user-view/user-view.component";

const routes: Routes = [
    {
        path: "",
        component: UserListComponent
    },
    {
        path: "add",
        component: UserEditComponent
    },
    {
        path: ":id/edit",
        component: UserEditComponent
    },
    {
        path: ":id",
        component: UserViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
