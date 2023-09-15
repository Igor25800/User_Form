import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToasterComponent} from "../../component/toaster/toaster.component";
import {ValidateFormDirective} from "../directives/validate-form.directive";



@NgModule({
  declarations: [
    ToasterComponent,
    ValidateFormDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToasterComponent,
    ValidateFormDirective
  ]
})
export class SharedModule { }
