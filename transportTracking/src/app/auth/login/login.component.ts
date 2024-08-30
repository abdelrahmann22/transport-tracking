import { Component } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  password = "";
  userName = "";
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  login() {
    this.authService.login(this.userName, this.password).subscribe(
      (response) => {
        console.log("Login successful", response);
        this.authService.saveToken(response.token);
        this.router.navigate(["/map"]);
      },
      (error) => {
        console.error("Login Failed", error);
      },
    );
  }
}
