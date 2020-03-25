import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() user?: User;
  @Input() libraries?: object;
  @Output() formSubmit = new EventEmitter<User>();
  @Output() formError = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  submitHandler(myForm) {
    console.log('UserFormComponent:submitHandler:myForm', myForm.value);
    console.log('UserFormComponent:submitHandler:user', this.user);
    const libraryId = Number(myForm.value.library_id);
    if (isNaN(libraryId)) {
      this.formError.emit('Chưa chọn thư viện quản lý cho thủ thư');
      return;
    }
    const user: User = {
      name: myForm.value.name,
      phone: myForm.value.phone,
      username: myForm.value.username,
      password: myForm.value.password,
      library_id: libraryId
    };
    const {password, confirmPassword } = myForm.value;
    if (password !== confirmPassword) {
      this.formError.emit('Mật khẩu mới chưa khớp');
      return;
    }
    this.formSubmit.emit(user);
  }

}
