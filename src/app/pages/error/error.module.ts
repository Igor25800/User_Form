import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorRouter} from "./error-routes";
import {ErrorComponent} from "./error.component";



@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRouter
  ]
})
export class ErrorModule { }
