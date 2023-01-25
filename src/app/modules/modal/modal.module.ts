import { NgModule } from "@angular/core";
import { ModalComponent } from "./modal.component";
import { ModalDirective } from "./modal.directive";
import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [ModalComponent, ModalDirective],
    imports: [CommonModule, SharedModule, OverlayModule],
    exports: [ModalDirective]
})
export class ModalModule {}
