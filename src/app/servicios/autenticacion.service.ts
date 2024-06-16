import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}

  login(user: { username: string; password: string }): Observable<any> {
    return this.http
      .post<any>('http://44.209.101.20/api/login_check', user)
      .pipe(
        tap((tokens) => {
          this.doLoginUser(user.username, tokens);
          this.router.navigate(['/admin-listado']);
        })
      );
  }
  isLoggedIn() {
    if(localStorage.getItem(this.JWT_TOKEN) != null){
      return true;
    }else{
      return false;
    }
  }
  private doLoginUser(username: string, tokens: any) {
    this.storeJwtToken(tokens.token);
    this.isAuthenticatedSubject.next(true);
  }
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }
}
