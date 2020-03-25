import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  message: string = null;
  isError = false;
  libraryId: string;
  customerRoles = [];

  constructor(
    public router: Router,
    private customersService: CustomersService
  ) { }

  ngOnInit() {
    this.libraryId = localStorage.getItem('LIBRARY_ID');
    this.customerRoles = this.customersService.getRoles();
  }

  addCustomer(myForm) {
    const customer: any = {
      name: myForm.value.name,
      code: myForm.value.code,
      group: myForm.value.group,
      address: myForm.value.address,
      role: myForm.value.role,
      birthday: myForm.value.birthday,
      library_id: this.libraryId
    };
    this.customersService.add(this.libraryId, customer).subscribe(result => {
      const status = result.status;

      switch (status) {
        case 'success':
          this.isError = false;
          this.message = result.message;
          break;
        case 'error':
          this.isError = true;
          this.message = (result.message === 'Token is Expired')
            ? 'Hết phiên đăng nhập. Vui lòng đăng nhập lại'
            : result.message;
          break;
        default:
          this.isError = true;
          this.message = 'Lỗi chưa rõ nguyên nhân!';
      }
    }, error => {
      let message = 'Có lỗi xảy ra!';
      if (error.error) {
        message = error.error.message;
      }
      this.isError = true;
      this.message = message;
    });
  }

}
