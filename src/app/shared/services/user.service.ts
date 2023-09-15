import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {User_listInterface} from "../interfaces/user_list.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUserList = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  getUserList(): Observable<User_listInterface[]> {
    return this.http.get<User_listInterface[]>(this.apiUserList);
  }

  getUser(id: string): Observable<User_listInterface> {
    return this.http.get<User_listInterface>(`${this.apiUserList}/${id}`);
  }

  addUser(user: User_listInterface): Observable<User_listInterface> {
    return this.http.post<User_listInterface>(this.apiUserList, user);
  }

  changeUser(user: User_listInterface): Observable<User_listInterface> {
    return this.http.put<User_listInterface>(`${this.apiUserList}/${user.id}`, user);
  }

  deleteUser(id: string): Observable<User_listInterface> {
    return this.http.delete<User_listInterface>(`${this.apiUserList}/${id}`);
  }
}
