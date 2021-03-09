import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  customerId: any;
  @Input() customerDetails: any = { name: '', phone: '', gender: '', address: '', emailId: '', password: '' }
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  registerCustomer() {

    this.restApi.createCustomer(this.customerDetails).subscribe((data) => {
      this.customerId = data;
      window.alert("Your Customer ID is==" + this.customerId);
      this.router.navigate(['/login']);
    })
  }

}
