import { Component, EventEmitter, Input, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent {
  @Input() closeModal!: boolean;
  @Input() isToggleModal!: boolean;
  @Input() formUser!: FormGroup;
  @Input() nameModal!: string;
  @Input() submitted = false;
  @Output() eventCloseModal = new EventEmitter<boolean>();
  @Output() eventCreateUser = new EventEmitter();
  @Output() eventChangeUser = new EventEmitter();
  @Output() eventDeleteUser = new EventEmitter();


  eventModal(event: boolean): void {
    this.eventCloseModal.emit(event);
  }

  createUser(): void {
    this.eventCreateUser.emit(this.formUser);
  }

  changeUser(): void {
    this.eventChangeUser.emit(this.formUser);
  }

  deleteUser(): void {
    this.eventDeleteUser.emit();
  }

  validatorControl(name: string): FormControl {
    return this.formUser.get(name) as FormControl;
  }

  validatorForm(name: string): Validators {
    return (this.validatorControl(name).invalid) && (this.validatorControl(name).dirty || (this.validatorControl(name).touched || this.submitted));
  }

  errorMessage(control: string): string {
    if(this.validatorControl(control).getError('required')) {
      return 'required *';
    }
    if(this.validatorControl(control).getError('email')) {
      return 'required @ *';
    }
    if(this.validatorControl(control).getError('minlength')) {
      return 'length password more 8 *';
    }
    if(this.validatorControl(control).getError('pattern')) {
      return 'least one number and one letter *';
    }
    if(this.validatorControl(control).getError('userName')) {
      return 'there is already a user *';
    }
    if(this.formUser.getError('errorPassword')) {
      return 'repeat Password *';
    }
    return 'required'
  }
}
