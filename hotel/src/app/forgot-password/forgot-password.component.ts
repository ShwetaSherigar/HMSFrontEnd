import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomer } from '../shared/ICustomer';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  @Input() passwordDetails: any = { customerId: '', password: '' }
  customerDetails: any;

  confirmPaassword: any;
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  resetPassword() {
    this.restApi.getCustomerById(this.passwordDetails.customerId).subscribe((data) => {
      this.customerDetails = data;
      console.log("Data : " + data);
      console.log(this.customerDetails);
      if (this.customerDetails != null) {
        console.log(this.passwordDetails);
        this.restApi.changePassword(this.passwordDetails).subscribe((data) => {
          window.alert("Password Changed Successfully. Please login with new password.")
        });
      }
      else {
        window.alert("Customer Id is invalid!! Please try again.")
      }
    });
  }
}
