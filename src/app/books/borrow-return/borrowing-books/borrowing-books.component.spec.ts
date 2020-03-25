import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingBooksComponent } from './borrowing-books.component';

describe('BorrowingBooksComponent', () => {
  let component: BorrowingBooksComponent;
  let fixture: ComponentFixture<BorrowingBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowingBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
