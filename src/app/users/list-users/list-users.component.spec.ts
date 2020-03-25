import { HttpClientModule } from '@angular/common/http';
import { UserService } from './../user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersComponent } from './list-users.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { Router } from '@angular/router';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListUsersComponent],
      imports: [SharedModule, HttpClientModule],
      providers: [{
        provide: Router,
        useClass: class { navigate = jasmine.createSpy('navigate'); }
      },
        UserService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
