import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Employee} from '../../model';
import {EmployeeAction, employeeFeature} from '../../state';
import {EmployeeDeleteDialog} from '../employee-delete-dialog/employee-delete-dialog';

@Component({
  selector: 'ing-employee-list-card-view',
  standalone: false,
  templateUrl: './employee-list-card-view.html',
  styleUrl: './employee-list-card-view.scss'
})
export class EmployeeListCardView implements OnInit {
  router = inject(Router);
  private store = inject(Store);
  vm$ = this.store.selectSignal(employeeFeature.selectViewModel);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    const s = this.vm$();
    this.store.dispatch(EmployeeAction.load({pageIndex: s.pageIndex, pageSize: s.pageSize}));
  }

  onViewChange(v: 'list' | 'card') {
    const cardRoute = ['employee', 'card'];
    const listRoute = ['employee', 'list'];
    this.router.navigate(v === 'list' ? listRoute : cardRoute).then();
  }

  edit(employee: Employee) {
    this.router.navigate(['employee', 'edit', employee.id]).then();
  }

  delete(employee: Employee) {
    this.dialog.open(EmployeeDeleteDialog, {data: employee}).afterClosed().subscribe(ok => {
      if (ok) this.store.dispatch(EmployeeAction.delete(employee));
    });
  }

  onPage(ev: any) {
    this.store.dispatch(EmployeeAction.setPage({pageIndex: ev.pageIndex, pageSize: ev.pageSize}));
    this.store.dispatch(EmployeeAction.load({pageIndex: ev.pageIndex, pageSize: ev.pageSize}));
  }
}
