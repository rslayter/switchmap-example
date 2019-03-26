import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers = [{
    name: 'Janet Clell',
    address: '02697 Arapahoe Junction',
    city: 'Columbia',
    state: 'SC',
    zip: '29203'
  }, {
    name: 'James Michie',
    address: '1 1st Avenue',
    city: 'Corpus Christi',
    state: 'TX',
    zip: '78415'
  }, {
    name: 'Jay Gillings',
    address: '2122 Aberg Junction',
    city: 'San Antonio',
    state: 'TX',
    zip: '78230'
  }, {
    name: 'Joseph Downer',
    address: '2635 Paget Park',
    city: 'Houston',
    state: 'TX',
    zip: '77245'
  }, {
    name: 'Nick Lockyear',
    address: '98331 Merrick Terrace',
    city: 'Colorado Springs',
    state: 'CO',
    zip: '80920'
  }, {
    name: 'Jed Macken',
    address: '8384 Westport Junction',
    city: 'Boca Raton',
    state: 'FL',
    zip: '33432'
  }, {
    name: 'Tanya Sheryn',
    address: '85 Washington Court',
    city: 'Nashville',
    state: 'TN',
    zip: '37205'
  }, {
    name: 'Rorie Jouanot',
    address: '2938 Blackbird Street',
    city: 'Houston',
    state: 'TX',
    zip: '77271'
  }, {
    name: 'Sydney Scurrah',
    address: '0 Crowley Parkway',
    city: 'Kansas City',
    state: 'KS',
    zip: '66112'
  }, {
    name: 'Andre Snodin',
    address: '23 Arizona Park',
    city: 'Detroit',
    state: 'MI',
    zip: '48224'
  }];
  constructor() { }

  get(customer) {
    return of(this.customers.filter(x => {
      return x.name.toLowerCase().includes(customer.name.toLowerCase()) &&
        x.address.toLowerCase().includes(customer.address.toLowerCase()) &&
        x.city.toLowerCase().includes(customer.city.toLowerCase()) &&
        x.state.toLowerCase().includes(customer.state.toLowerCase()) &&
        x.zip.toLowerCase().includes(customer.zip.toLowerCase());
    })).pipe(delay(customer.delayTime));
  }
}
