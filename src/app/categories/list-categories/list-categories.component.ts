import { CategoriesService } from '../categories.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
  providers: [CategoriesService]
})
export class ListCategoriesComponent implements OnInit {
  message: string = null;
  isError = false;

  listCategories: object;
  deleteIdCategory: string;

  constructor(
    public router: Router,
    private categorySrv: CategoriesService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.categorySrv.getList().subscribe(result => {
      if (result && result.status && result.data) {
        this.listCategories = result.data;
      }
    });
  }

  setDeleteIdCategory(id: string) {
    this.deleteIdCategory = id;
  }

  deleteCategory() {
    this.categorySrv.delete(this.deleteIdCategory).subscribe(result => {
      this.isError = !(result.status && result.status === 'success');
      this.message = result.message;
      this.getList();
    });
  }

  setUpdateIdCategory(id: string, index: number) {
    localStorage.setItem('CATEGORY_ID_UPDATE', id);
    localStorage.setItem('CATEGORY_DATA_UPDATE', JSON.stringify(this.listCategories[index]));
    this.router.navigate(['/admin/categories/edit/' + id]);
  }

}
