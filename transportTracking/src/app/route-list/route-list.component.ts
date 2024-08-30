import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransportService } from "../service/transport.service";
@Component({
  selector: "app-route-list",
  templateUrl: "./route-list.component.html",
  styleUrl: "./route-list.component.css",
})
export class RouteListComponent implements OnInit {
  routes: any[] = [];

  constructor(
    private transportService: TransportService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this,
      this.transportService.getRoutes().subscribe(
        (data: any) => {
          this.routes = data;
        },
        (error: any) => {
          console.error("Error fetching routes:", error);
        },
      );
  }

  viewRouteDetails(routeId: string) {
    this.router.navigate(["/route", routeId]);
  }
}
