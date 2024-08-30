import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { latLng, tileLayer, marker, Map, Marker } from "leaflet";
import { TransportService } from "../service/transport.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  map!: Map;
  busMarkers: { [key: string]: Marker } = {};
  selectedBus: any;

  mapOptions = {
    layers: [
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }),
    ],
    zoom: 13,
    center: latLng(40.7128, -74.006),
  };

  constructor(
    private transportService: TransportService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.transportService.getAllBuses().subscribe((buses) => {
      buses.forEach((bus: any) => {
        this.addOrUpdateBusMarker(bus);
      });
    });
  }

  onMapReady(map: Map): void {
    this.map = map;
  }

  addOrUpdateBusMarker(bus: any): void {
    if (this.busMarkers[bus._id]) {
      this.busMarkers[bus._id].setLatLng([
        bus.location.coordinates[1],
        bus.location.coordinates[0],
      ]);
    } else {
      const newMarker = marker([
        bus.location.coordinates[1],
        bus.location.coordinates[0],
      ]).addTo(this.map);

      newMarker.on("click", () => {
        this.selectedBus = bus;
      });

      this.busMarkers[bus._id] = newMarker;
    }
  }
}
