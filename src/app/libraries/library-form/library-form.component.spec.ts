import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryFormComponent } from './library-form.component';
import { FormsModule } from '@angular/forms';

describe('LibraryFormComponent', () => {
  let component: LibraryFormComponent;
  let fixture: ComponentFixture<LibraryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryFormComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
