
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../shared/ICustomer';
import { IReservation } from '../shared/IReservation';
import { IRoom } from '../shared/IRoom';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {



  reservationId = this.actroute.snapshot.params['reservationId'];

  EditDetails: any;

  rooms: IRoom[] = [];

  public today = new Date();
  public minDateCheckOut = new Date();
  checkIn: any;
  checkOut: any;
  bookedRooms: any;
  roomNos: any;
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
    public datepipe: DatePipe


  ) { }

  ngOnInit(): void {

    this.loadReservationforReservation();
    //this.getPriceAfterRoomType('');
    this.getRoomTypes()


  }

  reservedRoomDetails() {
    this.restApi.getBookedRoomDetails(this.EditDetails.selectedRoomType).subscribe((data) => {
      console.log(data);
      console.log(this.EditDetails.selectedRoomType);
      this.bookedRooms = data;
      this.updateBooking();
    })
  }


  loadReservationforReservation() {
    this.restApi.getBookingDetailsbyReservationId(this.reservationId).subscribe((data) => {
      this.EditDetails = data;

    });
  }

  EditBooking() {

    this.reservedRoomDetails();
  }

  updateBooking() {
    let mapObj = new Map<string, IReservation[]>();

    for (let index = 0; index < this.bookedRooms.length; index++) {
      let tempBookedRooms: IReservation[] = [];

      if (mapObj.has(this.bookedRooms[index].roomNo)) {
        tempBookedRooms = mapObj.get(this.bookedRooms[index].roomNo) as IReservation[];
        tempBookedRooms.push(this.bookedRooms[index]);
        mapObj.set(this.bookedRooms[index].roomNo, tempBookedRooms);
      }
      else {
        tempBookedRooms.push(this.bookedRooms[index]);
        mapObj.set(this.bookedRooms[index].roomNo, tempBookedRooms);
      }
    }
    console.log(mapObj);
    for (let key of mapObj.keys()) {
      let reservedRoomsByRoomNo = mapObj.get(key) as IReservation[];
      for (let index = 0; index < reservedRoomsByRoomNo.length; index++) {
        let dbCheckIn = this.datepipe.transform(reservedRoomsByRoomNo[index].checkIn, 'dd-MM-yyyy');
        let dbCheckOut = this.datepipe.transform(reservedRoomsByRoomNo[index].checkOut, 'dd-MM-yyyy');
        let checkIn = this.datepipe.transform(this.EditDetails.checkIn, 'dd-MM-yyyy');
        let checkOut = this.datepipe.transform(this.EditDetails.checkOut, 'dd-MM-yyyy');

        if (checkIn != null && checkOut != null && dbCheckIn != null && dbCheckOut != null) {

          if (checkIn >= dbCheckIn && checkIn <= dbCheckOut) {
            this.restApi.allocateStatus(reservedRoomsByRoomNo[index].roomNo, "BOOKED").subscribe((data) => { });
            break;
          }
          else if (checkOut >= dbCheckIn && checkOut <= dbCheckOut) {
            this.restApi.allocateStatus(reservedRoomsByRoomNo[index].roomNo, "BOOKED").subscribe((data) => { });
            break;
          }
          else if (checkIn < dbCheckIn && checkOut >= dbCheckIn) {
            this.restApi.allocateStatus(reservedRoomsByRoomNo[index].roomNo, "BOOKED").subscribe((data) => { });
            break;
          }
          else {
            this.restApi.allocateStatus(reservedRoomsByRoomNo[index].roomNo, "AVAILABLE").subscribe((data) => { });
          }
        }
      }
    }
    console.log(this.EditDetails);
    console.log(this.EditDetails.selectedRoomType);
    this.restApi.getAllRoomNO(this.EditDetails.selectedRoomType).subscribe((data) => {
      console.log(data);
      this.roomNos = data;
      console.log(this.roomNos);
      if (this.roomNos != null) {
        this.EditDetails.roomNo = this.roomNos[0];
        this.restApi.editReservation(this.EditDetails, this.reservationId).subscribe((data) => {
          this.restApi.allocateStatus(this.EditDetails.roomNo, 'BOOKED').subscribe((data) => { });
          window.alert("updated successfully");
          this.router.navigate(['/reservation-detail', this.EditDetails.customerId])
        });
      }
      else {
        window.alert("No rooms available");
      }
    })

  }

  Price: number = 0;
  getPriceAfterRoomType(roomType: String) {
    this.restApi.getPrice(roomType).subscribe((data) => {

      this.Price = data;

      let dateDifference = 0;
      let startDate = new Date(this.EditDetails.checkIn);
      let endDate = new Date(this.EditDetails.checkOut);
      dateDifference = (endDate.getTime() - startDate.getTime()) / 60000;
      var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.EditDetails.totalPrice = (this.Price) * dateDifference;

    });

  }

  roomTypes: any;
  getRoomTypes() {
    this.restApi.getRoomTypes().subscribe((data) => {
      this.roomTypes = data;
    })
  }
  emptyCheckOut() {
    this.checkOut = this.EditDetails.checkOut;
    if (this.checkOut) {
      this.checkOut = null;
    }
    this.minDateCheckOut = this.getMinDate();
  }
  getMinDate() {
    this.checkIn = this.EditDetails.checkIn;
    var nextDay: Date;
    nextDay = new Date(this.checkIn);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  }
}




