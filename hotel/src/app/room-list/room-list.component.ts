import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from '../shared/ICustomer';
import { IReservation } from '../shared/IReservation';
import { IRoom } from '../shared/IRoom';
import { RestApiService } from '../shared/rest-api.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  reservationDetails: any = { checckIn: '', checkOut: '', roomNo: '', customerId: 0, totalPrice: '', selectedRoomType: '' }
  i: any;
  rooms: IRoom[] = [];
  bookedRooms: IReservation[] = [];
  resrvationd: [] = [];
  roomType: any = "";
  capacity: number = 0;
  price: number = 0;
  noOfRooms: number = 0;
  roomTypes: any;
  pricePerRoom: number = 0;
  checkIn: any;
  checkOut: any;
  id: any;
  couponCode: any;
  public today = new Date();
  public minDateCheckOut = new Date();
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
    public datepipe: DatePipe

  ) { }

  ngOnInit(): void {
    this.getCustomer();


  }
  getCustomer() {
    this.restApi.getCustomerName().subscribe((res) => {
      this.loggedInUser = res
      if (this.loggedInUser && this.loggedInUser.emailId) {
        this.getRoomTypes();
        this.getCustomerId();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  getRooms(): void {
    this.restApi.getRooms().subscribe((data) => {
      this.rooms = data;

    })
  }
  roomSelection(room: IRoom) {
    this.restApi.selectedRoom = room;
    this.router.navigate(['/booking']);
  }

  getRoomTypes() {
    this.restApi.getRoomTypes().subscribe((data) => {
      this.roomTypes = data;
    })
  }

  getCapacity(roomType: String) {
    this.restApi.getCapacity(roomType).subscribe((data) => {
      this.capacity = data;
      this.noOfRooms = 0;
      this.couponCode = '';
    })

  }

  getPriceAfterNoOfRooms(roomType: String, noOfRooms: number) {
    this.restApi.getPrice(roomType).subscribe((data) => {
      this.pricePerRoom = data;
    })
    let dateDifference = 0;
    let startDate = new Date(this.checkIn);
    let endDate = new Date(this.checkOut);
    dateDifference = (endDate.getTime() - startDate.getTime()) / 60000;
    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    dateDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(this.couponCode);
    console.log(startDate.getMonth());
    if (startDate.getMonth() == 2) {
      if (this.couponCode == 'COU10') {
        this.pricePerRoom = this.pricePerRoom - ((10 / 100) * this.pricePerRoom);
        this.price = (this.pricePerRoom) * noOfRooms * dateDifference;
      }
    }

    this.price = (this.pricePerRoom) * noOfRooms * dateDifference;

  }

  getCapacityAndPrice() {
    this.getCapacity(this.roomType);
    this.getPriceAfterNoOfRooms(this.roomType, this.noOfRooms);
  }


  emptyCheckOut() {
    if (this.checkOut) {
      this.checkOut = null;
    }
    this.minDateCheckOut = this.getMinDate();
    this.noOfRooms = 0;
    this.price = 0;
    this.capacity = 0;
  }
  getMinDate() {
    var nextDay: Date;
    nextDay = new Date(this.checkIn);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  }
  roomNos: any = [];


  getCustomerId() {

    this.restApi.getCustomerId(this.loggedInUser.emailId).subscribe((data) => {
      this.reservationDetails.customerId = data;
    });
  }

  reservedRoomDetails() {
    this.restApi.getBookedRoomDetails(this.roomType).subscribe((data) => {
      console.log(data);
      this.bookedRooms = data;
      this.createReservation();
    })
  }

  preCreateReservation() {
    this.reservedRoomDetails();
  }

  createReservation() {

    console.log(this.bookedRooms);
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
        let checkIn = this.datepipe.transform(this.checkIn, 'dd-MM-yyyy');
        let checkOut = this.datepipe.transform(this.checkOut, 'dd-MM-yyyy');
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



    this.restApi.getAllRoomNO(this.roomType).subscribe((data: any) => {
      this.roomNos = data;
      this.reservationDetails.checkIn = this.checkIn;
      this.reservationDetails.checkOut = this.checkOut;
      this.reservationDetails.totalPrice = this.price;
      this.reservationDetails.selectedRoomType = this.roomType;
      if (this.roomNos != null) {
        if (this.roomNos.length >= this.noOfRooms) {
          for (this.i = 0; this.i < this.noOfRooms; this.i++) {

            this.reservationDetails.roomNo = this.roomNos[this.i];
            this.restApi.createReservation(this.reservationDetails).subscribe((data: {}) => { })
            this.restApi.allocateStatus(this.roomNos[this.i], "BOOKED").subscribe((data) => { })
          }
          window.alert("reservation done successfully");
          this.router.navigate(['/reservation-detail', this.reservationDetails.customerId]);
        }
        else {
          window.alert("required number of rooms is not available. We have only " + this.roomNos.length + " available rooms");
        }
      }
      else {
        window.alert("No rooms available");
      }
    });

  }
}