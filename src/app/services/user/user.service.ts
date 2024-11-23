import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../public/models/User';
import { environment } from '../../../environments/environment';
import { Customer } from '../../public/models/Customer';
import { Enterprice } from '../../public/models/Enterprice';
import { Musical } from '../../public/models/Musical';
import { MusicalDetails } from '../../public/models/MusicalDetails';
import { EnterpriceDatails } from '../../public/models/EnterpriceDatails';
import { CustomerDetails } from '../../public/models/CustomerDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = environment.baseUrl + '/users';
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>(this.uri, user);
  }
  createCustomer(user: Customer) {
    return this.http.post<Customer>(`${this.uri}/customer`, user);
  }
  createEnterprice(user: Enterprice) {
    return this.http.post<Enterprice>(`${this.uri}/enterprice`, user);
  }
  createMusical(user: Musical) {
    return this.http.post<Musical>(`${this.uri}/musical`, user);
  }
  login(user: User) {
    return this.http.post<User>(`${this.uri}/login`, user);
  }
  getUser(id: Number) {
    return this.http.get<User>(`${this.uri}/${id}`);
  }
  getCustomer(id: Number) {
    return this.http.get<CustomerDetails>(`${this.uri}/${id}`);
  }
  getMusical(id: Number) {
    return this.http.get<MusicalDetails>(`${this.uri}/${id}`);
  }
  getEnterpice(id: Number) {
    return this.http.get<EnterpriceDatails>(`${this.uri}/${id}`);
  }
  updateCustomer(id: Number, musical: CustomerDetails) {
    return this.http.put<CustomerDetails>(`${this.uri}/customer/${id}`, musical);
  }
  updateMusical(id: Number, musical: MusicalDetails) {
    return this.http.put<MusicalDetails>(`${this.uri}/musical/${id}`, musical);
  }
  updateEnteprice(id: Number, musical: EnterpriceDatails) {
    return this.http.put<EnterpriceDatails>(`${this.uri}/enterprice/${id}`, musical);
  }
  getAllMusicals() {
    return this.http.get<MusicalDetails[]>(`${this.uri}/musicals`);
  }
  updatePhoto(id: number, data: any) {
    return this.http.put<any>(`${this.uri}/photo/${id}`, data);
  }
}
