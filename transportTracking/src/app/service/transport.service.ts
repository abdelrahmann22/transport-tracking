import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class TransportService {
  private apiURL = "http://localhost:5000";
  constructor(private http: HttpClient) {}

  // Buses
  getAllBuses(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/buses`);
  }
  getBusById(busId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/buses/${busId}`);
  }
  createBus(busId: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/buses`, busId);
  }
  updateBus(busId: string, bus: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/buses/${busId}`, busId);
  }
  deleteBus(busId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/buses/${busId}`);
  }

  //Routes
  getRoutes(): Observable<any> {
    return this.http.get(`${this.apiURL}/routes`);
  }

  getRouteById(routeId: string): Observable<any> {
    return this.http.get(`${this.apiURL}/routes/${routeId}`);
  }
  getBusesByRouteId(routeId: string): Observable<any> {
    return this.http.get(`${this.apiURL}/buses?routeId=${routeId}`);
  }
  createRoute(route: any): Observable<any> {
    return this.http.post(`${this.apiURL}/routes`, route);
  }

  deleteRoute(routeId: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/routes/${routeId}`);
  }
}
