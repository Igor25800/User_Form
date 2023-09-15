import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";
import * as uuid from 'uuid';
import { map, Observable, of, switchMap} from "rxjs";
import {User_listInterface} from "../../shared/interfaces/user_list.interface";
import {ToasterService} from "../../shared/services/toaster.service";
import {ToasterInterface} from "../../shared/interfaces/toaster.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList!: Observable<User_listInterface[]>
  isCloseModal: boolean = false;
  isToggleModal: boolean = false;
  submitted!: boolean;
  textToaster!: string;
  colorToaster!: string;
  nameModal!: string;
  formUser!: FormGroup;
  toaster!: Observable<ToasterInterface>;
  uuidUserChange!: string;
  private destroyRef = inject(DestroyRef);

  constructor(
    private userService: UserService,
    private toasterService: ToasterService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this._getUserList();
    this._getFromUser();
    this.toaster = this.toasterService.eventToaster;
  }

  nextRouter(id: string): void {
    this.router.navigate(['user_List', id]);
  }

  changeUser(user: User_listInterface): void {
    this.formUser.controls['username'].clearAsyncValidators();
    this.formUser.controls['username'].updateValueAndValidity();
    const userForm = this.removeProperty('id', user);
    this.formUser.patchValue({...userForm, repeat_password: user.password});
    this.isCloseModal = true;
    this.nameModal = user.username;
    this.isToggleModal = true;
    this.uuidUserChange = user.id;
  }

  saveChangeUser({value}: FormGroup): void {
    if(this.formUser.invalid) {
      this.submitted = true;
      this.toasterService.openToaster({backgroundColor: '#EF7DA0', run: true, name: 'Invalid'});
      return ;
    }
    this.userService.changeUser({...value, id: this.uuidUserChange}).pipe(
      switchMap(() => this.userService.getUserList())
    ).subscribe((userList: User_listInterface[]) => {
      this.userList = of(userList);
      this.isCloseModal = false;
      this.toasterService.openToaster({backgroundColor: '#66bb6a', run: true, name: 'change User'});
    })
  }

  deleteUser(): void {
    this.userService.deleteUser(this.uuidUserChange).pipe(
      switchMap(() => this.userService.getUserList())
    ).subscribe((userList: User_listInterface[]) => {
      this.userList = of(userList);
      this.toasterService.openToaster({backgroundColor: '#66bb6a', run: true, name: 'delete User'});
      this.isCloseModal = false;
    })
  }

  eventModal(event: boolean): void {
    this.formUser.controls['username'].setAsyncValidators(this._nameValidatorServer.bind(this));
    this.formUser.controls['username'].updateValueAndValidity();
    this.formUser.markAsUntouched();
    this.formUser.reset();
    this.nameModal = 'Create New User'
    this.isToggleModal = false;
    this.submitted = false;
    this.isCloseModal = event;
  }

  createUser(formUser: FormGroup): void {
    if(this.formUser.invalid) {
      this.submitted = true;
      this.toasterService.openToaster({backgroundColor: '#EF7DA0', run: true, name: 'Invalid'});
      return ;
    }
    this.userService.addUser({...formUser.value, id: uuid.v4()}).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => this.userService.getUserList())
    ).subscribe((user: User_listInterface[]) => {
      this.toasterService.openToaster({backgroundColor: '#66bb6a', run: true, name: 'add User'});
      this.userList = of(user);
      this.formUser.reset();
      this.isCloseModal = false;
    });
  }

  eventToaster(eventToaster: ToasterInterface): void {
    this.toasterService.openToaster(eventToaster);
  }

  private _getUserList(): void {
    this.userList = this.userService.getUserList();
  }

  private _getFromUser(): void {
    this.formUser = new FormGroup({
      username: new FormControl('', Validators.required, this._nameValidatorServer.bind(this)),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      user_type: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,
        Validators.max(8),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]),
      repeat_password: new FormControl('', [Validators.required,
        Validators.max(8),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')])
    }, {validators: this.customValidatePassword})
  }

  private customValidatePassword(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('repeat_password')?.value;
    return password === confirmPassword ? null : {errorPassword: true};
  }

  private _nameValidatorServer(control: AbstractControl): Observable<ValidationErrors> {
    return this.userService.getUserList().pipe(
      map((personEmail: User_listInterface[]) =>
        personEmail.filter((item: User_listInterface) => item.username.toLowerCase().trim() === control.value.toLowerCase().trim())
      ),
      map((user: User_listInterface[]) => {
        if (user.length) {
          return <ValidationErrors>{userName: true};
        }
        return null;
      }),
    ) as Observable<ValidationErrors>
  }

  private removeProperty = (propKey: string, {[propKey]: propValue, ...rest}) => rest;
}
