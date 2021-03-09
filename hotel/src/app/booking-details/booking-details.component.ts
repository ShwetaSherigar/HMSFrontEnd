import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../shared/ICustomer';
import { IReservation } from '../shared/IReservation';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  emailId = this.actroute.snapshot.params['emailId'];
  todaysDate = Date.now();


  reservation: IReservation[] = [];
  customerId: any;
  public loggedInUser: ICustomer = {
    customerId: 0,
    name: "",
    phone: "",
    gender: "",
    address: "",
    emailId: "",
    password: ""
  };
  collectionSize: number = 0;
  page = 1;
  pageSize = 4;

  constructor(
    public restApi: RestApiService,
    public router: Router,
    public actroute: ActivatedRoute,
    public datepipe: DatePipe
  ) {

  }

  ngOnInit(): void {

    this.getCustomerId();
  }

  todayDate = this.datepipe.transform(this.todaysDate, 'dd-MM-yyyy');
  getCustomerId() {
    this.restApi.getCustomerId(this.emailId).subscribe((data) => {
      this.customerId = data;
      this.loadReservation();

    });
  }

  edit(reservationId: any) {
    this.router.navigate(['/edit-reservation', reservationId])

  }




  loadReservation() {
    this.restApi.getBookingDetails(this.customerId).subscribe((data) => {
      this.reservation = data;
      this.collectionSize = this.reservation.length;
    });
  }


  cancel(id: any) {

    this.restApi.cancelReservation(id).subscribe((data) => {
      window.alert("Your reservation Cancelled successfully!!");
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
