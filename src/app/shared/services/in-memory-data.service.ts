import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService  {
  userList = [
    {
      "id" : "9c26fd66-ee79-43e9-8d38-0e51a73483fa",
      "username": "Igor1111",
      "first_name": "Igor",
      "last_name": "Fedor",
      "email": "igor1111@gmail.com",
      "password": "igor1111",
      "user_type": "Admin"
    },
    {
      "id" : "230b97a4-41da-458c-a011-d7060835d852",
      "username": "Masha",
      "first_name": "Masha",
      "last_name": "Darava",
      "email": "Masha1111@gmail.com",
      "password": "Masha1111",
      "user_type": "Admin"
    },
    {
      "id" : "bde9989c-3258-48e8-928e-cc08b1b4912f",
      "username": "Dasha",
      "first_name": "Dasha",
      "last_name": "Fayamara",
      "email": "Dasha1111@gmail.com",
      "password": "Dasha1111",
      "user_type": "Driver"
    },
    {
      "id" : "d58c4a61-07ae-45da-bb41-267ce1692d0c",
      "username": "Olay",
      "first_name": "Olay",
      "last_name": "Fedor",
      "email": "Olay1111@gmail.com",
      "password": "Olay1111",
      "user_type": "Driver"
    }
  ]

  constructor() { }

  createDb() {
    const userList = this.userList;
    return {userList};
  }
}
