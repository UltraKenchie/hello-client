import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "./core/guards/admin.guard";
import { AuthGuard } from "./core/guards/auth.guard";
import { NoAuthGuard } from "./core/guards/no-auth.guard";
import { LoginComponent } from "./main/components/login/login.component";
import { MainComponent } from "./main/main.component";
import { MainModule } from "./main/main.module";

const appRoutes: Routes = [
    {
        path: "",
        component: MainComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: "",
                redirectTo: "clients",
                pathMatch: "full"
            },
            {
                path: "clients",
                loadChildren: () =>
                    import("./modules-lazy/client/client.module").then(
                    (module) => module.ClientModule
                    )
            },
            {
                path: "admin",
                canActivateChild: [AdminGuard],
                loadChildren: () =>
                    import("./modules-lazy/admin/admin.module").then((module) => module.AdminModule)
            }
        ]
    },
    {
        path: "login",
        canActivate: [NoAuthGuard],
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            onSameUrlNavigation: "reload"
        }),
        MainModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
