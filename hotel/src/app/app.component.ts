import { Component } from '@angular/core';
import { ICustomer } from './shared/ICustomer';
import { RestApiService } from './shared/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hotel';
  public loggedInUser: ICustomer = {
    customerId: 0,
    name: "",
    phone: "",
    gender: "",
    address: "",
    emailId: "",
    password: ""
  };
  constructor(public restApi: RestApiService) { }
  ngOnInit() {
    this.getCustomer();
  }
  logOut() {
    this.restApi.customerSubject.next({});

  }
  getCustomer() {
    this.restApi.getCustomerName().subscribe((res) => {
      this.loggedInUser = res;
    });
  }

  getUrl() {
    console.log(location);
    let imgPath = '';
    switch (location.pathname) {
      case '/home':
        imgPath = "bg.jpg"
        break;
      case '/login':
        imgPath = "booking.jpg"
        break;
      case '/register':
        imgPath = "register.jpg"
        break;
      case '/contactus':
        imgPath = "contactus.jpg"
        break;
      case '/aboutus':
        imgPath = "bg.jpg"
        break;
      case '/forgot-password':
        imgPath = "bg.jpg"
        break;
      case '/app-pagenotfound':
        imgPath = "pagenotfound.jpg"
        break;
      case '/edit-reservation':
        imgPath = "bg.jpg"
        break;

      default:
        imgPath = "bg.jpg"
        break;
    }
    return `url(/assets/${imgPath})`;

  }

}
