import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListHeader } from './employee-list-header';

describe('EmployeeListHeader', () => {
  let component: EmployeeListHeader;
  let fixture: ComponentFixture<EmployeeListHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
