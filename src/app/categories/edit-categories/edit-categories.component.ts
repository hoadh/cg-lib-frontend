import { CategoriesService } from '../categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css'],
  providers: [CategoriesService]
})
export class EditCategoriesComponent implements OnInit {
  message: string = null;
  isError = false;

  categoryId: string;
  category: any;

  constructor(
    private categoryService: CategoriesService
  ) { }

  ngOnInit() {
    console.log('EditCategoriesComponent:ngOnInit');
    this.categoryId = localStorage.getItem('CATEGORY_ID_UPDATE');
    this.category = JSON.parse(localStorage.getItem('CATEGORY_DATA_UPDATE'));
  }

  formSubmit(category: any) {
    console.log('formSubmit', category);
    const updatedCategory = {
      name: category.name
    };
    this.categoryService.update(this.categoryId, updatedCategory).subscribe(result => {
      if (result) {
        this.isError = false;
        this.message = result.message;
      }
    }, error => {
      this.isError = true;
      this.message = error;
    });
  }

}
