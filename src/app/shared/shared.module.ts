import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AlertComponent
    ],
    imports: [
        CommonModule,
        DropdownDirective
    ],
    exports: [
        AlertComponent,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule{

}