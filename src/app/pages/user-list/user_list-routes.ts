import { RouterModule, Routes } from "@angular/router";
import {UserListComponent} from "./user-list.component";

export const userListRouting: Routes = [
  {
    path: '',
    component: UserListComponent
  }
];

export const UserListRouting = RouterModule.forChild(userListRouting);
