import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RestApiService } from './shared/rest-api.service';
import { HttpClientModule } from '@angular/common/http';
import { RoomListComponent } from './room-list/room-list.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PagenotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    RoomListComponent,
    ReservationDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
