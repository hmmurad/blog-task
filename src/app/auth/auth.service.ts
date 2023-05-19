import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
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
      username: 'murad',
      email: 'm@m.com',
      password: '123456',
    },
  ];

  constructor() {}

  register(username: string, email: string, password: string) {
    const data = { username, email, password };
    this.users.push(data);
    return of(this.users);
  }

  login(email: string, password: string) {
    const user = this.users.find(
      (res) => res.email === email && res.password === password
    );
    if (user) {
      this.loggedUser$.next(user);
      return of(user);
    } else {
      throw new Error('wrong credentials');
    }
  }

  logout() {
    return this.loggedUser$.next('');
  }
}
