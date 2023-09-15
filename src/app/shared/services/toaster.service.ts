import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ToasterInterface} from "../interfaces/toaster.interface";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  eventToaster = new BehaviorSubject<ToasterInterface>({name: '',  run: false, backgroundColor: ''});

  constructor() { }

  openToaster(toaster: ToasterInterface): void {
    this.eventToaster.next(toaster);
  }
}
