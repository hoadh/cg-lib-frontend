import { Injectable } from '@angular/core';
import { HttpBaseService } from '../_core/services/http-base.service';
import { Observable } from 'rxjs';
import { HttpResult } from '../_core/models/http-result';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends HttpBaseService {

  customerRoles = [
    {
      id: 1,
      title: 'Học sinh'
    },
    {
      id: 2,
      title: 'Giáo viên'
    },
    {
      id: 3,
      title: 'Khác'
    }
  ];

  getRoles() {
    return this.customerRoles;
  }

  getRoleById(id: number) {
    return this.customerRoles[--id];
  }

  public add(libraryId: string, customer: Customer): Observable<HttpResult> {
    return this.http.post(`${this.apiUrl}libraries/${libraryId}/customers`, customer, { headers: this.getHeaders() });
  }

  public getList(libraryId: string): Observable<HttpResult> {
    return this.http.get(`${this.apiUrl}libraries/${libraryId}/customers`, { headers: this.getHeaders() });
  }

  public getDetail(libraryId: string, customerId: string): Observable<HttpResult> {
    return this.http.get(`${this.apiUrl}libraries/${libraryId}/customers/${customerId}`, { headers: this.getHeaders() });
  }

  public delete(libraryId: string, customerId: string): Observable<HttpResult> {
    return this.http.delete(`${this.apiUrl}libraries/${libraryId}/customers/${customerId}`, { headers: this.getHeaders() });
  }
}
