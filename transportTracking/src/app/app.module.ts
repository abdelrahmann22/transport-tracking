import { NgModule } from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
} from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { MapComponent } from "./map/map.component";
import { BusInfoComponent } from "./bus-info/bus-info.component";
import { RouteListComponent } from "./route-list/route-list.component";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { RouteDetailComponent } from "./route-detail/route-detail.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LogoutComponent } from './auth/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MapComponent,
    BusInfoComponent,
    RouteListComponent,
    RouteDetailComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([]),
    CommonModule,
    LeafletModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
