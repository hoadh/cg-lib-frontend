import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() category?: any;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formError = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  submitHandler(myForm) {
    this.category = {
      name: myForm.value.name
    };
    this.formSubmit.emit(this.category);
  }
}
