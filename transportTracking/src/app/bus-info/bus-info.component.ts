import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TransportService } from "../service/transport.service";
@Component({
  selector: "app-bus-info",
  templateUrl: "./bus-info.component.html",
  styleUrl: "./bus-info.component.css",
})
export class BusInfoComponent implements OnInit {
  @Input() bus: any;

  constructor(
    private route: ActivatedRoute,
    private transportService: TransportService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("busId");
    console.log("Bus ID:", id); // Add this line to debug
    if (id) {
      this.transportService.getBusById(id).subscribe(
        (data) => {
          this.bus = data;
        },
        (error) => {
          console.error("Error fetching bus data:", error);
        },
      );
    } else {
      console.error("No bus ID provided");
    }
  }
}
