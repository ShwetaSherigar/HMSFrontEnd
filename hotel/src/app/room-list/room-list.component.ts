import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from '../shared/ICustomer';
import { IRoom } from '../shared/IRoom';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms: IRoom[] = [];
  public loggedInUser: ICustomer = {
    id: 0,
    name: "",
    phone: "",
    gender: "",
    address: "",
    emailId: "",
    password: ""
  };
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer() {
    this.restApi.getCustomerName().subscribe((res) => {
      this.loggedInUser = res
      if (this.loggedInUser && this.loggedInUser.emailId) {
        this.getRooms();
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
}
