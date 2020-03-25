import { CategoriesService } from './../categories.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/_shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriesComponent } from './list-categories.component';
import { Router } from '@angular/router';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCategoriesComponent],
      providers: [CategoriesService,
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        }],
      imports: [SharedModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
