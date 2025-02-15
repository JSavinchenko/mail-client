import {Injectable} from '@angular/core';
import type {User} from './auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly AUTH_KEY = 'authUser';

  constructor() {
    this.initializeUsers();
  }

  //Инициализация тестовых пользователей
  private initializeUsers() {
    if (!localStorage.getItem(this.USERS_KEY)) {
      const users = [
        {login: 'ivan', password: 'ivan123'},
        {login: 'maria', password: 'maria123'},
        {login: 'vlad', password: 'vlad123'},
        {login: 'alla', password: 'alla123'},
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }
  }

  //Авторизация
  login(login: string, password: string): boolean {
    const users: User[] = JSON.parse(
      localStorage.getItem(this.USERS_KEY) || '[]',
    );
    const user = users.find(
      (u) => u.login === login && u.password === password,
    );

    if (user) {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  //Проверка авторизации
  isAuthenticated(): boolean {
    return localStorage.getItem(this.AUTH_KEY) !== null;
  }

  //Выход
  logout() {
    localStorage.removeItem(this.AUTH_KEY);
  }

  //Получение текущего авторизованного юзера
  getCurrentUser(): {login: string; name: string} | null {
    const user = localStorage.getItem(this.AUTH_KEY);
    return user ? JSON.parse(user) : null;
  }

  //Получение всех проинициализированных юзеров
  getAllUsers(): {login: string; name: string}[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }
}
