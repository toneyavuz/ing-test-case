import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListCardView } from './employee-list-card-view';

describe('EmployeeListCardView', () => {
  let component: EmployeeListCardView;
  let fixture: ComponentFixture<EmployeeListCardView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListCardView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListCardView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
