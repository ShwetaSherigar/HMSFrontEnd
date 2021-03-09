import { Component, OnInit, Input } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() loginDetails: any = { emailId: '', password: '' }
  custDetails: any;
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginDetails && this.loginDetails.emailId && this.loginDetails.password) {
      this.restApi.getCustomer(this.loginDetails.emailId).subscribe((data) => {
        this.custDetails = data;

        if (this.custDetails) {
          if (this.custDetails.emailId == this.loginDetails.emailId && this.custDetails.password == this.loginDetails.password) {
            this.restApi.loggedInUser = this.custDetails;
            this.restApi.setCustomer(this.custDetails);
            this.router.navigate(['/room-list']);

          }
          else if (this.custDetails.emailId == this.loginDetails.emailId && this.custDetails.password != this.loginDetails.password) {
            alert(" password is incorrect! Please login with valid password.");
          }
        }
        else {
          alert("User name or password is incorrect! Please login with valid information.");
        }
      })
    } else {
      alert("Email Id or Password should not be empty!");
    }
  }
}