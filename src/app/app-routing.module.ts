import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {userInfoGuard} from "./shared/guards/user-info.guard";

const routes: Routes = [
  {
    path: 'user_List',
    loadChildren: () => import('./pages/user-list/user-list.module').then(m => m.UserListModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'user_List/:id',
    loadChildren: () => import('./pages/user-view/user-view.module').then(m => m.UserViewModule),
    canActivate: [userInfoGuard]
  },
  {
    path: '',
    redirectTo: 'user_List',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
