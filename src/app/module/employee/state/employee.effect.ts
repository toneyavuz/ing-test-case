import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, mergeMap, of, switchMap, withLatestFrom} from 'rxjs';
import {EmployeeService} from '../service/employee.service';
import {EmployeeAction} from './employee.action';
import {employeeFeature} from './employee.reducer';

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  private service = inject(EmployeeService);
  private store = inject(Store);
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeAction.load),
      switchMap(({pageIndex, pageSize}) =>
        this.service.listPaged({pageIndex, pageSize}).pipe(
          map(res => EmployeeAction.loadSuccess({items: res.items, total: res.total})),
          catchError(error => of(EmployeeAction.loadFailure({error})))
        )
      )
    )
  );
  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeAction.getById),
      switchMap(({id}) =>
        this.service.getById(id).pipe(
          map(res => {
            if (!res) return EmployeeAction.loadFailure({error: 'Employee not found'});
            return EmployeeAction.getByIdSuccess({employee: res});
          }),
          catchError(error => of(EmployeeAction.loadFailure({error})))
        )
      )
    )
  );
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeAction.create),
      mergeMap(({employee}) =>
        this.service.create(employee).pipe(
          map(created => EmployeeAction.createSuccess({employee: created})),
          catchError(error => of(EmployeeAction.createFailure({error})))
        )
      )
    )
  );
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeAction.update),
      mergeMap(({id, changes}) =>
        this.service.update(id, changes).pipe(
          map(employee => EmployeeAction.updateSuccess({employee})),
          catchError(error => of(EmployeeAction.updateFailure({error})))
        )
      )
    )
  );
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeAction.delete),
      mergeMap(({id}) =>
        this.service.delete(id).pipe(
          map(() => EmployeeAction.deleteSuccess()),
          catchError(error => of(EmployeeAction.deleteFailure({error})))
        )
      )
    )
  );
  refreshAfterMutations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeAction.createSuccess, EmployeeAction.updateSuccess, EmployeeAction.deleteSuccess),
      withLatestFrom(
        this.store.select(employeeFeature.selectEmployeePageIndex),
        this.store.select(employeeFeature.selectEmployeePageSize)
      ),
      map(([_, pageIndex, pageSize]) => EmployeeAction.load({pageIndex, pageSize}))
    )
  );
}
