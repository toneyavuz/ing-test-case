import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCreateAndEditForm } from './employee-create-and-edit-form';

describe('EmployeeCreateAndEditForm', () => {
  let component: EmployeeCreateAndEditForm;
  let fixture: ComponentFixture<EmployeeCreateAndEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeCreateAndEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCreateAndEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
