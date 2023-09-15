import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserViewRouting} from "./user-view.router";
import {UserViewComponent} from "./user-view.component";



@NgModule({
  declarations: [
    UserViewComponent
  ],
  imports: [
    CommonModule,
    UserViewRouting
  ]
})
export class UserViewModule { }
