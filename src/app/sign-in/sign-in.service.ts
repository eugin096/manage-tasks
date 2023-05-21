import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SignInService {
  API_URL = "http://localhost:4001/"
  constructor(private http: HttpClient) { }
  //Service trigger when user clicks on signin from the login page
  login(email: string, password:string){
    return this.http.post<any>(`${this.API_URL}login`, {email, password})
  }
}
