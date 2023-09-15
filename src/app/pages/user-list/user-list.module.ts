import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserListComponent} from "./user-list.component";
import {UserListRouting} from "./user_list-routes";
import { TableUserListComponent } from './table-user-list/table-user-list.component';
import {SharedModule} from "../../shared/module/shared.module";
import { UserModalComponent } from './user-modal/user-modal.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UserListComponent,
    TableUserListComponent,
    UserModalComponent
  ],
  imports: [
    CommonModule,
    UserListRouting,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class UserListModule { }
