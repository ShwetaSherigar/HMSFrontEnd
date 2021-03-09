import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICustomer } from './ICustomer';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IRoom } from './IRoom';
import { IReservation } from './IReservation';
import { ReservationService } from './reservation.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private resturl: string = '/assets/my-data/';
  private springRestUrl: String = 'http://localhost:8060/HMS/';
  public selectedRoom: IRoom = {
    roomNo: 0,
    roomType: "",
    capacity: 0,
    status: "",
    price: 0
  };
  public loggedInUser: any = {
    customerId: 0,
    name: "",
    phone: "",
    gender: "",
    emailId: "",
    address: "",
    password: ""
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  customerSubject = new BehaviorSubject(this.loggedInUser);
  constructor(private http: HttpClient) { }


  createCustomer(customer: any): Observable<ICustomer[]> {
    return this.http.post<ICustomer[]>(this.springRestUrl + '/create', JSON.stringify(customer), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getCustomer(emailId: String): Observable<ICustomer> {
    return this.http.get<ICustomer>(this.springRestUrl + '/getCustomer/' + emailId + '/', this.httpOptions);
  }

  getCustomerById(customerId: number): Observable<ICustomer> {
    return this.http.get<ICustomer>(this.springRestUrl + '/getCustomerById/' + customerId, this.httpOptions);
  }

  getBookingDetails(customerId: any): Observable<IReservation[]> {
    return this.http.get<IReservation[]>(this.springRestUrl + '/bookingDetail/' + customerId).pipe(retry(1), catchError(this.handleError));
  }
  getCustomerName(): Observable<ICustomer> {
    return <Observable<ICustomer>>this.customerSubject;
  }

  getRoomTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.springRestUrl + '/getRoomTypes', this.httpOptions);
  }

  getCapacity(roomType: String): Observable<number> {
    return this.http.get<number>(this.springRestUrl + '/getRoomCapacity/' + roomType, this.httpOptions);
  }

  getPrice(roomType: String): Observable<number> {
    return this.http.get<number>(this.springRestUrl + '/getRoomPrice/' + roomType, this.httpOptions);
  }


  getRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(this.springRestUrl + '/getRoomDetails').pipe(retry(1), catchError(this.handleError));
  }

  getAllRoomNO(roomType: string): Observable<number[]> {
    return this.http.get<number[]>(this.springRestUrl + '/getRoomNo/' + roomType).pipe(retry(1), catchError(this.handleError));
  }


  getCustomerId(emailId: string): Observable<number> {
    return this.http.get<number>(this.springRestUrl + '/getCustomerId/' + emailId + '/').pipe(retry(1), catchError(this.handleError));
  }

  createReservation(reservation: any): Observable<IReservation> {
    return this.http.post<IReservation>(this.springRestUrl + '/reservation', JSON.stringify(reservation), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  allocateStatus(roomNo: any, status: any): Observable<IRoom> {
    return this.http.put<IRoom>(this.springRestUrl + '/allocateStatus/' + roomNo + '/' + status, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getBookedRoomDetails(roomType: any): Observable<IReservation[]> {
    return this.http.get<IReservation[]>(this.springRestUrl + "/bookedRoomDetail/" + roomType).pipe(retry(1), catchError(this.handleError));
  }

  setCustomer(data: ICustomer) {
    this.customerSubject.next(data);
  }
  editReservation(reservation: ReservationService, reservationId: any): Observable<IReservation[]> {
    return this.http.put<IReservation[]>(this.springRestUrl + '/update/' + reservationId, JSON.stringify(reservation), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deleteReservation(reservationId: any): Observable<IReservation> {
    return this.http.delete<IReservation>(this.springRestUrl + '/delete/' + reservationId)
  }

  cancelReservation(reservationId: any): Observable<IReservation>{
    return this.http.put<IReservation>(this.springRestUrl + '/cancel/' + reservationId, this.httpOptions).pipe(retry(1),catchError(this.handleError));
  }

  changePassword(customer: any): Observable<ICustomer> {
    return this.http.put<ICustomer>(this.springRestUrl + '/changePassword', JSON.stringify(customer), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getBookingDetailsbyReservationId(reservationId: any): Observable<IReservation[]> {
    return this.http.get<IReservation[]>(this.springRestUrl + '/bookingDetailbyresId/' + reservationId).pipe(retry(1), catchError(this.handleError));
  }


  handleError(err: any) {
    let errorMessage = "";

    if (err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    }
    else {
      errorMessage = `Error Code : ${err.status}   \n ErrorMessage: ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);

  }
}



