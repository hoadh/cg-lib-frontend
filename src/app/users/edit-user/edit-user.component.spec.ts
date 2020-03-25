import { UserService } from './../user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './../user-form/user-form.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LibraryService } from 'src/app/libraries/library.service';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserComponent, UserFormComponent],
      providers: [UserService, LibraryService],
      imports: [SharedModule, FormsModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.formSubmit({ name: 'test' });
    expect(component).toBeTruthy();
  });
});
