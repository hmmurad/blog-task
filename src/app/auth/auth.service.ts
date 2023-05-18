import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { map, switchMap, tap, filter, take } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user_api = 'http://localhost:4200/api/users/';

  loggedUser$ = new BehaviorSubject<any>('');

  users: User[] = [
    {
      id: 2,
      username: 'm@m.com',
      password: '123456',
    },
  ];

  constructor(private http: HttpClient) {}

  getUser() {
    this.loggedUser$.asObservable();
  }

  register(username: string, password: string) {
    const data = { username, password };
    this.users.push(data);
    return of(this.users);
  }

  login(username: string, password: string) {
    return of(
      this.users.find(
        (res) => res.username === username && res.password === password
      )
    );
  }

  logout() {}
}
