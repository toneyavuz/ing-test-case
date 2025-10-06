import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeleteDialog } from './employee-delete-dialog';

describe('EmployeeDeleteDialog', () => {
  let component: EmployeeDeleteDialog;
  let fixture: ComponentFixture<EmployeeDeleteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDeleteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDeleteDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
