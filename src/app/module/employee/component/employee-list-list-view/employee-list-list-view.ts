import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {EmployeeAction, employeeFeature} from '../../state';
import {EmployeeDeleteDialog} from '../employee-delete-dialog/employee-delete-dialog';

@Component({
  selector: 'ing-employee-list-list-view',
  standalone: false,
  templateUrl: './employee-list-list-view.html',
  styleUrl: './employee-list-list-view.scss'
})
export class EmployeeListListView implements OnInit {
  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'dateOfEmployment',
    'dateOfBirth',
    'phone',
    'email',
    'department',
    'position',
    'actions',
  ];
  private store = inject(Store);
  vm$ = this.store.selectSignal(employeeFeature.selectViewModel);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  ngOnInit(): void {
    const s = this.vm$();
    this.store.dispatch(EmployeeAction.load({pageIndex: s.pageIndex, pageSize: s.pageSize}));
  }

  onViewChange(v: 'list' | 'card') {
    this.router.navigate(['employee', v === 'list' ? '' : 'card']).then();
  }

  onPage(ev: any) {
    this.store.dispatch(EmployeeAction.setPage({pageIndex: ev.pageIndex, pageSize: ev.pageSize}));
    this.store.dispatch(EmployeeAction.load({pageIndex: ev.pageIndex, pageSize: ev.pageSize}));
  }

  edit(e: any) {
    this.router.navigate(['employee', 'edit', e.id]).then();
  }

  delete(e: any) {
    this.dialog.open(EmployeeDeleteDialog, {
      width: '420px',
      data: {name: `${e.firstName} ${e.lastName}`}
    }).afterClosed().subscribe(ok => {
      if (ok) this.store.dispatch(EmployeeAction.delete({id: e.id}));
    });
  }
}
