import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";

@Directive({
  selector: '[appValidateForm]'
})
export class ValidateFormDirective implements OnChanges {
  @Input('control') control!: Validators;
  @Input() errorPassword!: FormGroup

  constructor(
    private eRef: ElementRef,
    private render: Renderer2
  ) {}

  ngOnChanges(): void {
    if (this.control || this.errorPassword) {
      this.render.setStyle(this.eRef.nativeElement,'border', '1px solid red');
      return
    }
    this.render.setStyle(this.eRef.nativeElement,'border', '1px solid #bdbdbd');
  }
}
