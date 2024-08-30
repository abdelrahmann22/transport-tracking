import { Component } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  email = "";
  password = "";
  userName = "";
  firstName = "";
  lastName = "";
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  register() {
    this.authService
      .register(
        this.firstName,
        this.lastName,
        this.userName,
        this.email,
        this.password,
      )
      .subscribe(
        (response) => {
          console.log("Registration successful", response);
          this.router.navigate(["/login"]);
        },
        (error) => {
          console.error("Registration Failed", error);
        },
      );
  }
}
