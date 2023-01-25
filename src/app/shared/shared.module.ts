import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IconComponent } from "./components/icon/icon.component";
import { BoxComponent } from "./components/box/box.component";
import { InputComponent } from "./components/input/input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "./components/button/button.component";
import { BadgeComponent } from "./components/badge/badge.component";
import { SelectComponent } from "./components/select/select.component";
import { UploadImageComponent } from "./components/upload-image/upload-image.component";
import { TooltipModule } from "../modules/tooltip/tooltip.module";
import { ImagekitioAngularModule } from "imagekitio-angular";
import { environment } from "../../environments/environment";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
    declarations: [
        IconComponent,
        BoxComponent,
        InputComponent,
        ButtonComponent,
        BadgeComponent,
        SelectComponent,
        UploadImageComponent
    ],
    imports: [
        CommonModule,
        ImagekitioAngularModule.forRoot({
            publicKey: environment.imageKit.publicKey,
            urlEndpoint: environment.imageKit.endpoint
        }),
        TooltipModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
    exports: [
        IconComponent,
        BoxComponent,
        InputComponent,
        ButtonComponent,
        BadgeComponent,
        SelectComponent,
        UploadImageComponent,
        ImagekitioAngularModule,
        MatProgressSpinnerModule
    ]
})
export class SharedModule {}
