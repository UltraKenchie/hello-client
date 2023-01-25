import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { HeaderComponent } from "./components/header/header.component";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./components/login/login.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginFormComponent } from "./components/login-form/login-form.component";

@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        LoginComponent,
        LoginFormComponent,
        NavigationComponent
    ],
    imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterModule],
    exports: [MainComponent, LoginComponent]
})
export class MainModule {}
