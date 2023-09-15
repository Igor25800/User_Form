import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {User_listInterface} from "../../../shared/interfaces/user_list.interface";
import {heaterTable} from "../../../shared/until/until";

@Component({
  selector: 'table-user-list',
  templateUrl: './table-user-list.component.html',
  styleUrls: ['./table-user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableUserListComponent {
  @Input() arrayUserList!: User_listInterface[];
  @Output() eventChangeUser = new EventEmitter<User_listInterface>();
  @Output() eventRoute = new EventEmitter<string>();
  header = heaterTable;
  idActive!: string

  changeUser(user: User_listInterface): void {
    this.idActive = user.id;
    this.eventChangeUser.emit(user);
  }

  userInfo(event: Event, user: User_listInterface): void {
    event.stopPropagation()
    this.eventRoute.emit(user.id);
  }
}
