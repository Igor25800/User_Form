import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Directive({
  selector: '[appValidateForm]'
})
export class ValidateFormDirective implements OnChanges {
  @Input() control!: any;
  @Input() errorPassword!: FormGroup

  constructor(
    private eRef: ElementRef
  ) { }

  ngOnChanges(): void {
    if(this.control || this.errorPassword) {
      this.eRef.nativeElement.style.border = '1px solid red';
      return
    }
    this.eRef.nativeElement.style.border = '1px solid #bdbdbd';
  }

}
