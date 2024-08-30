import { Component } from "@angular/core";
import { AuthService } from "./service/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(public authService: AuthService) {}
  title = "transportTracking";

  selectedBus: any = null;

  onBusSelected(bus: any): void {
    this.selectedBus = bus;
  }
}
