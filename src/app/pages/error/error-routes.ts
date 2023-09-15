import { RouterModule, Routes } from "@angular/router";
import {ErrorComponent} from "./error.component";

export const errorRouter: Routes = [
  {
    path: '',
    component: ErrorComponent
  }
];

export const ErrorRouter = RouterModule.forChild(errorRouter);
