import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {catchError, map, of} from "rxjs";
import {User_listInterface} from "../interfaces/user_list.interface";


export const userInfoGuard: CanActivateFn = (route, state) => {
  const userServices = inject(UserService);
  const router = inject(Router) as Router;
  const user = userServices.getUser(route.params['id']).pipe(
    map((user: User_listInterface) => !!user ),
    catchError(() =>{
      router.navigate(['error']);
      return of(false);
    })
  )

  return user

};


