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
    id: 0,
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
  getCustomer() {
    this.restApi.getCustomerName().subscribe(res => this.loggedInUser = res);
  }
}
