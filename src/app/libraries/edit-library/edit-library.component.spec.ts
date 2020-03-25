import { LibraryService } from 'src/app/libraries/library.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibraryFormComponent } from './../library-form/library-form.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLibraryComponent } from './edit-library.component';
import { SharedModule } from 'src/app/_shared/shared.module';

describe('EditLibraryComponent', () => {
  let component: EditLibraryComponent;
  let fixture: ComponentFixture<EditLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditLibraryComponent, LibraryFormComponent],
      providers: [LibraryService],
      imports: [SharedModule, FormsModule, ReactiveFormsModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
