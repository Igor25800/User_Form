import { RouterModule, Routes } from "@angular/router";
import {UserViewComponent} from "./user-view.component";


export const userViewRouting: Routes = [
  {
    path: '',
    component: UserViewComponent
  }
];

export const UserViewRouting = RouterModule.forChild(userViewRouting);
