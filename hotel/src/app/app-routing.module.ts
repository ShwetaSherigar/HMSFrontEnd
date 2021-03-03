import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BookingComponent } from './booking/booking.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { RoomListComponent } from './room-list/room-list.component';

const routes: Routes = [
  {path : '' , pathMatch: 'full', redirectTo:'home'},
  {path : 'home' , component : HomeComponent},
  {path : 'login' , component :LoginComponent},
  {path : 'room-list' , component :RoomListComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'booking' , component : BookingComponent},
  {path : 'aboutus' , component : AboutusComponent},
  {path : 'contactus' , component : ContactusComponent},
  {path : 'forgot-password' , component : ForgotPasswordComponent},
  {path : '**' , component : PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents =[HomeComponent,RoomListComponent,ForgotPasswordComponent,RegisterComponent,BookingComponent,ContactusComponent,LoginComponent,AboutusComponent,PagenotfoundComponent];