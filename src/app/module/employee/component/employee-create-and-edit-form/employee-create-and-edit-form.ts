import {Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {distinctUntilChanged} from 'rxjs';
import {Employee} from '../../model';
import {EmployeeAction, employeeFeature} from '../../state';

@Component({
  selector: 'ing-employee-create-and-edit-form',
  standalone: false,
  templateUrl: './employee-create-and-edit-form.html',
  styleUrl: './employee-create-and-edit-form.scss'
})
export class EmployeeCreateAndEditForm implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  isEdit = false;
  employeeId?: string;
  departments = ['Analytics', 'HR', 'IT', 'Finance', 'Marketing'];
  positions = ['Junior', 'Mid', 'Senior', 'Lead', 'Manager'];
  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfEmployment: [null as Date | null, Validators.required],
    dateOfBirth: [null as Date | null, Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    position: ['', Validators.required],
  });


  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? undefined;
    this.isEdit = !!this.employeeId;

    if (this.isEdit && this.employeeId) {
      this.store.dispatch(EmployeeAction.getById({id: this.employeeId}));

      this.store.select(employeeFeature.selectCurrentEmployee)
        .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe((employee: Employee) => {
        if (employee) {
          this.form.patchValue({
            firstName: employee.firstName ?? '',
            lastName: employee.lastName ?? '',
            dateOfEmployment: employee.dateOfEmployment ? new Date(employee.dateOfEmployment) : null,
            dateOfBirth: employee.dateOfBirth ? new Date(employee.dateOfBirth) : null,
            phone: employee.phone ?? '',
            email: employee.email ?? '',
            department: employee.department ?? '',
            position: employee.position ?? ''
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(EmployeeAction.getByIdClear({employee: undefined}))
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.router.navigate(['/employee']).then();
  }

  cancel() {
    this.router.navigate(['/employee']).then();
  }
}
