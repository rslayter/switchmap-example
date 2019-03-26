import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CustomersService } from './services/customers/customers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'switchMap-example';

  customerForm;
  customer;
  customersWithSwitchmap = [];
  customersWithoutSwitchmap = [];
  private customerLookup$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      delayTime: 2000
    });


    this.customerForm.valueChanges.subscribe(() => {
      this.customerLookup$.next();
      this.getCustomers();
    });

    this.customerLookup$
      .pipe(
        switchMap(() => {
          return this.customersService.get(this.customerForm.value);
        })
      )
      .subscribe(
        (results: any) => {
          this.customersWithSwitchmap = results;
        },
        error => {
          console.log(error);
        }
      );

    this.customerLookup$.next();
    this.getCustomers();
  }

  getCustomers() {
    this.customersService.get(this.customerForm.value).subscribe(results => {
      this.customersWithoutSwitchmap = results;
    });
  }

}
