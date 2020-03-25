import { CategoryFormComponent } from './../category-form/category-form.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoriesComponent } from './edit-categories.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/_shared/shared.module';
import { FormsModule } from '@angular/forms';

describe('EditCategoriesComponent', () => {
  let component: EditCategoriesComponent;
  let fixture: ComponentFixture<EditCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCategoriesComponent, CategoryFormComponent],
      providers: [HttpClient],
      imports: [SharedModule, FormsModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.formSubmit({ name: 'test' });
    expect(component).toBeTruthy();
  });
});
