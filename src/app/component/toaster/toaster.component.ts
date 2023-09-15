import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToasterInterface} from "../../shared/interfaces/toaster.interface";

@Component({
  selector: 'toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
    @Input() eventToaster!: ToasterInterface;
    @Output() eventEmitToaster = new EventEmitter<ToasterInterface>()

    constructor() {
      setTimeout(() => {
        this.eventToaster = {...this.eventToaster, run: false};
        this.eventEmitToaster.emit(this.eventToaster);
      }, 5000);
    }
}
