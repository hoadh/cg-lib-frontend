import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBooksComponent } from './list-books.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';

describe('ListBooksComponent', () => {
  let component: ListBooksComponent;
  let fixture: ComponentFixture<ListBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListBooksComponent],
      providers: [
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        },
        BooksService
      ],
      imports: [SharedModule, HttpClientModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
