import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {

  reservation:any;
  constructor() { }

  ngOnInit(): void {
  }

}
