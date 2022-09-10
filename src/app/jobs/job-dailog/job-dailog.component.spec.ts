import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDailogComponent } from './job-dailog.component';

describe('JobDailogComponent', () => {
  let component: JobDailogComponent;
  let fixture: ComponentFixture<JobDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
