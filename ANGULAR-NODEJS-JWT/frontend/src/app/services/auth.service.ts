import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://localhost:3000/api";

  constructor(private http:HttpClient, private router:Router) { }

  signUp(user):Observable<any>{
    return this.http.post(`${this.URL}/signup`,user);
  }

  singIn(user):Observable<any>{
    return this.http.post(`${this.URL}/signin`,user);
  }

  loggedIn(){
    return !!localStorage.getItem("token");
  }

  getToken(){
    return localStorage.getItem("token");
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(["/signin"]);
  }

}
