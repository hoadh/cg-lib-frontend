import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  providers: [CategoriesService]
})
export class AddCategoryComponent implements OnInit {
  message: string = null;
  isError = false;

  constructor(private categorySrv: CategoriesService) { }

  ngOnInit() {
  }

  addCategory(myForm) {
    const category: any = {
      name: myForm.value.name
    };
    this.categorySrv.add(category).subscribe(result => {
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
