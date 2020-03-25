import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibrariesComponent } from './list-libraries.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { Router } from '@angular/router';

describe('ListLibrariesComponent', () => {
  let component: ListLibrariesComponent;
  let fixture: ComponentFixture<ListLibrariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListLibrariesComponent],
      providers: [{
        provide: Router,
        useClass: class { navigate = jasmine.createSpy('navigate'); }
      }],
      imports: [SharedModule, HttpClientModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
