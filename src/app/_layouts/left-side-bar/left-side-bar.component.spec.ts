import { RouterModule } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSideBarComponent } from './left-side-bar.component';
import { USER_ROLE } from 'src/app/_core/tokens/user-role';
import { ACCESS_TOKEN } from 'src/app/_core/tokens/access-token';

describe('LeftSideBarComponent', () => {
  let component: LeftSideBarComponent;
  let fixture: ComponentFixture<LeftSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeftSideBarComponent],
      providers: [
        {
          provide: USER_ROLE, useValue: USER_ROLE
        }
      ],
      imports: [RouterModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
