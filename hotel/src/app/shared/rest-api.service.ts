import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './customer.service';
import { ICustomer } from './ICustomer';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IRoom } from './IRoom';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  private resturl: string = '/assets/my-data/';
  private springRestUrl:String='http://localhost:8060/HMS/';
  public selectedRoom: IRoom = {
    roomNo: 0,
    roomType: "",
    capacity: 0,
    status: "",
    price: 0
  };
  public loggedInUser: ICustomer = {
    id: 0,
    name:"",
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


  createCustomer(customer:any): Observable<ICustomer[]> {
    return this.http.post<ICustomer[]>(this.springRestUrl + '/create',JSON.stringify(customer), this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  getCustomer(emailId:String): Observable<ICustomer> {
    return this.http.get<ICustomer>(this.springRestUrl + '/getCustomer/'+emailId+'/',this.httpOptions);
  }


  getCustomerName(): Observable<ICustomer> 
  {
    return <Observable<ICustomer>>this.customerSubject;
  }
  // getCustomerList(): Observable<ICustomer[]> {
  //   return this.http.get<ICustomer[]>(this.resturl + 'customer.json').pipe(retry(1), catchError(this.handleError));
  // }

  

  getRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(this.springRestUrl + '/getRoomDetails').pipe(retry(1), catchError(this.handleError));
  }

  setCustomer(data: ICustomer) {
    this.customerSubject.next(data);
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

  // // http://localhost:8081/EMSusingSprHib
  // // Define API
  // apiURL = 'http://localhost:8081/HMS';

  // constructor(private http: HttpClient) { }

  // /*========================================
  //   CRUD Methods for consuming RESTful API
  // =========================================*/

  // // Http Options
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }  

  // // HttpClient API get() method => Fetch Customers list
  // getCustomers(): Observable<Customer> {
  //   return this.http.get<Customer>(this.apiURL + '/allCustomers')
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // // HttpClient API get() method => Fetch Customer
  // getCustomer(eid:any): Observable<Customer> {
  //   return this.http.get<Customer>(this.apiURL + '/searchid/' + eid)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }  

  // // HttpClient API post() method => Create customer
  // createCustomer(customer:any): Observable<Customer> {
  //   return this.http.post<Customer>(this.apiURL + '/create', JSON.stringify(customer), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }  

  // // Error handling 
  // handleError(error:any) {
  //    let errorMessage = '';
  //    if(error.error instanceof ErrorEvent) {
  //      // Get client-side error
  //      errorMessage = error.error.message;
  //    } else {
  //      // Get server-side error
  //      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //    }
  //    window.alert(errorMessage);
  //    return throwError(errorMessage);
  // }
}

