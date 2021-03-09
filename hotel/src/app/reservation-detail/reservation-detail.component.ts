import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../shared/ICustomer';
import { IReservation } from '../shared/IReservation';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {

  customerId = this.actroute.snapshot.params['id'];

  reservation: IReservation[] = [];
  todaysDate = Date.now();
  public loggedInUser: ICustomer = {
    customerId: 0,
    name: "",
    phone: "",
    gender: "",
    address: "",
    emailId: "",
    password: ""
  };

  constructor(
    public restApi: RestApiService,
    public router: Router,
    public actroute: ActivatedRoute,
    public datepipe:DatePipe
  ) {

  }

  ngOnInit(): void {
    this.loadReservation();

  }

  edit(reservationId: any) {
    this.router.navigate(['/edit-reservation', reservationId])

  }




  loadReservation() {
    this.restApi.getBookingDetails(this.customerId).subscribe((data) => {
      this.reservation = data;
    });
  }


  cancel(id: any) {

    this.restApi.cancelReservation(id).subscribe((data) => {
      window.alert("Your reservation cancelled successfully!!");
      this.loadReservation();
    });


  }

  isDate(checkIn:any):any
  {
    let checkInDate = this.datepipe.transform(checkIn, 'dd-MM-yyyy');
    let todaysDate = this.datepipe.transform(this.todaysDate, 'dd-MM-yyyy');
    if(checkInDate!=null && todaysDate!=null)
    {
      if(checkInDate<=todaysDate)
      {
        return false;
      }
      else
      {
        return true;
      }
    }
  }

}

