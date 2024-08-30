import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { MapComponent } from "./map/map.component";
import { BusInfoComponent } from "./bus-info/bus-info.component";
import { RouteListComponent } from "./route-list/route-list.component";
import { RouteDetailComponent } from "./route-detail/route-detail.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./guards/auth.guard";
import { LogoutComponent } from "./auth/logout/logout.component";

const routes: Routes = [
  {
    path: "buses/:busId",
    component: BusInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "route/:id",
    component: RouteDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "route/:routeId",
    component: RouteDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: "routes", component: RouteListComponent, canActivate: [AuthGuard] },
  { path: "map", component: MapComponent, canActivate: [AuthGuard] },
  { path: "auth", component: AuthComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "signup", component: SignupComponent },
  { path: "", redirectTo: "/map", pathMatch: "full" },
  { path: "**", redirectTo: "/map", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
