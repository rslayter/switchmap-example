import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
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
  requestsWithSwitchmap = [];
  customersWithoutSwitchmap = [];
  requestsWithoutSwitchmap = [];
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
        map(() => this.requestsWithSwitchmap = []),
        switchMap(() => {
          this.requestsWithSwitchmap.push(this.customerForm.value);
          const searchParams = this.customerForm.value;
          return this.customersService.get(searchParams);
        })
      )
      .subscribe(results => {
        this.customersWithSwitchmap = results;
        this.requestsWithSwitchmap.shift();
      });

    this.customerLookup$.next();
    this.getCustomers();
  }

  getCustomers() {
    this.requestsWithoutSwitchmap.push(this.customerForm.value);
    const searchParams = this.customerForm.value;
    this.customersService.get(searchParams).subscribe(results => {
      this.customersWithoutSwitchmap = results;
      this.requestsWithoutSwitchmap.shift();
    });
  }

}