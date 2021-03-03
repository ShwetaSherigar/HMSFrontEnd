import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //@Input() customerDetails: any = { fullName: '', email: '', password: '', confirmPassword: '', address: '', phoneNumber: '', gender: '' }
  @Input() customerDetails: any = { name: '', phone: '', gender: '', address: '', emailId: '', password: ''}
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // registerCustomer(): void {
  //   this.restApi.createCustomer(this.customerDetails).subscribe((data: {}) => {
  //   this.router.navigate(['/app-login']);
  //    })
  // }

  registerCustomer(){
    this.restApi.createCustomer(this.customerDetails).subscribe((data: {}) => {
      this.router.navigate(['/login'])
    })
  }
}
