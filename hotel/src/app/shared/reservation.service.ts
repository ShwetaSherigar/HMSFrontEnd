import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }
  public reservationId:any;
  public checkIn: any;
  public checkOut: any;
  public roomNo: any;
  public customerId: any;
  public totalPrice:any;
  public selectedRoomType:any; 
  public status:any;  

}
