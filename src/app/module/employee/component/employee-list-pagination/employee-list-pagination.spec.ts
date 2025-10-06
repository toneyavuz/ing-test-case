import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListPagination } from './employee-list-pagination';

describe('EmployeeListPagination', () => {
  let component: EmployeeListPagination;
  let fixture: ComponentFixture<EmployeeListPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListPagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListPagination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
