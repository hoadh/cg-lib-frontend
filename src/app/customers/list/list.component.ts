import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  message: string = null;
  isError = false;

  libraryId: string;
  listCustomers: object;
  deleteIdCustomer: string;

  constructor(
    public router: Router,
    private customersService: CustomersService
  ) { }

  ngOnInit() {
    this.libraryId = localStorage.getItem('LIBRARY_ID');
    this.getList();
  }
  getList() {
    this.customersService.getList(this.libraryId).subscribe(result => {
      if (result && result.status && result.data) {
        this.listCustomers = result.data;
      }
    });
  }

  setDeleteIdCustomer(id: string) {
    this.deleteIdCustomer = id;
  }

  delete() {
    this.customersService.delete(this.libraryId, this.deleteIdCustomer).subscribe(result => {
      this.isError = !(result.status && result.status === 'success');
      this.message = result.message;
      this.getList();
    });
  }

  setUpdateIdCategory(id: string, index: number) {
    localStorage.setItem('CUSTOMER_ID_UPDATE', id);
    localStorage.setItem('CUSTOMER_DATA_UPDATE', JSON.stringify(this.listCustomers[index]));
    this.router.navigate(['/lib/customers/edit/' + id]);
  }

  getRoleById(id: number) {
    return this.customersService.getRoleById(id);
  }
}
