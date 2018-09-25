import { Injectable } from '@angular/core';

const usernameKey: string = 'username';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  setUserName(firstname, lastname) {
    const username = localStorage.getItem(usernameKey);
    if (username) {
      localStorage.removeItem(usernameKey);
    }
    localStorage.setItem(usernameKey, `${firstname} ${lastname}`);
  }

  getUserName(): string {
    const username = localStorage.getItem(usernameKey);
    if (username) {
      return username;
    }
    return null;
  }
}
