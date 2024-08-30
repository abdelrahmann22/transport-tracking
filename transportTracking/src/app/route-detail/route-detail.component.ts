import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TransportService } from "../service/transport.service";

@Component({
  selector: "app-route-detail",
  templateUrl: "./route-detail.component.html",
  styleUrls: ["./route-detail.component.css"],
})
export class RouteDetailComponent implements OnInit {
  route_bus: any;
  buses: any[] = [];
  selectedBus: any = null;

  constructor(
    private route: ActivatedRoute,
    private transportService: TransportService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    console.log("route ID:", id); // Add this line to debug
    if (id) {
      this.transportService.getRouteById(id).subscribe(
        (data) => {
          this.route_bus = data;
          this.loadBuses(id);
        },
        (error) => {
          console.error("Error fetching Route data:", error);
        },
      );
    } else {
      console.error("No Route ID provided");
    }
  }
  loadBuses(routeId: string): void {
    this.transportService.getBusesByRouteId(routeId).subscribe(
      (data) => {
        this.buses = data;
      },
      (error) => {
        console.error("Error fetching buses data:", error);
      },
    );
  }
  showBusInfo(bus: any) {
    this.selectedBus = bus;
  }

  hideBusInfo() {
    this.selectedBus = null;
  }
}
