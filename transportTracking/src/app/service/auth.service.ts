import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:5000/auth";

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userName, password });
  }

  register(
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
  ) {
    return this.http.post(`${this.apiUrl}/register`, {
      firstName,
      lastName,
      userName,
      email,
      password,
    });
  }

  saveToken(token: string): void {
    localStorage.setItem("authToken", token);
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  logout(): void {
    localStorage.removeItem("authToken");
  }
}
