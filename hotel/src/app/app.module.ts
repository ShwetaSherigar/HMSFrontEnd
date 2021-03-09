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
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { DatePipe } from '@angular/common';
import { ReservationService } from './shared/reservation.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PagenotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    RoomListComponent,
    ReservationDetailComponent,
    BookingDetailsComponent,
    EditReservationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [RestApiService,DatePipe,ReservationService],
  bootstrap: [AppComponent],

})
export class AppModule { }
