import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {User_listInterface} from "../../shared/interfaces/user_list.interface";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent  implements OnInit {
  userInfo!: Observable<User_listInterface>;

  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._getInfoUser();
  }

  _getInfoUser(): void {
    const idParams = this.activateRoute.snapshot.params['id'];
    this.userInfo = this.userService.getUser(idParams);
  }

}
