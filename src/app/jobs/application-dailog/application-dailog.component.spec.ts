import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDailogComponent } from './application-dailog.component';

describe('ApplicationDailogComponent', () => {
  let component: ApplicationDailogComponent;
  let fixture: ComponentFixture<ApplicationDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
