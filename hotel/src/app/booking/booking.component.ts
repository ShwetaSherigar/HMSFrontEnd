import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @Input() bookingDetails: any = { checkIn: '', checkOut: '' }
  today = new Date();
  public dateDifference = 0;
  public totalPrice = 0;
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (!this.restApi.selectedRoom.price) {
      this.router.navigate(['/room-list']);
    }
  }
  proceedBooking(): void {
    let startDate = new Date(this.bookingDetails.checkIn);
    let endDate = new Date(this.bookingDetails.checkOut);
    this.dateDifference = (endDate.getTime() - startDate.getTime()) / 60000;
    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    this.dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let pricePerDay = this.restApi.selectedRoom && this.restApi.selectedRoom.price;
    if (this.restApi.selectedRoom) {
      this.totalPrice = this.dateDifference * pricePerDay;
    }
  }
  onConfirmation(){
    alert("Your Booking submitted successfully");
  }
}
