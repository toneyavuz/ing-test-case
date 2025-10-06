import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListListView } from './employee-list-list-view';

describe('EmployeeListListView', () => {
  let component: EmployeeListListView;
  let fixture: ComponentFixture<EmployeeListListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListListView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
