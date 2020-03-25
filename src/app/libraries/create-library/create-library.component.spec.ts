import { LibraryFormComponent } from './../library-form/library-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../_shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLibraryComponent } from './create-library.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CreateLibraryComponent', () => {
  let component: CreateLibraryComponent;
  let fixture: ComponentFixture<CreateLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLibraryComponent, LibraryFormComponent],
      providers: [HttpClient],
      imports: [SharedModule, FormsModule, ReactiveFormsModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
